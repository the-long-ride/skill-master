---
name: advise-testing-qa-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for testing, QA, regression checks, browser verification, accessibility checks, performance checks, or test automation workflows
---

# Testing And QA Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the testing & qa domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for testing & qa.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the testing & qa task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the target quality surface: unit, integration, end-to-end, browser, accessibility, performance, or release regression.
2. Define the test entry points and required environment setup.
3. Specify how the skill should select focused tests before broad suites.
4. Define evidence capture: logs, screenshots, traces, coverage, or failing assertions.
5. Define failure triage and retry rules.
6. Return a test-skill blueprint with validation examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Tests must be tied to observable behavior.
- Skill must separate failing setup from failing product behavior.
- Browser skills must verify pages with screenshots or DOM evidence when possible.
- Performance skills must define thresholds.
- Accessibility checks must name the target standard or heuristic.
- Output must summarize command results clearly.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names testing or QA tasks.
- Workflow identifies when to start or reuse dev servers.
- Skill defines how to handle flaky tests.
- Skill defines what evidence to collect.
- Failure modes cover missing dependencies, unavailable browsers, and timeouts.
- Output format includes test command, result, and next action.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for testing & qa workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This testing & qa skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Test environment fails to start: capture logs and report setup blockers separately.
- Browser unavailable: suggest headless alternatives or manual verification.
- Flaky result: rerun once, compare evidence, and mark uncertainty.
- No tests exist: propose the smallest meaningful test before broader coverage.

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
