---
name: advise-business-operations-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for cross-functional business workflow automation, planning, approvals, stakeholder coordination, operating rhythms, or business processes that do not clearly belong to a more specific business advisor category.
---

# Business Operations Skill Advisor

Advise the human on skills that support recurring business workflows with clear source-of-truth and approval rules.

## Workflow

1. Identify the cross-functional workflow and confirm no specific business advisor owns it.
2. Define stakeholders, decision rights, source systems, and approval requirements.
3. Specify input artifacts and expected output artifacts.
4. Define tone, brand, policy, or operating constraints.
5. Add quality checks for accuracy, completeness, and audience fit.
6. Return a business-operations skill blueprint.

## Category Standards

- Anchor outputs in source-of-truth systems or supplied artifacts.
- Separate draft creation from final sending or publishing.
- Respect brand, legal, and approval boundaries.
- Include stakeholder, owner, and decision context.
- Define measurable success criteria when possible.
- Handle sensitive customer or employee data carefully.

## Checklist

- Trigger description names cross-functional planning, approvals, stakeholder coordination, operating rhythms, or general business process automation.
- Workflow defines stakeholders and approvals.
- Skill defines source-of-truth references.
- Failure modes cover stale data, missing context, policy conflicts, and accidental sending.
- Output format matches the business artifact.
- Examples include realistic workplace prompts.

## Nice To Have

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

## Failure Modes

- Source data is missing: ask for the system or artifact of record.
- Approval is required: return a draft and call out the approver.
- Tone or policy conflicts: choose the stricter constraint and explain it.
- Sensitive data appears: minimize exposure and avoid unnecessary copying.

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
