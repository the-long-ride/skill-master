---
name: creating-skills
description: Use when creating or revising agent skills, translating a repeatable workflow into SKILL.md, or fixing skill discovery and activation problems.
---

# Creating Skills

## Overview
Write skills for repeatable judgment, not one-off answers. A strong skill is trigger-first, compact, and operational: it tells future agents when it applies, what tools and constraints matter, what steps to follow, and how to know they are done.

## When to Use

Use this skill when any of the following is true:
- You need a new SKILL.md for Claude, Copilot, or another agent runtime.
- An existing skill is too vague, too long, or missing trigger clarity.
- A workflow keeps being rediscovered manually across conversations.
- You need to package a reliable technique, pattern, or reference into a reusable agent instruction.
- A skill is not loading, is hard to find, or its description is causing bad activation behavior.

Do not use this skill for:
- One-off fixes that will not be reused.
- Project-specific conventions that belong in repo docs instead of a skill.
- Rules that can be enforced mechanically with linting, tests, or validation.

## Fast Path

1. Define the trigger in one sentence starting with `Use when...`.
2. List the exact environment tools, files, commands, and constraints the agent can rely on.
3. Write the minimum workflow as ordered steps.
4. Add boundary conditions and common failure modes.
5. Specify the expected output format and success criteria.
6. Trim hard until the skill is compact enough to be loaded often.
7. Verify the description only describes when to use the skill, not how it works.

## Brainstorm to Reach Target

When quality is not yet good enough, run this short brainstorm cycle before writing or rewriting:

1. Outcome target
   - Write one line for the exact behavior you want from future agents.
   - Example: "Agent picks this skill in under 1 step and follows it without extra clarification."
2. Trigger inventory
   - List 8 to 12 user phrasings that should activate the skill.
   - Include synonyms and symptoms, not only perfect wording.
3. Failure rehearsal
   - List the top 5 ways the agent could misuse or ignore the skill.
   - Add one prevention line for each failure.
4. Minimal workflow pass
   - Draft the smallest workflow that still prevents the failures.
   - Remove any step that does not change behavior.
5. Example stress test
   - Create 3 realistic prompts and verify the skill would handle all three.
6. Compression pass
   - Remove repeated language and move heavy reference into supporting files.

If the skill still feels fuzzy after this cycle, repeat from step 2 with sharper trigger wording.

## Skill Shape

Use this structure unless the task clearly needs something different:

1. Frontmatter
   - `name`
   - `description` beginning with `Use when...`
2. Overview
   - One short paragraph with the core principle.
3. When to Use
   - Clear triggers, symptoms, and when not to use.
4. Inputs and Tools
   - Exact files, commands, APIs, and platform details available in the target environment.
5. Workflow
   - 3 to 7 concrete steps in execution order.
6. Failure Modes
   - Common mistakes, false assumptions, and recovery moves.
7. Output Format
   - What the agent should return, include, or ask for.
8. Examples
   - Short input/output pairs or before/after snippets.

## Authoring Rules

- Keep the description trigger-only. Do not summarize the workflow there.
- Use concrete search words future agents will actually see: tool names, error strings, file names, and user intents.
- Include the exact capabilities available in the environment the skill targets.
- Prefer short steps and explicit gates over long prose.
- Move heavy reference material into supporting files.
- Make stop conditions explicit when the skill controls irreversible or high-risk actions.
- Use fresh verification when the skill claims success, completion, or correctness.

## Example Library

### Example A: Trigger-only description

Bad:
- "Use when building skills; first brainstorm, then write template, then test and ship."

Good:
- "Use when creating or revising agent skills, especially when activation is inconsistent or workflows are underspecified."

Why this is better:
- It says when to use the skill and avoids leaking workflow into frontmatter.

### Example B: Vague workflow vs executable workflow

Bad workflow:
1. Understand task.
2. Write skill.
3. Improve it.

Good workflow:
1. Capture trigger sentence beginning with "Use when...".
2. Enumerate available tools and hard constraints in the target environment.
3. Draft 3 to 7 ordered execution steps.
4. Add 3 common failures with recovery behavior.
5. Add output format and success evidence.

Why this is better:
- Each step is testable and can be checked by a human reviewer.

### Example C: Failure mode quality

Weak:
- "Agent may fail sometimes."

Strong:
- "Agent may claim completion without running verification command. Recovery: run command, capture output, then restate status with evidence."

Why this is better:
- It provides a concrete failure and an operational recovery path.

## Human Verification Mode (Local Workspace)

This skill is also intended for human operators to verify whether an AI-agent skill meets checklist quality.

### Verification flow

1. Locate target skill files in local workspace.
2. Run checklist review line by line.
3. Score each checklist item as PASS, FAIL, or PARTIAL.
4. Produce a short gap report with required fixes.
5. Re-check until all critical items pass.

### Suggested local commands

PowerShell:

```powershell
Get-ChildItem -Recurse .agents/skills -Filter SKILL.md | Select-Object FullName
rg "^description:|^name:|^## " .agents/skills
```

### Scoring model

- PASS: Requirement is explicit and unambiguous.
- PARTIAL: Present but vague, incomplete, or hard to execute.
- FAIL: Missing or contradictory.

Suggested thresholds:
- Ready: No FAIL in Discovery or Content sections.
- Needs revision: Any FAIL in Discovery or Content.
- Optional polish: Only Quality items are PARTIAL.

### Human output format

Use this compact report format:

```text
Skill: <path>
Discovery: PASS 3, PARTIAL 1, FAIL 0
Content: PASS 5, PARTIAL 1, FAIL 0
Quality: PASS 4, PARTIAL 1, FAIL 0
Critical issues:
- <issue>
Required fixes:
1) <fix>
2) <fix>
Decision: READY | NEEDS REVISION
```

## What Good Looks Like

- A future agent can decide whether the skill applies in one glance.
- The agent knows what to do next without improvising the process.
- The skill blocks common rationalizations before they become mistakes.
- The skill is small enough that it gets read instead of skipped.

## Common Failure Modes

- Description explains the workflow instead of the trigger.
- Skill is broad enough to apply to everything and therefore guides nothing.
- Tool list is vague, so the agent invents capabilities that are not present.
- Examples are verbose and become a second copy of the workflow.
- No verification gate, so the agent claims completion without evidence.

## References

- Use [references/skill-template.md](references/skill-template.md) as the starting skeleton.
- Use [references/skill-checklist.md](references/skill-checklist.md) before publishing or loading the skill.
- Use [references/human-verification.md](references/human-verification.md) to audit skills in a local workspace.

---

## Footer

> Built for the long ride.
>
> Copyright the-long-ride