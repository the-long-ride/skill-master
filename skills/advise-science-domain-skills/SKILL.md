---
name: advise-science-domain-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for scientific, legal, medical, education, engineering, finance, or other expert-domain workflows that require domain constraints and careful validation
---

# Science And Domain Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the science & domain domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for science & domain.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the science & domain task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the domain, audience, risk level, and expected artifact.
2. Define authoritative sources, terminology, assumptions, and prohibited advice.
3. Specify evidence requirements and validation methods.
4. Define when to defer to a human expert.
5. Add disclaimers, scope limits, and uncertainty handling where appropriate.
6. Return a domain-skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Use domain-specific sources and terminology.
- Separate general information from professional advice.
- Define scope and risk boundaries.
- Require citations or evidence for factual claims.
- Include validation by calculation, source check, or expert review when possible.
- Avoid overconfidence in high-stakes domains.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names the expert domain and workflow.
- Workflow defines authoritative references.
- Skill includes human escalation rules.
- Failure modes cover outdated guidance, missing jurisdiction, uncertain evidence, and high-stakes decisions.
- Output format includes assumptions and confidence.
- Validation includes edge cases and counterexamples.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
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

## Examples

Input: "Help me design a skill for science & domain workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This science & domain skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Domain context is missing: ask for jurisdiction, population, standard, or use case.
- Claim is high stakes: provide general information and recommend expert review.
- Sources are stale: require current verification.
- Evidence is ambiguous: state uncertainty and list what would resolve it.

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
