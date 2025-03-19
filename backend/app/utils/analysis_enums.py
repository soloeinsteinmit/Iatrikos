from enum import Enum

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

# Enums
# class SeverityLevel(str, Enum):
#     CRITICAL = "critical"
#     MODERATE = "moderate"
#     LOW = "low"

# class FindingCategory(str, Enum):
#     VITAL = "vital"
#     SYMPTOM = "symptom"
#     HISTORY = "history"

# class PriorityLevel(str, Enum):
#     HIGH = "high"
#     MEDIUM = "medium"
#     LOW = "low"

# class SeverityLevel(str, Enum):
#     HIGH = "high"
#     MODERATE = "moderate"
#     LOW = "low"

# class ActionPriority(str, Enum):
#     URGENT = "urgent"
#     HIGH = "high"
#     NORMAL = "normal"

# class ActionType(str, Enum):
#     TEST = "test"
#     PROCEDURE = "procedure"
#     MEDICATION = "medication"

# class ActionStatus(str, Enum):
#     PENDING = "pending"
#     SCHEDULED = "scheduled"
#     COMPLETED = "completed"

# class VitalStatus(str, Enum):
#     NORMAL = "normal"
#     ELEVATED = "elevated"
#     LOW = "low"

# class TrendDirection(str, Enum):
#     UP = "up"
#     DOWN = "down"
#     STABLE = "stable"