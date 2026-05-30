---
name: advise-operations-process-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for business operations, process management, vendor coordination, procurement, project operations, SOPs, inventory, scheduling, or cross-functional execution workflows.
---

# Operations And Process Skill Advisor

Advise the human on skills that make repeatable business processes clearer, safer, and easier to operate.

## Workflow

1. Identify the operations workflow: SOP creation, process audit, vendor task, procurement, inventory, project coordination, scheduling, or cross-functional follow-up.
2. Define owners, systems of record, handoffs, approvals, and service levels.
3. Specify what the skill may draft, update, assign, or only recommend.
4. Define exception handling and escalation paths.
5. Add process-quality checks for completeness, bottlenecks, and accountability.
6. Return an operations-skill blueprint.

## Category Standards

- Make ownership and next actions explicit.
- Use systems of record for status and commitments.
- Separate recommendations from actual assignments or purchases.
- Include escalation and exception handling.
- Preserve audit trail for approvals and changes.
- Keep process artifacts concise and executable.

## Checklist

- Trigger description names operations, process, SOP, vendor, procurement, inventory, scheduling, project ops, or cross-functional execution.
- Workflow defines owners and handoffs.
- Skill includes approval and escalation rules.
- Failure modes cover missing owner, conflicting deadlines, incomplete inputs, and unauthorized commitments.
- Output format includes task owner, due date, status, and blocker where relevant.
- Validation includes an ambiguous ownership case.

## Nice To Have

- SOP template.
- RACI or owner matrix.
- Vendor checklist.
- Procurement approval matrix.
- Project status template.

## Example Skill Ideas

- SOP builder skill.
- Vendor follow-up skill.
- Procurement intake skill.
- Project operations tracker skill.

## Failure Modes

- Owner is missing: assign no action and ask for decision owner.
- Approval is required: draft the request and flag approver.
- Deadline conflict exists: surface the tradeoff and escalation path.
- System of record is unavailable: mark status as unverified.

## Output Format

Return:

```text
Skill concept: <name>
Operations workflow: <workflow>
Trigger description draft: <Use when...>
Owners and systems:
- <owner or system>
Process guardrails:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
