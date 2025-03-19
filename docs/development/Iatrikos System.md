# Iatrikos System - Detailed Component Interactions

```mermaid
graph TB
    %% Main Components
    UI[Web Interface]
    AG[API Gateway]
    Auth[Auth Service]
    AO[Agent Orchestrator]
    KIS[Knowledge Integration]
    AI[AI Pipeline]
    SV[Safety Validator]
    Mon[Monitoring System]
    DB[(Databases)]
    Cache[(Cache Layer)]

    %% External Systems
    subgraph External
        EHR[EHR Systems]
        Drug[Drug Database]
        Lit[Medical Literature]
    end

    %% AI Components
    subgraph AI_Components
        LLM[LLM Models]
        AG1[Diagnosis Agent]
        AG2[Treatment Agent]
        AG3[Safety Agent]
    end

    %% Connections
    UI <-->|Requests/Responses| AG
    AG <-->|Auth Checks| Auth
    AG -->|Routes| AO
    
    %% Orchestrator Connections
    AO <--> KIS
    AO <--> AI
    AO <--> SV
    
    %% Knowledge Integration
    KIS <--> External
    KIS <--> DB
    KIS <--> Cache
    
    %% AI Pipeline
    AI <--> AI_Components
    AI <--> KIS
    
    %% Safety & Monitoring
    SV --> Mon
    AG --> Mon
    AO --> Mon
    Mon --> DB

    
    class UI,AG,AO primary
    class KIS,AI,SV secondary
    class EHR,Drug,Lit external
```



```mermaid
sequenceDiagram
    participant CP as Clinical Personnel
    participant UI as Web Interface
    participant AG as API Gateway
    participant Auth as Auth Service
    participant AO as Agent Orchestrator
    participant KIS as Knowledge Integration
    participant AI as AI Pipeline
    participant SV as Safety Validator
    participant Mon as Monitoring System

    %% Authentication Flow
    CP->>UI: Login Request
    UI->>AG: Forward Login
    AG->>Auth: Verify Credentials
    Auth-->>AG: Issue JWT Token
    AG-->>UI: Return Token

    %% Clinical Query Flow
    CP->>UI: Submit Medical Query
    UI->>AG: Forward Query + Token
    AG->>Auth: Validate Token
    Auth-->>AG: Token Valid

    %% Processing Flow
    AG->>AO: Route Query to Orchestrator
    
    %% Parallel Processing
    par Knowledge Lookup
        AO->>KIS: Fetch Relevant Data
        KIS-->>AO: Return Context
    and AI Processing
        AO->>AI: Process Query
        AI->>KIS: Request Additional Context
        KIS-->>AI: Provide Context
        AI-->>AO: Return AI Response
    end

    %% Validation and Response
    AO->>SV: Validate Response
    SV-->>AO: Validation Result
    
    %% Return Flow
    AO-->>AG: Send Validated Response
    AG-->>UI: Return Final Response
    UI-->>CP: Display Results

    %% Monitoring
    Note over Mon: Continuous Logging
    AG->>Mon: Log Request
    AO->>Mon: Log Processing
    SV->>Mon: Log Validation
```

## 1. User Interface & Authentication Flow

This component manages how clinical personnel securely access and interact with the system through authentication and data verification processes.

```mermaid
sequenceDiagram
    participant CP as Clinical Personnel
    participant UI as Web Interface
    participant Auth as Authentication
    participant AO as Agent Orchestrator

    CP->>UI: 1. Login Request
    UI->>Auth: 2. Verify Credentials
    Auth->>Auth: 3. Check Permissions
    Auth-->>UI: 4. Issue JWT Token
    CP->>UI: 5. Submit Medical Query
    UI->>AO: 6. Forward Query + Token
```

### Detailed Notes:

- **Login Process:** Clinical personnel initiate login through a secure web interface. The interface encrypts the credentials and sends them to the authentication layer for verification.
- **Authentication Process:**
  - The system first validates the user's credentials.
  - It then checks the user's role permissions and verifies access levels.
  - Once validated, a JSON Web Token (JWT) is issued to authenticate future interactions.
  - JWT Token Details: The JWT token contains:
    - User identity for session tracking.
    - Access permissions to control resource visibility.
    - Expiration time to ensure session security.
- **Medical Query Submission:** Clinical personnel submit a medical query tagged with:
  - User Context: Information about the user’s role or department.
  - Specialty Area: Relevant medical specialty of the user.
  - Priority Level: Determines query urgency in case of multiple simultaneous requests.

## 2. Knowledge Integration System

This system connects external data sources, storing commonly accessed information in caches to optimize performance. This system consolidates information from various medical resources to assist in clinical decision-making by providing real-time, data-driven insights.

```mermaid
graph TD
    subgraph Knowledge_Flow
        AO[Agent Orchestrator] --> APIs
        
        subgraph APIs[External APIs]
            D[Drug Database]
            C[Clinical Guidelines]
            E[EHR Systems]
            L[Lab Results]
            M[Medical Literature]
        end
        
        subgraph Cache[Caching Layer]
            R[Redis Cache]
            V[Vector Store]
        end
        
        subgraph DB[Database Layer]
            P[PostgreSQL]
            Mo[MongoDB]
        end
        
        APIs --> Cache
        Cache --> DB
    end
```

