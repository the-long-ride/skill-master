---
name: advise-product-management-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for product management, PRDs, roadmaps, user research synthesis, requirements, prioritization, launch planning, or product decision workflows.
---

# Product Management Skill Advisor

Advise the human on skills that help product teams turn evidence into decisions, plans, and clear artifacts.

## Workflow

1. Identify the PM workflow: discovery, research synthesis, PRD, prioritization, roadmap, launch plan, stakeholder update, or post-launch review.
2. Define evidence sources: customer interviews, analytics, tickets, sales notes, strategy docs, technical constraints, and business goals.
3. Specify decision criteria and tradeoff handling.
4. Define artifact structure and approval or review flow.
5. Require assumptions, open questions, and risks.
6. Return a PM-skill blueprint with validation prompts.

## Category Standards

- Separate evidence, interpretation, and recommendation.
- Include non-goals and tradeoffs for requirements work.
- Preserve customer wording when synthesizing research.
- Tie priorities to explicit criteria.
- Identify dependencies and unresolved decisions.
- Avoid pretending a roadmap is approved unless a source says so.

## Checklist

- Trigger description names product, PRD, roadmap, requirements, launch, prioritization, discovery, or user research.
- Workflow defines source evidence and decision criteria.
- Skill includes stakeholder and approval expectations.
- Failure modes cover missing strategy, contradictory feedback, weak evidence, and scope creep.
- Output format matches the target artifact.
- Validation includes conflicting stakeholder requests.

## Nice To Have

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

## Failure Modes

- Evidence is thin: label confidence and recommend discovery questions.
- Stakeholders disagree: map tradeoffs and decision owners.
- Scope expands: separate must-have, should-have, and non-goals.
- Metrics are undefined: ask for success criteria before finalizing recommendations.

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
