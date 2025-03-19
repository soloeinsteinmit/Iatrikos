I'll break down how Models, Schemas, Services, and Routers work together in this FastAPI application. Let's use the Patient flow as an example since it's complete and representative.

### 1. Models (Database Layer)

Models represent the database structure using Beanie ODM (Object Document Mapper) for MongoDB.

```1:47:backend/app/models/patient_model.py
from typing import List, Optional
from datetime import datetime
from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: Indexed(EmailStr, unique=True)
    date_of_birth: datetime
    gender: str
    phone_number: str
    address: Optional[str] = None
    medical_history: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    medications: Optional[List[str]] = []
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    insurance_provider: Optional[str] = None
    insurance_id: Optional[str] = None

class Patient(Document, PatientBase):
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "patients"

    class Config:
        schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "date_of_birth": "1970-01-01",
                "gender": "male",
                "phone_number": "555-1234",
                "address": "123 Main St, Anytown, USA",
                "medical_history": ["hypertension", "diabetes"],
                "allergies": ["pollen", "dust"],
                "medications": ["aspirin", "insulin"],
                "emergency_contact_name": "Jane Doe",
                "emergency_contact_phone": "555-5678",
                "insurance_provider": "ABC Insurance",
                "insurance_id": "123456789"
            }
        }
```

Key points about Models:

