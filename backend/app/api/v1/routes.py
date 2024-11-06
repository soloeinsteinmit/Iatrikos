from fastapi import APIRouter
from app.api.v1.endpoints import patient, clinical_cases, auth, analysis

api_router = APIRouter()

# Include different endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(patient.router, prefix="/patients", tags=["patients"])
api_router.include_router(clinical_cases.router, prefix="/cases", tags=["cases"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])

