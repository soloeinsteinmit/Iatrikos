from beanie import Document, Link
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class DiagnosisAnalysis(Document):
    name: str
    confidence: float
    explanation: str
    case_id: str

class KeyFinding(Document):
    description: str
    severity: str  # "critical" | "moderate" | "low"
    category: str  # "vital" | "symptom" | "history"
    timestamp: str
    related_evidence: Optional[str]

class SafetyCheck(Document):
    name: str
    completed: bool
    details: Optional[str]
    priority: str  # "high" | "medium" | "low"
    action_required: Optional[str]

class RiskFactor(Document):
    name: str
    score: float
    severity: str  # "low" | "moderate" | "high"
    recommendations: List[str]

class ClinicalAnalysis(Document):
    case_id: str
    progress: float
    time_remaining: str
    
    
    diagnoses: List[DiagnosisAnalysis]
    key_findings: List[KeyFinding]
    safety_checks: List[SafetyCheck]
    risk_factors: List[RiskFactor]
    recommendations: List[str]
    
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "clinical_analyses"