# Project Brief: LinuxOps

> **Modern SRE & Linux Infrastructure Management Platform**

---

## 📌 About LinuxOps

**LinuxOps** is an enterprise-grade Site Reliability Engineering (SRE) and Linux server management web application deployed on GCP Cloud Run at `https://linuxops-frontend-70111987022.us-east1.run.app` (and available locally on `http://localhost:8080/`). The platform empowers sysadmins, SRE teams, and DevOps engineers to monitor infrastructure health, execute terminal diagnostics, analyze system logs, query knowledge corpora, run sandboxed Python code, and leverage an ADK AI Copilot for automated incident resolution.

---

## 📱 App Pages & Key Features

### 📊 1. System Dashboard
- **Infrastructure Metrics**: Real-time visualization of CPU usage, Memory consumption, Disk I/O, and Network traffic.
- **Server Health Status**: Live status overview across active, warning, and critical Linux server instances.
- **Incident Feed**: Real-time alert feed highlighting system errors, service outages, and performance bottlenecks.

### 🖥️ 2. Server Workspace
- **Interactive Web Terminal**: Remote shell workspace to execute Linux CLI commands and inspect system logs.
- **Server Selector**: Switch seamlessly between production, staging, and development Linux hosts.
- **Log Stream Viewer**: Tail system logs (`syslog`, `journalctl`, `dmesg`) in real time.

### 🤖 3. ADK AI Copilot & Agent Engine
- **SRE Incident Troubleshooting**: AI-driven analysis of Linux terminal errors, stack traces, and system crash logs using Google Gemini models.
- **Sandboxed Code Execution**: `AgentEngineSandboxCodeExecutor` enables safe Python code execution in a secure sandbox for complex calculations and data processing.
- **A2UI Declarative UI Components**: Built with `A2uiSchemaManager` (version 0.8) and `BasicCatalog`, rendering rich declarative A2UI cards and components via `a2ui_after_model_callback`.
- **Cloud Firestore Database Tools**: Built-in function tools (`search_food_allergens_database`, `add_or_update_food_allergen`) interfacing with Cloud Firestore (`food_allergens` collection in project `qwiklabs-gcp-03-b4a6a0c3c0f2`).
- **Real-Time Network Diagnostics API Tool**: `lookup_ip_network_info` function tool fetching live public IP / domain geolocation and AS network metadata.
- **Vertex AI RAG Engine Grounding**: `query_herbal_rag_corpus` retrieval tool grounded on a serverless Vertex AI RAG corpus built from Nicholas Culpeper's *The Complete Herbal* (`pg49513.txt`).
- **Vertex AI Memory Bank**: Cross-session memory generation via `PreloadMemoryTool` and `generate_memories_callback`.

### 🎬 4. Demo Flow & Presenter Playbook
- **Interactive Tour**: Step-by-step guided walkthrough demonstrating end-to-end incident response workflows.
- **Simulated Incidents**: Interactive scenarios testing monitoring alerts, log diagnosis, and AI-assisted remediation.

---

## 🛠️ Technology Stack & Cloud Infrastructure

- **Frontend Core**: React 18, TypeScript, Vite, Tailwind CSS (Port `8080`)
- **Backend Agent Framework**: Google ADK (Agent Development Kit), Python 3.13
- **Agent Engine & Runtime**: Vertex AI Reasoning Engine (`projects/70111987022/locations/us-east1/reasoningEngines/6293826658738634752`)
- **Frontend Hosting**: GCP Cloud Run (`linuxops-frontend` in `us-east1`)
- **Database**: Cloud Firestore (Project ID: `qwiklabs-gcp-03-b4a6a0c3c0f2`)
- **Storage**: GCP Cloud Storage Bucket (`gs://linuxops-qwiklabs-gcp-03-b4a6a0c3c0f2`) with public read access
- **Code Execution**: Agent Engine Sandbox Code Executor (`AgentEngineSandboxCodeExecutor`)
- **Declarative UI**: A2UI (`a2ui-agent-sdk` v0.8)
- **Knowledge Retrieval**: Vertex AI RAG Engine
