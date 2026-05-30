---
name: advise-agent-orchestration-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for planning, routing, multi-agent collaboration, evaluators, handoffs, parallel work, task decomposition, or agent workflow control.
---

# Agent Orchestration Skill Advisor

Advise the human on skills that coordinate agents, tools, or staged reasoning workflows.

## Workflow

1. Identify the orchestration pattern: routing, prompt chaining, evaluator, parallelization, supervisor, or handoff.
2. Define roles, responsibilities, and stop conditions.
3. Specify what context each step receives and what must not be leaked.
4. Define aggregation, conflict resolution, and final decision rules.
5. Add observability and validation requirements.
6. Return an orchestration-skill blueprint.

## Category Standards

- Use orchestration only when it reduces risk or complexity.
- Keep roles narrow and testable.
- Define handoff inputs and outputs explicitly.
- Avoid leaking expected answers during validation.
- Include stop conditions and budget controls.
- Explain how conflicting agent outputs are resolved.

## Checklist

- Trigger description names routing, multi-agent, planning, handoff, evaluator, or workflow control.
- Workflow defines each role or stage.
- Skill defines context boundaries.
- Failure modes cover loops, disagreement, hidden coupling, and runaway cost.
- Output format includes trace or decision summary.
- Validation includes independent test prompts.

## Nice To Have

- Role prompt templates.
- Trace schema.
- Consensus or voting rule.
- Budget and timeout policy.
- Forward-test protocol.

## Example Skill Ideas

- Skill routing advisor.
- Independent code review panel skill.
- Research synthesis evaluator skill.
- Multi-agent planning skill.

## Failure Modes

- Orchestration is unnecessary: recommend a single-agent workflow.
- Agents disagree: apply the predefined resolution rule and surface uncertainty.
- Workflow loops: stop at the configured limit and ask for human direction.
- Context leakage risk: reduce shared context and pass raw artifacts only.

## Output Format

Return:

```text
Skill concept: <name>
Orchestration pattern: <pattern>
Trigger description draft: <Use when...>
Roles or stages:
- <role>
Decision rules:
- <rule>
Failure recovery:
- <mode and recovery>
Validation:
- <prompt>
```
