---
name: advise-product-management-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for product management, PRDs, roadmaps, user research synthesis, requirements, prioritization, launch planning, or product decision workflows
---

# Product Management Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the product management domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for product management.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the product management task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the PM workflow: discovery, research synthesis, PRD, prioritization, roadmap, launch plan, stakeholder update, or post-launch review.
2. Define evidence sources: customer interviews, analytics, tickets, sales notes, strategy docs, technical constraints, and business goals.
3. Specify decision criteria and tradeoff handling.
4. Define artifact structure and approval or review flow.
5. Require assumptions, open questions, and risks.
6. Return a PM-skill blueprint with validation prompts.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Separate evidence, interpretation, and recommendation.
- Include non-goals and tradeoffs for requirements work.
- Preserve customer wording when synthesizing research.
- Tie priorities to explicit criteria.
- Identify dependencies and unresolved decisions.
- Avoid pretending a roadmap is approved unless a source says so.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names product, PRD, roadmap, requirements, launch, prioritization, discovery, or user research.
- Workflow defines source evidence and decision criteria.
- Skill includes stakeholder and approval expectations.
- Failure modes cover missing strategy, contradictory feedback, weak evidence, and scope creep.
- Output format matches the target artifact.
- Validation includes conflicting stakeholder requests.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- PRD template.
- Research synthesis rubric.
- Prioritization framework reference.
- Launch checklist.
- Decision log format.

## Example Skill Ideas

- PRD drafting skill.
- Customer feedback synthesis skill.
- Roadmap prioritization skill.
- Launch readiness skill.

## Examples

Input: "Help me design a skill for product management workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This product management skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Evidence is thin: label confidence and recommend discovery questions.
- Stakeholders disagree: map tradeoffs and decision owners.
- Scope expands: separate must-have, should-have, and non-goals.
- Metrics are undefined: ask for success criteria before finalizing recommendations.

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
PM workflow: <workflow>
Trigger description draft: <Use when...>
Evidence sources:
- <source>
Decision criteria:
- <criterion>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
