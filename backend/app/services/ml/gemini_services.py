import google.generativeai as genai
from app.core.config import get_settings

class GeminiService:
    def __init__(self):
        settings = get_settings()
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def generate_response(self, prompt: str) -> str:
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            # Log the error appropriately
            raise Exception(f"Error generating response: {str(e)}")
    
    async def analyze_medical_case(self, patient_data: dict) -> dict:
        """
        Analyze a medical case using Gemini
        """
        # Format the prompt with patient data
        prompt = self._format_medical_prompt(patient_data)
        response = await self.generate_response(prompt)
        return self._parse_medical_response(response)
    
    def _format_medical_prompt(self, patient_data: dict) -> str:
        # Format the prompt appropriately for medical analysis
        # This would be customized based on your specific needs
        return f"""
        Please analyze the following medical case:
        Patient Information:
        {patient_data}
        
        Please provide:
        1. Potential diagnoses
        2. Recommended tests
        3. Treatment suggestions
        """
    
    def _parse_medical_response(self, response: str) -> dict:
        # Parse the response into structured data
        # This would need to be implemented based on your response format
        return {
            "raw_response": response,
            # Add more structured fields as needed
        }

# Create a singleton instance
gemini_service = GeminiService()