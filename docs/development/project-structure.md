# MediAgent Project Structure

```
mediagent/
├── frontend/                      # Frontend application (Vite + TypeScript)
│   ├── .env.example              # Example environment variables
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.tsx              # Entry point
│   │   ├── App.tsx               # Root component
│   │   ├── vite-env.d.ts        # Type declarations
│   │   ├── assets/              # Static assets (images, fonts)
│   │   ├── components/          # Reusable components
│   │   │   ├── common/          # Generic UI components
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   └── Input/
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── Footer/
│   │   │   └── clinical/        # Domain-specific components
│   │   │       ├── PatientInfo/
│   │   │       ├── DiagnosticPanel/
│   │   │       └── TreatmentPlan/
│   │   ├── features/            # Feature-based modules
│   │   │   ├── auth/
│   │   │   ├── diagnosis/
│   │   │   └── treatment/
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   │   ├── api.ts          # Base API configuration
│   │   │   └── endpoints/       # API endpoint definitions
│   │   ├── store/              # Redux store setup
│   │   │   ├── index.ts        # Store configuration
│   │   │   └── slices/         # Redux slices
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   └── styles/             # Global styles
│   └── tests/                  # Frontend tests
│
├── backend/                     # Backend application (FastAPI)
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Example environment variables
│   ├── main.py               # FastAPI application entry point
│   ├── config.py             # Configuration management
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   ├── v1/         # API version 1
│   │   │   └── deps.py     # Dependencies (auth, etc.)
│   │   ├── core/           # Core application code
│   │   │   ├── agents/     # LangChain agents
│   │   │   ├── security/   # Security utilities
│   │   │   └── config.py   # Core configuration
│   │   ├── db/             # Database
│   │   │   ├── models/     # SQLAlchemy models
│   │   │   └── session.py  # Database session
│   │   ├── schemas/        # Pydantic models
│   │   └── services/       # Business logic
│   │       ├── ml/         # Machine learning services
│   │       └── medical/    # Medical domain services
│   └── tests/              # Backend tests
│
├── docker/                 # Docker configuration
│   ├── frontend/
│   │   └── Dockerfile
│   └── backend/
│       └── Dockerfile
│
├── docs/                   # Documentation
│   ├── api/               # API documentation
│   ├── development/       # Development guides
│   └── deployment/        # Deployment guides
│
├── .gitignore
├── docker-compose.yml
├── README.md
└── LICENSE
```
