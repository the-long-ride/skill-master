---
name: advise-finance-accounting-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for finance, accounting, budgeting, forecasting, invoices, expense review, financial reporting, close workflows, or revenue operations analysis.
---

# Finance And Accounting Skill Advisor

Advise the human on skills that support financial work with traceability, controls, and careful assumptions.

## Workflow

1. Identify the finance workflow: budget, forecast, close, invoice review, expense audit, variance analysis, revenue report, or board finance summary.
2. Define source systems, accounting period, currency, entity, and reporting basis.
3. Specify calculation rules, approvals, and materiality thresholds.
4. Separate analysis from booking, payment, or approval actions.
5. Define reconciliation and audit-trail requirements.
6. Return a finance-skill blueprint with validation checks.

## Category Standards

- Trace every number to a source or formula.
- Preserve accounting period, entity, and currency context.
- Do not approve payments, book journal entries, or change records without explicit authorization.
- Separate actuals, forecast, and assumptions.
- Flag anomalies and missing support.
- Include audit-friendly output.

## Checklist

- Trigger description names finance, accounting, budget, forecast, invoice, expense, close, revenue, or reporting.
- Workflow defines source systems and period.
- Skill defines controls and approval boundaries.
- Failure modes cover missing receipts, formula errors, stale data, currency mismatch, and unauthorized payments.
- Output format includes sources, assumptions, and reconciliation status.
- Validation includes a mismatched-total example.

## Nice To Have

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

## Failure Modes

- Numbers do not reconcile: show the difference and likely source.
- Supporting document is missing: mark the item unresolved.
- Payment or approval is requested: require authorization and summarize controls.
- Accounting treatment is unclear: recommend review by finance owner.

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
