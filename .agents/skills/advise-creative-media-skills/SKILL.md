---
name: advise-creative-media-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for image, video, audio, design assets, brand media, creative writing, content production, or generative media workflows.
---

# Creative Media Skill Advisor

Advise the human on skills that help agents create, edit, or direct media with clear creative constraints.

## Workflow

1. Identify the medium: image, video, audio, design asset, copy, brand content, or mixed media.
2. Define creative intent, audience, style constraints, and deliverable specs.
3. Specify required assets, references, licensing constraints, and model/tool dependencies.
4. Define iteration, variant, and approval behavior.
5. Add validation for format, dimensions, fidelity, and brand fit.
6. Return a creative-media skill blueprint.

## Category Standards

- Ask for or infer deliverable specs before production.
- Preserve brand and licensing constraints.
- Separate concepting from final asset generation.
- Use assets for templates and references when repeatable.
- Validate output dimensions and file formats.
- State uncertainty when visual or audio inspection is required.

## Checklist

- Trigger description names media type or creative production.
- Workflow defines style, audience, and output format.
- Skill defines asset handling and licensing boundaries.
- Failure modes cover missing references, unsupported formats, and brand mismatch.
- Output format includes concepts, variants, or artifact paths.
- Validation includes format and quality checks.

## Nice To Have

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

## Failure Modes

- Creative brief is vague: ask for audience, medium, and intended use.
- Required asset is missing: request it or propose a placeholder workflow.
- Licensing is unclear: avoid using restricted assets and ask for confirmation.
- Output does not match specs: regenerate or edit against the measured requirement.

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
