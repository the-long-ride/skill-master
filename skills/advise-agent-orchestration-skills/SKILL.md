---
name: advise-agent-orchestration-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for planning, routing, multi-agent collaboration, evaluators, handoffs, parallel work, task decomposition, or agent workflow control
---

# Agent Orchestration Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the agent orchestration domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for agent orchestration.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the agent orchestration task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the orchestration pattern: routing, prompt chaining, evaluator, parallelization, supervisor, or handoff.
2. Define roles, responsibilities, and stop conditions.
3. Specify what context each step receives and what must not be leaked.
4. Define aggregation, conflict resolution, and final decision rules.
5. Add observability and validation requirements.
6. Return an orchestration-skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Use orchestration only when it reduces risk or complexity.
- Keep roles narrow and testable.
- Define handoff inputs and outputs explicitly.
- Avoid leaking expected answers during validation.
- Include stop conditions and budget controls.
- Explain how conflicting agent outputs are resolved.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names routing, multi-agent, planning, handoff, evaluator, or workflow control.
- Workflow defines each role or stage.
- Skill defines context boundaries.
- Failure modes cover loops, disagreement, hidden coupling, and runaway cost.
- Output format includes trace or decision summary.
- Validation includes independent test prompts.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Role prompt templates.
- Trace schema.
- Consensus or voting rule.
- Budget and timeout policy.
- Forward-test protocol.

## MCP Readiness Checklist

Use when a human wants to expose skill orchestration through an MCP server.

### When MCP Is Worth It

- Add MCP only when skills need to be discoverable, searchable, validated, or reused across clients.
- Use a single skill instead of MCP when the task is one-off, local, or already handled by a slash command.
- Use MCP when multiple clients need the same skill catalog, routing, audit, or prompt-generation behavior.
- Avoid MCP if it adds autonomy, shell access, network calls, or writes without a clear need.

### MCP Surface

- Expose skill catalog as MCP resources.
- Expose reusable prompts as MCP prompts.
- Expose read-only helpers as MCP tools.
- Keep write tools out of the first version.
- Keep MCP as a coordination layer, not a replacement for slash-command skills.

Suggested first tools:

- `list_skills`: returns all available skills.
- `get_skill`: returns one skill by ID.
- `search_skills`: finds skills by task, trigger, or category.
- `validate_skill`: checks required fields and quality rules.
- `route_task_to_skill`: suggests the best skill for a human request.

Suggested later tools:

- `generate_skill_prompt`: builds prompt from a skill template.
- `audit_skill_set`: finds missing triggers, checklists, outputs, or failure modes.

### Tool Safety Contract

- Require human approval before MCP can run commands, edit files, publish, invoke agents, or call network services.
- Restrict reads to repo skill directories.
- Block path traversal and unsafe skill IDs.
- Do not expose `.git` internals, env vars, secrets, or audit logs outside the local machine.
- Do not execute arbitrary commands.
- Do not spawn external agents without approval.
- Log tool calls with trace IDs.
- Keep audit logs local unless the user opts in.

### Metadata Contract

Each MCP-ready skill should include:

```yaml
id: <skill-id>
name: <human-readable-name>
type: slash | mcp | both
category: <category>
triggers:
  - <use-when phrase>
capabilities:
  - <what it can do>
requires_human_approval_for:
  - <risky actions>
outputs:
  - <expected output format>
validation:
  - <how to test>
```

### Implementation Sequence

1. Add read-only catalog and skill lookup.
2. Add search and routing.
3. Add validation and audit reports.
4. Add prompt generation.
5. Add write tools only after explicit approval and tests.
6. Add agent invocation only after budget, timeout, and approval controls exist.

### Validation Checklist

- `list_skills` returns every real skill.
- `get_skill` fails cleanly for missing skill.
- `search_skills` returns ranked results.
- `validate_skill` catches missing workflow.
- `validate_skill` catches missing checklist.
- `validate_skill` catches missing output format.
- `route_task_to_skill` handles vague prompts.
- `audit_skill_set` produces actionable report.
- MCP prompt output matches documented format.
- Security tests block path traversal and directory escape.

### Validation Prompts

- "List all skills and confirm none are outside the skill directories."
- "Route this vague task to a skill, or ask clarifying questions."
- "Validate this skill and list missing required sections."
- "Try to read a file outside the allowed skill directories."
- "Try to publish or edit a skill without approval."

Rule: MCP should make skills discoverable, testable, and reusable. MCP should not make skills unsafe, autonomous, or magical.

## Example Skill Ideas

- Skill routing advisor.
- Independent code review panel skill.
- Research synthesis evaluator skill.
- Multi-agent planning skill.

## Examples

Input: "Help me design a skill for agent orchestration workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This agent orchestration skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Orchestration is unnecessary: recommend a single-agent workflow.
- Agents disagree: apply the predefined resolution rule and surface uncertainty.
- Workflow loops: stop at the configured limit and ask for human direction.
- Context leakage risk: reduce shared context and pass raw artifacts only.

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
