# Skill Master Guideline

This guide explains how to install, use, verify, and publish Skill Master.

## Install With npx

Install the catalog into a project:

```bash
npx skill-master init
```

Install into another folder:

```bash
npx skill-master init ./my-agent-repo
```

Validate an install:

```bash
npx skill-master doctor .
```

Run OS-aware script verification:

```bash
npx skill-master verify .
```

List route categories:

```bash
npx skill-master list
```

Create a target skill scaffold:

```bash
npx skill-master create sales-call-prep --category sales-revenue --prompt "skill for sales reps preparing renewal calls"
```

Useful create options:

- `--with-openai` adds optional `agents/openai.yaml` metadata for Codex/OpenAI-style UI discovery.
- `--codex-native` adds the Skill Creator six-step process reference.
- `--output <path>` writes under a custom skill root.
- `--dry-run` previews files before writing.

## Use With Local AI Agents

Use this when your agent can read local files, such as Codex, Claude Code, Copilot-style agents, or other coding assistants.

Skill Master exposes only one slash command: `/skill-master`. Do not add one command per category; the router loads category advisors internally.

1. Run `npx skill-master init` in the target repository.
2. Ask the agent with natural language:

```text
/skill-master I want to build a skill that reviews vendor contracts against our legal playbook
```

3. The agent should read `commands/skill-master.md`.
4. The command should route through `src/routing/skill-master-routing.json`.
5. The agent should load the selected advisor from `skills/`.
6. The final answer should include a target skill blueprint with trigger examples, workflow, resources, failure modes, validation prompts, and output format.
7. If you want files created locally, run `npx skill-master create <name> --category <primaryCategory> --prompt "<request>"`.

If the runtime does not support slash commands, ask:

```text
Use commands/skill-master.md as the routing command for this request:
I want to build a skill that helps finance teams reconcile invoices before payment approval.
```

## Use With ChatGPT

Use this when ChatGPT cannot directly load local files.

1. Paste the relevant section from `docs/WEB-CHAT-PACK.md`.
2. Paste or upload `commands/skill-master.md`.
3. Paste or upload `src/routing/skill-master-routing.json`.
4. Ask your request in natural language.
5. If ChatGPT selects an advisor, paste that advisor's `SKILL.md` from `skills/`.

Example:

```text
Act as /skill-master.
I want to design a skill that helps customer support teams summarize escalations for engineering.
Route it, then give me a target SKILL.md blueprint.
```

## Use With Claude.ai

Use Claude.ai with attachments when possible.

1. Attach `commands/skill-master.md`.
2. Attach `src/routing/skill-master-routing.json`.
3. Attach the likely advisor `SKILL.md`, or ask Claude to choose one first.
4. Ask for the target skill blueprint.

Example:

```text
Use these attached Skill Master files. Route this request:
Build a skill for product managers to synthesize user research into PRDs.
```

## Use With Gemini

Use Gemini similarly to a manual prompt pack.

1. Paste the `/skill-master` command instructions.
2. Paste the routing category list or upload the routing JSON.
3. Ask Gemini to choose one primary advisor and up to two adjacent advisors.
4. Paste the selected advisor skill if Gemini needs more detail.

Example:

```text
Use Skill Master routing. I want a skill that helps a small business owner draft customer quotes and follow-ups.
Return the route and the full target skill blueprint.
```

## Local Development

```bash
npm test
npm run verify
npm run pack:dry
```

## Verification Scripts By OS

Skill Master includes verification scripts for the common local-agent environments:

- Windows: `pwsh scripts/verify-skills.ps1`
- Linux: `sh scripts/verify-skills.sh`
- macOS: `sh scripts/verify-skills.sh`
- Any OS with Node.js: `node scripts/verify-skills.js`

The CLI command detects the current OS and chooses the corresponding script:

```bash
npx skill-master verify .
```

AI agents should use this rule when recommending verification:

1. Detect the current OS.
2. On Windows, run `pwsh scripts/verify-skills.ps1`.
3. On Linux or macOS, run `sh scripts/verify-skills.sh`.
4. If the OS-specific script is unavailable, run `npx skill-master doctor .`.

The verifier now checks stricter skill quality rules: YAML frontmatter must contain only `name` and `description`, skill folder names must be lowercase hyphen-case, frontmatter `name` must match the folder, descriptions must start with `Use when`, and each skill must include `Workflow`, `Failure Modes`, and `Output Format`.

## Publishing

Before publishing:

```bash
npm test
npm pack --dry-run
npm publish
```

If the npm name `skill-master` is unavailable, change `name` in `package.json` to a scoped package such as `@your-scope/skill-master`, then publish with:

```bash
npm publish --access public
```
