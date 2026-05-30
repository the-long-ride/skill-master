---
name: advise-research-rag-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for web research, retrieval augmented generation, citations, source synthesis, knowledge bases, search workflows, or evidence-grounded answers.
---

# Research And RAG Skill Advisor

Advise the human on skills that gather, retrieve, and synthesize information with visible evidence.

## Workflow

1. Identify the research mode: web search, local corpus retrieval, academic review, competitive research, or knowledge-base answer.
2. Define source quality rules and recency requirements.
3. Specify retrieval steps, query expansion, filtering, and deduplication.
4. Define citation, quote, and uncertainty handling.
5. Add validation prompts that test source grounding and contradiction handling.
6. Return a research-skill blueprint with evidence standards.

## Category Standards

- Use current sources for unstable facts.
- Prefer primary sources when accuracy matters.
- Track source provenance.
- Distinguish direct evidence from inference.
- Avoid over-quoting copyrighted sources.
- Surface disagreements and uncertainty.

## Checklist

- Trigger description names research, retrieval, citations, knowledge base, or source synthesis.
- Workflow defines what sources are acceptable.
- Skill includes recency rules.
- Failure modes cover paywalls, stale sources, conflicting evidence, and low-confidence retrieval.
- Output format includes links or source identifiers.
- Validation includes at least one contradiction or missing-evidence test.

## Nice To Have

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

## Failure Modes

- Sources conflict: summarize both sides and identify the stronger evidence.
- Source is unavailable: find an alternate primary source or mark the gap.
- Fact may be outdated: require browsing or current corpus refresh.
- Retrieval is weak: expand queries and explain remaining uncertainty.

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
