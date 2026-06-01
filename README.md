# Skill Master

Skill Master is a routed skill-design catalog for AI agents.

Instead of asking humans to remember many skill names, Skill Master gives them one entry point:

```text
/skill-master <what you want to build, review, or improve>
```

The agent then reads the routing catalog, chooses the right advisor skill, and produces a concrete blueprint for the target `SKILL.md`.

Only one slash command is installed and supported: `/skill-master`. All category routing happens behind that command.

## Why This Helps

- One command, many expert advisors.
- Natural-language routing for humans.
- Category-specific standards, examples, failure modes, and validation prompts.
- Works with local coding agents and manual web chat workflows.
- Installable with `npx`, so teams can bootstrap the same structure quickly.
- Designed for contribution: new categories, examples, and advisor skills can be added without changing the whole system.

## Quick Start

Install Skill Master into a project:

```bash
npx skill-master init
```

Validate the install:

```bash
npx skill-master doctor .
```

Run OS-aware script verification:

```bash
npx skill-master verify .
```

List routed categories:

```bash
npx skill-master list
```

Scaffold a target skill from a routed blueprint:

```bash
npx skill-master create sales-call-prep --category sales-revenue --with-openai --codex-native
```

`create` writes `skills/<name>/SKILL.md`, `references/blueprint.md`, and forward-test prompts. `--with-openai` adds optional `agents/openai.yaml` metadata. `--codex-native` adds the Skill Creator six-step process as a local reference.

## Compared With Built-In Skill Creators

Skill Master is a companion layer for built-in skill systems, not a replacement. Use the native creator inside your agent when you already know the exact skill you want. Use Skill Master when the human request is still fuzzy, cross-functional, or needs routing, standards, examples, and validation before a target skill is written.

| System | What it is good at | Where Skill Master adds value |
| --- | --- | --- |
| ChatGPT, Codex, and OpenAI `skill-creator` | Creating or modifying a specific skill in the OpenAI skill flow. OpenAI documents a default `skill-creator` and skills that follow the Agent Skills open standard. | Adds a local, npm-installable routing catalog, category advisors, forward-test prompts, stricter repo validation, and optional Codex-native scaffolds before the final skill is polished in the native creator. |
| Claude and Claude Code Skills | Loading `SKILL.md` instructions when relevant, and allowing direct slash invocation such as `/skill-name` in Claude Code. Claude Code can derive commands from skill folders. | Keeps the installed human-facing surface to exactly one command: `/skill-master`. Advisor categories stay internal, so teams avoid a growing menu of category slash commands. |
| Hermes Agent-style skill systems | Installing, listing, and reusing runtime-specific skills or registry modules for agent execution. Hermes docs describe reusable skill modules and self-improving skill discovery. | Helps design the portable blueprint first, then lets the team adapt it to Hermes or another runtime-specific skill format. |
| Manual prompt writing | Fast for one-off instructions. | Turns repeated prompt patterns into governed, testable `SKILL.md` files with trigger rules, failure modes, and output contracts. |

Useful references:

- OpenAI: [Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt), [Plugins and skills for Codex](https://openai.com/academy/codex-plugins-and-skills)
- Anthropic: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Hermes Agent: [skills system overview](https://hermes-agent.app/en/docs), [features](https://www.hermes-ai.net/docs/features/)

## Roadmap And Weak Points

Skill Master is useful today as a routed starter kit, but it is still early. The honest goal is to make skill creation less random, not to pretend one catalog can already understand every team workflow.

Known weak points:

- Category quality is uneven. Some advisors are strong starting points, while others need more real-world examples, edge cases, and domain-specific validation.
- Routing is rules-and-metadata based. It helps agents choose, but it is not a trained classifier and can still misroute ambiguous requests.
- Scaffolded skills are drafts. `skill-master create` gives a structured folder and blueprint, but humans or agents still need to fill in real sources, tools, examples, and policies.
- Verification is mostly structural. The scripts catch broken frontmatter, naming, routing metadata, and required sections, but they do not prove the skill performs well in a live agent session.
- Cross-runtime compatibility needs more testing. The repo is designed for local agents and web chat, but each runtime has its own quirks around skill discovery, slash commands, metadata, tools, and permissions.
- Business categories need sharper boundaries. Sales, support, product, finance, HR, legal, operations, and small-business workflows can overlap heavily in real companies.

Planned improvements:

- Add more forward-test prompt sets per category, including ambiguous and negative routing cases.
- Add example target skills generated from each advisor category.
- Add runtime-specific install notes for Codex, Claude Code, ChatGPT, Gemini, Hermes Agent-style agents, and other compatible runtimes.
- Add a routing test suite that checks natural-language requests against expected categories.
- Add richer advisor templates for business workflows, including source systems, approval gates, compliance checks, and output artifacts.
- Add optional interactive creation flow for `skill-master create`, so users can answer a few questions before scaffolding.
- Add better package smoke tests that install into a clean temp repo and verify only `/skill-master` is exposed.
- Improve generated `agents/openai.yaml` as the OpenAI/Codex metadata shape evolves.

Contributors can help most by adding real examples: prompts that should route to a category, prompts that should not, strong target skill drafts, and failure cases from actual agent use.

## Use With AI Agents

After installation, ask your agent to use:

```text
/skill-master I want to build a skill that helps support teams triage customer tickets
```

The agent should read `commands/skill-master.md`, route through `src/routing/skill-master-routing.json`, then load the selected advisor skill from `skills/`.

For ChatGPT, Claude.ai, Gemini, or other web chat interfaces, see `GUIDELINE.md` and `docs/WEB-CHAT-PACK.md`.

## Contributing

Contributions are welcome. Good improvements include:

- New advisor categories.
- More realistic routing examples.
- Better advisor-specific templates in `templates/`.
- Stronger forward-test prompts for each category.
- Better failure modes and validation prompts.
- Cross-runtime compatibility notes.
- Tests for routing and package installation.
- Documentation for specific agents and web chat interfaces.

Before proposing changes, run:

```bash
npm test
npm run verify
npm pack --dry-run
```

## Documentation

- `GUIDELINE.md` explains installation, local-agent usage, and web-chat usage.
- `docs/STRUCTURE.md` explains the source layout.
- `CHANGELOG.md` tracks notable changes.
- `LICENSE` contains the MIT license.
