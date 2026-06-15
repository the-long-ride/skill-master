---
name: advise-data-analytics-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for data analysis, BI, SQL, spreadsheets, notebooks, dashboards, metrics, data cleaning, or reproducible analytical workflows
---

# Data Analytics Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the data analytics domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for data analytics.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the data analytics task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the analysis surface: spreadsheet, SQL database, warehouse, notebook, dashboard, logs, or metrics layer.
2. Define data access, schema discovery, and privacy constraints.
3. Specify how the skill should validate assumptions before analysis.
4. Define reproducible computation steps and artifact outputs.
5. Require caveats for missing, stale, sampled, or ambiguous data.
6. Return an analytics-skill blueprint with validation examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Inspect schema and sample data before answering.
- Do not fabricate missing values or metrics.
- Keep transformations reproducible.
- Separate facts from interpretation.
- Cite queries, files, or calculation paths.
- Define chart and dashboard validation when visual outputs are required.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names analysis, metrics, BI, SQL, spreadsheet, or dashboard tasks.
- Workflow includes data provenance and schema discovery.
- Skill defines privacy and access boundaries.
- Failure modes cover missing columns, stale data, nulls, duplicate records, and query errors.
- Output format includes assumptions and confidence.
- Scripts or notebooks are used for repeatable calculations.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for data analytics workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This data analytics skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Schema unknown: inspect metadata or ask for a schema file before analysis.
- Metric definition unclear: ask for the canonical definition or return alternative interpretations.
- Data quality issue: quantify the issue and avoid overconfident conclusions.
- Query fails: report the query, error, and smallest next fix.

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
