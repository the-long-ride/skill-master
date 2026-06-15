# Changelog

All notable changes to Skill Master will be documented in this file.

## 1.0.1 - 2026-06-16

- Improved advisor skills with overview, trigger boundaries, inputs/tools, verification, examples, and human verification sections.
- Updated creating-skills checklist and template for trigger validation, verification, examples, and advisor/direct-execution boundaries.
- Updated universal skill governance checklist for verification and portability.

## Unreleased

- Added `skill-master create <name>` to scaffold target skills from routed advisor blueprints.
- Added optional `--with-openai` generation for `agents/openai.yaml`.
- Added optional `--codex-native` mode with the Skill Creator six-step process reference.
- Added advisor-specific scaffold templates under `templates/`.
- Added forward-test prompts for every advisor routing category.
- Tightened validation for YAML frontmatter, skill folder names, frontmatter/name alignment, and description quality.
- Enforced `/skill-master` as the only installed and supported slash command.
- Documented how Skill Master complements built-in skill creators in OpenAI, Claude, Hermes Agent-style, and manual workflows.

## 0.1.0 - 2026-06-01

- Added npm packaging with the `skill-master` CLI.
- Added `npx skill-master init` for installing the catalog into a project.
- Added `npx skill-master doctor` for validating commands, routing, index paths, and skills.
- Added OS-aware `npx skill-master verify` plus Windows, Linux, and macOS verification scripts.
- Added `/skill-master` as the single natural-language entry point.
- Added a machine-readable routing catalog with 28 categories.
- Added advisor skills for technical, business, creative, research, security, and domain workflows.
- Added web-chat guidance for manual LLM interfaces.
- Adopted a root source layout with `skills/`, `commands/`, `src/routing/`, `scripts/`, and `docs/`.
