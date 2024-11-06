from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from enum import Enum
# from app.utils.analysis_enums import ActionPriority, SeverityLevel, FindingCategory, PriorityLevel, ActionType, ActionPriority, ActionStatus, VitalStatus, TrendDirection
class SeverityLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class FindingCategory(str, Enum):
    CLINICAL = "clinical"
    LABORATORY = "laboratory"
    IMAGING = "imaging"
    VITAL = "vital"

class PriorityLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class ActionType(str, Enum):
    MEDICATION = "medication"
    PROCEDURE = "procedure"
    TEST = "test"
    CONSULTATION = "consultation"

class ActionPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    STAT = "stat"

class ActionStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class VitalStatus(str, Enum):
    NORMAL = "normal"
    ABNORMAL = "abnormal"
    CRITICAL = "critical"

class TrendDirection(str, Enum):
    INCREASING = "increasing"
    DECREASING = "decreasing"
    STABLE = "stable"
# Base Schemas
class DiagnosisAnalysisSchema(BaseModel):
    """Schema for diagnosis analysis"""
    name: str
    confidence: float
    trend: str  # "increasing" | "decreasing" | "stable"
    supporting_evidence: List[str]
    rule_outs: List[str]
    last_updated: datetime
    references: Optional[List[str]]
    explanation: Optional[str]

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class KeyFindingSchema(BaseModel):
    """Schema for key clinical findings"""
    description: str
    severity: SeverityLevel
    category: FindingCategory
    timestamp: datetime
    related_evidence: Optional[str]

    class Config:
        use_enum_values = True

class SafetyCheckSchema(BaseModel):
    """Schema for safety checks"""
    name: str
    completed: bool
    timestamp: datetime
    details: Optional[str]
    priority: PriorityLevel
    action_required: Optional[str]
    last_updated: datetime
    progress: float  # 0-100

    class Config:
        use_enum_values = True

class RiskFactorSchema(BaseModel):
    """Schema for risk factors"""
    name: str
    score: float  # 0-100
    severity: SeverityLevel
    recommendations: List[str]

    class Config:
        use_enum_values = True

class VitalTrendSchema(BaseModel):
    """Schema for vital sign trends"""
    time: str
    value: float

class VitalSignSchema(BaseModel):
    """Schema for vital signs"""
    name: str
    current: float
    unit: str
    normal_range: str
    status: VitalStatus
    trend: List[VitalTrendSchema]

    class Config:
        use_enum_values = True

class MedicationSchema(BaseModel):
    """Schema for medications"""
    name: str
    dosage: str
    frequency: str
    interactions: List[str]
    contraindications: List[str]
    adherence: float  # 0-100

class RecommendedActionSchema(BaseModel):
    """Schema for recommended actions"""
    id: str
    title: str
    type: ActionType
    priority: ActionPriority
    status: ActionStatus
    due_within: str
    rationale: str
    progress: float  # 0-100
    related_findings: Optional[List[str]]

    class Config:
        use_enum_values = True

class DifferentialDiagnosisSchema(BaseModel):
    """Schema for differential diagnoses"""
    condition: str
    probability: float  # 0-100
    evidence: List[str]
    contradictions: List[str]
    literature: List[str]

class LabResultSchema(BaseModel):
    """Schema for laboratory results"""
    test: str
    value: float
    unit: str
    normal_range: str
    status: VitalStatus
    trend: TrendDirection
    timestamp: datetime

    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Request/Response Schemas
class ClinicalAnalysisResponseSchema(BaseModel):
    """Response schema for clinical analysis"""
    progress: float
    time_remaining: str
    diagnoses: List[DiagnosisAnalysisSchema]
    key_findings: List[KeyFindingSchema]
    safety_checks: List[SafetyCheckSchema]
    risk_factors: List[RiskFactorSchema]
    recommended_actions: List[RecommendedActionSchema]
    differential_diagnoses: List[DifferentialDiagnosisSchema]
    vital_signs: List[VitalSignSchema]
    medications: List[MedicationSchema]
    lab_results: List[LabResultSchema]
    recommendations: List[str]

# Optional: Create specific request schemas if needed
class ClinicalAnalysisRequestSchema(BaseModel):
    """Request schema for clinical analysis"""
    case_id: str 