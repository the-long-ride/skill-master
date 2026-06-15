---
name: advise-devops-cloud-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for DevOps, CI/CD, deployments, infrastructure as code, Kubernetes, Terraform, cloud resources, monitoring, or release operations
---

# DevOps And Cloud Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the devops & cloud domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for devops & cloud.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the devops & cloud task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the operational surface: CI, deployment, infrastructure, monitoring, incident response, or release management.
2. Define environments, credentials, blast radius, and approval requirements.
3. Specify read-only discovery before any change.
4. Define plan, apply, rollback, and verification behavior.
5. Add audit logging and state-drift handling.
6. Return a DevOps-skill blueprint with safety gates.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Default to read-only inspection.
- Require explicit approval for production mutation.
- Prefer dry-run or plan commands before apply commands.
- Define rollback and verification steps.
- Avoid exposing secrets in logs.
- Treat cloud costs and quotas as part of risk.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names DevOps, CI/CD, deploy, infra, cloud, Kubernetes, Terraform, or monitoring.
- Workflow identifies target environment.
- Skill defines safe commands and approval gates.
- Failure modes cover credential errors, drift, partial deploys, quota limits, and rollback failure.
- Output format includes environment, actions, result, and next step.
- References include environment conventions where possible.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for devops & cloud workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This devops & cloud skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Environment is unclear: stop and ask for target environment before mutation.
- Plan shows risky changes: summarize blast radius and require human approval.
- Deployment partially fails: report completed steps and rollback options.
- Secrets appear in output: redact and warn.

## Human Verification

Score the revised skill before calling it ready:

```text
Discovery: PASS | PARTIAL | FAIL
Content: PASS | PARTIAL | FAIL
Verification: PASS | PARTIAL | FAIL
Critical gaps:
1. <gap>
Required fixes:
1. <fix>
Decision: READY | NEEDS REVISION
```

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
