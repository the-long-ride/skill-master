---
name: advise-legal-work-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for legal operations, contract review support, clause extraction, policy comparison, matter summaries, compliance evidence, or legal workflow assistance
---

# Legal Work Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the legal work domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for legal work.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the legal work task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the legal workflow: contract intake, clause extraction, playbook review, redline summary, matter timeline, policy comparison, or compliance evidence gathering.
2. Define jurisdiction, governing documents, playbooks, and review authority.
3. Specify what the skill may summarize, flag, extract, or draft.
4. Require human legal review for legal conclusions, negotiation positions, or final approval.
5. Define confidentiality and privilege handling.
6. Return a legal-work skill blueprint with validation prompts.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Do not present legal conclusions as final advice.
- Preserve source text and citations for clauses or obligations.
- Define jurisdiction and contract type when relevant.
- Separate business risk, legal risk, and missing information.
- Protect confidential and privileged material.
- Use playbooks or policies as the main standard when available.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names legal ops, contract, clause, redline, matter, compliance evidence, policy comparison, or legal workflow.
- Workflow defines jurisdiction and authority.
- Skill includes attorney or legal owner escalation rules.
- Failure modes cover missing playbook, ambiguous clause, confidential data, and high-stakes advice.
- Output format includes source references and review status.
- Validation includes a conflicting-clause or missing-jurisdiction example.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Contract playbook reference.
- Clause taxonomy.
- Risk severity rubric.
- Matter timeline template.
- Privilege handling checklist.

## Example Skill Ideas

- Contract intake skill.
- Clause extraction skill.
- Redline summary skill.
- Compliance evidence packet skill.

## Examples

Input: "Help me design a skill for legal work workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This legal work skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Jurisdiction is unknown: ask for it or mark jurisdiction-dependent content.
- Playbook is missing: extract facts and request review standard.
- Legal advice is requested: provide general support and require legal owner review.
- Confidential data appears: minimize exposure and preserve access boundaries.

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
Legal workflow: <workflow>
Trigger description draft: <Use when...>
Authority and sources:
- <source>
Review boundaries:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
