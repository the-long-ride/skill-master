---
name: advise-security-compliance-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for security review, threat modeling, secrets handling, compliance, policy checks, privacy, abuse prevention, or regulated workflows
---

# Security And Compliance Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the security & compliance domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for security & compliance.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the security & compliance task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the security surface: code, infrastructure, data, identity, policy, privacy, or regulated workflow.
2. Define assets, actors, trust boundaries, and abuse cases.
3. Specify evidence-gathering steps and allowed tools.
4. Define severity, confidence, and remediation format.
5. Add rules for secrets, exploit details, and state-changing actions.
6. Return a security-skill blueprint with review gates.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Identify the threat model before recommendations.
- Treat secrets and credentials as sensitive by default.
- Separate confirmed issues from hypotheses.
- Include severity and evidence.
- Provide remediation that is actionable and bounded.
- Require extra caution for dual-use or regulated topics.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names security, compliance, privacy, threat modeling, policy, or secrets.
- Workflow defines scope and assets.
- Skill includes allowed and disallowed behaviors.
- Failure modes cover insufficient evidence, false positives, sensitive data, and unsafe requests.
- Output format leads with critical findings.
- Validation includes benign and adversarial prompts.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Severity rubric.
- CWE, OWASP, or policy mapping.
- Secrets redaction rules.
- Compliance evidence checklist.
- Safe reproduction template.

## Example Skill Ideas

- Secure code review skill.
- Threat model skill.
- Secrets audit skill.
- Policy compliance review skill.

## Examples

Input: "Help me design a skill for security & compliance workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This security & compliance skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Scope is too broad: ask for assets, environment, and review depth.
- Evidence is weak: mark as hypothesis and request more data.
- Sensitive data appears: redact it and avoid storing it.
- Request asks for harmful exploitation: refuse that path and offer defensive alternatives.

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
Security surface: <surface>
Trigger description draft: <Use when...>
Threat model:
- <asset or actor>
Review standards:
- <standard>
Failure recovery:
- <mode and recovery>
Validation prompts:
- <prompt>
```
