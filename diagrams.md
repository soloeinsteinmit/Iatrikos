# Iatrikos System Architecture Documentation

``` mermaid

graph TD
    %% Frontend & Authentication
    CP[Clinical Personnel] --> UI[Web Interface/UI]
    UI --> API[API Gateway/FastAPI]
    API --> Auth[Authentication Layer]
    Auth --> SEC[Security Protocol]
    
    %% Core Orchestration
    SEC --> AO[Agent Orchestrator]
    
    %% Knowledge Base Integration
    subgraph Knowledge_Integration[Knowledge Integration Layer]
        subgraph External_APIs[External Medical APIs]
            DA[Drug API]
            CA[Clinical Guidelines API]
            LA[Lab Results API]
            EA[EHR API]
            MA[Medical Literature API]
        end
        
        subgraph Cache_Layer[Caching System]
            RC[Redis Cache]
            VC[Vector Store]
        end
        
        subgraph Database_Layer[Persistent Storage]
            PG[PostgreSQL]
            MG[MongoDB]
        end
    end
    
    %% LLM & Agent Processing
    subgraph AI_Processing[AI Processing Layer]
        GEM[Gemini Pro/LLM]
        LC[LangChain Framework]
        AG[AutoGen Agents]
        
        LC --> AG
        AG --> GEM
    end
    
    %% Safety & Validation
    subgraph Safety_System[Safety & Validation Layer]
        subgraph Input_Validation[Input Validation]
            IV1[Query Validator]
            IV2[Context Checker]
        end
        
        subgraph Safety_Checks[Safety Verification]
            MC[Medical Compliance]
            EC[Ethical Guidelines]
            RC1[Regulatory Requirements]
            SC[Safety Parameters]
        end
        
        subgraph Risk_Analysis[Risk Assessment]
            RA[Risk Analysis]
            CI[Confidence Index]
            UC[Uncertainty Check]
        end
    end
    
    %% Response Generation
    subgraph Response_Layer[Response Processing]
        RG[Response Generator]
        FV[Final Validator]
        QA[Quality Assurance]
    end
    
    %% Monitoring System
    subgraph Monitoring[System Monitoring]
        L1[Activity Logs]
        L2[Error Tracking]
        L3[Performance Metrics]
        L4[Audit Trail]
    end
    
    %% Flow Connections
    AO --> AI_Processing
    AO --> Knowledge_Integration
    External_APIs --> Cache_Layer
    Cache_Layer --> Database_Layer
    
    AI_Processing --> Safety_System
    Knowledge_Integration --> Safety_System
    
    Safety_System --> Response_Layer
    Response_Layer --> API
    
    %% Monitoring Connections
    AO --> Monitoring
    AI_Processing --> Monitoring
    Safety_System --> Monitoring
    Response_Layer --> Monitoring
    
    %% Data Flow
    GEM --> RG
    Safety_Checks --> FV
    Risk_Analysis --> QA
    
    %% Bidirectional Flows
    AO -.-> External_APIs
    GEM -.-> Cache_Layer
    AG -.-> Database_Layer
    
    
    class CP,UI,API frontend
    class AO,AI_Processing processing
    class Knowledge_Integration storage
    class Safety_System,Auth security

```

## 1. Complete System Architecture

This represents the entire system's high-level overview and interactions.

