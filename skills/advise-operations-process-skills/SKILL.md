---
name: advise-operations-process-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for business operations, process management, vendor coordination, procurement, project operations, SOPs, inventory, scheduling, or cross-functional execution workflows
---

# Operations And Process Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the operations & process domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for operations & process.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the operations & process task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the operations workflow: SOP creation, process audit, vendor task, procurement, inventory, project coordination, scheduling, or cross-functional follow-up.
2. Define owners, systems of record, handoffs, approvals, and service levels.
3. Specify what the skill may draft, update, assign, or only recommend.
4. Define exception handling and escalation paths.
5. Add process-quality checks for completeness, bottlenecks, and accountability.
6. Return an operations-skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Make ownership and next actions explicit.
- Use systems of record for status and commitments.
- Separate recommendations from actual assignments or purchases.
- Include escalation and exception handling.
- Preserve audit trail for approvals and changes.
- Keep process artifacts concise and executable.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names operations, process, SOP, vendor, procurement, inventory, scheduling, project ops, or cross-functional execution.
- Workflow defines owners and handoffs.
- Skill includes approval and escalation rules.
- Failure modes cover missing owner, conflicting deadlines, incomplete inputs, and unauthorized commitments.
- Output format includes task owner, due date, status, and blocker where relevant.
- Validation includes an ambiguous ownership case.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for operations & process workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This operations & process skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Owner is missing: assign no action and ask for decision owner.
- Approval is required: draft the request and flag approver.
- Deadline conflict exists: surface the tradeoff and escalation path.
- System of record is unavailable: mark status as unverified.

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
