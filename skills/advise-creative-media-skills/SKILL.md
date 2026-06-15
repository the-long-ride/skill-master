---
name: advise-creative-media-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for image, video, audio, design assets, brand media, creative writing, content production, or generative media workflows
---

# Creative Media Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the creative media domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for creative media.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the creative media task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the medium: image, video, audio, design asset, copy, brand content, or mixed media.
2. Define creative intent, audience, style constraints, and deliverable specs.
3. Specify required assets, references, licensing constraints, and model/tool dependencies.
4. Define iteration, variant, and approval behavior.
5. Add validation for format, dimensions, fidelity, and brand fit.
6. Return a creative-media skill blueprint.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ask for or infer deliverable specs before production.
- Preserve brand and licensing constraints.
- Separate concepting from final asset generation.
- Use assets for templates and references when repeatable.
- Validate output dimensions and file formats.
- State uncertainty when visual or audio inspection is required.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names media type or creative production.
- Workflow defines style, audience, and output format.
- Skill defines asset handling and licensing boundaries.
- Failure modes cover missing references, unsupported formats, and brand mismatch.
- Output format includes concepts, variants, or artifact paths.
- Validation includes format and quality checks.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Prompt templates.
- Brand asset folder.
- Export presets.
- Style guide reference.
- Variant naming convention.

## Example Skill Ideas

- Brand image generation skill.
- Video storyboard skill.
- Podcast show-notes skill.
- Creative campaign concept skill.

## Examples

Input: "Help me design a skill for creative media workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This creative media skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Creative brief is vague: ask for audience, medium, and intended use.
- Required asset is missing: request it or propose a placeholder workflow.
- Licensing is unclear: avoid using restricted assets and ask for confirmation.
- Output does not match specs: regenerate or edit against the measured requirement.

## Human Verification

Score the revised skill before calling it ready:

```text
Discovery: PASS | PARTIAL | FAIL
Content: PASS | PARTIAL | FAIL
Verification: PASS | PARTIAL | FAIL
Critical gaps:
1. <gap>
Required fixes:
1. <fix>
Decision: READY | NEEDS REVISION
```

## Output Format

Return:

```text
Skill concept: <name>
Creative medium: <medium>
Trigger description draft: <Use when...>
Creative constraints:
- <constraint>
Resources:
- <asset or reference>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
