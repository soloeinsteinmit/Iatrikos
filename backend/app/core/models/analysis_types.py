from typing import TypedDict, List, Dict, Optional

class DiagnosisResult(TypedDict):
    name: str
    confidence: float
    evidence: List[str]

class SafetyCheck(TypedDict):
    check_type: str
    result: str
    recommendations: List[str]

class AnalysisResult(TypedDict):
    diagnoses: List[DiagnosisResult]
    safety_checks: List[SafetyCheck]
    evidence: Dict[str, List[str]]
    treatment_plan: List[str]
    recommendations: List[str]
    key_findings: List[str]
    risk_factors: List[str]
    raw_response: Optional[str] 