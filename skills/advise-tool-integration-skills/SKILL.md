---
name: advise-tool-integration-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for APIs, MCP servers, SaaS connectors, authentication flows, schemas, tool calling, external systems, or integration-heavy workflows
---

# Tool Integration Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the tool integration domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for tool integration.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the tool integration task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the integration type: API, MCP server, webhook, or agent-session hooks.
2. Define authentication, secrets, scopes, rate limits, and audit expectations.
3. Specify schema discovery and validation for inputs and outputs.
4. Separate read-only, write, and destructive actions.
5. Define dry-run, confirmation, and rollback behavior where relevant.
6. Design the hook/MCP lifecycle (cross-platform CMD/bash entry points, environment variables).
7. Return an integration-skill blueprint with tool/hook contracts and failure recovery.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Default to read-only behavior until the skill explicitly requires mutation.
- Never hardcode secrets.
- Validate tool inputs before calling external systems.
- Explain permission scopes and state-changing actions.
- Handle rate limits and partial failures.
- Include mock or sample payloads when possible.
- For hooks, ensure cross-platform compatibility (using polyglot `.cmd`/`.sh` wrappers that detect Windows CMD and run the script via Git Bash `bash.exe -l -c`).
- Align hook output to the host agent schema: Cursor expects `additional_context`, Claude Code expects `hookSpecificOutput.additionalContext`, and Copilot CLI/SDK standard expects `additionalContext`.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names APIs, MCP, connectors, auth, tools, or external systems.
- Workflow distinguishes local files from remote systems.
- Skill defines tool availability checks.
- Failure modes cover auth failure, network failure, rate limits, schema drift, and partial writes.
- Output format includes called tools and results.
- References include endpoint schemas or server capability notes.
- Hooks (if used) are wrapped to prevent CMD.exe execution failures on Windows.
- Hook outputs are correctly JSON-escaped (handling newlines, backslashes, quotes) without using hang-prone bash heredocs.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- OpenAPI or JSON schema references.
- Mock server or fixture payloads.
- Idempotency guidance.
- Permission matrix.
- Audit log format.

## Example Skill Ideas

- GitHub issue triage integration skill.
- Slack summary sender skill.
- MCP server usage advisor skill.
- CRM update skill.

## Examples

Input: "Help me design a skill for tool integration workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This tool integration skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Tool unavailable: provide a manual fallback or setup checklist.
- Authentication fails: avoid retry loops and report required credentials.
- Schema mismatch: inspect current schema and update references.
- Partial write succeeds: report completed actions and required reconciliation.

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
Integration target: <system>
Trigger description draft: <Use when...>
Permission model:
- <scope>
Tool contract / Hook configuration:
- <input/output or hooks.json details and cross-platform wrappers>
Failure recovery:
- <mode and recovery>
Validation:
- <check>
```
