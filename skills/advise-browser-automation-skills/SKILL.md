---
name: advise-browser-automation-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for browser automation, web navigation, scraping, form filling, screenshots, visual inspection, or Playwright-style interaction workflows
---

# Browser Automation Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the browser automation domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for browser automation.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the browser automation task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the browser task: navigate, inspect, scrape, fill forms, capture screenshots, monitor pages, or operate an app.
2. Define site permissions, login expectations, robots or terms constraints, and data sensitivity.
3. Specify automation tools and fallback paths.
4. Define evidence capture: screenshot, DOM text, network result, console log, or downloaded file.
5. Add guardrails for destructive actions and user accounts.
6. Return a browser-automation skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Verify page state before and after actions.
- Avoid destructive account actions without explicit confirmation.
- Respect authentication and permission boundaries.
- Prefer robust selectors and visible-state checks.
- Capture evidence for important results.
- Separate browser automation from webapp QA when the main goal is operating third-party sites.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names browser automation, scraping, navigation, screenshots, or form filling.
- Workflow includes login and session handling.
- Skill defines screenshot or DOM evidence requirements.
- Failure modes cover captchas, blocked automation, changed selectors, timeouts, and login failures.
- Output format includes actions taken and evidence.
- Validation includes at least one changed-layout scenario.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Playwright helper scripts.
- Selector strategy reference.
- Screenshot naming convention.
- Rate-limit and politeness rules.
- Manual fallback instructions.

## Example Skill Ideas

- Website monitor skill.
- Form filling assistant skill.
- Visual capture skill.
- Web data extraction skill.

## Examples

Input: "Help me design a skill for browser automation workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This browser automation skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Captcha or bot block appears: stop and ask the human to continue manually.
- Selector fails: inspect visible labels and stable attributes before changing strategy.
- Login required: ask for authorized session setup instead of requesting passwords in plain text.
- Page action is risky: require explicit confirmation and summarize the action.

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
Browser workflow: <workflow>
Trigger description draft: <Use when...>
Automation standards:
- <standard>
Evidence:
- <evidence>
Failure recovery:
- <mode and recovery>
Validation prompts:
- <prompt>
```
