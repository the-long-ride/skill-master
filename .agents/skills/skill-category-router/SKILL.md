---
name: skill-category-router
description: Use when a human wants to classify a proposed AI agent skill into a category, choose the right category advisor skill, or decide how multiple skill categories should interact.
---

# Skill Category Router

Use this skill to route skill-design requests. Do not perform the target domain work. Help the human choose the best category advisor and the boundaries for the skill they want to build.

The preferred human entry point is `/skill-master`, defined in `.agents/commands/skill-master.md`. That command routes natural language through `.agents/routing/skill-master-routing.json` before loading the selected advisor skill.

## Workflow

1. Restate the proposed skill in one sentence.
2. Identify the user intent as design, review, enhancement, migration, or category selection.
3. Read `.agents/routing/skill-master-routing.json` when available.
4. Read `references/category-map.md` when the category is unclear, overlapping, or new.
5. Read `references/routing-examples.md` when natural-language examples would clarify the route.
6. Select one primary category and up to two adjacent categories.
7. Prefer the most specific category over a broad one.
8. Explain why the chosen category should own the skill.
9. Point the human to the matching advisor skill name and path.
10. List the first design decisions the advisor should resolve.

## Routing Rules

- Use only category-advisor skills for skill-design consultation.
- Do not route to an execution skill when the human is asking how to build a skill.
- Route by the durable workflow, not by the tool name alone.
- If a request crosses categories, choose the category that owns the highest-risk behavior.
- If no category fits, propose a provisional category and define its trigger boundary.
- If the request came through `/skill-master`, return a complete target skill blueprint after routing.
- If the request did not come through `/skill-master`, still use the same routing table and output shape.

## Failure Modes

- Ambiguous request: ask for the target user, target task, and expected artifact before routing.
- User asks to do the task instead of design a skill: say this router is for skill design and name the execution category separately.
- Multiple categories fit equally: return a primary category, adjacent categories, and the deciding question.
- Category is missing: propose a provisional category with trigger examples and validation criteria.
- Unsafe category behavior: route to `advise-security-compliance-skills` as an adjacent advisor.

## Output Format

Return:

```text
Requested skill: <one sentence>
Primary category: <category>
Advisor skill: <advisor skill name>
Advisor path: <advisor path>
Adjacent categories: <0-2 categories>
Reasoning: <short explanation>
Trigger guidance: <what the skill description should emphasize>
First design decisions:
1. <decision>
2. <decision>
3. <decision>
Example trigger phrases:
1. <phrase>
2. <phrase>
3. <phrase>
Next step: <which advisor to use and what to ask it for>
```
