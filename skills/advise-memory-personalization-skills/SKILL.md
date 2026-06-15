---
name: advise-memory-personalization-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for persistent memory, user preferences, project context, personalization, recall, forgetting, or long-running relationship context
---

# Memory And Personalization Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the memory & personalization domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for memory & personalization.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the memory & personalization task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the memory purpose: preference, project fact, workflow habit, relationship context, or domain knowledge.
2. Define what may be stored, what must not be stored, and when to ask permission.
3. Specify retrieval timing and relevance thresholds.
4. Define update, dedupe, expiration, and forgetting behavior.
5. Add privacy and cross-project isolation rules.
6. Return a memory-skill blueprint with safe examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Store only useful, durable, non-sensitive information.
- Avoid inferring sensitive traits.
- Keep memory scoped by user, project, and runtime.
- Support correction and deletion.
- Explain when memory is used to shape output.
- Handle stale memories conservatively.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names memory, personalization, preferences, recall, or project context.
- Workflow defines consent and storage boundaries.
- Skill distinguishes durable memory from temporary context.
- Failure modes cover stale, conflicting, sensitive, and overbroad memories.
- Output format includes memory candidates and rationale.
- Validation includes false-positive memory examples.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Memory schema.
- Dedupe rules.
- Expiration policy.
- User-facing correction flow.
- Project-specific namespace convention.

## Example Skill Ideas

- Project memory curator skill.
- User preference updater skill.
- Long-running coaching memory skill.
- Memory audit skill.

## Examples

Input: "Help me design a skill for memory & personalization workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This memory & personalization skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Sensitive content appears: do not store it unless policy and consent allow it.
- Memory conflicts with current instruction: prefer current instruction and propose updating memory.
- Memory is stale: mark it uncertain and ask for confirmation.
- Retrieval is irrelevant: suppress the memory and improve matching criteria.

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
Memory purpose: <purpose>
Trigger description draft: <Use when...>
Storage rules:
- <rule>
Retrieval rules:
- <rule>
Failure recovery:
- <mode and recovery>
Validation prompts:
- <prompt>
```
