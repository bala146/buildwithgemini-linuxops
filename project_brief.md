# Project Brief: LinuxOps

> **Modern SRE & Linux Infrastructure Management Platform**

---

## 📌 About LinuxOps

**LinuxOps** is an interactive Site Reliability Engineering (SRE) and Linux server management web application running on `http://localhost:8080/`. The platform empowers sysadmins and SRE teams to monitor infrastructure health, execute terminal diagnostics, analyze system logs, and leverage an AI Copilot for automated incident resolution.

---

## 📱 App Pages & Features

### 📊 1. System Dashboard
- **Infrastructure Metrics**: Real-time visualization of CPU usage, Memory consumption, Disk I/O, and Network traffic.
- **Server Health Status**: Live status overview across active, warning, and critical Linux server instances.
- **Incident Feed**: Real-time alert feed highlighting system errors, service outages, and performance bottlenecks.

### 🖥️ 2. Server Workspace
- **Interactive Web Terminal**: Remote shell workspace to execute Linux CLI commands and inspect system logs.
- **Server Selector**: Switch seamlessly between production, staging, and development Linux hosts.
- **Log Stream Viewer**: Tail system logs (`syslog`, `journalctl`, `dmesg`) in real time.

### 🤖 3. AI Copilot
- **SRE Incident Troubleshooting**: AI-driven analysis of Linux terminal errors, stack traces, and system crash logs.
- **Automated Remediation**: Recommends validated bash commands and shell scripts for rapid incident resolution.
- **Prompt Library**: Pre-built SRE prompts for memory leak analysis, high CPU load diagnostics, and network troubleshooting.

### 🎬 4. Demo Flow
- **Interactive Tour**: Step-by-step guided walkthrough demonstrating end-to-end incident response workflows.
- **Simulated Incidents**: Interactive scenarios testing monitoring alerts, log diagnosis, and AI-assisted remediation.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite (Port `8080`)
- **Styling**: Vanilla CSS, responsive dark mode design system
- **Cloud Infrastructure**: GCP Cloud Storage Bucket (`gs://linuxops-qwiklabs-gcp-03-b4a6a0c3c0f2`)
