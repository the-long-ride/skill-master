# Human Verification Guide

Use this guide when a human reviewer wants to validate whether local AI-agent skills meet checklist quality.

## Goal

Determine if each skill in the workspace is:
- READY for use
- NEEDS REVISION

## Inputs

- Skill files under .agents/skills
- Checklist at references/skill-checklist.md

## Step-by-step

1. Inventory skills:

```powershell
Get-ChildItem -Recurse .agents/skills -Filter SKILL.md | Select-Object FullName
```

2. Quick structure scan:

```powershell
rg "^---$|^name:|^description:|^## " .agents/skills
```

3. Full checklist review for each skill:
- Score every item PASS, PARTIAL, or FAIL.
- Flag Discovery and Content FAIL as critical.

4. Build remediation list:
- Convert each FAIL into one concrete edit action.
- Keep actions specific and testable.

5. Re-verify:
- Re-run checklist after edits.
- Mark READY only when no critical FAIL remains.

## Decision Rules

- READY:
  - No FAIL in Discovery
  - No FAIL in Content
- NEEDS REVISION:
  - Any FAIL in Discovery or Content
- READY WITH POLISH:
  - Only Quality items are PARTIAL or FAIL

## Output Example

```text
Workspace audit summary
Skills scanned: 4

1) .agents/skills/debugging/SKILL.md
Discovery: PASS 4 PARTIAL 0 FAIL 0
Content: PASS 6 PARTIAL 0 FAIL 0
Quality: PASS 4 PARTIAL 1 FAIL 0
Decision: READY WITH POLISH

2) .agents/skills/reviewing/SKILL.md
Discovery: PASS 2 PARTIAL 1 FAIL 1
Content: PASS 4 PARTIAL 1 FAIL 1
Quality: PASS 3 PARTIAL 2 FAIL 0
Critical FAIL items:
- Description contains workflow details instead of trigger-only wording
- Missing explicit output format
Required fixes:
1) Rewrite description to trigger-only format
2) Add output format section with expected fields
Decision: NEEDS REVISION
```