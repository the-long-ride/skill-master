---
name: advise-science-domain-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for scientific, legal, medical, education, engineering, finance, or other expert-domain workflows that require domain constraints and careful validation.
---

# Science And Domain Skill Advisor

Advise the human on skills for expert domains where correctness, context, and boundaries matter more than generic fluency.

## Workflow

1. Identify the domain, audience, risk level, and expected artifact.
2. Define authoritative sources, terminology, assumptions, and prohibited advice.
3. Specify evidence requirements and validation methods.
4. Define when to defer to a human expert.
5. Add disclaimers, scope limits, and uncertainty handling where appropriate.
6. Return a domain-skill blueprint.

## Category Standards

- Use domain-specific sources and terminology.
- Separate general information from professional advice.
- Define scope and risk boundaries.
- Require citations or evidence for factual claims.
- Include validation by calculation, source check, or expert review when possible.
- Avoid overconfidence in high-stakes domains.

## Checklist

- Trigger description names the expert domain and workflow.
- Workflow defines authoritative references.
- Skill includes human escalation rules.
- Failure modes cover outdated guidance, missing jurisdiction, uncertain evidence, and high-stakes decisions.
- Output format includes assumptions and confidence.
- Validation includes edge cases and counterexamples.

## Nice To Have

- Domain glossary.
- Source hierarchy.
- Calculation scripts.
- Jurisdiction or standard mapping.
- Expert review checklist.

## Example Skill Ideas

- Literature methods reviewer skill.
- Legal contract issue spotter skill.
- Medical education explainer skill.
- Engineering calculation checker skill.

## Failure Modes

- Domain context is missing: ask for jurisdiction, population, standard, or use case.
- Claim is high stakes: provide general information and recommend expert review.
- Sources are stale: require current verification.
- Evidence is ambiguous: state uncertainty and list what would resolve it.

## Output Format

Return:

```text
Skill concept: <name>
Expert domain: <domain>
Trigger description draft: <Use when...>
Source hierarchy:
- <source type>
Scope limits:
- <limit>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
