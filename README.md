# LinuxOps AI

> **AI-powered Linux Infrastructure Operations**

LinuxOps AI is an enterprise-grade SRE and InfraOps advisory platform designed to help Linux engineers rapidly **Detect → Understand → Investigate → Recommend → Communicate** system anomalies across fleet servers.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (Enterprise dark navy theme `#08111F`)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **AI SDK**: `@google/genai` (Google Gemini API - Model `gemini-2.5-flash`)
- **State Management**: React Context (`DemoContext`) with resilient fallback engine

---

## 🔒 Advisory Safety Guarantee

LinuxOps AI operates strictly as an **advisory tool**:
- It **never** executes commands or connects to live SSH servers.
- All suggested Linux commands are risk-classified (`Read Only`, `Privileged`, `Potentially Disruptive`).
- Observed evidence is explicitly separated from possible causes (hypotheses).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js `v18.0.0` or higher
- `npm` or `yarn`

### 2. Installation

Clone or extract the project repository and run:

```bash
npm install
```

### 3. Environment Configuration

Copy the sample environment file `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and set your Google Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Note**: If `VITE_GEMINI_API_KEY` is left blank, invalid, or quota-exceeded, LinuxOps AI automatically falls back to its built-in **Demo Fallback Engine** so workshop presentations are 100% reliable and fail-safe.

### 4. Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:8080`.

---

## 🧪 Testing Fallback Mode

To test the **Demo Fallback Engine**:
1. Leave `VITE_GEMINI_API_KEY=` empty in `.env` (or set it to `your_api_key_here`).
2. Click **✨ Analyze with Gemini** on `api-prod-07`.
3. Notice the **Demo Fallback Result** badge appears on the analysis panel with realistic structured investigation steps, evidence, and commands.

---

## 🎬 Workshop Demo Walkthrough (90-Minute Presenter Playbook)

Follow this 6-step interactive workflow during live demonstrations:

1. **Fleet Dashboard**:
   - Show fleet KPIs (128 total servers: 112 Healthy, 11 Warning, 5 Critical).
   - Point out the critical demo focus host: `api-prod-07`.

2. **Inspect Telemetry**:
   - Click **View Server** on `api-prod-07`.
   - Review CPU (94%), Memory (91%), Load Avg (12.4), and failed `pacemaker` service.

3. **Analyze with Gemini**:
   - Click **✨ Analyze with Gemini**.
   - Show loading step animation and the structured analysis output.

4. **Review Investigation Commands**:
   - Explain observed facts vs possible causes.
   - Click **Copy Command** on `ps -eo ...` to demonstrate the clipboard toast notification (`Command copied`).

5. **Generate Incident Draft**:
   - View the generated **INC-2026-0922-001** draft.
   - Click **Copy Incident** (`Incident copied`).

6. **Notification Preview**:
   - Click **Copy for Teams** or **Copy for Slack** to prepare formatted alert dispatches.

---

## 📦 Production Build

To compile and validate the TypeScript bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ❓ Troubleshooting

- **Gemini API Error / Quota Exceeded**: The application will automatically catch the error, log a warning, and present the structured fallback analysis labeled with `Demo Fallback Result`.
- **Port Conflict**: If port 8080 is in use, Vite will automatically prompt or select the next available port.

---

*LinuxOps AI • Workshop Prototype • Powered by Gemini*
