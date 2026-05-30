# Skill Category Map

Use this map to classify proposed AI agent skills. The category names are intentionally workflow-oriented so they can survive tool churn.

For machine-readable routing and examples, prefer `src/routing/skill-master-routing.json`. For human-readable examples, read `routing-examples.md`.

## Categories

| Category | Advisor skill | Route here when the human wants to build skills for |
| --- | --- | --- |
| Skill governance | `advise-skill-governance-skills` | authoring, auditing, publishing, compatibility, trigger quality, verification |
| Software engineering | `advise-software-engineering-skills` | code editing, debugging, reviews, refactors, migrations, repository workflows |
| Frontend design | `advise-frontend-design-skills` | UI/UX, design systems, web apps, responsive layout, visual polish |
| Testing and QA | `advise-testing-qa-skills` | unit, integration, browser, regression, accessibility, performance test workflows |
| Documents and office | `advise-documents-office-skills` | PDF, DOCX, PPTX, XLSX, forms, formatting preservation, reports |
| Data analytics | `advise-data-analytics-skills` | spreadsheets, BI, SQL, notebooks, metrics, dashboards, data cleaning |
| Research and RAG | `advise-research-rag-skills` | web research, retrieval, citations, source synthesis, knowledge bases |
| Memory and personalization | `advise-memory-personalization-skills` | persistent memory, user preferences, project context, recall and forgetting |
| Tool integration | `advise-tool-integration-skills` | APIs, MCP servers, SaaS connectors, auth flows, schema-bound tool calls |
| Browser automation | `advise-browser-automation-skills` | web navigation, scraping, form filling, screenshots, Playwright-style tasks |
| Agent orchestration | `advise-agent-orchestration-skills` | planning, routing, multi-agent workflows, evaluators, handoffs |
| DevOps and cloud | `advise-devops-cloud-skills` | CI/CD, deployments, infra, Kubernetes, Terraform, cloud resources |
| Security and compliance | `advise-security-compliance-skills` | threat modeling, secure review, secrets, policy, regulated workflows |
| Business operations | `advise-business-operations-skills` | cross-functional business workflows when no more specific business advisor owns the work |
| Sales and revenue | `advise-sales-revenue-skills` | sales, account planning, prospecting, CRM hygiene, outreach, pipeline review, deal prep |
| Customer support and success | `advise-customer-support-skills` | support tickets, customer response drafts, escalation, help-center updates, success workflows |
| Product management | `advise-product-management-skills` | PRDs, roadmaps, requirements, prioritization, launch planning, user research synthesis |
| Marketing and growth | `advise-marketing-growth-skills` | campaigns, SEO, lifecycle emails, positioning, brand messaging, go-to-market workflows |
| Finance and accounting | `advise-finance-accounting-skills` | budgeting, forecasting, invoicing, expense review, close workflows, financial reporting |
| People and HR | `advise-people-hr-skills` | recruiting, onboarding, performance cycles, employee communications, HR policy workflows |
| Legal work | `advise-legal-work-skills` | legal operations, contract support, clause extraction, playbook review, matter summaries |
| Operations and process | `advise-operations-process-skills` | SOPs, vendor coordination, procurement, scheduling, inventory, project operations |
| Productivity and workplace | `advise-productivity-workplace-skills` | meetings, calendars, email, notes, tasks, executive assistant workflows |
| Enterprise search and knowledge | `advise-enterprise-search-knowledge-skills` | internal search, wiki answers, document discovery, institutional memory, knowledge synthesis |
| Small business | `advise-small-business-skills` | owner-operator workflows, local services, quotes, simple bookkeeping, lightweight automation |
| Design and UX work | `advise-design-ux-work-skills` | UX research, design critique, Figma handoff, UX writing, design briefs |
| Creative media | `advise-creative-media-skills` | image, video, audio, brand assets, creative writing, content production |
| Science and domain | `advise-science-domain-skills` | scientific, legal, medical, education, engineering, or other expert-domain workflows |

## Evidence Signals

Prefer categories with public proof of repeatable value:

- Official examples or maintained reference implementations.
- High adoption projects in adjacent agent ecosystems.
- Workflows that benefit from scripts, schemas, examples, or templates.
- Tasks with frequent failure modes that can be reduced by explicit instructions.
- Tasks where validation can be repeated by humans and agents.
- Role-based knowledge-work bundles with skills, commands, connectors, and configuration around a specific business function.

## Tie Breakers

- If the skill changes source code, choose software engineering.
- If the skill uses a browser to verify a web app, choose testing and QA.
- If the skill uses a browser to operate third-party sites, choose browser automation.
- If the skill uses an API or MCP server as the core dependency, choose tool integration.
- If the skill handles files with strict formatting, choose documents and office.
- If the skill handles high-risk permissions, choose security and compliance as an adjacent category.
- If the skill coordinates several agents or routes between skills, choose agent orchestration.
- If the skill is mostly about writing better skills, choose skill governance.
- If the skill belongs to a named business role, choose the specific business advisor before the broad business operations advisor.
- If the skill drafts external customer communications, choose sales, support, marketing, or small business based on audience and intent.
- If the skill searches internal company knowledge, choose enterprise search and knowledge instead of generic research and RAG.
- If the skill supports contract work inside a business, choose legal work and add security and compliance when regulated policy risk exists.
- If the skill supports meetings, email, notes, or calendars for one worker, choose productivity and workplace.
