---
name: advise-browser-automation-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for browser automation, web navigation, scraping, form filling, screenshots, visual inspection, or Playwright-style interaction workflows.
---

# Browser Automation Skill Advisor

Advise the human on skills that operate web pages through a browser or browser-like automation.

## Workflow

1. Identify the browser task: navigate, inspect, scrape, fill forms, capture screenshots, monitor pages, or operate an app.
2. Define site permissions, login expectations, robots or terms constraints, and data sensitivity.
3. Specify automation tools and fallback paths.
4. Define evidence capture: screenshot, DOM text, network result, console log, or downloaded file.
5. Add guardrails for destructive actions and user accounts.
6. Return a browser-automation skill blueprint.

## Category Standards

- Verify page state before and after actions.
- Avoid destructive account actions without explicit confirmation.
- Respect authentication and permission boundaries.
- Prefer robust selectors and visible-state checks.
- Capture evidence for important results.
- Separate browser automation from webapp QA when the main goal is operating third-party sites.

## Checklist

- Trigger description names browser automation, scraping, navigation, screenshots, or form filling.
- Workflow includes login and session handling.
- Skill defines screenshot or DOM evidence requirements.
- Failure modes cover captchas, blocked automation, changed selectors, timeouts, and login failures.
- Output format includes actions taken and evidence.
- Validation includes at least one changed-layout scenario.

## Nice To Have

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

## Failure Modes

- Captcha or bot block appears: stop and ask the human to continue manually.
- Selector fails: inspect visible labels and stable attributes before changing strategy.
- Login required: ask for authorized session setup instead of requesting passwords in plain text.
- Page action is risky: require explicit confirmation and summarize the action.

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
