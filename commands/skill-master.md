---
description: Route a natural-language skill-building request to the right Skill Master advisor and return a concrete SKILL.md blueprint.
argument-hint: "<describe the skill you want to build, review, or improve>"
---

# /skill-master

Use this command as the only human-facing entry point for Skill Master. Do not expose category-specific slash commands; route every category through `/skill-master`.

The human may write natural language after the command:

```text
/skill-master I want a skill that helps sales reps prepare for renewal calls
/skill-master review this proposed skill for PDF contract extraction
/skill-master help me design an internal wiki search skill for company policies
```

For local scaffolding, use the npm CLI after routing is clear:

```bash
npx skill-master create sales-call-prep --category sales-revenue --with-openai --codex-native
```

## Route First

1. Treat `$ARGUMENTS` as the human's requested skill concept.
2. If the request references files, inspect only the files needed to classify and advise.
3. Read `src/routing/skill-master-routing.json`.
4. Choose exactly one `primaryCategory`.
5. Choose up to two `adjacentCategories` only when they affect safety, sources, validation, or deliverables.
6. Load the `advisorPath` for the primary category.
7. Follow that advisor's workflow to produce the skill-design consultation.
8. If the human asks to create files locally, use `skill-master create <name>` with the selected `primaryCategory`.

## Routing Rules

- Route to the most specific advisor category.
- Route business-work requests by role or workflow before using the general business operations advisor.
- Route internal company search to enterprise search and knowledge, not generic research and RAG.
- Route external customer communication by audience and intent: sales, support, marketing, or small business.
- Route state-changing, regulated, or sensitive workflows with security and compliance as an adjacent category.
- If no category fits, use `skill-category-router` and propose a new category boundary.

## Verification Script Selection

When the human asks to verify Skill Master or a target skill, detect the current OS and choose the corresponding script:

- Windows: run `pwsh scripts/verify-skills.ps1`.
- Linux: run `sh scripts/verify-skills.sh`.
- macOS: run `sh scripts/verify-skills.sh`.
- Any OS with Node.js: `node scripts/verify-skills.js` is a portable fallback.

If using the npm CLI, prefer `npx skill-master verify .`; it detects the OS and runs the matching script.

## Local Scaffold Command

Use `skill-master create <name>` only after selecting a category. It scaffolds a target skill from the routed blueprint:

```bash
npx skill-master create <hyphen-case-name> --category <primaryCategory> --prompt "<human request>"
```

Options:

- `--with-openai` adds `agents/openai.yaml` metadata for Codex/OpenAI-style UI discovery.
- `--codex-native` adds `references/codex-native-process.md` with the Skill Creator six-step process.
- `--output <path>` writes under a custom skill root instead of `skills/`.
- `--dry-run` previews the files.

## What To Produce

Return a concrete skill blueprint. The output must help an AI agent create or improve the target `SKILL.md`.

```text
Skill Master Route
- Primary category: <category>
- Advisor skill: <advisor skill name>
- Advisor path: <path>
- Adjacent categories: <0-2 categories>
- Why this route: <brief reason>

Target Skill Blueprint
- Recommended skill name: <hyphen-case name>
- Trigger description draft: Use when ...
- Should trigger for:
  1. <natural language example>
  2. <natural language example>
  3. <natural language example>
- Should not trigger for:
  1. <negative example>
  2. <negative example>
- Required workflow:
  1. <step>
  2. <step>
  3. <step>
- Recommended resources:
  - scripts: <items or none>
  - references: <items or none>
  - assets: <items or none>
- Failure modes and recovery:
  - <mode>: <recovery>
- Validation prompts:
  1. <prompt>
  2. <prompt>
- Scaffold command:
  npx skill-master create <name> --category <category> --prompt "<request>"
- Output format for the target skill:
  <format>
```

## If Information Is Missing

Ask at most three focused questions, but only when routing or safety cannot be decided. Otherwise make conservative assumptions, label them, and continue.
