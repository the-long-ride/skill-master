---
name: universal-skill-governance
description: Use when creating, reviewing, or publishing AI-agent skills that must run consistently across local agents and web LLM chat interfaces.
---

# Universal Skill Governance

## Overview

This skill defines a portable quality bar for agent skills. Use it to keep skills discoverable, executable, and verifiable across runtimes.

## When to Use

Use this skill when:
- A new skill is being created for broad reuse.
- A skill behaves differently across agent platforms.
- A skill is unclear, too verbose, or difficult to verify.
- You need a release gate before sharing skills.

Do not use this skill when:
- The task is a one-off local note.
- Requirements can be enforced by static tooling alone.

## Inputs and Tools

Inputs:
- Target `SKILL.md`
- Optional supporting references
- Workspace-level skill index

Tools:
- File search (`rg`, file listing)
- AI-guided checklist verification
- Optional local shell script verification
- Human checklist review

## Workflow

1. Validate trigger quality
- Ensure frontmatter description starts with `Use when`.
- Ensure description explains only when to use the skill.

2. Validate execution quality
- Confirm workflow has concrete, ordered steps.
- Confirm failure modes include explicit recovery.
- Confirm output format is deterministic.

3. Validate portability
- Ensure no platform-specific assumptions are required to understand the skill.
- Move runtime-specific details into references.

4. Validate verification
- Run AI-guided checklist review and produce PASS/PARTIAL/FAIL report.
- If needed, run local audit script for automation parity.
- Compare outcomes and resolve mismatches.
- Fix all critical FAIL findings before publishing.

5. Publish readiness
- Update skill index metadata.
- Add release notes if behavior changed.

## Failure Modes

- Trigger drift: Description includes workflow steps.
  - Recovery: Rewrite description to trigger-only wording.

- Hidden assumptions: Skill assumes unavailable tools.
  - Recovery: Add tool requirements and fallback behavior.

- Non-deterministic output: Different agents produce incompatible reports.
  - Recovery: Add a strict output template.

- Script dependency lock-in: Team cannot verify without local script execution.
  - Recovery: Use AI-guided checklist mode and keep the same report format.

## Output Format

Return this report:

```text
Skill: <path>
Discovery: PASS <n>, PARTIAL <n>, FAIL <n>
Content: PASS <n>, PARTIAL <n>, FAIL <n>
Quality: PASS <n>, PARTIAL <n>, FAIL <n>
Critical issues:
- <issue>
Required fixes:
1) <fix>
Decision: READY | NEEDS REVISION
```

## References

- `references/checklist.md`
- `docs/WEB-CHAT-PACK.md`
