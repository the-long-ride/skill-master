---
name: advise-frontend-design-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for frontend UI, UX, design systems, responsive web apps, visual polish, accessibility, or product interface implementation
---

# Frontend Design Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the frontend design domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for frontend design.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the frontend design task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the product type, audience, and primary workflow.
2. Define the design constraints: framework, component library, brand, density, accessibility, and viewport targets.
3. Specify what the skill should inspect before designing: existing components, CSS tokens, routes, and screenshots.
4. Define implementation guidance for layout, controls, states, and responsive behavior.
5. Add validation requirements for screenshots, interaction checks, and text fitting.
6. Return a skill blueprint with examples and quality gates.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Build the usable experience first, not a marketing shell.
- Match the existing design system when present.
- Require stable dimensions for boards, toolbars, cards, and repeated UI.
- Include accessibility and keyboard expectations when relevant.
- Require visual verification for meaningful UI changes.
- Keep design guidance domain-specific rather than purely decorative.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description mentions UI, UX, frontend, web app, or visual implementation.
- Workflow covers discovery of existing design patterns.
- Skill defines expected controls, empty states, loading states, and errors.
- Skill defines mobile and desktop viewport checks.
- Failure modes cover missing assets, unavailable dev server, and visual regressions.
- Output format includes implementation plan and verification evidence.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Component inventory reference.
- Screenshot comparison checklist.
- Design token reference.
- Accessibility quick checks.
- Example prompts by app type: SaaS, dashboard, game, portfolio, editor.

## Example Skill Ideas

- Dashboard UI builder skill.
- Design-system migration skill.
- Responsive layout repair skill.
- Visual QA skill.

## Examples

Input: "Help me design a skill for frontend design workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This frontend design skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- No design system exists: create a small local style vocabulary and document it in the skill.
- UI goal is vague: ask for target users and the main repeated workflow.
- Visual assets are missing: require suitable assets or define a generated-asset path.
- Verification cannot run: provide a manual screenshot checklist.

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
Frontend scope: <scope>
Audience and workflow: <summary>
Trigger description draft: <Use when...>
Design standards:
- <standard>
Required resources:
- <resource>
Validation:
- <viewport or interaction check>
```
