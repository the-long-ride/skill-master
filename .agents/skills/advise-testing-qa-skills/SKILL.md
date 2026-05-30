---
name: advise-testing-qa-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for testing, QA, regression checks, browser verification, accessibility checks, performance checks, or test automation workflows.
---

# Testing And QA Skill Advisor

Advise the human on skills that make quality checks repeatable and evidence-based.

## Workflow

1. Identify the target quality surface: unit, integration, end-to-end, browser, accessibility, performance, or release regression.
2. Define the test entry points and required environment setup.
3. Specify how the skill should select focused tests before broad suites.
4. Define evidence capture: logs, screenshots, traces, coverage, or failing assertions.
5. Define failure triage and retry rules.
6. Return a test-skill blueprint with validation examples.

## Category Standards

- Tests must be tied to observable behavior.
- Skill must separate failing setup from failing product behavior.
- Browser skills must verify pages with screenshots or DOM evidence when possible.
- Performance skills must define thresholds.
- Accessibility checks must name the target standard or heuristic.
- Output must summarize command results clearly.

## Checklist

- Trigger description names testing or QA tasks.
- Workflow identifies when to start or reuse dev servers.
- Skill defines how to handle flaky tests.
- Skill defines what evidence to collect.
- Failure modes cover missing dependencies, unavailable browsers, and timeouts.
- Output format includes test command, result, and next action.

## Nice To Have

- Reusable Playwright fixtures.
- Test data builders.
- Accessibility checklist.
- Performance budget reference.
- Screenshot artifact naming convention.

## Example Skill Ideas

- Webapp testing skill.
- Regression triage skill.
- Accessibility audit skill.
- Performance smoke test skill.

## Failure Modes

- Test environment fails to start: capture logs and report setup blockers separately.
- Browser unavailable: suggest headless alternatives or manual verification.
- Flaky result: rerun once, compare evidence, and mark uncertainty.
- No tests exist: propose the smallest meaningful test before broader coverage.

## Output Format

Return:

```text
Skill concept: <name>
QA surface: <surface>
Trigger description draft: <Use when...>
Workflow steps:
1. <step>
Evidence to collect:
- <evidence>
Failure recovery:
- <mode and recovery>
Validation prompts:
- <prompt>
```
