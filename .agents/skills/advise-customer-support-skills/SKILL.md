---
name: advise-customer-support-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for customer support, customer success, ticket triage, case summaries, escalation handling, help-center updates, or support communications.
---

# Customer Support Skill Advisor

Advise the human on skills that help support teams respond accurately, triage quickly, and preserve customer trust.

## Workflow

1. Identify the support workflow: ticket triage, response drafting, escalation, bug handoff, case summary, sentiment review, or knowledge-base update.
2. Define source systems: ticketing tool, product docs, account data, incident status, logs, and policy references.
3. Specify how the skill should classify severity, urgency, customer impact, and ownership.
4. Separate draft responses from sending or changing ticket state.
5. Define validation for policy accuracy, product facts, empathy, and next steps.
6. Return a support-skill blueprint with escalation rules.

## Category Standards

- Ground product answers in current docs or supplied context.
- Escalate safety, privacy, billing, legal, or production incidents.
- Preserve customer tone without overpromising.
- Include concise internal summaries for handoff.
- Avoid exposing internal-only details to customers.
- Track uncertainty and missing information.

## Checklist

- Trigger description names support, customer success, tickets, cases, escalation, help center, or customer response.
- Workflow defines severity and routing rules.
- Skill distinguishes internal notes from customer-facing drafts.
- Failure modes cover missing logs, policy conflicts, angry customers, and incident ambiguity.
- Output format includes response draft, internal summary, and next action when useful.
- Validation includes a misleading customer claim or incomplete-ticket case.

## Nice To Have

- Severity rubric.
- Response templates.
- Escalation matrix.
- Product support glossary.
- Help-center article template.

## Example Skill Ideas

- Ticket triage skill.
- Customer response drafter skill.
- Escalation summary skill.
- Help-center update skill.

## Failure Modes

- Product behavior is unclear: ask for logs, version, environment, or reproduction steps.
- Customer asks for restricted action: provide policy-safe next steps and escalate.
- Incident may be active: check incident source and avoid definitive claims.
- Draft may expose internal details: split internal and external outputs.

## Output Format

Return:

```text
Skill concept: <name>
Support workflow: <workflow>
Trigger description draft: <Use when...>
Source systems:
- <source>
Escalation rules:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
