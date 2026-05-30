---
name: advise-enterprise-search-knowledge-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for enterprise search, internal knowledge retrieval, wiki answers, document discovery, institutional memory, or cross-tool workplace knowledge synthesis.
---

# Enterprise Search And Knowledge Skill Advisor

Advise the human on skills that find and synthesize internal business knowledge across workplace systems.

## Workflow

1. Identify the knowledge workflow: internal answer, document discovery, wiki cleanup, policy lookup, project context, expert finding, or institutional memory summary.
2. Define searchable systems, access boundaries, freshness requirements, and source hierarchy.
3. Specify retrieval, deduplication, contradiction handling, and citation behavior.
4. Separate internal facts from recommendations.
5. Add validation for stale docs, conflicting sources, and permission-limited results.
6. Return an enterprise-knowledge skill blueprint.

## Category Standards

- Prefer official internal sources over chat fragments.
- Cite internal source names, dates, or links where permitted.
- Respect access controls and data sensitivity.
- Flag stale or conflicting information.
- Avoid claiming completeness when search scope is limited.
- Include owner or expert routing when knowledge is missing.

## Checklist

- Trigger description names enterprise search, internal knowledge, wiki, docs, institutional memory, or workplace knowledge synthesis.
- Workflow defines systems, permissions, and source hierarchy.
- Skill includes recency and contradiction rules.
- Failure modes cover inaccessible sources, stale docs, conflicting answers, and insufficient evidence.
- Output format includes sources and confidence.
- Validation includes a stale-document scenario.

## Nice To Have

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

## Failure Modes

- Access is denied: report the gap and ask for an authorized source.
- Sources conflict: rank by authority and date, then explain uncertainty.
- Source is stale: label it stale and search for the owner or newer doc.
- No evidence found: say so plainly and propose next search targets.

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
