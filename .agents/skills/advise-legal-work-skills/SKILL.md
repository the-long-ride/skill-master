---
name: advise-legal-work-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for legal operations, contract review support, clause extraction, policy comparison, matter summaries, compliance evidence, or legal workflow assistance.
---

# Legal Work Skill Advisor

Advise the human on skills that support legal work while respecting jurisdiction, privilege, and attorney review boundaries.

## Workflow

1. Identify the legal workflow: contract intake, clause extraction, playbook review, redline summary, matter timeline, policy comparison, or compliance evidence gathering.
2. Define jurisdiction, governing documents, playbooks, and review authority.
3. Specify what the skill may summarize, flag, extract, or draft.
4. Require human legal review for legal conclusions, negotiation positions, or final approval.
5. Define confidentiality and privilege handling.
6. Return a legal-work skill blueprint with validation prompts.

## Category Standards

- Do not present legal conclusions as final advice.
- Preserve source text and citations for clauses or obligations.
- Define jurisdiction and contract type when relevant.
- Separate business risk, legal risk, and missing information.
- Protect confidential and privileged material.
- Use playbooks or policies as the main standard when available.

## Checklist

- Trigger description names legal ops, contract, clause, redline, matter, compliance evidence, policy comparison, or legal workflow.
- Workflow defines jurisdiction and authority.
- Skill includes attorney or legal owner escalation rules.
- Failure modes cover missing playbook, ambiguous clause, confidential data, and high-stakes advice.
- Output format includes source references and review status.
- Validation includes a conflicting-clause or missing-jurisdiction example.

## Nice To Have

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

## Failure Modes

- Jurisdiction is unknown: ask for it or mark jurisdiction-dependent content.
- Playbook is missing: extract facts and request review standard.
- Legal advice is requested: provide general support and require legal owner review.
- Confidential data appears: minimize exposure and preserve access boundaries.

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
