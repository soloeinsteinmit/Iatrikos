from typing import Dict, List
import google.generativeai as genai
from app.core.config import get_settings
from app.services.ml.medical_knowledge import MedicalKnowledgeService
from app.models.analysis_model import (
    ClinicalAnalysis, DiagnosisAnalysis, KeyFinding,
    SafetyCheck, RiskFactor
)
from app.core.models.analysis_types import AnalysisResult, DiagnosisResult
from app.core.agents.medical_agent import MedicalAgent
import json

class MedicalAgentOrchestrator: 
    def __init__(self):
        settings = get_settings()
        genai.configure(api_key=settings.GEMINI_API_KEY)
        
        # Initialize Gemini model
        self.model = genai.GenerativeModel('gemini-1.5-pro-002')
        self.medical_knowledge = MedicalKnowledgeService()
        self.medical_agent = MedicalAgent()
        
    async def analyze_case(self, case_data: Dict) -> AnalysisResult:
        """
        Orchestrate the analysis process using multiple components
        
        Args:
            case_data: Dictionary containing patient case information
            
        Returns:
            AnalysisResult: Structured analysis results
        """
        # Get initial analysis from MedicalAgent
        agent_analysis = await self.medical_agent.analyze_case(case_data)
        
        # Enhance with additional safety checks
        safety_validation = await self._validate_safety(
            case_data, 
            agent_analysis["diagnoses"]
        )
        
        # Gather additional evidence
        enhanced_evidence = await self._gather_additional_evidence(
            case_data,
            agent_analysis["diagnoses"]
        )
        
        return {
            **agent_analysis,
            "safety_checks": [*agent_analysis["safety_checks"], *safety_validation],
            "evidence": {**agent_analysis["evidence"], **enhanced_evidence}
        }

    async def _validate_safety(self, case_data: Dict, diagnoses: List[DiagnosisResult]) -> List[SafetyCheck]:
        """Perform additional safety validations"""
        safety_prompt = f"""
        Validate safety considerations for:
        Patient Allergies: {case_data.get('allergies', [])}
        Current Medications: {case_data.get('current_medications', [])}
        Proposed Diagnoses: {json.dumps(diagnoses)}
        
        Provide results in JSON format with exactly this structure:
        {{
            "safety_checks": [
                {{
                    "check_type": "drug_interaction",
                    "result": "pass/fail",
                    "recommendations": ["recommendation1", "recommendation2"]
                }}
            ]
        }}
        """
        
        response = await self.model.generate_content_async(safety_prompt)
        try:
            result = json.loads(response.text)
            return result.get("safety_checks", [])
        except json.JSONDecodeError:
            return []

    async def _gather_additional_evidence(self, case_data: Dict, diagnoses: List[DiagnosisResult]) -> Dict:
        """Gather additional evidence beyond what MedicalAgent provided"""
        evidence = {
            "literature": [],
            "clinical_trials": [],
            "lab_references": []
        }
        
        # Focus on gathering evidence for specific aspects
        for diagnosis in diagnoses:
            # Get lab reference ranges
            lab_refs = await self.medical_knowledge.get_lab_reference(diagnosis["name"])
            evidence["lab_references"].extend(lab_refs)
            
            # Get additional clinical trials
            trials = await self.medical_knowledge.search_clinical_trials(
                f"{diagnosis['name']} {case_data.get('chief_complaint', '')}"
            )
            evidence["clinical_trials"].extend(trials)
        
        return evidence