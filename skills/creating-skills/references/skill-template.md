# Skill Template

```markdown
---
name: skill-name
description: Use when ...
---

# Skill Name

## Overview
One short paragraph describing the core principle.

## When To Use
- Trigger 1
- Trigger 2
- Do not use when ...

## Inputs And Tools
- Exact tools, files, commands, APIs, and constraints
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents

## Workflow
1. First step
2. Second step
3. Third step

## Failure Modes
- Common mistake and recovery
- Common mistake and recovery

## Verification
- One trigger-positive prompt
- One trigger-negative prompt
- Manual or scripted check with evidence

## Output Format
- What the agent should produce or report

## Examples
Input:
...

Output:
...

## Human Verification
- Checklist source: references/skill-checklist.md
- Verification result format: PASS/PARTIAL/FAIL with required fixes
```

## Notes

- Keep the description trigger-only.
- Move large reference tables into a separate file.
- Prefer short examples over long explanations.
- If humans will audit this skill, include a deterministic verification section.
- For advisor skills, clearly separate skill-design advice from direct domain execution.

## Example Prompts to Validate Triggering

- "Help me write a new skill for flaky integration tests."
- "My SKILL.md is too generic and does not trigger reliably."
- "Review this skill and tell me if it passes a checklist."
- "Do the task directly instead of designing the skill."

## Example Completion Report

```text
Skill drafted: skills/<name>/SKILL.md
Activation clarity: PASS
Workflow executability: PASS
Failure mode coverage: PARTIAL (2 of 3)
Checklist status: NEEDS REVISION
Next fixes:
1) Add explicit recovery for tool failure
2) Add output format for reviewer-facing responses
```
