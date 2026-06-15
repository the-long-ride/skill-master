# Universal Skill Checklist

## Discovery

- Description starts with `Use when`.
- Description contains only triggering conditions.
- Name is short and searchable.
- Negative triggers prevent advisor skills from being used for direct task execution.

## Content

- Overview states core principle.
- Workflow has ordered executable steps.
- Failure modes include recovery actions.
- Output format is explicit.
- Examples show concrete input and expected output.
- Verification section exists and is repeatable.

## Portability

- Skill is understandable without one specific runtime.
- Runtime-specific details are isolated to references.
- No hidden dependency on unavailable tools.

## Quality

- Skill is compact enough to trigger reliably and load without flooding context.
- Heavy reference material lives in `references/`.
- Scripts are deterministic, parameterized, and tested.
- Irreversible actions have explicit stop conditions.

## Verification

- Trigger-positive prompt passes.
- Trigger-negative prompt is rejected or redirected.
- Human review confirms checklist alignment.
- Local script run has no critical FAIL.
- Publish decision is documented.
