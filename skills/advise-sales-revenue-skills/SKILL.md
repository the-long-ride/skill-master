---
name: advise-sales-revenue-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for sales, revenue, account planning, prospecting, deal research, CRM hygiene, outreach, pipeline review, or customer-facing sales workflows.
---

# Sales And Revenue Skill Advisor

Advise the human on skills that help sales teams prepare, personalize, update systems, and move deals without inventing facts or sending unapproved messages.

## Workflow

1. Identify the sales workflow: prospecting, account research, outreach drafting, call prep, CRM update, pipeline review, proposal support, or renewal.
2. Define the source systems: CRM, email, calendar, call transcript, account notes, product docs, pricing, and approved messaging.
3. Separate draft generation from sending, updating, or committing customer-facing actions.
4. Define personalization rules, factual grounding, and approval requirements.
5. Specify validation for account facts, deal stage, next steps, and contact details.
6. Return a sales-skill blueprint with guardrails and examples.

## Category Standards

- Ground account claims in CRM or supplied sources.
- Never fabricate customer facts, budgets, competitors, or commitments.
- Treat external outreach as draft-only unless explicit approval exists.
- Respect do-not-contact, territory, and account ownership rules.
- Include next-step and CRM hygiene checks.
- Keep tone aligned with approved sales messaging.

## Checklist

- Trigger description names sales, revenue, CRM, account, prospecting, deal, outreach, or pipeline.
- Workflow defines source-of-truth systems.
- Skill distinguishes internal prep from external communication.
- Failure modes cover stale CRM data, missing contact info, policy conflicts, and accidental sending.
- Output format matches the sales artifact.
- Validation includes a hallucination-resistance prompt.

## Nice To Have

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

## Failure Modes

- CRM data is stale: mark uncertainty and ask for confirmation before using it externally.
- Contact rules are unclear: avoid outreach and request ownership or consent details.
- Pricing or discounting is requested: require approved pricing source and human review.
- Customer commitment is ambiguous: quote the source or label it as unconfirmed.

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
