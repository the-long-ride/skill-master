---
name: advise-software-engineering-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for software engineering workflows such as code editing, debugging, code review, refactoring, migrations, repository analysis, or developer tooling.
---

# Software Engineering Skill Advisor

Advise the human on building skills that help agents work in codebases safely and effectively.

## Workflow

1. Identify the engineering workflow: edit, review, debug, test, migrate, scaffold, explain, or operate developer tools.
2. Define the expected artifacts: patch, review findings, command output summary, migration plan, or generated files.
3. Specify repository discovery steps before edits.
4. Define tool rules for reading files, searching code, running tests, and preserving user changes.
5. Choose resources: scripts for repeated mechanics, references for framework conventions, assets for templates.
6. Define validation prompts and commands that prove the skill works.

## Category Standards

- Require codebase inspection before implementation advice.
- Preserve unrelated user changes.
- Prefer local patterns over invented abstractions.
- Include verification proportional to risk.
- Lead review outputs with bugs and line references.
- Never make destructive git or filesystem actions the default.

## Checklist

- Trigger description names concrete engineering tasks.
- Workflow distinguishes analysis-only requests from edit requests.
- Skill defines when to run tests, linters, type checks, or build commands.
- Failure modes cover missing dependencies, failing tests, and dirty worktrees.
- Output format fits the task: patch summary, review report, or command summary.
- References capture stack-specific conventions instead of generic coding advice.

## Nice To Have

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

## Failure Modes

- Unknown stack: inspect package files, lockfiles, and directory names before selecting tooling.
- Tests unavailable: explain the missing tool or dependency and provide a manual verification path.
- Dirty workspace affects target files: read the affected files and work with existing changes.
- Large refactor risk: propose staged edits and validation checkpoints.

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
