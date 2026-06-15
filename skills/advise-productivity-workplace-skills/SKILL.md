---
name: advise-productivity-workplace-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for workplace productivity, meetings, calendars, email, notes, task management, personal operating systems, or executive assistant workflows
---

# Productivity And Workplace Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the productivity & workplace domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for productivity & workplace.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the productivity & workplace task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the productivity workflow: meeting prep, notes, action items, calendar planning, email drafting, task triage, weekly review, or executive assistant support.
2. Define personal preferences, calendar rules, communication style, and source systems.
3. Separate draft suggestions from sending, scheduling, or committing actions.
4. Define how tasks, decisions, and follow-ups are extracted and verified.
5. Add privacy and delegation boundaries.
6. Return a productivity-skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Preserve the user's preferences and communication style.
- Distinguish decisions, action items, and background notes.
- Never send messages or change calendars without explicit approval.
- Include due dates, owners, and context links when available.
- Avoid exposing private calendar or message details unnecessarily.
- Mark uncertain commitments.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names meetings, calendar, email, notes, tasks, productivity, assistant, or weekly review.
- Workflow defines source systems and personal preferences.
- Skill includes approval boundaries for sending and scheduling.
- Failure modes cover missing context, double-booking, private information, and ambiguous action items.
- Output format includes concise decisions and next actions.
- Validation includes a meeting transcript with ambiguous ownership.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Meeting-note template.
- Task schema.
- Calendar rules.
- Communication style reference.
- Weekly review checklist.

## Example Skill Ideas

- Meeting brief skill.
- Action item extractor skill.
- Inbox triage skill.
- Weekly review skill.

## Examples

Input: "Help me design a skill for productivity & workplace workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This productivity & workplace skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Action owner is unclear: label it unresolved instead of assigning silently.
- Scheduling conflict appears: surface options and ask for choice.
- Message draft is sensitive: require review before sending.
- Preferences conflict: prefer the most recent explicit instruction.

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
Productivity workflow: <workflow>
Trigger description draft: <Use when...>
Preferences and systems:
- <source>
Approval boundaries:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
