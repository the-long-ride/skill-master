# Universal Agent Contract

This repository is designed to work with local coding agents and web LLM chat interfaces.

## Goals

- Keep skills reusable across agent runtimes.
- Keep activation rules explicit and predictable.
- Keep verification repeatable for both humans and agents.

## Required Skill Format

Every skill folder under `skills/<skill-name>/` should include:

- `SKILL.md` with YAML frontmatter (`name`, `description`)
- Optional `references/` files for heavy docs and templates

## Authoring Rules

- Description must start with `Use when`.
- Description must only describe triggering conditions.
- Workflow steps must be ordered and executable.
- Failure modes must include recovery behavior.
- Output format must be explicit.

## Runtime Compatibility

This source supports:

- VS Code agents (Copilot/Codex style)
- Claude-style skill runtimes
- Web interface LLM chat (manual prompt pack)

See `GUIDELINE.md` and `docs/WEB-CHAT-PACK.md` for web-chat usage.

## Local Verification

Two supported modes:

1. AI-guided verification (recommended for human interaction)

- Ask your agent: "Review all skills with PASS/PARTIAL/FAIL and required fixes."
- Agent should follow `skills/universal-skill-governance/SKILL.md` and return a structured report.

2. Script verification (recommended for repeatable automation)

Run:

```powershell
npx skill-master verify .
```

OS-specific alternatives:

- Windows: `pwsh scripts/verify-skills.ps1`
- Linux/macOS: `sh scripts/verify-skills.sh`
- Any OS with Node.js: `node scripts/verify-skills.js`

Outputs:

- `generated-reports/skill-audit-report.md`
- `generated-reports/skill-audit-report.json`

If a custom report directory is blocked by local filesystem permissions, the script falls back to `generated-reports/` and prints the fallback paths.

Script mode is optional. If script tooling is unavailable, use AI-guided mode and the same report format.

## Repository Index

Machine-readable skill metadata is in:

- `skill-index.json`

## Skill Category Advisors

This repository includes advisory skills that help humans design better AI agent skills by category.

- The single human-facing slash command is `/skill-master`, backed by `commands/skill-master.md`.
- Do not add category-specific slash commands; `commands/` must expose exactly one markdown command file.
- `/skill-master` routes natural language through `src/routing/skill-master-routing.json`, then loads the selected advisor skill.
- `skill-master create <name>` scaffolds a target skill from the selected routed category.
- Start with `skills/skill-category-router/SKILL.md` when the category is unclear.
- Use `advise-*-skills` folders when the human already knows the category.
- Category advisors consult on skill design; they should not perform the underlying domain task unless the user separately asks for that work.
- Business-work advisors are role-oriented, following the pattern of knowledge-work bundles: sales, support, product, marketing, finance, HR, legal, operations, productivity, enterprise knowledge, small business, and design/UX work.

## Repository Layout

This repository follows a Caveman-style source layout:

- `skills/` is the single source of truth for all agent skills.
- `commands/` contains human-facing slash commands, currently `/skill-master`.
- `src/routing/` contains internal routing data used by commands and agents.
- `scripts/` contains repeatable verification and maintenance tooling.
- `templates/` contains scaffold templates and advisor-specific blueprints.
- `docs/` contains human-facing prompt packs and usage docs.
- `generated-reports/` contains verifier output and should not be treated as source.
- `.agents/` is a legacy compatibility area on this machine; do not edit it as the source of truth.

See `docs/STRUCTURE.md` for the full layout and routing flow.
