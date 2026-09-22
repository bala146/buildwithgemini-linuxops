# LinuxOps AI

> **AI-Powered Linux Infrastructure Operations & SRE Platform**

LinuxOps AI is an enterprise-grade SRE and InfraOps platform powered by Google Gemini, Vertex AI Agent Engine, Cloud Run, Cloud Firestore, and Vertex AI RAG. It helps Linux engineers rapidly **Detect → Understand → Investigate → Recommend → Communicate** system anomalies across fleet servers.

Live Production URL: [https://linuxops-frontend-70111987022.us-east1.run.app](https://linuxops-frontend-70111987022.us-east1.run.app)

---

## 🌟 Architecture & Key Features

### 🤖 1. ADK Agent & Vertex AI Reasoning Engine
- Deployed on **Vertex AI Reasoning Engine** (`projects/70111987022/locations/us-east1/reasoningEngines/6293826658738634752`).
- Integrated with **Vertex AI Memory Bank** for persistent cross-session memories (`PreloadMemoryTool` & `generate_memories_callback`).

### 🐍 2. Sandboxed Code Execution
- Uses `AgentEngineSandboxCodeExecutor` to safely execute Python code in a secure Agent Engine sandbox for data processing and math tasks.

### 🎨 3. Declarative A2UI Integration
- Built with **A2UI** (version `0.8`) using `A2uiSchemaManager` and `BasicCatalog`.
- Processed via `a2ui_after_model_callback` in `a2ui_utils.py` to deliver rich declarative UI cards and forms.

### 🗄️ 4. Cloud Firestore Backend
- Connected to Cloud Firestore (`qwiklabs-gcp-03-b4a6a0c3c0f2`).
- Includes function tools `search_food_allergens_database` and `add_or_update_food_allergen` for structured data management.

### 🌐 5. Public Network Diagnostics Tool
- `lookup_ip_network_info` function tool for real-time IP / domain geolocation and network diagnostics.

### 📚 6. Vertex AI RAG Engine Grounding
- Serverless Vertex AI RAG corpus grounded on Nicholas Culpeper's *The Complete Herbal* (`pg49513.txt`) with `query_herbal_rag_corpus` retrieval tool.

### 🪣 7. GCP Cloud Storage & Cloud Run Deployment
- **Cloud Storage Bucket**: `gs://linuxops-qwiklabs-gcp-03-b4a6a0c3c0f2` with public viewer permissions.
- **Cloud Run Deployment**: Frontend hosted on GCP Cloud Run with IAM role `roles/aiplatform.user` granted to the compute service account.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Agent Framework**: Google ADK (Agent Development Kit), Python 3.13
- **AI SDK & Model**: `@google/genai`, Google Gemini (`gemini-flash-latest` / `gemini-2.5-flash`)
- **Cloud Infrastructure**: GCP Cloud Run, Vertex AI Reasoning Engine, Cloud Firestore, Cloud Storage, Vertex AI RAG

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js `v18.0.0` or higher
- `npm` or `yarn`

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure environment variables:

```env
VITE_AGENT_ENGINE_RESOURCE_NAME=projects/70111987022/locations/us-east1/reasoningEngines/6293826658738634752
VITE_AGENT_DIRECTORY=app
```

### 4. Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:8080`.

---

## 🎬 Workshop Demo Walkthrough

1. **Fleet Dashboard**: Review system health metrics and server statuses across production and staging hosts.
2. **Inspect Telemetry**: Select focus server `api-prod-07` to analyze CPU, Memory, and log traces.
3. **AI Copilot & Diagnostics**: Trigger Gemini AI analysis, run sandboxed Python code, query RAG herbal knowledge, or perform live IP lookups.
4. **Structured Incident Response**: Review observed facts vs hypotheses and export formatted incident reports for Slack / Teams.

---

## 📦 Production Deployment

### Build Frontend
```bash
npm run build
```

### Deploy to GCP Cloud Run
```bash
gcloud run deploy linuxops-frontend \
  --source . \
  --region us-east1 \
  --allow-unauthenticated
```

---

*LinuxOps AI • Enterprise SRE Platform • Powered by Google Gemini & Vertex AI*
