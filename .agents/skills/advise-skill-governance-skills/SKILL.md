---
name: advise-skill-governance-skills
description: Use when a human wants to design, review, audit, publish, or govern AI agent skills for portability, trigger quality, verification, safety, or repository-level standards.
---

# Skill Governance Skill Advisor

Advise the human on skill quality systems. Do not rewrite every skill unless asked; identify standards, risks, and a repeatable verification path.

## Workflow

1. Identify whether the human is creating, reviewing, publishing, migrating, or auditing skills.
2. Define the runtime targets, such as local coding agents, Claude-style skills, Codex-style skills, or web chat prompt packs.
3. Check discovery quality: name, trigger-only description, positive triggers, negative triggers, and overlap risks.
4. Check content quality: ordered workflow, failure recovery, output format, and verification.
5. Decide what belongs in `SKILL.md`, `references/`, `scripts/`, and `assets/`.
6. Produce a governance blueprint or review report with required fixes first.

## Category Standards

- Descriptions must start with `Use when`.
- Descriptions must describe only activation conditions.
- Workflow steps must be ordered and executable.
- Failure modes must include recovery behavior.
- Output format must be explicit.
- Validation must be repeatable by a human or another agent.

## Checklist

- The skill has a single durable purpose.
- Trigger phrases are broad enough to catch real users and narrow enough to avoid false positives.
- Heavy reference material is split out of `SKILL.md`.
- Scripts are deterministic, parameterized, and tested.
- The skill says what to do when inputs are missing.
- The review distinguishes required fixes from nice-to-have improvements.

## Nice To Have

- PASS/PARTIAL/FAIL rubric.
- Cross-runtime compatibility notes.
- Example prompts that should and should not trigger the skill.
- Release gate for publishing.
- Machine-readable index entry.

## Example Skill Ideas

- Skill audit reporter.
- Skill migration advisor.
- Skill repository publisher.
- Trigger collision detector.

## Failure Modes

- Vague governance goal: ask whether the human wants authoring, review, publishing, or migration support.
- Conflicting runtime requirements: list the incompatible assumptions and choose the strictest shared subset.
- Skill tries to cover too much: split by trigger boundary and output artifact.
- Missing verification path: require at least one manual or scripted check before calling the skill ready.

## Output Format

Return:

```text
Skill governance goal: <goal>
Runtime targets: <targets>
Required standards:
- <standard>
Required fixes:
1. <fix>
Recommended resources:
- <file or folder>
Validation:
- <check>
Decision: READY | NEEDS REVISION
```
