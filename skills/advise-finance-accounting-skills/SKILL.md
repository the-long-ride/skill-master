---
name: advise-finance-accounting-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for finance, accounting, budgeting, forecasting, invoices, expense review, financial reporting, close workflows, or revenue operations analysis
---

# Finance And Accounting Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the finance & accounting domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for finance & accounting.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the finance & accounting task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the finance workflow: budget, forecast, close, invoice review, expense audit, variance analysis, revenue report, or board finance summary.
2. Define source systems, accounting period, currency, entity, and reporting basis.
3. Specify calculation rules, approvals, and materiality thresholds.
4. Separate analysis from booking, payment, or approval actions.
5. Define reconciliation and audit-trail requirements.
6. Return a finance-skill blueprint with validation checks.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Trace every number to a source or formula.
- Preserve accounting period, entity, and currency context.
- Do not approve payments, book journal entries, or change records without explicit authorization.
- Separate actuals, forecast, and assumptions.
- Flag anomalies and missing support.
- Include audit-friendly output.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names finance, accounting, budget, forecast, invoice, expense, close, revenue, or reporting.
- Workflow defines source systems and period.
- Skill defines controls and approval boundaries.
- Failure modes cover missing receipts, formula errors, stale data, currency mismatch, and unauthorized payments.
- Output format includes sources, assumptions, and reconciliation status.
- Validation includes a mismatched-total example.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Chart of accounts reference.
- Metric dictionary.
- Close checklist.
- Variance-analysis template.
- Approval matrix.

## Example Skill Ideas

- Invoice review skill.
- Budget variance skill.
- Month-end close checklist skill.
- Revenue report skill.

## Examples

Input: "Help me design a skill for finance & accounting workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This finance & accounting skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Numbers do not reconcile: show the difference and likely source.
- Supporting document is missing: mark the item unresolved.
- Payment or approval is requested: require authorization and summarize controls.
- Accounting treatment is unclear: recommend review by finance owner.

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
Finance workflow: <workflow>
Trigger description draft: <Use when...>
Source and period:
- <source>
Controls:
- <control>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
