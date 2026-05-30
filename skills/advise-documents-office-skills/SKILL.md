---
name: advise-documents-office-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for PDF, DOCX, PPTX, XLSX, forms, reports, office document automation, or formatting-preserving document workflows.
---

# Documents And Office Skill Advisor

Advise the human on skills that manipulate structured office files without losing formatting or data integrity.

## Workflow

1. Identify the file type and operation: create, edit, extract, convert, compare, validate, or summarize.
2. Define formatting and fidelity requirements.
3. Choose deterministic libraries or scripts for fragile file operations.
4. Specify inspection steps before modifying files.
5. Define output validation, such as opening, parsing, formula checks, or page/image inspection.
6. Return a document-skill blueprint with file-specific safeguards.

## Category Standards

- Preserve original formatting unless the user requests redesign.
- Never treat binary office formats as plain text.
- Use format-aware libraries for edits.
- Keep original files unchanged unless the workflow explicitly permits overwrite.
- Validate generated files after writing.
- Explain unsupported file features and fallback behavior.

## Checklist

- Trigger description names file formats or document operations.
- Skill defines input and output file naming behavior.
- Workflow includes backup or copy behavior.
- Failure modes cover locked files, malformed documents, unsupported features, and conversion loss.
- References include file-format caveats when needed.
- Scripts are safer than repeated manual XML or binary edits.

## Nice To Have

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

## Failure Modes

- File cannot be parsed: preserve the original and ask for a different source or conversion path.
- Formatting may be lost: warn before conversion and offer a fidelity-preserving alternative.
- Formula or link risk: validate formulas, links, and external references after editing.
- Output cannot be opened: report the write failure and keep intermediate artifacts for debugging.

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
