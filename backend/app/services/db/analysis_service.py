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