---
name: advise-customer-support-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for customer support, customer success, ticket triage, case summaries, escalation handling, help-center updates, or support communications
---

# Customer Support Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the customer support domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for customer support.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the customer support task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the support workflow: ticket triage, response drafting, escalation, bug handoff, case summary, sentiment review, or knowledge-base update.
2. Define source systems: ticketing tool, product docs, account data, incident status, logs, and policy references.
3. Specify how the skill should classify severity, urgency, customer impact, and ownership.
4. Separate draft responses from sending or changing ticket state.
5. Define validation for policy accuracy, product facts, empathy, and next steps.
6. Return a support-skill blueprint with escalation rules.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ground product answers in current docs or supplied context.
- Escalate safety, privacy, billing, legal, or production incidents.
- Preserve customer tone without overpromising.
- Include concise internal summaries for handoff.
- Avoid exposing internal-only details to customers.
- Track uncertainty and missing information.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names support, customer success, tickets, cases, escalation, help center, or customer response.
- Workflow defines severity and routing rules.
- Skill distinguishes internal notes from customer-facing drafts.
- Failure modes cover missing logs, policy conflicts, angry customers, and incident ambiguity.
- Output format includes response draft, internal summary, and next action when useful.
- Validation includes a misleading customer claim or incomplete-ticket case.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for customer support workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This customer support skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Product behavior is unclear: ask for logs, version, environment, or reproduction steps.
- Customer asks for restricted action: provide policy-safe next steps and escalate.
- Incident may be active: check incident source and avoid definitive claims.
- Draft may expose internal details: split internal and external outputs.

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
