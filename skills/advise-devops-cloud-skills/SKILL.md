---
name: advise-devops-cloud-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for DevOps, CI/CD, deployments, infrastructure as code, Kubernetes, Terraform, cloud resources, monitoring, or release operations.
---

# DevOps And Cloud Skill Advisor

Advise the human on skills that touch infrastructure, releases, and operational systems.

## Workflow

1. Identify the operational surface: CI, deployment, infrastructure, monitoring, incident response, or release management.
2. Define environments, credentials, blast radius, and approval requirements.
3. Specify read-only discovery before any change.
4. Define plan, apply, rollback, and verification behavior.
5. Add audit logging and state-drift handling.
6. Return a DevOps-skill blueprint with safety gates.

## Category Standards

- Default to read-only inspection.
- Require explicit approval for production mutation.
- Prefer dry-run or plan commands before apply commands.
- Define rollback and verification steps.
- Avoid exposing secrets in logs.
- Treat cloud costs and quotas as part of risk.

## Checklist

- Trigger description names DevOps, CI/CD, deploy, infra, cloud, Kubernetes, Terraform, or monitoring.
- Workflow identifies target environment.
- Skill defines safe commands and approval gates.
- Failure modes cover credential errors, drift, partial deploys, quota limits, and rollback failure.
- Output format includes environment, actions, result, and next step.
- References include environment conventions where possible.

## Nice To Have

- Environment matrix.
- Runbook templates.
- Rollback checklist.
- Terraform plan review rubric.
- Incident timeline format.

## Example Skill Ideas

- Deployment runbook skill.
- Terraform review skill.
- Kubernetes troubleshooting skill.
- CI failure triage skill.

## Failure Modes

- Environment is unclear: stop and ask for target environment before mutation.
- Plan shows risky changes: summarize blast radius and require human approval.
- Deployment partially fails: report completed steps and rollback options.
- Secrets appear in output: redact and warn.

## Output Format

Return:

```text
Skill concept: <name>
Operational surface: <surface>
Trigger description draft: <Use when...>
Safety gates:
- <gate>
Workflow:
1. <step>
Failure recovery:
- <mode and recovery>
Validation:
- <check>
```
