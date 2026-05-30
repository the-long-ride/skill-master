# Skill Master

Skill Master is a routed skill-design catalog for AI agents. Humans use one slash command, `/skill-master`, and the agent routes natural language to the right advisor skill.

## Install With npx

Install the catalog into a project:

```bash
npx skill-master init
```

Validate an install:

```bash
npx skill-master doctor .
```

List route categories:

```bash
npx skill-master list
```

## Local Development

```bash
npm test
npm run pack:dry
```

## Layout

- `commands/` contains `/skill-master`.
- `skills/` contains all advisor skills.
- `src/routing/` contains the routing catalog.
- `scripts/` contains verification tooling.
- `docs/` contains human-facing documentation.
- `skill-index.json` indexes commands, routing, and skills.

See `docs/STRUCTURE.md` for details.

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
