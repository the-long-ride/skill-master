---
name: advise-software-engineering-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for software engineering workflows such as code editing, debugging, code review, refactoring, migrations, repository analysis, or developer tooling
---

# Software Engineering Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the software engineering domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for software engineering.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the software engineering task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the engineering workflow: edit, review, debug, test, migrate, scaffold, explain, or operate developer tools.
2. Define the expected artifacts: patch, review findings, command output summary, migration plan, or generated files.
3. Specify repository discovery steps before edits.
4. Define tool rules for reading files, searching code, running tests, and preserving user changes.
5. Choose resources: scripts for repeated mechanics, references for framework conventions, assets for templates.
6. Define validation prompts and commands that prove the skill works.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Require codebase inspection before implementation advice.
- Preserve unrelated user changes.
- Prefer local patterns over invented abstractions.
- Include verification proportional to risk.
- Lead review outputs with bugs and line references.
- Never make destructive git or filesystem actions the default.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names concrete engineering tasks.
- Workflow distinguishes analysis-only requests from edit requests.
- Skill defines when to run tests, linters, type checks, or build commands.
- Failure modes cover missing dependencies, failing tests, and dirty worktrees.
- Output format fits the task: patch summary, review report, or command summary.
- References capture stack-specific conventions instead of generic coding advice.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Language or framework-specific reference files.
- Reusable migration scripts.
- Test fixture templates.
- Review severity rubric.
- Examples for small, medium, and cross-module changes.

## Example Skill Ideas

- React migration skill.
- Code review skill.
- TypeScript test repair skill.
- CLI command implementation skill.

## Examples

Input: "Help me design a skill for software engineering workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This software engineering skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Unknown stack: inspect package files, lockfiles, and directory names before selecting tooling.
- Tests unavailable: explain the missing tool or dependency and provide a manual verification path.
- Dirty workspace affects target files: read the affected files and work with existing changes.
- Large refactor risk: propose staged edits and validation checkpoints.

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
Engineering scope: <workflow>
Trigger description draft: <Use when...>
Required workflow:
1. <step>
Resources:
- scripts: <items>
- references: <items>
- assets: <items>
Validation prompts:
- <prompt>
Failure recovery:
- <mode and recovery>
```
