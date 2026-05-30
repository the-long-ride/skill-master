---
name: advise-frontend-design-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for frontend UI, UX, design systems, responsive web apps, visual polish, accessibility, or product interface implementation.
---

# Frontend Design Skill Advisor

Advise the human on skills that make agents build usable, polished interfaces instead of generic pages.

## Workflow

1. Identify the product type, audience, and primary workflow.
2. Define the design constraints: framework, component library, brand, density, accessibility, and viewport targets.
3. Specify what the skill should inspect before designing: existing components, CSS tokens, routes, and screenshots.
4. Define implementation guidance for layout, controls, states, and responsive behavior.
5. Add validation requirements for screenshots, interaction checks, and text fitting.
6. Return a skill blueprint with examples and quality gates.

## Category Standards

- Build the usable experience first, not a marketing shell.
- Match the existing design system when present.
- Require stable dimensions for boards, toolbars, cards, and repeated UI.
- Include accessibility and keyboard expectations when relevant.
- Require visual verification for meaningful UI changes.
- Keep design guidance domain-specific rather than purely decorative.

## Checklist

- Trigger description mentions UI, UX, frontend, web app, or visual implementation.
- Workflow covers discovery of existing design patterns.
- Skill defines expected controls, empty states, loading states, and errors.
- Skill defines mobile and desktop viewport checks.
- Failure modes cover missing assets, unavailable dev server, and visual regressions.
- Output format includes implementation plan and verification evidence.

## Nice To Have

- Component inventory reference.
- Screenshot comparison checklist.
- Design token reference.
- Accessibility quick checks.
- Example prompts by app type: SaaS, dashboard, game, portfolio, editor.

## Example Skill Ideas

- Dashboard UI builder skill.
- Design-system migration skill.
- Responsive layout repair skill.
- Visual QA skill.

## Failure Modes

- No design system exists: create a small local style vocabulary and document it in the skill.
- UI goal is vague: ask for target users and the main repeated workflow.
- Visual assets are missing: require suitable assets or define a generated-asset path.
- Verification cannot run: provide a manual screenshot checklist.

## Output Format

Return:

```text
Skill concept: <name>
Frontend scope: <scope>
Audience and workflow: <summary>
Trigger description draft: <Use when...>
Design standards:
- <standard>
Required resources:
- <resource>
Validation:
- <viewport or interaction check>
```
