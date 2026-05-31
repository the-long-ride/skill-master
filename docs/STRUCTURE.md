# Repository Structure

This repository uses a root source layout: editable sources live at the repository root, generated outputs stay separate, and hidden runtime folders are not the source of truth.

## Source Of Truth

| Path | Purpose |
| --- | --- |
| `skills/` | All `SKILL.md` files and their `references/` folders. |
| `commands/` | Human-facing slash commands. `/skill-master` lives here. |
| `src/routing/` | Machine-readable routing data used by commands and agents. |
| `scripts/` | Repeatable local verification and maintenance tools. |
| `docs/` | Human-facing docs and web-chat prompt packs. |
| `skill-index.json` | Machine-readable index of commands, routing, and skills. |
| `package.json` | npm package metadata and CLI entry definition. |
| `bin/` | Node CLI used by `npx skill-master`. |
| `generated-reports/` | Verifier output. Generated, not source. |

## Routing Flow

1. Human invokes `/skill-master` with natural language.
2. Agent reads `commands/skill-master.md`.
3. Command reads `src/routing/skill-master-routing.json`.
4. Router selects one advisor from `skills/`.
5. Advisor returns a concrete blueprint for the target skill.

## Verification

Run:

```bash
npx skill-master verify .
```

Or run the script for the current OS:

```powershell
pwsh scripts/verify-skills.ps1
```

```bash
sh scripts/verify-skills.sh
```

Portable Node fallback:

```bash
node scripts/verify-skills.js
```
