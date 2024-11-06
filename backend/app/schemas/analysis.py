from typing import List, Optional
from pydantic import BaseModel

class DiagnosisAnalysis(BaseModel):
    """Model for AI-generated diagnosis analysis"""
    name: str
    confidence: float
    trend: str  # "increasing" | "decreasing" | "stable"
    supporting_evidence: List[str]
    rule_outs: List[str]
    references: Optional[List[str]]

class KeyFinding(BaseModel):
    """Model for important clinical findings"""
    description: str
    severity: str  # "critical" | "moderate" | "low"
    category: str  # "vital" | "symptom" | "history"
    timestamp: str
    related_evidence: Optional[str]

class SafetyCheck(BaseModel):
    """Model for medication and treatment safety checks"""
    name: str
    completed: bool
    details: Optional[str]
    priority: str  # "high" | "medium" | "low"
    action_required: Optional[str]

class RiskFactor(BaseModel):
    """Model for patient risk assessment"""
    name: str
    score: float
    severity: str  # "low" | "moderate" | "high"
    recommendations: List[str]

class ClinicalAnalysis(BaseModel):
    """Comprehensive clinical analysis response from AI"""
    progress: float
    time_remaining: str
    diagnoses: List[DiagnosisAnalysis]
    key_findings: List[KeyFinding]
    safety_checks: List[SafetyCheck]
    risk_factors: List[RiskFactor]
    recommendations: List[str] 