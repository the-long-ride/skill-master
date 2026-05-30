---
name: advise-data-analytics-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for data analysis, BI, SQL, spreadsheets, notebooks, dashboards, metrics, data cleaning, or reproducible analytical workflows.
---

# Data Analytics Skill Advisor

Advise the human on skills that turn data questions into reproducible, inspectable analysis.

## Workflow

1. Identify the analysis surface: spreadsheet, SQL database, warehouse, notebook, dashboard, logs, or metrics layer.
2. Define data access, schema discovery, and privacy constraints.
3. Specify how the skill should validate assumptions before analysis.
4. Define reproducible computation steps and artifact outputs.
5. Require caveats for missing, stale, sampled, or ambiguous data.
6. Return an analytics-skill blueprint with validation examples.

## Category Standards

- Inspect schema and sample data before answering.
- Do not fabricate missing values or metrics.
- Keep transformations reproducible.
- Separate facts from interpretation.
- Cite queries, files, or calculation paths.
- Define chart and dashboard validation when visual outputs are required.

## Checklist

- Trigger description names analysis, metrics, BI, SQL, spreadsheet, or dashboard tasks.
- Workflow includes data provenance and schema discovery.
- Skill defines privacy and access boundaries.
- Failure modes cover missing columns, stale data, nulls, duplicate records, and query errors.
- Output format includes assumptions and confidence.
- Scripts or notebooks are used for repeatable calculations.

## Nice To Have

- Schema reference files.
- Metric dictionary.
- Reusable SQL templates.
- Data-quality checklist.
- Chart style and accessibility guide.

## Example Skill Ideas

- Revenue metrics analyst skill.
- SQL dashboard builder skill.
- CSV cleaning skill.
- Spreadsheet audit skill.

## Failure Modes

- Schema unknown: inspect metadata or ask for a schema file before analysis.
- Metric definition unclear: ask for the canonical definition or return alternative interpretations.
- Data quality issue: quantify the issue and avoid overconfident conclusions.
- Query fails: report the query, error, and smallest next fix.

## Output Format

Return:

```text
Skill concept: <name>
Analytics surface: <surface>
Trigger description draft: <Use when...>
Required workflow:
1. <step>
Data safeguards:
- <safeguard>
Validation:
- <check>
Expected output:
- <artifact>
```
