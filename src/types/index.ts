export type HealthStatus = "healthy" | "warning" | "critical";

export type ServiceStatus = "running" | "failed" | "stopped";

export type CommandRisk =
  | "Read Only"
  | "Privileged"
  | "Potentially Disruptive";

export interface LinuxService {
  name: string;
  status: ServiceStatus;
}

export interface ServerEvent {
  time: string;
  message: string;
  severity: HealthStatus;
}

export interface LinuxServer {
  id: string;
  hostname: string;
  environment: "Production" | "Staging" | "Development";
  ip: string;
  os: string;
  cpu: number;
  memory: number;
  disk: number;
  loadAverage: number;
  uptimeDays: number;
  services: LinuxService[];
  events: ServerEvent[];
  status: HealthStatus;
}

export interface SuggestedCommand {
  command: string;
  purpose: string;
  risk: CommandRisk;
}

export interface LinuxAnalysis {
  severity: "HEALTHY" | "WARNING" | "CRITICAL";
  overallAssessment: string;
  observedEvidence: string[];
  possibleCauses: string[];
  investigationSteps: string[];
  commands: SuggestedCommand[];
  remediationRisks: string[];
  suggestedNextAction: string;
  disclaimer: string;
  isFallback?: boolean;
}

export interface FleetSummary {
  totalServers: number;
  healthy: number;
  warning: number;
  critical: number;
}

export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  timestamp: string;
  text: string;
  analysis?: LinuxAnalysis;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: "info" | "success" | "warning";
}