- Inherits from `Document` (Beanie's base class)
- Defines the actual database structure
- Contains database-specific settings (like collection name)
- Includes indexes and validation rules

### 2. Schemas (API Layer)

Schemas define how data should be sent to and received from the API.

```1:38:backend/app/schemas/patient_schema.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    date_of_birth: datetime
    gender: str
    phone_number: str
    address: Optional[str] = None
    medical_history: Optional[List[str]] = []
    allergies: Optional[List[str]] = []
    medications: Optional[List[str]] = []
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    insurance_provider: Optional[str] = None
    insurance_id: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    phone_number: Optional[str] = None

class PatientResponse(PatientBase):
    _id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

We have three main types of schemas:

1. **Create Schema** (Input validation for creating new records)
2. **Update Schema** (Input validation for updating existing records)
3. **Response Schema** (Output format for API responses)

### 3. Services (Business Logic Layer)

Services handle business logic and database operations. They use both Models and Schemas.

Here's the base service that provides common CRUD operations:

```1:35:backend/app/services/db/base_service.py
from typing import TypeVar, Generic, List
from beanie import Document
from pydantic import BaseModel

T = TypeVar('T', bound=Document)

class BaseDbService(Generic[T]):
    def __init__(self, model: T):
        self.model = model

    async def create(self, data: BaseModel) -> T:
        document = self.model(**data.model_dump())
        await document.save()
        return document

    async def get_by_id(self, id: str) -> T:
        return await self.model.get(id)

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        return await self.model.find_all().skip(skip).limit(limit).to_list()

    async def update(self, id: str, data: BaseModel) -> T:
        document = await self.get_by_id(id)
        if document:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(document, key, value)
            await document.save()
        return document

    async def delete(self, id: str) -> bool:
        document = await self.get_by_id(id)
        if document:
            await document.delete()
            return True
        return False
```

And the specific patient service that extends it:

```5:53:backend/app/services/db/patient_service.py
class PatientService:
    @staticmethod
    async def create_patient(patient_data: dict) -> Patient:
        patient = Patient(**patient_data)
        await patient.insert()
        return patient

    @staticmethod
    async def get_patient(patient_id: str) -> Optional[Patient]:
        return await Patient.get(patient_id)

    @staticmethod
    async def get_patients(skip: int = 0, limit: int = 10) -> List[Patient]:
        patients = await Patient.find_all().skip(skip).limit(limit).to_list()
        return patients

    @staticmethod
    async def update_patient(patient_id: str, patient_data: dict) -> Optional[Patient]:
        patient = await Patient.get(patient_id)
        if not patient:
            return None

        for key, value in patient_data.items():
            setattr(patient, key, value)

        patient.updated_at = datetime.utcnow()
        await patient.save()
        return patient

    @staticmethod
    async def delete_patient(patient_id: str) -> bool:
        patient = await Patient.get(patient_id)
        if not patient:
            return False
        await patient.delete()
        return True

    @staticmethod
    async def search_patients(query: str, skip: int = 0, limit: int = 10) -> List[Patient]:
        # Basic search implementation - you might want to enhance this
        filter_query = {
            "$or": [
                {"first_name": {"$regex": query, "$options": "i"}},
                {"last_name": {"$regex": query, "$options": "i"}},
                {"email": {"$regex": query, "$options": "i"}}
            ]
        }
        patients = await Patient.find(filter_query).skip(skip).limit(limit).to_list()
        return patients
```

### 4. Routers (API Endpoints)

Routers define the API endpoints and connect everything together:

```1:72:backend/app/api/v1/endpoints/patient.py
from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from backend.app.schemas.patient_schema import PatientCreate, PatientUpdate, PatientResponse
from app.services.db.patient_service import PatientService
from app.api.deps import get_current_user

router = APIRouter()
patient_service = PatientService()

@router.post("/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(patient_data: PatientCreate, current_user = Depends(get_current_user)):
    try:
        patient = await patient_service.create_patient(patient_data.dict())
        return patient
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: str, current_user = Depends(get_current_user)):
    patient = await patient_service.get_patient(patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.get("/", response_model=List[PatientResponse])
async def get_patients(
    skip: int = 0,
    limit: int = 10,
    current_user = Depends(get_current_user)
):
    patients = await patient_service.get_patients(skip, limit)
    return patients
@router.put("/{patient_id}", response_model=PatientResponse)
async def update_patient(
    patient_id: str,
    patient_data: PatientUpdate,
    current_user = Depends(get_current_user)
):
    patient = await patient_service.update_patient(patient_id, patient_data.dict(exclude_unset=True))
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return patient

@router.delete("/{patient_id}")
async def delete_patient(patient_id: str, current_user = Depends(get_current_user)):
    success = await patient_service.delete_patient(patient_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found"
        )
    return {"message": "Patient deleted successfully"}

@router.get("/search/{query}", response_model=List[PatientResponse])
async def search_patients(
    query: str,
    skip: int = 0,
    limit: int = 10,
    current_user = Depends(get_current_user)
):
    patients = await patient_service.search_patients(query, skip, limit)
    return patients
```

### How They Work Together

Let's follow a CREATE patient flow:

1. **API Request** → When a POST request hits `/patients/`:

```python
@router.post("/", response_model=PatientResponse)
async def create_patient(patient_data: PatientCreate):
```

2. **Schema Validation** → The request data is validated against `PatientCreate` schema:

```python
class PatientCreate(PatientBase):
    first_name: str
    last_name: str
    email: EmailStr
    # ... other required fields
```

3. **Service Layer** → The validated data is passed to the service:

```python
patient = await patient_service.create_patient(patient_data.dict())
```

4. **Model Layer** → The service creates a new Patient document:

```python
patient = Patient(**patient_data)
await patient.insert()
```

5. **Response** → The data is returned through the Response schema:

```python
class PatientResponse(PatientBase):
    id: str
    created_at: datetime
    updated_at: datetime
```

### Key Relationships:

1. **Models ↔ Database**

   - Models define the database structure
   - Handle database operations (save, update, delete)
   - Manage indexes and relationships

2. **Schemas ↔ API**

   - Validate incoming data
   - Format outgoing responses
   - Handle data transformation

3. **Services ↔ Business Logic**

   - Connect models and schemas
   - Implement business rules
   - Handle complex operations

4. **Routers ↔ HTTP Endpoints**
   - Define API routes
   - Handle HTTP methods
   - Manage dependencies and authentication

Would you like me to elaborate on any particular aspect of these relationships?

Let's explore other key parts of the backend. I'll focus on the remaining important components:

### 1. Authentication System

The authentication system consists of several components:

1. **Auth Router** (handles authentication endpoints):

```1:69:backend/app/api/v1/endpoints/auth.py
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services.auth_service import AuthService
from backend.app.schemas.auth_schema import (
    UserLogin, UserRegister, TokenResponse,
    PasswordReset, NewPassword, VerifyEmail,
    TwoFactorVerify
)

router = APIRouter()
auth_service = AuthService()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not verified"
        )

    access_token = auth_service.create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=access_token)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    try:
        user = await auth_service.register_user(user_data.dict())
        return {"message": "Registration successful. Please check your email for verification."}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
