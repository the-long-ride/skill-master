---
name: advise-design-ux-work-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for design work, UX research, product design critique, design briefs, Figma handoff, UX writing, or creative business design workflows
---

# Design And UX Work Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the design & ux work domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for design & ux work.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the design & ux work task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the design workflow: UX research, critique, design brief, Figma handoff, UX writing, design QA, or stakeholder presentation.
2. Define users, product context, brand system, accessibility expectations, and deliverable format.
3. Specify evidence sources: designs, prototypes, research notes, analytics, support feedback, and brand guidelines.
4. Separate design critique from implementation.
5. Add validation for usability, consistency, accessibility, and handoff completeness.
6. Return a design-work skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ground critique in user goals and product context.
- Respect existing design systems and brand rules.
- Include accessibility and usability checks.
- Keep feedback specific, prioritized, and actionable.
- Separate subjective taste from evidence-backed issues.
- Define handoff artifacts clearly.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names design, UX, research, critique, Figma, handoff, UX writing, or design brief.
- Workflow defines audience and deliverable.
- Skill includes design-system and accessibility expectations.
- Failure modes cover missing context, inaccessible artifacts, vague taste feedback, and unsupported claims.
- Output format fits critique, brief, handoff, or research synthesis.
- Validation includes a design with conflicting stakeholder goals.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Design critique rubric.
- UX research synthesis template.
- Handoff checklist.
- UX writing style guide.
- Accessibility heuristic reference.

## Example Skill Ideas

- Design critique skill.
- Figma handoff review skill.
- UX research synthesis skill.
- UX writing polish skill.

## Examples

Input: "Help me design a skill for design & ux work workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This design & ux work skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Artifact is unavailable: ask for screenshots, prototype link, or exported frames.
- Product goal is unclear: ask for user, job-to-be-done, and success metric.
- Feedback is subjective: label taste separately from usability risk.
- Accessibility risk appears: make it a required fix, not a style preference.

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
Design workflow: <workflow>
Trigger description draft: <Use when...>
Context and evidence:
- <source>
Quality standards:
- <standard>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
