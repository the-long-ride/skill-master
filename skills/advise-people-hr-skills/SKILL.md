---
name: advise-people-hr-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for HR, recruiting, onboarding, performance cycles, employee communications, policy lookup, people operations, or workforce planning
---

# People And HR Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the people & hr domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for people & hr.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the people & hr task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the people workflow: recruiting, interview prep, onboarding, policy answer, performance review support, employee comms, workforce planning, or HR ticket triage.
2. Define policy sources, jurisdictions, employee data boundaries, and approval requirements.
3. Specify fairness, privacy, and sensitive-data safeguards.
4. Separate drafting and analysis from employment decisions.
5. Define escalation to HR, legal, or a manager.
6. Return an HR-skill blueprint with safe examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ground answers in current HR policy and jurisdiction.
- Minimize employee personal data.
- Avoid making employment decisions automatically.
- Include fairness and consistency checks.
- Route sensitive or disputed cases to HR/legal review.
- Keep internal and employee-facing outputs separate.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names HR, people ops, recruiting, onboarding, performance, policy, employee, or workforce planning.
- Workflow defines policy source and jurisdiction.
- Skill includes privacy and fairness safeguards.
- Failure modes cover missing policy, sensitive data, protected-class risk, and unauthorized decisions.
- Output format matches the HR artifact.
- Validation includes a biased or sensitive scenario.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for people & hr workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This people & hr skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Policy is missing or stale: ask for the current policy source.
- Sensitive employee data appears: minimize and redact unnecessary detail.
- Decision risk is high: provide structured support and require human owner approval.
- Jurisdiction matters: ask for location before giving procedural guidance.

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
