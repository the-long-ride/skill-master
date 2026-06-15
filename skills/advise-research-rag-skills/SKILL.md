---
name: advise-research-rag-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for web research, retrieval augmented generation, citations, source synthesis, knowledge bases, search workflows, or evidence-grounded answers
---

# Research And RAG Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the research & rag domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for research & rag.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the research & rag task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the research mode: web search, local corpus retrieval, academic review, competitive research, or knowledge-base answer.
2. Define source quality rules and recency requirements.
3. Specify retrieval steps, query expansion, filtering, and deduplication.
4. Define citation, quote, and uncertainty handling.
5. Add validation prompts that test source grounding and contradiction handling.
6. Return a research-skill blueprint with evidence standards.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Use current sources for unstable facts.
- Prefer primary sources when accuracy matters.
- Track source provenance.
- Distinguish direct evidence from inference.
- Avoid over-quoting copyrighted sources.
- Surface disagreements and uncertainty.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names research, retrieval, citations, knowledge base, or source synthesis.
- Workflow defines what sources are acceptable.
- Skill includes recency rules.
- Failure modes cover paywalls, stale sources, conflicting evidence, and low-confidence retrieval.
- Output format includes links or source identifiers.
- Validation includes at least one contradiction or missing-evidence test.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Search query templates.
- Source ranking rubric.
- Corpus indexing guide.
- Citation style examples.
- Evaluation questions with expected evidence.

## Example Skill Ideas

- Market research skill.
- Literature review skill.
- Internal knowledge-base answer skill.
- Source verification skill.

## Examples

Input: "Help me design a skill for research & rag workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This research & rag skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Sources conflict: summarize both sides and identify the stronger evidence.
- Source is unavailable: find an alternate primary source or mark the gap.
- Fact may be outdated: require browsing or current corpus refresh.
- Retrieval is weak: expand queries and explain remaining uncertainty.

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
Research mode: <mode>
Trigger description draft: <Use when...>
Source rules:
- <rule>
Workflow:
1. <step>
Validation prompts:
- <prompt>
Output requirements:
- <requirement>
```
