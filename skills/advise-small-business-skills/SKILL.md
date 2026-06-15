---
name: advise-small-business-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for small business operations, owner-operator workflows, local services, solo teams, simple bookkeeping, customer communications, scheduling, or lightweight business automation
---

# Small Business Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the small business domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for small business.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the small business task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the small business context: local service, online shop, consultancy, creator business, agency, restaurant, or solo operation.
2. Define the recurring workflow: customer message, quote, invoice, schedule, inventory, marketing, review response, or basic reporting.
3. Choose simple source-of-truth systems and avoid enterprise-heavy assumptions.
4. Separate drafts and recommendations from payments, commitments, or customer sends.
5. Define practical validation and handoff steps for a non-specialist user.
6. Return a small-business skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Optimize for simplicity and low operational burden.
- Use plain-language outputs and minimal process overhead.
- Ground financial, legal, and tax-sensitive guidance in review boundaries.
- Keep customer communications draft-first.
- Include owner approval before commitments or payments.
- Prefer templates and checklists over complex systems.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names small business, owner-operator, local service, solo team, scheduling, quotes, invoices, or lightweight automation.
- Workflow defines the business type and recurring task.
- Skill includes simple source systems and approval boundaries.
- Failure modes cover missing business context, tax/legal risk, payment commitments, and customer privacy.
- Output format is usable by a non-specialist.
- Validation includes a vague owner request.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for small business workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This small business skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Business type is unclear: ask for industry, customer type, and workflow.
- Tax, legal, or payroll risk appears: provide general prep and recommend professional review.
- Customer commitment is requested: require owner approval.
- Source systems are informal: define a simple tracking sheet or checklist.

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
