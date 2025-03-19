from beanie import Document
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from enum import Enum
# from backend.app.utils.analysis_enums import SeverityLevel, FindingCategory, PriorityLevel, ActionType, ActionPriority, ActionStatus, VitalStatus, TrendDirection

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
class DiagnosisAnalysis(Document):
    name: str
    confidence: float
    trend: str  # "increasing" | "decreasing" | "stable"
    supporting_evidence: List[str]
    rule_outs: List[str]
    last_updated: datetime
    references: Optional[List[str]]
    explanation: Optional[str]  # Keeping this from original as it might be useful
    case_id: str
    
    class Settings:
        name = "diagnosis_analyses"
        
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class KeyFinding(Document):
    description: str
    severity: SeverityLevel
    category: FindingCategory
    timestamp: datetime
    related_evidence: Optional[str]
    case_id: str
    
    class Settings:
        name = "key_findings"
        
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        use_enum_values = True


class SafetyCheck(Document):
    name: str
    completed: bool
    timestamp: datetime
    details: Optional[str]
    priority: PriorityLevel
    action_required: Optional[str]
    last_updated: datetime
    progress: float  # Stored as decimal between 0-100
    case_id: str
    
    class Settings:
        name = "safety_checks"
        
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        use_enum_values = True


class RiskFactor(Document):
    name: str
    score: float  # Stored as decimal between 0-100
    severity: SeverityLevel
    recommendations: List[str]
    case_id: str
    
    class Settings:
        name = "risk_factors"
        
    class Config:
        use_enum_values = True


class RecommendedAction(Document):
    """Clinical action recommendations"""
    id: str
    title: str
    type: ActionType
    priority: ActionPriority
    status: ActionStatus
    due_within: str
    rationale: str
    progress: float  # 0-100
    related_findings: Optional[List[str]]
    case_id: str

    class Settings:
        name = "recommended_actions"

class DifferentialDiagnosis(Document):
    """Differential diagnosis evaluation"""
    condition: str
    probability: float  # 0-100
    evidence: List[str]
    contradictions: List[str]
    literature: List[str]
    case_id: str

    class Settings:
        name = "differential_diagnoses"

class VitalTrend(BaseModel):
    """Vital sign measurement at a point in time"""
    time: str
    value: float

class VitalSign(Document):
    """Vital signs monitoring"""
    name: str
    current: float
    unit: str
    normal_range: str
    status: VitalStatus
    trend: List[VitalTrend]
    case_id: str

    class Settings:
        name = "vital_signs"

class Medication(Document):
    """Medication analysis"""
    name: str
    dosage: str
    frequency: str
    interactions: List[str]
    contraindications: List[str]
    adherence: float  # 0-100
    case_id: str

    class Settings:
        name = "medications"

class LabResult(Document):
    """Laboratory test results"""
    test: str
    value: float
    unit: str
    normal_range: str
    status: VitalStatus
    trend: TrendDirection
    timestamp: datetime
    case_id: str

    class Settings:
        name = "lab_results"
        
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        
class ClinicalAnalysis(Document):
    """Comprehensive clinical analysis document"""
    case_id: str
    progress: float
    time_remaining: str    
    
    # Existing fields
    diagnoses: List[DiagnosisAnalysis]
    key_findings: List[KeyFinding]
    safety_checks: List[SafetyCheck]
    risk_factors: List[RiskFactor]
    
    # New fields
    recommended_actions: List[RecommendedAction]
    differential_diagnoses: List[DifferentialDiagnosis]
    vital_signs: List[VitalSign]
    medications: List[Medication]
    lab_results: List[LabResult]
    recommendations: List[str]
    
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "clinical_analyses"
        
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }