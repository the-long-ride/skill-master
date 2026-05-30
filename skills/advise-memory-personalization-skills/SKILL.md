---
name: advise-memory-personalization-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for persistent memory, user preferences, project context, personalization, recall, forgetting, or long-running relationship context.
---

# Memory And Personalization Skill Advisor

Advise the human on skills that store and retrieve context without violating trust, privacy, or relevance.

## Workflow

1. Identify the memory purpose: preference, project fact, workflow habit, relationship context, or domain knowledge.
2. Define what may be stored, what must not be stored, and when to ask permission.
3. Specify retrieval timing and relevance thresholds.
4. Define update, dedupe, expiration, and forgetting behavior.
5. Add privacy and cross-project isolation rules.
6. Return a memory-skill blueprint with safe examples.

## Category Standards

- Store only useful, durable, non-sensitive information.
- Avoid inferring sensitive traits.
- Keep memory scoped by user, project, and runtime.
- Support correction and deletion.
- Explain when memory is used to shape output.
- Handle stale memories conservatively.

## Checklist

- Trigger description names memory, personalization, preferences, recall, or project context.
- Workflow defines consent and storage boundaries.
- Skill distinguishes durable memory from temporary context.
- Failure modes cover stale, conflicting, sensitive, and overbroad memories.
- Output format includes memory candidates and rationale.
- Validation includes false-positive memory examples.

## Nice To Have

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

## Failure Modes

- Sensitive content appears: do not store it unless policy and consent allow it.
- Memory conflicts with current instruction: prefer current instruction and propose updating memory.
- Memory is stale: mark it uncertain and ask for confirmation.
- Retrieval is irrelevant: suppress the memory and improve matching criteria.

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