### Detailed Notes:

- **Agent Orchestrator:** Manages API requests, handles rate limiting, implements retry logic for reliable data retrieval, and coordinates multiple queries.
- **External APIs:**
  - **Drug Database:** Information on medications, interactions, and dosing.
  - **Clinical Guidelines:** Standard protocols and medical best practices.
  - **EHR Systems:** Patient history, current conditions, and treatment records.
  - **Lab Results:** Test interpretations and normal ranges.
  - **Medical Literature:** Access to recent research and case studies.
- **Caching System:**
  - **Redis Cache:** Stores frequently accessed data, session info, and temporary results.
  - **Vector Store:** Stores embeddings for semantic search and similar case lookup.
- **Database Layer:**
  - **PostgreSQL:** Houses structured medical data, user information, and audit logs.
  - **MongoDB:** Manages unstructured medical documents and complex medical records.

## 3. AI Processing Pipeline

The AI processing pipeline uses Large Language Models (LLMs) and a series of agent interactions to process queries and generate medical responses.

```mermaid
sequenceDiagram
    participant AO as Agent Orchestrator
    participant LC as LangChain
    participant AG as AutoGen
    participant GM as Gemini Pro
    participant KB as Knowledge Base

    AO->>LC: 1. Initialize Chain
    LC->>AG: 2. Create Agents
    AG->>GM: 3. Process Query
    GM->>KB: 4. Knowledge Lookup
    KB-->>GM: 5. Context Return
    GM->>AG: 6. Generate Response
    AG->>LC: 7. Validate Output
```

### Detailed Notes:

- **Agent Orchestrator:** Manages workflow, handles task distribution, and monitors processing status.
- **LangChain Framework:**
  - Implements prompt templates and manages conversation memory.
  - Coordinates communication between various agents.
- **AutoGen Agents:** Specialized medical agents for specific tasks:
  - **Diagnosis Agent:** Assists in determining possible conditions.
  - **Treatment Agent:** Recommends treatment options.
  - **Drug Interaction Agent:** Checks potential medication conflicts.
  - **Safety Check Agent:** Ensures patient safety by assessing risk factors.
- **Gemini Pro Integration:**
  - Processes natural language, interprets medical context, generates responses, and manages uncertainty in answers.

## 4. Safety and Validation System

The safety and validation system performs multiple checks on responses to ensure adherence to medical protocols and regulatory standards.

```mermaid
graph TD
    subgraph Safety_Validation
        Input[Medical Query] --> V1

        subgraph Primary_Checks[Primary Validation]
            V1[Input Validation]
            V2[Context Verification]
            V3[Medical Protocol Check]
        end

        subgraph Secondary_Checks[Safety Assessment]
            S1[Risk Analysis]
            S2[Compliance Check]
            S3[Ethical Validation]
        end

        Primary_Checks --> Secondary_Checks
        Secondary_Checks --> Output[Validated Response]
    end
```

### Detailed Notes:

- **Input Validation:** Ensures that the medical query is in the correct format, checks for accurate medical terminology, and verifies context completeness.
- **Primary Safety Checks:** Verifies adherence to medical compliance, assesses risk levels, and validates ethical standards.
- **Risk Analysis:** Involves confidence scoring, uncertainty assessment, and impact evaluation to determine if the response is reliable and safe.

## 5. Response Generation and Delivery

This component processes, validates, and formats the AI-generated response for presentation to clinical personnel.

```mermaid
sequenceDiagram
    participant RG as Response Generator
    participant QA as Quality Assurance
    participant FV as Final Validator
    participant UI as User Interface

    RG->>QA: 1. Draft Response
    QA->>FV: 2. Quality Check
    FV->>FV: 3. Final Validation
    FV->>UI: 4. Format Response
    UI->>UI: 5. Present Results
```

### Detailed Notes:

- **Response Generation:**
  - Combines LLM output with knowledge base information.
  - Formats medical data for readability and adds references or citations.
- **Quality Assurance:**
  - Checks for response completeness, verifies accuracy, and ensures clarity.
- **Final Validation:**
  - Double-checks safety, verifies format, and customizes response for user specificity.

## 6. Monitoring and Logging

A continuous oversight system logs and monitors user actions, system operations, and response generation to ensure compliance and improve performance.

```mermaid
graph TD
    subgraph Monitoring_System
        L1[Activity Logger]
        L2[Error Tracker]
        L3[Performance Monitor]
        L4[Audit System]

        L1 --> DB[Log Database]
        L2 --> DB
        L3 --> DB
        L4 --> DB
    end
```

### Detailed Notes:

- **Activity Logging:** Tracks user actions, system operations, query processing, and response generation for audit purposes.
- **Error Tracking:** Logs exceptions, identifies error patterns, and tracks the resolution status to maintain reliability.
- **Performance Monitoring:** Measures response times, resource usage, and system health to optimize functionality.
- **Audit Trail:** Records critical interactions, such as medical decisions, user activities, and system changes, to verify compliance with medical standards.
