# Forward-Test Prompts

Use these prompts before publishing the target skill. The expected behavior is that positive prompts activate the skill or its category, and negative prompts route elsewhere or ask for clarification.

## Positive Route Tests

{{positivePrompts}}

## Boundary Tests

{{negativePrompts}}

## Scaffold Quality Tests

1. Ask the agent to explain why the frontmatter description should trigger for the positive prompts.
2. Ask the agent to identify which prompt should not trigger and name the better category.
3. Ask the agent to produce the output format without inventing missing inputs.
