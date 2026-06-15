---
name: advise-business-operations-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for cross-functional business workflow automation, planning, approvals, stakeholder coordination, operating rhythms, or business processes that do not clearly belong to a more specific business advisor category
---

# Business Operations Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the business operations domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for business operations.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the business operations task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the cross-functional workflow and confirm no specific business advisor owns it.
2. Define stakeholders, decision rights, source systems, and approval requirements.
3. Specify input artifacts and expected output artifacts.
4. Define tone, brand, policy, or operating constraints.
5. Add quality checks for accuracy, completeness, and audience fit.
6. Return a business-operations skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Anchor outputs in source-of-truth systems or supplied artifacts.
- Separate draft creation from final sending or publishing.
- Respect brand, legal, and approval boundaries.
- Include stakeholder, owner, and decision context.
- Define measurable success criteria when possible.
- Handle sensitive customer or employee data carefully.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names cross-functional planning, approvals, stakeholder coordination, operating rhythms, or general business process automation.
- Workflow defines stakeholders and approvals.
- Skill defines source-of-truth references.
- Failure modes cover stale data, missing context, policy conflicts, and accidental sending.
- Output format matches the business artifact.
- Examples include realistic workplace prompts.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Operating cadence reference.
- Decision-rights matrix.
- Business review template.
- Approval checklist.
- KPI definitions.

## Example Skill Ideas

- Quarterly business review skill.
- Cross-functional planning skill.
- Approval packet builder skill.
- Operating rhythm assistant skill.

## Examples

Input: "Help me design a skill for business operations workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This business operations skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Source data is missing: ask for the system or artifact of record.
- Approval is required: return a draft and call out the approver.
- Tone or policy conflicts: choose the stricter constraint and explain it.
- Sensitive data appears: minimize exposure and avoid unnecessary copying.

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
Business function: <function>
Trigger description draft: <Use when...>
Source-of-truth:
- <source>
Workflow:
1. <step>
Approval and safety:
- <rule>
Validation:
- <check>
```
