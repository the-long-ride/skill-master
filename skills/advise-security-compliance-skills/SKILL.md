---
name: advise-security-compliance-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for security review, threat modeling, secrets handling, compliance, policy checks, privacy, abuse prevention, or regulated workflows.
---

# Security And Compliance Skill Advisor

Advise the human on skills where safety, privacy, policy, or adversarial risk matters.

## Workflow

1. Identify the security surface: code, infrastructure, data, identity, policy, privacy, or regulated workflow.
2. Define assets, actors, trust boundaries, and abuse cases.
3. Specify evidence-gathering steps and allowed tools.
4. Define severity, confidence, and remediation format.
5. Add rules for secrets, exploit details, and state-changing actions.
6. Return a security-skill blueprint with review gates.

## Category Standards

- Identify the threat model before recommendations.
- Treat secrets and credentials as sensitive by default.
- Separate confirmed issues from hypotheses.
- Include severity and evidence.
- Provide remediation that is actionable and bounded.
- Require extra caution for dual-use or regulated topics.

## Checklist

- Trigger description names security, compliance, privacy, threat modeling, policy, or secrets.
- Workflow defines scope and assets.
- Skill includes allowed and disallowed behaviors.
- Failure modes cover insufficient evidence, false positives, sensitive data, and unsafe requests.
- Output format leads with critical findings.
- Validation includes benign and adversarial prompts.

## Nice To Have

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

## Failure Modes

- Scope is too broad: ask for assets, environment, and review depth.
- Evidence is weak: mark as hypothesis and request more data.
- Sensitive data appears: redact it and avoid storing it.
- Request asks for harmful exploitation: refuse that path and offer defensive alternatives.

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
