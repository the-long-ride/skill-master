# Skill Master

Skill Master is a routed skill-design catalog for AI agents.

Instead of asking humans to remember many skill names, Skill Master gives them one entry point:

```text
/skill-master <what you want to build, review, or improve>
```

The agent then reads the routing catalog, chooses the right advisor skill, and produces a concrete blueprint for the target `SKILL.md`.

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
