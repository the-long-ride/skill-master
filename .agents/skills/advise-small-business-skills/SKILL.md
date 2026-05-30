---
name: advise-small-business-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for small business operations, owner-operator workflows, local services, solo teams, simple bookkeeping, customer communications, scheduling, or lightweight business automation.
---

# Small Business Skill Advisor

Advise the human on skills for owner-operators and small teams that need practical, lightweight workflows across many business functions.

## Workflow

1. Identify the small business context: local service, online shop, consultancy, creator business, agency, restaurant, or solo operation.
2. Define the recurring workflow: customer message, quote, invoice, schedule, inventory, marketing, review response, or basic reporting.
3. Choose simple source-of-truth systems and avoid enterprise-heavy assumptions.
4. Separate drafts and recommendations from payments, commitments, or customer sends.
5. Define practical validation and handoff steps for a non-specialist user.
6. Return a small-business skill blueprint.

## Category Standards

- Optimize for simplicity and low operational burden.
- Use plain-language outputs and minimal process overhead.
- Ground financial, legal, and tax-sensitive guidance in review boundaries.
- Keep customer communications draft-first.
- Include owner approval before commitments or payments.
- Prefer templates and checklists over complex systems.

## Checklist

- Trigger description names small business, owner-operator, local service, solo team, scheduling, quotes, invoices, or lightweight automation.
- Workflow defines the business type and recurring task.
- Skill includes simple source systems and approval boundaries.
- Failure modes cover missing business context, tax/legal risk, payment commitments, and customer privacy.
- Output format is usable by a non-specialist.
- Validation includes a vague owner request.

## Nice To Have

- Quote template.
- Invoice checklist.
- Customer reply templates.
- Weekly business review template.
- Simple CRM or spreadsheet schema.

## Example Skill Ideas

- Local service quote skill.
- Customer review response skill.
- Weekly owner dashboard skill.
- Simple invoice follow-up skill.

## Failure Modes

- Business type is unclear: ask for industry, customer type, and workflow.
- Tax, legal, or payroll risk appears: provide general prep and recommend professional review.
- Customer commitment is requested: require owner approval.
- Source systems are informal: define a simple tracking sheet or checklist.

## Output Format

Return:

```text
Skill concept: <name>
Small business context: <context>
Trigger description draft: <Use when...>
Simple workflow:
1. <step>
Owner approval rules:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
