---
name: advise-documents-office-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for PDF, DOCX, PPTX, XLSX, forms, reports, office document automation, or formatting-preserving document workflows
---

# Documents And Office Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the documents & office domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for documents & office.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the documents & office task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the file type and operation: create, edit, extract, convert, compare, validate, or summarize.
2. Define formatting and fidelity requirements.
3. Choose deterministic libraries or scripts for fragile file operations.
4. Specify inspection steps before modifying files.
5. Define output validation, such as opening, parsing, formula checks, or page/image inspection.
6. Return a document-skill blueprint with file-specific safeguards.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Preserve original formatting unless the user requests redesign.
- Never treat binary office formats as plain text.
- Use format-aware libraries for edits.
- Keep original files unchanged unless the workflow explicitly permits overwrite.
- Validate generated files after writing.
- Explain unsupported file features and fallback behavior.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names file formats or document operations.
- Skill defines input and output file naming behavior.
- Workflow includes backup or copy behavior.
- Failure modes cover locked files, malformed documents, unsupported features, and conversion loss.
- References include file-format caveats when needed.
- Scripts are safer than repeated manual XML or binary edits.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Format-specific helper scripts.
- Template assets.
- Golden sample files.
- Validation script for generated artifacts.
- Style guide reference for reports or decks.

## Example Skill Ideas

- XLSX formula-safe editor skill.
- PPTX deck generator skill.
- PDF extraction skill.
- DOCX redline assistant skill.

## Examples

Input: "Help me design a skill for documents & office workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This documents & office skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- File cannot be parsed: preserve the original and ask for a different source or conversion path.
- Formatting may be lost: warn before conversion and offer a fidelity-preserving alternative.
- Formula or link risk: validate formulas, links, and external references after editing.
- Output cannot be opened: report the write failure and keep intermediate artifacts for debugging.

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
File workflow: <format and operation>
Trigger description draft: <Use when...>
Required safeguards:
- <safeguard>
Resources:
- scripts: <items>
- references: <items>
- assets: <items>
Validation:
- <check>
```
