# Repository Structure

This repository uses a Caveman-inspired layout: editable sources live at the repo root, generated outputs stay separate, and hidden runtime folders are not the source of truth.

## Source Of Truth

| Path | Purpose |
| --- | --- |
| `skills/` | All `SKILL.md` files and their `references/` folders. Edit skills here. |
| `commands/` | Human-facing slash commands. `/skill-master` lives here. |
| `src/routing/` | Machine-readable routing data used by commands and agents. |
| `scripts/` | Repeatable local verification and maintenance tools. |
| `docs/` | Human-facing docs and web-chat prompt packs. |
| `skill-index.json` | Machine-readable index of commands, routing, and skills. |
| `generated-reports/` | Verifier output. Generated, not source. |
| `package.json` | npm package metadata and `skill-master` binary definition. |
| `bin/` | Node CLI used by `npx skill-master`. |

## Routing Flow

1. Human invokes `/skill-master` with natural language.
2. Agent reads `commands/skill-master.md`.
3. Command reads `src/routing/skill-master-routing.json`.
4. Router selects one advisor from `skills/`.
5. Advisor returns a concrete blueprint for the target skill the human wants to build.

## Compatibility Notes

- `.agents/` exists in this workspace because earlier versions stored source there.
- Do not edit `.agents/` as source.
- On this Windows machine, `.agents/` has deny ACLs that prevent reliable moving, deleting, or overwriting.
- Root folders are authoritative even if stale files remain under `.agents/`.

## Verification

Run:

```powershell
pwsh scripts/verify-skills.ps1
```

The verifier checks:

- required `SKILL.md` sections
- `/skill-master` command file
- routing JSON shape
- advisor paths
- adjacent category references
- `skill-index.json` paths

## npm Packaging

The package is dependency-free and can be packed or published with npm:

```bash
npm test
npm pack --dry-run
npm publish
```

The package includes only source folders listed in `package.json#files`, so legacy `.agents/`, old `chat-web/`, and generated reports stay out of the npm tarball.