@router.post("/verify-email")
async def verify_email(data: VerifyEmail):
    if await auth_service.verify_email(data.code):
        return {"message": "Email verified successfully"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired verification code"
    )

@router.post("/forgot-password")
async def forgot_password(data: PasswordReset):
    if await auth_service.initiate_password_reset(data.email):
        return {"message": "Password reset instructions sent to your email"}
    return {"message": "If an account exists with this email, you will receive reset instructions"}

@router.post("/reset-password")
async def reset_password(data: NewPassword):
    if await auth_service.reset_password(data.token, data.new_password):
        return {"message": "Password reset successful"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired reset token"
    )

@router.post("/verify-2fa")
async def verify_2fa(data: TwoFactorVerify):
    # Implement 2FA verification logic
    pass
```

Key features:

- Login with email/password
- User registration
- Email verification
- Password reset
- Two-factor authentication support

2. **Auth Schemas** (defines authentication data structures):

```1:32:backend/app/schemas/auth_schema.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone_number: str
    specialty: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class PasswordReset(BaseModel):
    email: EmailStr

class NewPassword(BaseModel):
    token: str
    new_password: str

class VerifyEmail(BaseModel):
    code: str

class TwoFactorVerify(BaseModel):
    code: str
    token: str
```

### 2. Clinical Analysis System

This is a complex system for medical analysis:

1. **Analysis Model** (database structure):

```171:232:backend/app/models/analysis_model.py
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
```

The analysis system includes:

- Clinical analysis tracking
- Vital signs monitoring
- Lab results management
- Medication tracking
- Diagnosis management

2. **Analysis Service** (business logic):

```1:32:backend/app/services/db/analysis_service.py
from typing import Optional
from backend.app.models.analysis_model import ClinicalAnalysis
from backend.app.schemas.analysis_schema import ClinicalAnalysis as ClinicalAnalysisSchema

class AnalysisService:
    @staticmethod
    async def create_analysis(case_id: str, analysis_data: ClinicalAnalysisSchema) -> ClinicalAnalysis:
        analysis = ClinicalAnalysis(
            case_id=case_id,
            progress=analysis_data.progress,
            time_remaining=analysis_data.time_remaining,
            diagnoses=analysis_data.diagnoses,
            key_findings=analysis_data.key_findings,
            safety_checks=analysis_data.safety_checks,
            risk_factors=analysis_data.risk_factors,
            recommendations=analysis_data.recommendations
        )
        await analysis.insert()
        return analysis

    @staticmethod
    async def get_analysis_by_case_id(case_id: str) -> Optional[ClinicalAnalysis]:
        return await ClinicalAnalysis.find_one({"case_id": case_id})

    @staticmethod
    async def update_analysis_progress(analysis_id: str, progress: float, time_remaining: str) -> Optional[ClinicalAnalysis]:
        analysis = await ClinicalAnalysis.get(analysis_id)
        if analysis:
            analysis.progress = progress
            analysis.time_remaining = time_remaining
            await analysis.save()
        return analysis
```

### 3. Clinical Cases Management

1. **Case Model** (defines clinical case structure):

```1:43:backend/app/models/case_model.py
from beanie import Document, Indexed, Link
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from backend.app.models.analysis_model import ClinicalAnalysis

class VitalSigns(BaseModel):
    """Database model for storing vital signs measurements."""
    blood_pressure: str
    heart_rate: int
    temperature: float
    spo2: int
    weight: Optional[float] = None
    height: Optional[float] = None
    bmi: Optional[float] = None
    respiratory_rate: Optional[int] = None

class ClinicalCase(Document):
    """
    MongoDB document model for clinical cases.
    Stores comprehensive medical consultation data including patient information,
    symptoms, vital signs, and AI-generated analysis.
    """
    patient_id: Indexed(str)  # Reference to Patient
    chief_complaint: str
    symptoms: List[str]
    symptoms_description: str
    vital_signs: VitalSigns
    current_medications: str
    allergies: str
    physical_examination: Optional[str] = None
    lab_results: Optional[str] = None
    family_history: Optional[str] = None
    social_history: Optional[str] = None

    analysis: List[ClinicalAnalysis]

    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Settings:
        name = "clinical_cases"
