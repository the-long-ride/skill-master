---
name: advise-productivity-workplace-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for workplace productivity, meetings, calendars, email, notes, task management, personal operating systems, or executive assistant workflows.
---

# Productivity And Workplace Skill Advisor

Advise the human on skills that help knowledge workers manage meetings, messages, tasks, and decisions without losing context.

## Workflow

1. Identify the productivity workflow: meeting prep, notes, action items, calendar planning, email drafting, task triage, weekly review, or executive assistant support.
2. Define personal preferences, calendar rules, communication style, and source systems.
3. Separate draft suggestions from sending, scheduling, or committing actions.
4. Define how tasks, decisions, and follow-ups are extracted and verified.
5. Add privacy and delegation boundaries.
6. Return a productivity-skill blueprint.

## Category Standards

- Preserve the user's preferences and communication style.
- Distinguish decisions, action items, and background notes.
- Never send messages or change calendars without explicit approval.
- Include due dates, owners, and context links when available.
- Avoid exposing private calendar or message details unnecessarily.
- Mark uncertain commitments.

## Checklist

- Trigger description names meetings, calendar, email, notes, tasks, productivity, assistant, or weekly review.
- Workflow defines source systems and personal preferences.
- Skill includes approval boundaries for sending and scheduling.
- Failure modes cover missing context, double-booking, private information, and ambiguous action items.
- Output format includes concise decisions and next actions.
- Validation includes a meeting transcript with ambiguous ownership.

## Nice To Have

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

## Failure Modes

- Action owner is unclear: label it unresolved instead of assigning silently.
- Scheduling conflict appears: surface options and ask for choice.
- Message draft is sensitive: require review before sending.
- Preferences conflict: prefer the most recent explicit instruction.

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
