from typing import Dict, List
import requests
from Bio import Entrez
import xml.etree.ElementTree as ET

class MedicalKnowledgeService:
    def __init__(self):
        # Configure Entrez for PubMed access
        # Entrez.email = "your-email@example.com"
        Entrez.email = "solomoneshun373@gmail.com" 
        # TODO: Add email to .env
        
        # Free API endpoints
        self.endpoints = {
            "openfda": "https://api.fda.gov/drug",
            "clinicaltrials": "https://clinicaltrials.gov/api",
            "loinc": "https://fhir.loinc.org"
        }

    async def search_pubmed(self, query: str, max_results: int = 5) -> List[Dict]:
        """Search PubMed for medical literature"""
        try:
            handle = Entrez.esearch(db="pubmed", term=query, retmax=max_results)
            records = Entrez.read(handle)
            
            results = []
            for id in records["IdList"]:
                summary = Entrez.esummary(db="pubmed", id=id)
                summary_records = Entrez.read(summary)
                results.append({
                    "id": id,
                    "title": summary_records[0]["Title"],
                    "abstract": summary_records[0].get("Abstract", ""),
                    "authors": summary_records[0].get("AuthorList", [])
                })
            return results
        except Exception as e:
            print(f"PubMed search error: {str(e)}")
            return []

    async def search_drug_info(self, drug_name: str) -> Dict:
        """Search OpenFDA for drug information"""
        try:
            url = f"{self.endpoints['openfda']}/label.json?search={drug_name}"
            response = requests.get(url)
            return response.json()
        except Exception as e:
            print(f"OpenFDA search error: {str(e)}")
            return {}

    async def search_clinical_trials(self, condition: str) -> List[Dict]:
        """Search ClinicalTrials.gov for relevant studies"""
        try:
            # Updated endpoint and parameters
            url = f"{self.endpoints['clinicaltrials']}/v2/studies"
            params = {
                "query.term": condition,
                "pageSize": 5,
                "format": "json"
            }
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json().get("studies", [])
            return []
        except Exception as e:
            print(f"ClinicalTrials.gov search error: {str(e)}")
            return []

    async def get_lab_reference(self, loinc_code: str) -> Dict:
        """Get LOINC lab test information"""
        try:
            # Updated to use public FHIR endpoint
            url = f"{self.endpoints['loinc']}/fhir/v2/Observation"
            params = {
                "code": loinc_code,
                "_format": "json"
            }
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json()
            return {}
        except Exception as e:
            print(f"LOINC search error: {str(e)}")
            return {}
