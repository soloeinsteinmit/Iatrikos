from typing import List, Dict, Any
import google.generativeai as genai
from langchain.agents import Tool, AgentExecutor
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from Bio import Entrez
import requests
from app.core.config import get_settings
from app.services.ml.medical_knowledge import MedicalKnowledgeService
import asyncio
import json
from app.core.models.analysis_types import AnalysisResult
from langchain.schema.runnable import RunnablePassthrough

settings = get_settings()

class MedicalAgent:
    def __init__(self):
        # Initialize Gemini
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-pro-002')
        
        # Initialize knowledge service
        self.knowledge_service = MedicalKnowledgeService()
        
        # Initialize LangChain components
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro-002",
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.3
        )
        
        # Create specialized tools
        self.tools = self._create_tools()
        
    def _create_tools(self) -> List[Tool]:
        """Create the agent's toolkit"""
        return [
            Tool(
                name="Literature Search",
                func=self.knowledge_service.search_pubmed,
                description="Search medical literature for evidence"
            ),
            Tool(
                name="Drug Information",
                func=self.knowledge_service.search_drug_info,
                description="Get detailed medication information"
            ),
            Tool(
                name="Clinical Trials",
                func=self.knowledge_service.search_clinical_trials,
                description="Find relevant clinical trials"
            ),
            Tool(
                name="Lab Reference",
                func=self.knowledge_service.get_lab_reference,
                description="Get laboratory test reference information"
            )
        ]
    
    def _create_empty_analysis(self) -> Dict[str, Any]:
        """Create empty analysis structure with default values"""
        return {
            "case_id": "",
            "diagnoses": [],
            "key_findings": [],
            "risk_factors": [],
            "safety_checks": [],
            "treatment_plan": [],
            "recommendations": [],
            "recommended_actions": [],
            "differential_diagnoses": [],
            "vital_signs": [],
            "medications": [],
            "lab_results": [],
            "evidence": {
                "literature": [],
                "clinical_trials": [],
                "lab_references": []
            }
        }
    
    async def analyze_case(self, case_data: Dict[str, Any]) -> AnalysisResult:
        """Perform comprehensive case analysis using LangChain"""
        
        analysis_prompt = PromptTemplate(
            input_variables=["case_data"],
            template="""
            Analyze this medical case and provide results in JSON format:
            
            {case_data}
            
            Provide analysis in exactly this JSON structure:
            {{
                "diagnoses": [
                    {{"name": "diagnosis_name", "confidence": 0.9, "evidence": ["evidence1"]}}
                ],
                "differential_diagnoses": [
                    {{"name": "diagnosis_name", "likelihood": "high/medium/low", "reasoning": ["reason1"]}}
                ],
                "key_findings": ["finding1"],
                "risk_factors": ["risk1"],
                "safety_checks": [
                    {{"check_type": "check_name", "result": "pass", "recommendations": ["rec1"]}}
                ],
                "treatment_plan": ["step1"],
                "recommendations": ["recommendation1"],
                "recommended_actions": ["action1"],
                "vital_signs": [
                    {{"name": "blood_pressure", "value": "120/80", "unit": "mmHg"}},
                    {{"name": "heart_rate", "value": "72", "unit": "bpm"}},
                    {{"name": "temperature", "value": "37.0", "unit": "°C"}},
                    {{"name": "respiratory_rate", "value": "16", "unit": "breaths/min"}},
                    {{"name": "oxygen_saturation", "value": "98", "unit": "%"}}
                ],
                "medications": [
                    {{
                        "name": "med_name",
                        "dosage": "10",
                        "unit": "mg",
                        "frequency": "daily",
                        "route": "oral",
                        "duration": "ongoing"
                    }}
                ],
                "lab_results": [
                    {{
                        "name": "test_name",
                        "value": "value",
                        "unit": "unit",
                        "reference_range": "range",
                        "interpretation": "normal/abnormal"
                    }}
                ],
                "evidence": {{
                    "literature": ["lit1"],
                    "clinical_trials": ["trial1"],
                    "drug_information": ["drug1"]
                }}
            }}
            """
        )
        
        # Create the chain using new syntax
        chain = (
            {"case_data": RunnablePassthrough()} 
            | analysis_prompt 
            | self.llm
        )
        
        try:
            # Execute analysis
            initial_analysis = await chain.ainvoke(case_data)
            print(f"Initial analysis: {initial_analysis}")
            
            # Extract content from AIMessage
            content = initial_analysis.content if hasattr(initial_analysis, 'content') else str(initial_analysis)
            
            # Clean the response
            cleaned_response = content.replace('```json', '').replace('```', '').strip()
            
            # Parse JSON response
            try:
                parsed_analysis = json.loads(cleaned_response)
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {str(e)}")
                print(f"Raw response: {cleaned_response}")
                parsed_analysis = self._create_empty_analysis()
                
            # Gather supporting evidence
            evidence = await self._gather_evidence(parsed_analysis["diagnoses"])
            
            return {
                **parsed_analysis,
                "evidence": evidence,
                "treatment_plan": await self._generate_treatment_plan(parsed_analysis),
                "recommendations": await self._generate_recommendations(
                    case_data,
                    parsed_analysis,
                    evidence
                )
            }
            
        except Exception as e:
            print(f"Analysis error: {str(e)}")
            return self._create_empty_analysis()
    
    
    async def _gather_evidence(self, analysis: List[Dict[str, Any]]) -> Dict[str, List[str]]:
        """Gather supporting evidence using tools"""
        evidence = {
            "literature": [],
            "clinical_trials": [],
            "drug_information": []
        }
        
        for diagnosis in analysis:
            # Use Literature Search tool
            literature = await self.tools[0].func(diagnosis["name"])
            evidence["literature"].extend(literature)
            
            # Use Clinical Trials tool
            trials = await self.tools[2].func(diagnosis["name"])
            evidence["clinical_trials"].extend(trials)
            
            # Use Drug Information tool
            drug_info = await self.tools[1].func(diagnosis["name"])
            evidence["drug_information"].extend(drug_info)
        
        return evidence
    
    async def _generate_recommendations(
        self,
        case_data: Dict[str, Any],
        analysis: Dict[str, Any],
        evidence: Dict[str, List[str]]
    ) -> List[str]:
        """Generate evidence-based recommendations"""
        
        recommendation_prompt = PromptTemplate(
            input_variables=["case_data", "analysis", "evidence"],
            template="""
            Based on the case analysis and evidence, provide specific recommendations for:
            1. Immediate actions needed
            2. Further testing required
            3. Treatment considerations
            4. Monitoring parameters
            5. Safety precautions
            
            Case: {case_data}
            Analysis: {analysis}
            Evidence: {evidence}
            
            Provide clear, actionable recommendations.
            """
        )
        
        # TODO: Update to use RunnableSequence when stable
        # Current implementation uses deprecated LLMChain for stability
        recommendation_chain = LLMChain(
            llm=self.llm,
            prompt=recommendation_prompt
        )
        
        recommendations = await recommendation_chain.arun(
            case_data=case_data,
            analysis=analysis,
            evidence=evidence
        )
        
        return recommendations.split("\n")
    
    async def validate_safety(self, treatment_plan: Dict[str, Any]) -> Dict[str, Any]:
        """Validate treatment safety considerations"""
        safety_prompt = PromptTemplate(
            input_variables=["treatment_plan"],
            template="""
            Evaluate the safety of this treatment plan:
            {treatment_plan}
            
            Check for:
            1. Drug interactions
            2. Contraindications
            3. Required monitoring
            4. Risk factors
            
            Provide a detailed safety assessment.
            """
        )
        
        safety_chain = LLMChain(
            llm=self.llm,
            prompt=safety_prompt
        )
        
        return await safety_chain.arun(treatment_plan=treatment_plan)

    async def _generate_treatment_plan(self, analysis: Dict[str, Any]) -> List[str]:
        """
        Generate treatment plan based on analysis results using tools
        
        Args:
            analysis: Dictionary containing analysis results
            
        Returns:
            List[str]: List of treatment plan steps
        """
        treatment_plan = []
        
        # Use tools to gather information for treatment plan
        for diagnosis in analysis.get("diagnoses", []):
            # Search for drug information
            drug_info = await self.tools[1].func(diagnosis["name"])  # Drug Information tool
            
            # Search for clinical trials
            trials = await self.tools[2].func(diagnosis["name"])  # Clinical Trials tool
            
            # Get lab reference values if needed
            lab_refs = await self.tools[3].func(diagnosis["name"])  # Lab Reference tool
            
            # Create treatment steps based on gathered information
            treatment_prompt = PromptTemplate(
                input_variables=["diagnosis", "drug_info", "trials", "lab_refs"],
                template="""
                Create treatment plan steps for {diagnosis} considering:
                Drug Information: {drug_info}
                Clinical Trials: {trials}
                Lab References: {lab_refs}
                
                Provide specific, actionable treatment steps.
                """
            )
            
            treatment_chain = LLMChain(llm=self.llm, prompt=treatment_prompt)
            steps = await treatment_chain.arun(
                diagnosis=diagnosis["name"],
                drug_info=drug_info,
                trials=trials,
                lab_refs=lab_refs
            )
            
            treatment_plan.extend(steps.split("\n"))
        
        return treatment_plan

# Create singleton instance
medical_agent = MedicalAgent()