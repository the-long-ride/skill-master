---
name: advise-sales-revenue-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for sales, revenue, account planning, prospecting, deal research, CRM hygiene, outreach, pipeline review, or customer-facing sales workflows
---

# Sales And Revenue Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the sales & revenue domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for sales & revenue.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the sales & revenue task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the sales workflow: prospecting, account research, outreach drafting, call prep, CRM update, pipeline review, proposal support, or renewal.
2. Define the source systems: CRM, email, calendar, call transcript, account notes, product docs, pricing, and approved messaging.
3. Separate draft generation from sending, updating, or committing customer-facing actions.
4. Define personalization rules, factual grounding, and approval requirements.
5. Specify validation for account facts, deal stage, next steps, and contact details.
6. Return a sales-skill blueprint with guardrails and examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ground account claims in CRM or supplied sources.
- Never fabricate customer facts, budgets, competitors, or commitments.
- Treat external outreach as draft-only unless explicit approval exists.
- Respect do-not-contact, territory, and account ownership rules.
- Include next-step and CRM hygiene checks.
- Keep tone aligned with approved sales messaging.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names sales, revenue, CRM, account, prospecting, deal, outreach, or pipeline.
- Workflow defines source-of-truth systems.
- Skill distinguishes internal prep from external communication.
- Failure modes cover stale CRM data, missing contact info, policy conflicts, and accidental sending.
- Output format matches the sales artifact.
- Validation includes a hallucination-resistance prompt.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- CRM field map.
- Approved outreach templates.
- Qualification framework reference.
- Account research checklist.
- Objection and competitor battlecard references.

## Example Skill Ideas

- Account brief builder skill.
- Sales call prep skill.
- CRM cleanup skill.
- Renewal risk summary skill.

## Examples

Input: "Help me design a skill for sales & revenue workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This sales & revenue skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- CRM data is stale: mark uncertainty and ask for confirmation before using it externally.
- Contact rules are unclear: avoid outreach and request ownership or consent details.
- Pricing or discounting is requested: require approved pricing source and human review.
- Customer commitment is ambiguous: quote the source or label it as unconfirmed.

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
Sales workflow: <workflow>
Trigger description draft: <Use when...>
Source systems:
- <source>
Guardrails:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
