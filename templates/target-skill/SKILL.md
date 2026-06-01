---
name: {{skillName}}
description: {{description}}
---

# {{skillTitle}}

## Overview

{{overview}}

## When To Use

- Use when the request matches `{{categoryId}}` and the human expects a repeatable agent workflow.
- Use when the task needs the sources, guardrails, validation, and output contract in `references/blueprint.md`.
- Do not use when the request matches one of the negative routing examples in `references/forward-test-prompts.md`.

## Inputs And Tools

- Human request and any supplied files, links, tool outputs, or source systems.
- Category blueprint: `references/blueprint.md`.
- Forward-test prompts: `references/forward-test-prompts.md`.
- Optional Codex-native authoring process: `references/codex-native-process.md`.

## Workflow

1. Confirm that the request fits this skill's frontmatter description and the routed category.
2. Gather the required inputs, permissions, source material, and constraints before producing the artifact.
3. Follow the category-specific blueprint and adapt it to the user's concrete environment.
4. Produce the requested artifact using the output format below.
5. When editing or publishing this skill, run the forward-test prompts and fix any routing or behavior failures.

## Failure Modes

- Wrong category selected: stop, name the better category, and route to the correct advisor before continuing.
- Missing source material: ask for the smallest specific input needed or clearly mark the assumption.
- Unsafe or state-changing action requested: switch to draft-only output unless the human explicitly approves the action.
- Output contract is unclear: use the format below and list any unresolved gaps.

## Output Format

Return:

```text
Skill result: <artifact or recommendation>
Inputs used:
- <source or file>
Assumptions:
- <assumption or none>
Validation:
- <check performed>
Open issues:
- <issue or none>
```
