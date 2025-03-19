from typing import Dict, List, Any
import autogen
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import get_settings
from app.services.ml.medical_knowledge import MedicalKnowledgeService
from app.models.analysis_model import ClinicalAnalysis
import json
from app.core.agents.medical_agent import MedicalAgent
from app.core.agents.orchestrator import MedicalAgentOrchestrator
from app.core.models.analysis_types import AnalysisResult
import asyncio

settings = get_settings()

class AutoGenMedicalSystem:
    def __init__(self):
        # Initialize Gemini
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Configure for AutoGen
        self.config_list = [{
            "model": "gemini-1.5-pro-002",
            "api_key": settings.GEMINI_API_KEY,
            # "api_type": "google",
            # "api_base": settings.GOOGLE_API_BASE,
            "temperature": 0.3,
            "top_p": 0.95,
        }]

        # Initialize LangChain LLM for direct Gemini calls
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro-002",
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.3,
            convert_system_message_to_human=True
        )
        
        # Initialize knowledge service
        self.knowledge_service = MedicalKnowledgeService()
        
        # Create specialized agents
        self.agents = self._create_agents()
        self.group_chat = self._create_group_chat()
        
        # Configure manager with Gemini settings
        self.manager = autogen.GroupChatManager(
            groupchat=self.group_chat,
            llm_config={
                "config_list": self.config_list,
                "temperature": 0.3,
                "timeout": 600
            }
        )
        
        # Initialize medical agents and orchestrator
        self.medical_agent = MedicalAgent()
        self.orchestrator = MedicalAgentOrchestrator()

    def _create_agents(self) -> Dict[str, autogen.AssistantAgent]:
        # Primary Diagnostic Agent
        diagnostician = autogen.AssistantAgent(
            name="Diagnostician",
            llm_config={"config_list": self.config_list},
            system_message="""You are an expert diagnostician. Your responsibilities:
            1. Analyze patient symptoms and clinical findings
            2. Generate differential diagnoses with confidence levels
            3. Recommend diagnostic tests
            4. Identify red flags and urgent conditions"""
        )

        # Clinical Safety Agent
        safety_expert = autogen.AssistantAgent(
            name="SafetyExpert",
            llm_config={"config_list": self.config_list},
            system_message="""You are a clinical safety expert. Your responsibilities:
            1. Review medication interactions
            2. Identify contraindications
            3. Assess patient risk factors
            4. Recommend safety monitoring protocols"""
        )

        # Evidence Researcher
        researcher = autogen.AssistantAgent(
            name="Researcher",
            llm_config={"config_list": self.config_list},
            system_message="""You are a medical researcher. Your responsibilities:
            1. Search medical literature for evidence
            2. Find relevant clinical trials
            3. Validate treatment approaches
            4. Provide evidence-based recommendations"""
        )

        # Treatment Planner
        treatment_planner = autogen.AssistantAgent(
            name="TreatmentPlanner",
            llm_config={"config_list": self.config_list},
            system_message="""You are a treatment planning expert. Your responsibilities:
            1. Develop comprehensive treatment plans
            2. Consider patient-specific factors
            3. Coordinate with other specialists
            4. Create monitoring plans"""
        )

        # User Proxy for API Interactions
        user_proxy = autogen.UserProxyAgent(
            name="ApiProxy",
            human_input_mode="NEVER",
            code_execution_config={
                "work_dir": "medical_analysis",
                "use_docker": False
            },
            system_message="Execute API calls and coordinate information gathering."
        )

        return {
            "diagnostician": diagnostician,
            "safety_expert": safety_expert,
            "researcher": researcher,
            "treatment_planner": treatment_planner,
            "api_proxy": user_proxy
        }

    def _create_group_chat(self) -> autogen.GroupChat:
        return autogen.GroupChat(
            agents=list(self.agents.values()),
            messages=[],
            max_round=10
        )

    # 1. Entry Point: Case Analysis Request
    # When a case analysis is requested, it starts in AutoGenMedicalSystem:

    async def analyze_case(self, case_data: Dict[str, Any]) -> ClinicalAnalysis:
        try:
            # Step 1: Get initial analysis from MedicalAgent
            agent_analysis = await self.medical_agent.analyze_case(case_data)
            
            # Step 2: Get orchestrated analysis with additional evidence
            orchestrated_analysis = await self.orchestrator.analyze_case(case_data)
            
            # Step 3: Run group chat analysis with retry logic
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    case_prompt = self._format_case_prompt(case_data)
                    chat_result = await self.manager.arun(
                        message=case_prompt,
                        sender=self.agents["api_proxy"]
                    )
                    chat_analysis = await self._parse_chat_results(chat_result)
                    break
                except Exception as e:
                    if "429" in str(e) and attempt < max_retries - 1:
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                        continue
                    chat_analysis = self.medical_agent._create_empty_analysis()
                    break
            
            # Step 4: Combine and validate results
            combined_analysis = self._merge_analyses(
                agent_analysis,
                orchestrated_analysis,
                chat_analysis
            )
            
            # Step 5: Final safety validation
            safety_validation = await self._validate_safety(combined_analysis)
            
            return await self._compile_analysis(
                case_data,
                combined_analysis,
                safety_validation
            )
        except Exception as e:
            print(f"Error in analysis: {str(e)}")
            return ClinicalAnalysis(
                case_id=case_data.get("case_id", "unknown"),
                progress=0.0,
                time_remaining="failed",
                diagnoses=[],
                safety_checks=[],
                key_findings=[],
                risk_factors=[],
                recommendations=[]
            )

    def _format_case_prompt(self, case_data: Dict) -> str:
        return f"""
        Analyze this medical case collaboratively:

        Patient Information:
        - Chief Complaint: {case_data['chief_complaint']}
        - Symptoms: {', '.join(case_data['symptoms'])}
        - Vital Signs: {json.dumps(case_data['vital_signs'])}
        - Current Medications: {case_data['current_medications']}
        - Allergies: {case_data['allergies']}
        
        Required Analysis:
        1. Diagnostician: Provide differential diagnoses
        2. SafetyExpert: Review safety considerations
        3. Researcher: Find supporting evidence
        4. TreatmentPlanner: Develop treatment recommendations

        Each agent should focus on their expertise and collaborate to reach consensus.
        """

    async def _validate_safety(self, analysis_results: Dict) -> Dict:
        """Additional safety validation step"""
        safety_prompt = f"""
        Perform final safety review of analysis results:
        {json.dumps(analysis_results, indent=2)}
        
        Verify:
        1. All safety checks completed
        2. No contradictions in recommendations
        3. All risk factors addressed
        4. Monitoring protocols adequate
        """
        
        return await self.agents["safety_expert"].arun(safety_prompt)

    async def _compile_analysis(
        self, 
        case_data: Dict, 
        analysis_results: Dict,
        safety_validation: Dict
    ) -> ClinicalAnalysis:
        """Compile final analysis results"""
        return ClinicalAnalysis(
            case_id=case_data["case_id"],
            progress=100.0,
            time_remaining="0",
            diagnoses=analysis_results["diagnoses"],
            safety_checks=safety_validation["safety_checks"],
            key_findings=analysis_results["key_findings"],
            risk_factors=analysis_results["risk_factors"],
            recommendations=analysis_results["recommendations"]
        ) 

    async def _parse_chat_results(self, chat_result: str) -> Dict:
        """Parse the chat results into structured data"""
        try:
            # Use Gemini to structure the chat results
            parse_prompt = f"""
            Parse the following medical discussion into structured data:
            {chat_result}
            
            Extract and format as JSON with the following structure:
            {{
                "diagnoses": [
                    {{"name": "diagnosis_name", "confidence": 0.9, "evidence": ["evidence1", "evidence2"]}}
                ],
                "safety_checks": [
                    {{"check_type": "check_name", "result": "pass/fail", "recommendations": ["rec1", "rec2"]}}
                ],
                "evidence": {{
                    "literature": ["lit1", "lit2"],
                    "clinical_trials": ["trial1", "trial2"],
                    "lab_references": ["ref1", "ref2"]
                }},
                "treatment_plan": ["step1", "step2"],
                "recommendations": ["rec1", "rec2"],
                "key_findings": ["finding1", "finding2"],
                "risk_factors": ["risk1", "risk2"]
            }}
            """
            
            response = await self.llm.agenerate([parse_prompt])
            parsed_text = response.generations[0][0].text
            
            try:
                return json.loads(parsed_text)
            except json.JSONDecodeError:
                return {
                    "diagnoses": [],
                    "safety_checks": [],
                    "evidence": {
                        "literature": [],
                        "clinical_trials": [],
                        "lab_references": []
                    },
                    "treatment_plan": [],
                    "recommendations": [],
                    "key_findings": [],
                    "risk_factors": [],
                    "raw_response": parsed_text
                }
                
        except Exception as e:
            print(f"Error parsing chat results: {str(e)}")
            return {} 
        
    

    def _merge_analyses(
        self,
        agent_analysis: AnalysisResult,
        orchestrated_analysis: AnalysisResult,
        chat_analysis: AnalysisResult
    ) -> AnalysisResult:
        """
        Merge multiple analysis results, removing duplicates and combining evidence
        
        Args:
            agent_analysis: Analysis from MedicalAgent
            orchestrated_analysis: Analysis from Orchestrator
            chat_analysis: Analysis from group chat
            
        Returns:
            AnalysisResult: Combined analysis results
        """
        return {
            "diagnoses": self._merge_diagnoses([
                *agent_analysis["diagnoses"],
                *orchestrated_analysis["diagnoses"],
                *chat_analysis["diagnoses"]
            ]),
            "safety_checks": [
                *agent_analysis["safety_checks"],
                *orchestrated_analysis["safety_checks"],
                *chat_analysis["safety_checks"]
            ],
            "evidence": {
                **agent_analysis["evidence"],
                **orchestrated_analysis["evidence"],
                **chat_analysis["evidence"]
            },
            "treatment_plan": list(set([
                *agent_analysis["treatment_plan"],
                *orchestrated_analysis["treatment_plan"],
                *chat_analysis["treatment_plan"]
            ])),
            "recommendations": list(set([
                *agent_analysis["recommendations"],
                *orchestrated_analysis["recommendations"],
                *chat_analysis["recommendations"]
            ])),
            "key_findings": list(set([
                *agent_analysis["key_findings"],
                *orchestrated_analysis["key_findings"],
                *chat_analysis["key_findings"]
            ])),
            "risk_factors": list(set([
                *agent_analysis["risk_factors"],
                *orchestrated_analysis["risk_factors"],
                *chat_analysis["risk_factors"]
            ]))
        }

    def _merge_diagnoses(self, *diagnosis_lists: List[Dict]) -> List[Dict]:
        """Merge diagnoses from multiple sources, combining evidence and confidence scores"""
        merged = {}
        
        for diagnoses in diagnosis_lists:
            for diagnosis in diagnoses:
                name = diagnosis["name"]
                if name not in merged:
                    merged[name] = {
                        "name": name,
                        "confidence": diagnosis["confidence"],
                        "evidence": set(diagnosis["evidence"])
                    }
                else:
                    merged[name]["confidence"] = max(
                        merged[name]["confidence"],
                        diagnosis["confidence"]
                    )
                    merged[name]["evidence"].update(diagnosis["evidence"])
        
        return [
            {
                "name": d["name"],
                "confidence": d["confidence"],
                "evidence": list(d["evidence"])
            }
            for d in merged.values()
        ]