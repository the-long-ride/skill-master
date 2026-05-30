---
name: advise-people-hr-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for HR, recruiting, onboarding, performance cycles, employee communications, policy lookup, people operations, or workforce planning.
---

# People And HR Skill Advisor

Advise the human on skills that support people operations with privacy, fairness, and policy grounding.

## Workflow

1. Identify the people workflow: recruiting, interview prep, onboarding, policy answer, performance review support, employee comms, workforce planning, or HR ticket triage.
2. Define policy sources, jurisdictions, employee data boundaries, and approval requirements.
3. Specify fairness, privacy, and sensitive-data safeguards.
4. Separate drafting and analysis from employment decisions.
5. Define escalation to HR, legal, or a manager.
6. Return an HR-skill blueprint with safe examples.

## Category Standards

- Ground answers in current HR policy and jurisdiction.
- Minimize employee personal data.
- Avoid making employment decisions automatically.
- Include fairness and consistency checks.
- Route sensitive or disputed cases to HR/legal review.
- Keep internal and employee-facing outputs separate.

## Checklist

- Trigger description names HR, people ops, recruiting, onboarding, performance, policy, employee, or workforce planning.
- Workflow defines policy source and jurisdiction.
- Skill includes privacy and fairness safeguards.
- Failure modes cover missing policy, sensitive data, protected-class risk, and unauthorized decisions.
- Output format matches the HR artifact.
- Validation includes a biased or sensitive scenario.

## Nice To Have

- Policy source hierarchy.
- Interview rubric.
- Onboarding checklist.
- Performance review template.
- Escalation matrix.

## Example Skill Ideas

- Onboarding plan skill.
- Recruiting screen rubric skill.
- HR policy answer skill.
- Performance review draft helper skill.

## Failure Modes

- Policy is missing or stale: ask for the current policy source.
- Sensitive employee data appears: minimize and redact unnecessary detail.
- Decision risk is high: provide structured support and require human owner approval.
- Jurisdiction matters: ask for location before giving procedural guidance.

## Output Format

Return:

```text
Skill concept: <name>
People workflow: <workflow>
Trigger description draft: <Use when...>
Policy sources:
- <source>
Safeguards:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
