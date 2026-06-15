---
name: advise-enterprise-search-knowledge-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for enterprise search, internal knowledge retrieval, wiki answers, document discovery, institutional memory, or cross-tool workplace knowledge synthesis
---

# Enterprise Search And Knowledge Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the enterprise search & knowledge domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for enterprise search & knowledge.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the enterprise search & knowledge task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the knowledge workflow: internal answer, document discovery, wiki cleanup, policy lookup, project context, expert finding, or institutional memory summary.
2. Define searchable systems, access boundaries, freshness requirements, and source hierarchy.
3. Specify retrieval, deduplication, contradiction handling, and citation behavior.
4. Separate internal facts from recommendations.
5. Add validation for stale docs, conflicting sources, and permission-limited results.
6. Return an enterprise-knowledge skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Prefer official internal sources over chat fragments.
- Cite internal source names, dates, or links where permitted.
- Respect access controls and data sensitivity.
- Flag stale or conflicting information.
- Avoid claiming completeness when search scope is limited.
- Include owner or expert routing when knowledge is missing.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names enterprise search, internal knowledge, wiki, docs, institutional memory, or workplace knowledge synthesis.
- Workflow defines systems, permissions, and source hierarchy.
- Skill includes recency and contradiction rules.
- Failure modes cover inaccessible sources, stale docs, conflicting answers, and insufficient evidence.
- Output format includes sources and confidence.
- Validation includes a stale-document scenario.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Source hierarchy reference.
- Search query templates.
- Knowledge freshness policy.
- Internal citation format.
- Expert directory or owner map.

## Example Skill Ideas

- Internal policy answer skill.
- Project context finder skill.
- Wiki cleanup skill.
- Expert finder skill.

## Examples

Input: "Help me design a skill for enterprise search & knowledge workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This enterprise search & knowledge skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Access is denied: report the gap and ask for an authorized source.
- Sources conflict: rank by authority and date, then explain uncertainty.
- Source is stale: label it stale and search for the owner or newer doc.
- No evidence found: say so plainly and propose next search targets.

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
Knowledge workflow: <workflow>
Trigger description draft: <Use when...>
Source hierarchy:
- <source>
Retrieval safeguards:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
