# Skill Checklist

Use this before shipping a skill.

Scoring key:
- PASS: explicit and actionable
- PARTIAL: present but ambiguous
- FAIL: missing or contradictory

## Discovery

- Description starts with `Use when...`
- Description only explains when to use, not how to execute
- Trigger words match the user intents and symptoms the skill should catch
- Skill name is short, clear, and searchable

## Content

- Overview is one short paragraph
- Workflow is concrete and ordered
- Tools and constraints are explicit
- Boundary conditions are present
- Failure modes are named with recovery guidance
- Output format is clear

## Quality

- Examples are short and concrete
- Supporting files carry heavy reference material
- The skill is compact enough to load often
- Success requires evidence when the skill claims completion
- Irreversible actions have explicit stop conditions

## Final Check

- Could a future agent use this without asking for the missing basics?
- Could a future agent misuse this if the description were vague?
- Is there anything here that belongs in repo docs or automation instead?

## Local Workspace Audit (Human)

1. Find all skill files.
2. Review each item in this checklist.
3. Mark PASS, PARTIAL, or FAIL for each line.
4. Summarize critical FAIL items first.
5. Re-run after fixes.

Suggested commands:

```powershell
Get-ChildItem -Recurse .agents/skills -Filter SKILL.md | Select-Object FullName
rg "^name:|^description:|^## " .agents/skills
```

Report template:

```text
Skill: <path>
Discovery: PASS <n>, PARTIAL <n>, FAIL <n>
Content: PASS <n>, PARTIAL <n>, FAIL <n>
Quality: PASS <n>, PARTIAL <n>, FAIL <n>
Critical FAIL items:
- <item>
Required fixes:
1) <fix>
Decision: READY | NEEDS REVISION
```