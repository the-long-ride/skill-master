---
name: advise-tool-integration-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for APIs, MCP servers, SaaS connectors, authentication flows, schemas, tool calling, external systems, or integration-heavy workflows.
---

# Tool Integration Skill Advisor

Advise the human on skills that connect agents to external systems safely and predictably.

## Workflow

1. Identify the external system, operation types, and permission level.
2. Define authentication, secrets, scopes, rate limits, and audit expectations.
3. Specify schema discovery and validation for inputs and outputs.
4. Separate read-only, write, and destructive actions.
5. Define dry-run, confirmation, and rollback behavior where relevant.
6. Return an integration-skill blueprint with tool contracts and failure recovery.

## Category Standards

- Default to read-only behavior until the skill explicitly requires mutation.
- Never hardcode secrets.
- Validate tool inputs before calling external systems.
- Explain permission scopes and state-changing actions.
- Handle rate limits and partial failures.
- Include mock or sample payloads when possible.

## Checklist

- Trigger description names APIs, MCP, connectors, auth, tools, or external systems.
- Workflow distinguishes local files from remote systems.
- Skill defines tool availability checks.
- Failure modes cover auth failure, network failure, rate limits, schema drift, and partial writes.
- Output format includes called tools and results.
- References include endpoint schemas or server capability notes.

## Nice To Have

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

## Failure Modes

- Tool unavailable: provide a manual fallback or setup checklist.
- Authentication fails: avoid retry loops and report required credentials.
- Schema mismatch: inspect current schema and update references.
- Partial write succeeds: report completed actions and required reconciliation.

## Output Format

Return:

```text
Skill concept: <name>
Integration target: <system>
Trigger description draft: <Use when...>
Permission model:
- <scope>
Tool contract:
- <input/output>
Failure recovery:
- <mode and recovery>
Validation:
- <check>
```