```

2. **Case Service** (handles case operations):

```5:50:backend/app/services/db/case_service.py
class CaseService(BaseDbService[ClinicalCase]):
    """
    Service class for handling clinical case operations in the database.
    Provides methods for CRUD operations and specialized queries.
    """

    def __init__(self):
        """Initialize the service with the ClinicalCase model."""
        super().__init__(ClinicalCase)

    async def get_cases_by_patient(self, patient_id: str) -> List[ClinicalCase]:
        """
        Retrieve all clinical cases for a specific patient.

        Args:
            patient_id (str): The unique identifier of the patient

        Returns:
            List[ClinicalCase]: List of clinical cases associated with the patient
        """
        return await ClinicalCase.find(
            {"patient_id": patient_id}
        ).to_list()

    async def get_case_with_patient(self, case_id: str) -> Optional[dict]:
        """
        Retrieve a clinical case with associated patient information.

        Args:
            case_id (str): The unique identifier of the clinical case

        Returns:
            Optional[dict]: Case data with embedded patient information, or None if not found
        """
        pipeline = [
            {"$match": {"_id": case_id}},
            {"$lookup": {
                "from": "patients",
                "localField": "patient_id",
                "foreignField": "_id",
                "as": "patient"
            }},
            {"$unwind": "$patient"}
        ]
        results = await ClinicalCase.aggregate(pipeline).to_list()
        return results[0] if results else None
```

### 4. Database Management

The database setup and connection management is handled by helper functions:

```1:59:backend/app/utils/helpers.py
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import Optional
from backend.app.core.config import get_settings
from backend.app.models.patient_model import Patient
from backend.app.models.case_model import ClinicalCase
from backend.app.models.audit_model import AuditLog
from backend.app.models.analysis_model import ClinicalAnalysis
import asyncio

class Database:
    client: Optional[AsyncIOMotorClient] = None

    def get_db(self):
        settings = get_settings()
        return self.client[settings.MONGODB_DB_NAME]

db = Database()

async def connect_to_mongodb():
    settings = get_settings()
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)

async def close_mongodb_connection():
    if db.client:
        db.client.close()

async def init_mongodb():
    """Initialize MongoDB connection and setup ODM models"""
    settings = get_settings()

    try:
        # Create Motor client with explicit connection string and options
        client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
            maxPoolSize=10,
            retryWrites=True,
            w="majority"
        )

        # Initialize Beanie with all document models
        await init_beanie(
            database=client[settings.MONGODB_DB_NAME],
            document_models=[
                Patient,
                ClinicalCase,
                AuditLog,
                ClinicalAnalysis
            ]
        )
        print("🛜🛜🛜 Successfully connected to MongoDB Atlas 🛜🛜🛜")
    except Exception as e:
        print(f"⚠️⚠️⚠️ Failed to connect to MongoDB: {str(e)}")
        # Add a small delay before retrying
        await asyncio.sleep(1)
        raise
```

Key features:

- MongoDB connection management
- ODM model initialization
- Connection pooling
- Error handling and retry logic

### 5. Base Service Pattern

The application uses a generic base service pattern for common CRUD operations:

```1:35:backend/app/services/db/base_service.py
from typing import TypeVar, Generic, List
from beanie import Document
from pydantic import BaseModel

T = TypeVar('T', bound=Document)

class BaseDbService(Generic[T]):
    def __init__(self, model: T):
        self.model = model

    async def create(self, data: BaseModel) -> T:
        document = self.model(**data.model_dump())
        await document.save()
        return document

    async def get_by_id(self, id: str) -> T:
        return await self.model.get(id)

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        return await self.model.find_all().skip(skip).limit(limit).to_list()

    async def update(self, id: str, data: BaseModel) -> T:
        document = await self.get_by_id(id)
        if document:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(document, key, value)
            await document.save()
        return document

    async def delete(self, id: str) -> bool:
        document = await self.get_by_id(id)
        if document:
            await document.delete()
            return True
        return False