```mermaid
graph TD
    %% Frontend Layer
    UI[Web Interface/UI] --> API[API Gateway/FastAPI]
    
    %% Authentication & Security
    API --> Auth[Authentication Layer]
    Auth --> SEC[Security Protocol]
    
    %% Core Orchestration
    SEC --> AO[Agent Orchestrator]
    
    %% LLM Integration
    AO --> GEM[Gemini Pro/LLM]
    AO --> LC[LangChain Framework]
    AO --> AG[AutoGen Agents]
    
    %% Knowledge Integration
    subgraph Knowledge_Base[Medical Knowledge Base]
        DB1[Drug Database]
        DB2[Clinical Guidelines]
        DB3[Medical Literature]
        DB4[Lab Reference Values]
        DB5[EHR Systems]
    end
    
    %% Data Processing
    LC --> Knowledge_Base
    AG --> Knowledge_Base
    
    %% Validation & Safety
    subgraph Safety_Layer[Safety and Validation]
        V1[Input Validator]
        V2[Medical Safety Checker]
        V3[Ethical Guidelines]
        V4[Regulatory Compliance]
    end
    
    %% Processing Flow
    AO --> Safety_Layer
    
    %% Response Generation
    Safety_Layer --> RG[Response Generator]
    GEM --> RG
    Knowledge_Base --> RG
    
    %% Output Flow
    RG --> FV[Final Validator]
    FV --> API
    
    %% Logging & Monitoring
    subgraph Monitoring[System Monitoring]
        L1[Activity Logs]
        L2[Error Tracking]
        L3[Performance Metrics]
    end
    
    AO --> Monitoring
    
    
    
    class UI,API primary
    class AO,GEM,LC,AG secondary
    class Knowledge_Base,Safety_Layer tertiary

```



## Authentication and Clinical Input Flow
Shows how medical professionals interact with the system and how their credentials are verified.

```mermaid
sequenceDiagram
    participant CP as Clinical Personnel
    participant UI as Web Interface
    participant Auth as Auth Layer
    participant AO as Agent Orchestrator
    
    CP->>UI: Login Attempt
    UI->>Auth: Verify Credentials
    Auth->>Auth: Check Permissions
    Auth-->>UI: Authorization Token
    CP->>UI: Submit Medical Query
    UI->>Auth: Validate Token
    Auth->>AO: Forward Validated Query
    Note over AO: Begin Processing Pipeline
```




## Knowledge Base Integration
Demonstrates how the system integrates with various medical databases and information sources.
```mermaid
graph TD
    subgraph Knowledge_Integration
        AO[Agent Orchestrator]
        
        subgraph External_APIs
            DA[Drug API]
            CA[Clinical Guidelines API]
            LA[Lab Results API]
            EA[EHR API]
            MA[Medical Literature API]
        end
        
        subgraph Cache_Layer
            RC[Redis Cache]
            VC[Vector Store]
        end
        
        subgraph Database_Layer
            PG[PostgreSQL]
            MG[MongoDB]
        end
        
        AO --> External_APIs
        External_APIs --> Cache_Layer
        Cache_Layer --> Database_Layer
    end
```



## LLM Processing Pipeline
Details how the system processes queries using LLM and various AI agents.

```mermaid
sequenceDiagram
    participant AO as Agent Orchestrator
    participant LC as LangChain
    participant AG as AutoGen
    participant GM as Gemini Pro
    participant KB as Knowledge Base
    participant SV as Safety Validator
    
    AO->>LC: Initialize Chain
    LC->>AG: Create Agent Network
    AG->>GM: Process Query
    GM->>KB: Retrieve Context
    KB-->>GM: Return Relevant Data
    GM->>AG: Generate Response
    AG->>LC: Validate Response
    LC->>SV: Safety Check
    SV-->>AO: Validated Response
```




## Safety and Validation System
Shows the comprehensive safety checks and validation processes.
``` mermaid
graph TD
    subgraph Safety_System
        Input[Input Query]
        
        subgraph Validation_Checks
            MC[Medical Compliance]
            EC[Ethical Guidelines]
            RC[Regulatory Requirements]
            SC[Safety Parameters]
        end
        
        subgraph Risk_Assessment
            RA[Risk Analysis]
            CI[Confidence Index]
            UC[Uncertainty Check]
        end
        
        Input --> Validation_Checks
        Validation_Checks --> Risk_Assessment
        Risk_Assessment --> Output[Validated Output]
    end
```




## Response Generation and Delivery
Illustrates how responses are generated, validated, and delivered to users.

``` mermaid
sequenceDiagram
    participant RG as Response Generator
    participant FV as Final Validator
    participant API as API Gateway
    participant UI as User Interface
    participant CP as Clinical Personnel
    
    RG->>FV: Draft Response
    FV->>FV: Validate Format
    FV->>FV: Check Completeness
    FV->>API: Send Response
    API->>UI: Format Display
    UI->>CP: Present Results
    Note over CP: Review & Apply
```
