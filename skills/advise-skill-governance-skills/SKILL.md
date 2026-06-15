---
name: advise-skill-governance-skills
description: Use when a human wants to design, review, audit, publish, or govern AI agent skills for portability, trigger quality, verification, safety, or repository-level standards
---

# Skill Governance Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the skill governance domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for skill governance.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the skill governance task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify whether the human is creating, reviewing, publishing, migrating, or auditing skills.
2. Define the runtime targets, such as local coding agents, Claude-style skills, Codex-style skills, or web chat prompt packs.
3. Check discovery quality: name, trigger-only description, positive triggers, negative triggers, and overlap risks.
4. Check content quality: ordered workflow, failure recovery, output format, and verification.
5. Decide what belongs in `SKILL.md`, `references/`, `scripts/`, and `assets/`.
6. Produce a governance blueprint or review report with required fixes first.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Descriptions must start with `Use when`.
- Descriptions must describe only activation conditions.
- Workflow steps must be ordered and executable.
- Failure modes must include recovery behavior.
- Output format must be explicit.
- Validation must be repeatable by a human or another agent.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- The skill has a single durable purpose.
- Trigger phrases are broad enough to catch real users and narrow enough to avoid false positives.
- Heavy reference material is split out of `SKILL.md`.
- Scripts are deterministic, parameterized, and tested.
- The skill says what to do when inputs are missing.
- The review distinguishes required fixes from nice-to-have improvements.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for skill governance workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This skill governance skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Vague governance goal: ask whether the human wants authoring, review, publishing, or migration support.
- Conflicting runtime requirements: list the incompatible assumptions and choose the strictest shared subset.
- Skill tries to cover too much: split by trigger boundary and output artifact.
- Missing verification path: require at least one manual or scripted check before calling the skill ready.

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
