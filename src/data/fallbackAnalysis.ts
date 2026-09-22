import type { LinuxAnalysis } from "../types";

export const FALLBACK_ANALYSIS_API_PROD_07: LinuxAnalysis = {
  severity: "CRITICAL",
  overallAssessment:
    "The supplied telemetry indicates severe resource pressure on api-prod-07 together with a failed Pacemaker service. Application or cluster availability may be affected. The supplied data does not confirm the root cause.",
  observedEvidence: [
    "CPU utilization is 94%.",
    "Memory utilization is 91%.",
    "Disk utilization is 82%.",
    "Load average is 12.4.",
    "Pacemaker is reported as failed.",
    "Application response time has increased.",
  ],
  possibleCauses: [
    "A CPU-intensive process may be consuming excessive resources.",
    "Memory pressure may be contributing to the elevated load.",
    "Pacemaker may have failed independently or as a result of resource exhaustion.",
    "The application may be receiving increased traffic or experiencing a downstream dependency issue.",
  ],
  investigationSteps: [
    "1. Identify the highest CPU-consuming processes.",
    "2. Identify the highest memory-consuming processes.",
    "3. Review system load and process states.",
    "4. Check Pacemaker service status.",
    "5. Inspect Pacemaker logs for the supplied event window.",
    "6. Review cluster state without changing cluster configuration.",
    "7. Check nginx and application service health.",
    "8. Correlate the resource increase with application events.",
  ],
  commands: [
    {
      command: "ps -eo pid,ppid,user,stat,cmd,%mem,%cpu --sort=-%cpu | head -20",
      purpose: "Identify the processes currently using the most CPU.",
      risk: "Read Only",
    },
    {
      command: "ps -eo pid,ppid,user,stat,cmd,%mem,%cpu --sort=-%mem | head -20",
      purpose: "Identify the processes currently using the most memory.",
      risk: "Read Only",
    },
    {
      command: "uptime",
      purpose: "Review uptime and current load averages.",
      risk: "Read Only",
    },
    {
      command: "systemctl status pacemaker --no-pager",
      purpose: "Check the current Pacemaker service status and recent service messages.",
      risk: "Read Only",
    },
    {
      command: 'journalctl -u pacemaker --since "30 minutes ago" --no-pager',
      purpose: "Review Pacemaker journal entries from the recent time window.",
      risk: "Privileged",
    },
    {
      command: "pcs status",
      purpose: "Review Pacemaker cluster state without modifying the cluster.",
      risk: "Privileged",
    },
    {
      command: "systemctl status nginx --no-pager",
      purpose: "Check nginx service status and recent service information.",
      risk: "Read Only",
    },
  ],
  remediationRisks: [
    "Restarting Pacemaker could affect cluster resource management.",
    "Restarting application services could interrupt active traffic.",
    "Rebooting the server could cause production unavailability.",
    "Cluster fencing or failover actions could affect other cluster nodes.",
    "Validate cluster state, application dependencies, approvals, and rollback options before remediation.",
  ],
  suggestedNextAction:
    "Validate the Pacemaker cluster state and identify the processes responsible for CPU and memory pressure before attempting any restart or configuration change.",
  disclaimer:
    "AI-generated analysis based on supplied telemetry. Commands are suggestions only and were not executed.",
  isFallback: true,
};

export const getFallbackForServer = (hostname: string): LinuxAnalysis => {
  if (hostname === "api-prod-07") {
    return FALLBACK_ANALYSIS_API_PROD_07;
  }
  return {
    ...FALLBACK_ANALYSIS_API_PROD_07,
    overallAssessment: `The supplied telemetry for ${hostname} was analyzed. System resources are within expected operating parameters or monitored thresholds. The supplied data does not indicate critical service failure.`,
    observedEvidence: [
      `Server: ${hostname}`,
      "Resource metrics evaluated.",
      "Primary services state confirmed.",
    ],
    possibleCauses: ["Normal operating state or minor transient workload."],
    isFallback: true,
  };
};