```

This provides:

- Generic CRUD operations
- Type-safe database operations
- Reusable database patterns

### 6. API Structure

The API is organized using FastAPI's router system:

```1:10:backend/app/api/v1/routes.py
from fastapi import APIRouter
from app.api.v1.endpoints import patient, clinical_cases, auth, analysis

api_router = APIRouter()

# Include different endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(patient.router, prefix="/patients", tags=["patients"])
api_router.include_router(clinical_cases.router, prefix="/cases", tags=["cases"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
```

The main endpoints are:

- `/auth` - Authentication endpoints
- `/patients` - Patient management
- `/cases` - Clinical cases
- `/analysis` - Medical analysis

Would you like me to dive deeper into any of these components or explore other parts of the backend?

=========================================================================================================================
Let me explain the communication flow between these files with specific code references:

### 1. Entry Point: Case Analysis Request

When a case analysis is requested, it starts in `AutoGenMedicalSystem`:

```123:151:backend/app/core/agents/autogen_medical_system.py
    async def analyze_case(self, case_data: Dict[str, Any]) -> ClinicalAnalysis:
        """Perform comprehensive case analysis using multiple agents"""

        # Format case data for agents
        case_prompt = self._format_case_prompt(case_data)

        # Initialize analysis
        analysis_results = {
            "diagnoses": [],
            "safety_checks": [],
            "evidence": [],
            "treatment_plan": [],
            "recommendations": []
        }

        # Start group chat for analysis
        chat_result = await self.manager.arun(
            message=case_prompt,
            sender=self.agents["api_proxy"]
        )

        # Extract structured results from chat
        analysis_results = self._parse_chat_results(chat_result)

        # Validate results with safety expert
        safety_validation = await self._validate_safety(analysis_results)

        # Compile final analysis
        return await self._compile_analysis(case_data, analysis_results, safety_validation)
```

This method:

1. Formats the case data into a prompt
2. Initializes the analysis structure
3. Starts a group chat with multiple agents
4. Validates and compiles results

### 2. Agent Creation and Configuration

The system creates specialized agents in `AutoGenMedicalSystem`:

```52:84:backend/app/core/agents/autogen_medical_system.py
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
```

These agents communicate through a group chat:

```116:121:backend/app/core/agents/autogen_medical_system.py
    def _create_group_chat(self) -> autogen.GroupChat:
        return autogen.GroupChat(
            agents=list(self.agents.values()),
            messages=[],
            max_round=10
        )
```

### 3. Analysis Flow

1. **Case Formatting**:

```153:171:backend/app/core/agents/autogen_medical_system.py
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
```

2. **Individual Agent Analysis** (in `MedicalAgent`):

```59:101:backend/app/core/agents/medical_agent.py
    async def analyze_case(self, case_data: Dict[str, Any]) -> Dict[str, Any]:
        """Perform comprehensive case analysis"""

        # Create analysis chain
        analysis_prompt = PromptTemplate(
            input_variables=["case_data"],
            template="""
            Analyze this medical case with attention to:
            1. Primary diagnosis considerations
            2. Key clinical findings
            3. Risk factors
            4. Required safety checks

            Case Information:
            {case_data}

            Provide a structured analysis with clear reasoning.
            """
        )

        analysis_chain = LLMChain(
            llm=self.llm,
            prompt=analysis_prompt
        )

        # Execute initial analysis
        initial_analysis = await analysis_chain.arun(case_data=case_data)

        # Gather supporting evidence
        evidence = await self._gather_evidence(initial_analysis)

        # Generate final recommendations
        recommendations = await self._generate_recommendations(
            case_data,
            initial_analysis,
            evidence
        )

        return {
            "analysis": initial_analysis,
            "evidence": evidence,
            "recommendations": recommendations
        }
```

3. **Evidence Gathering** happens in two places:

a. In `MedicalAgent`:

```103:117:backend/app/core/agents/medical_agent.py
    async def _gather_evidence(self, analysis: str) -> Dict[str, List]:
        """Gather supporting evidence from multiple sources"""
        tasks = [
            self.knowledge_service.search_pubmed(analysis),
            self.knowledge_service.search_clinical_trials(analysis),
            self.knowledge_service.search_drug_info(analysis)
        ]

        results = await asyncio.gather(*tasks)

        return {
            "literature": results[0],
            "clinical_trials": results[1],
            "drug_information": results[2]
        }
```

b. In `Orchestrator`:

```77:94:backend/app/core/agents/orchestrator.py
    async def _gather_evidence(self, case_data: Dict, diagnoses: List) -> Dict:
    async def _gather_evidence(self, case_data: Dict, diagnoses: List) -> Dict:
        evidence = {
            "literature": [],
            "drug_info": [],
            "clinical_trials": [],
            "lab_references": []
        }

        # Gather supporting evidence from various sources
        for diagnosis in diagnoses:
            evidence["literature"].extend(
                await self.medical_knowledge.search_pubmed(diagnosis["name"])
            )
            evidence["clinical_trials"].extend(
                await self.medical_knowledge.search_clinical_trials(diagnosis["name"])
            )
        return evidence
```

### 4. Communication Points

1. **AutoGenMedicalSystem → Agents**:

- Creates group chat for agent communication
- Sends initial case prompt
- Receives combined analysis

2. **MedicalAgent → MedicalKnowledgeService**:

```105:109:backend/app/core/agents/medical_agent.py
        tasks = [
            self.knowledge_service.search_pubmed(analysis),
            self.knowledge_service.search_clinical_trials(analysis),
            self.knowledge_service.search_drug_info(analysis)
        ]
```

3. **Orchestrator → MedicalKnowledgeService**:

```87:93:backend/app/core/agents/orchestrator.py
        for diagnosis in diagnoses:
            evidence["literature"].extend(
                await self.medical_knowledge.search_pubmed(diagnosis["name"])
            )
            evidence["clinical_trials"].extend(
                await self.medical_knowledge.search_clinical_trials(diagnosis["name"])
            )
```

### 5. Results Compilation

1. **AutoGenMedicalSystem**:

```188:204:backend/app/core/agents/autogen_medical_system.py
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
```

2. **Orchestrator**:

```97:113:backend/app/core/agents/orchestrator.py
    async def _compile_analysis(
        self,
        case_data: Dict,
        diagnoses: List,
        safety_checks: List,
        evidence: Dict
    ) -> ClinicalAnalysis:
        # Create comprehensive clinical analysis
        return ClinicalAnalysis(
            case_id=case_data["case_id"],
            progress=100.0,
            time_remaining="0",
            diagnoses=diagnoses,
            key_findings=self._extract_key_findings(case_data),
            safety_checks=safety_checks,
            risk_factors=self._assess_risk_factors(case_data),

```

### Key Issue to Fix

There's a TODO in the Orchestrator that needs attention:

```26:26:backend/app/core/agents/orchestrator.py
        # TODO: error here p333rrrrr Add a tool to call the medical agent to get the diagnoses
```

This should be fixed by adding a call to the MedicalAgent for diagnoses. Here's how to fix it:

```python
# In orchestrator.py
class MedicalAgentOrchestrator:
    def __init__(self):
        self.medical_agent = MedicalAgent()
        # ... rest of init ...

    async def analyze_case(self, case_data: Dict) -> ClinicalAnalysis:
        # Step 1: Initial case analysis using MedicalAgent
        agent_analysis = await self.medical_agent.analyze_case(case_data)
        diagnoses = agent_analysis["analysis"].get("diagnoses", [])

        # Continue with existing flow...
        safety_prompt = self._create_safety_prompt(case_data, diagnoses)
```

This creates a proper connection between the Orchestrator and MedicalAgent for diagnosis generation.

Would you like me to explain any specific communication flow in more detail?

===========================
graph TD
A[API Endpoint] --> B[AutoGenMedicalSystem]
B --> C[MedicalAgent]
B --> D[MedicalAgentOrchestrator]
B --> E[Group Chat Agents]
C --> F[Individual Analysis]
D --> G[Evidence Gathering]
E --> H[Collaborative Analysis]
F --> I[Final Compilation]
G --> I
H --> I
