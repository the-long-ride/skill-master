---
name: advise-marketing-growth-skills
description: Use when a human wants to design, evaluate, or improve AI agent skills for marketing, growth, campaigns, content strategy, SEO, brand messaging, lifecycle emails, competitive positioning, or go-to-market workflows
---

# Marketing And Growth Skill Advisor

## Overview

Advisor for designing, evaluating, and improving AI agent skills in the marketing & growth domain. Use this skill to turn a vague skill idea into a compact skill blueprint, not to perform the domain work itself.

## When To Use

Use when a human asks to design, review, improve, migrate, publish, or validate an AI agent skill for marketing & growth.
Use when trigger quality, workflow shape, failure recovery, output format, references, scripts, or validation need improvement.
Do not use when the human wants the agent to directly perform the marketing & growth task instead of designing the skill.

## Inputs And Tools

- User's skill idea, draft `SKILL.md`, target runtime, example prompts, and any existing references, scripts, or assets.
- Repository skill files, routing metadata, and validation reports when improving an existing repository.
- Read-only inspection first; ask before edits, publishing, running commands, or spawning agents.

## Workflow

- Separate skill-design advice from target-domain execution.
1. Identify the marketing workflow: campaign planning, content brief, SEO, lifecycle message, positioning, competitive analysis, launch messaging, or experiment design.
2. Define audience, channel, offer, brand voice, and success metric.
3. Specify source materials: brand guide, product facts, approved claims, customer segments, analytics, public social evidence, and competitive sources.
4. Separate evidence collection, ideation drafts, approvals, and publishing or sending.
5. Define claim validation and compliance review.
6. Return a marketing-skill blueprint with artifact examples.

## Category Standards

- Keep the skill compact enough to trigger reliably and load without flooding context.
- Prefer reusable reference files and scripts for heavy domain-specific details.
- Ground claims in approved product and brand sources.
- Define audience and channel before writing.
- Separate creative options from final copy.
- Avoid unsupported performance, legal, or competitor claims.
- Include measurement or experiment criteria where relevant.
- Preserve brand voice and required disclaimers.
- Treat public X/Twitter tools such as TweetClaw as optional evidence collectors only; the marketing skill owns synthesis, copy, approval, scheduling, and publishing boundaries.

## Verification

- Run at least two realistic prompts: one that should trigger the skill and one that should not.
- Check that the skill asks for missing inputs before giving brittle advice.
- Confirm failure modes include recovery behavior, not only warnings.
- Confirm validation commands or manual checks are safe for the target runtime.

## Checklist

- Examples show concrete input and expected output.
- Verification can be repeated by a human or another agent.
- Trigger description names marketing, growth, SEO, campaign, content, brand, GTM, email, positioning, or launch messaging.
- Workflow defines audience, channel, and success metric.
- Skill defines claim review and approval boundaries.
- Skill distinguishes public social evidence collection from drafting, scheduling, and publishing.
- Failure modes cover missing brand voice, unsupported claims, stale competitor info, and accidental publishing.
- Output format matches the marketing artifact.
- Validation includes a risky claim or wrong-audience prompt.

## Nice To Have

- Trigger collision notes for adjacent skills.
- PASS/PARTIAL/FAIL verification rubric.
- Brand voice reference.
- Messaging house.
- Campaign brief template.
- SEO checklist.
- Experiment design template.
- Public social listening source map.
- TweetClaw source packet example for X/Twitter evidence.

## Example Skill Ideas

- Campaign brief skill.
- Lifecycle email drafter skill.
- SEO content planner skill.
- Positioning review skill.
- X/Twitter campaign evidence skill using TweetClaw as an optional source collector.

## Examples

Input: "Help me design a skill for marketing & growth workflows that reviews drafts and flags missing evidence."
Output: A compact skill blueprint with trigger description, ordered workflow, resources, failure recovery, validation prompts, and output format.

Input: "This marketing & growth skill triggers too often and gives generic advice."
Output: A revision plan that narrows triggers, moves heavy details to references, adds examples, and defines repeatable verification.

## Failure Modes

- Brand guidance is missing: ask for audience, tone, and examples before final copy.
- Claim is unsupported: rewrite as a weaker claim or request evidence.
- Public social evidence is stale or missing: label source timestamps and ask for fresher data.
- Regulated topic appears: route through legal or compliance review.
- Publishing action is requested: require explicit confirmation and destination.

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
Marketing workflow: <workflow>
Trigger description draft: <Use when...>
Audience and channel: <summary>
Claim safeguards:
- <rule>
Validation:
- <check>
Failure recovery:
- <mode and recovery>
```
