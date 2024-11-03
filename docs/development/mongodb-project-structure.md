# MediAgent Project Structure (MongoDB-Optimized)

```
mediagent/
├── frontend/                      # Frontend application (Vite + TypeScript)
│   ├── .env.example              
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.tsx              
│   │   ├── App.tsx               
│   │   ├── vite-env.d.ts        
│   │   ├── assets/              
│   │   ├── components/          
│   │   │   ├── common/          
│   │   │   ├── layout/          
│   │   │   └── clinical/        
│   │   ├── features/            
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── slice.ts
│   │   │   ├── patients/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── slice.ts
│   │   │   └── clinical-cases/
│   │   │       ├── components/
│   │   │       ├── services/
│   │   │       └── slice.ts
│   │   ├── hooks/               
│   │   ├── services/            
│   │   ├── store/              
│   │   ├── types/              
│   │   │   ├── patient.types.ts
│   │   │   ├── case.types.ts
│   │   │   └── common.types.ts
│   │   ├── utils/              
│   │   └── styles/             
│   └── tests/                  
│
├── backend/                     # Backend application (FastAPI + MongoDB)
│   ├── requirements.txt        
│   ├── .env.example           
│   ├── main.py               
│   ├── config.py             
│   ├── app/
│   │   ├── api/             
│   │   │   ├── v1/         
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── patients.py
│   │   │   │   │   ├── clinical_cases.py
│   │   │   │   │   └── auth.py
│   │   │   │   └── router.py
│   │   │   └── deps.py     
│   │   ├── core/           
│   │   │   ├── agents/     
│   │   │   │   ├── medical_agent.py
│   │   │   │   └── safety_validator.py
│   │   │   ├── security/   
│   │   │   └── config.py   
│   │   ├── models/          # MongoDB models (using Beanie ODM)
│   │   │   ├── patient.py   # Patient document model
│   │   │   ├── case.py      # Clinical case document model
│   │   │   ├── audit.py     # Audit log document model
│   │   │   └── base.py      # Base document model
│   │   ├── schemas/         # Pydantic schemas for request/response
│   │   │   ├── patient.py
│   │   │   ├── case.py
│   │   │   └── common.py
│   │   ├── services/       
│   │   │   ├── ml/         
│   │   │   │   ├── gemini_service.py
│   │   │   │   └── medical_knowledge.py
│   │   │   └── db/         # Database services
│   │   │       ├── patient_service.py
│   │   │       └── case_service.py
│   │   └── utils/          # Utility functions
│   │       ├── db.py       # MongoDB utility functions
│   │       └── helpers.py
│   └── tests/              
│       ├── conftest.py     # Test configuration with MongoDB
│       ├── test_api/
│       └── test_services/
│
├── docker/                 
│   ├── frontend/
│   │   └── Dockerfile
│   ├── backend/
│   │   └── Dockerfile
│   └── mongodb/
│       ├── Dockerfile
│       └── init-mongo.js   # MongoDB initialization script
│
├── docs/                   
│   ├── api/               
│   ├── development/       
│   └── deployment/        
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```
