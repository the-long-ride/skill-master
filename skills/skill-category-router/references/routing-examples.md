# Skill Master Routing Examples

Use this file when natural language could route to more than one advisor. The command `/skill-master` should still load `src/routing/skill-master-routing.json` first because that file is easier for agents to scan mechanically.

## Business Examples

| Human request | Primary advisor | Why |
| --- | --- | --- |
| "Build a skill that prepares sales reps for renewal calls." | `advise-sales-revenue-skills` | Sales owns renewal, account context, CRM, and deal risk. |
| "Build a skill that turns resolved tickets into help-center articles." | `advise-customer-support-skills` | Support owns ticket context, customer impact, and escalation boundaries. |
| "Build a skill that writes PRDs from research notes." | `advise-product-management-skills` | PM owns requirements, evidence synthesis, non-goals, and prioritization. |
| "Build a skill that checks lifecycle emails against brand and claims." | `advise-marketing-growth-skills` | Marketing owns channel, audience, brand voice, and claim validation. |
| "Build a skill that reconciles invoices before payment approval." | `advise-finance-accounting-skills` | Finance owns controls, reconciliation, approvals, and audit trail. |
| "Build a skill that answers employee PTO policy questions." | `advise-people-hr-skills` | HR owns policy source, jurisdiction, employee privacy, and escalation. |
| "Build a skill that extracts risky clauses from vendor contracts." | `advise-legal-work-skills` | Legal owns playbook review, clause evidence, and attorney-review boundaries. |
| "Build a skill that turns messy processes into SOPs." | `advise-operations-process-skills` | Operations owns repeatable process, ownership, handoffs, and exceptions. |
| "Build a skill that prepares my day from calendar, tasks, and email." | `advise-productivity-workplace-skills` | Productivity owns personal workflow, calendar, tasks, and message drafts. |
| "Build a skill that finds the latest internal policy across Slack and Notion." | `advise-enterprise-search-knowledge-skills` | Enterprise knowledge owns internal source hierarchy, access, and freshness. |
| "Build a skill for a local plumber to draft quotes and follow-ups." | `advise-small-business-skills` | Small business owns owner-operator simplicity and lightweight workflows. |
| "Build a skill that critiques Figma flows before engineering handoff." | `advise-design-ux-work-skills` | Design and UX owns critique, handoff, usability, and design evidence. |
| "Build a skill for quarterly planning across sales, product, and finance." | `advise-business-operations-skills` | Cross-functional business ops owns planning and decision coordination. |

## Technical Examples

| Human request | Primary advisor | Adjacent advisors |
| --- | --- | --- |
| "Build a skill that reviews TypeScript pull requests." | `advise-software-engineering-skills` | `advise-testing-qa-skills`, `advise-security-compliance-skills` |
| "Build a skill that creates polished SaaS dashboards." | `advise-frontend-design-skills` | `advise-testing-qa-skills`, `advise-design-ux-work-skills` |
| "Build a skill that runs Playwright visual checks." | `advise-testing-qa-skills` | `advise-frontend-design-skills` |
| "Build a skill that fills government web forms." | `advise-browser-automation-skills` | `advise-security-compliance-skills` |
| "Build a skill that uses a Jira MCP server." | `advise-tool-integration-skills` | `advise-security-compliance-skills` |
| "Build a skill that deploys Terraform changes." | `advise-devops-cloud-skills` | `advise-security-compliance-skills` |

## Content And Knowledge Examples

| Human request | Primary advisor | Adjacent advisors |
| --- | --- | --- |
| "Build a skill that summarizes academic papers with citations." | `advise-research-rag-skills` | `advise-science-domain-skills` |
| "Build a skill that edits DOCX files without losing comments." | `advise-documents-office-skills` | none |
| "Build a skill that remembers my project preferences." | `advise-memory-personalization-skills` | `advise-security-compliance-skills` |
| "Build a skill that generates campaign images." | `advise-creative-media-skills` | `advise-marketing-growth-skills` |
| "Build a skill that checks engineering calculations." | `advise-science-domain-skills` | `advise-research-rag-skills` |

## Routing Output Example

```text
Skill Master Route
- Primary category: sales-revenue
- Advisor skill: advise-sales-revenue-skills
- Advisor path: skills/advise-sales-revenue-skills/SKILL.md
- Adjacent categories: tool-integration, security-compliance
- Why this route: The requested target skill works with CRM context, customer-facing drafts, and renewal deal risk.

Target Skill Blueprint
- Recommended skill name: renewal-call-prep
- Trigger description draft: Use when an agent needs to help sales or customer success teams prepare for renewal calls using account history, CRM data, prior commitments, product usage context, and approved messaging.
- Should trigger for:
  1. "Prep me for a renewal call with Acme."
  2. "Build a brief for tomorrow's expansion meeting."
  3. "Review this account before the renewal negotiation."
- Should not trigger for:
  1. "Resolve this support ticket."
  2. "Write a generic brand campaign."
- Required workflow:
  1. Gather account, opportunity, renewal date, attendees, and prior commitments.
  2. Identify renewal risk, expansion signals, open issues, and required approvals.
  3. Draft agenda, questions, talk tracks, and internal notes.
- Recommended resources:
  - scripts: none unless CRM exports need deterministic parsing
  - references: CRM field map, renewal playbook, approved messaging
  - assets: call brief template
- Failure modes and recovery:
  - Stale CRM data: mark uncertainty and ask for confirmation before customer-facing use.
- Validation prompts:
  1. "Prep me for a renewal with missing attendee titles."
  2. "Prep me when CRM says healthy but support tickets show escalation."
- Output format for the target skill:
  Renewal brief, risk summary, agenda, discovery questions, customer-safe follow-up draft.
```
