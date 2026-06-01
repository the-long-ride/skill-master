#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SKILL_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const MAX_SKILL_NAME_LENGTH = 63;
const FRONTMATTER_KEYS = new Set(["name", "description"]);

function parseArgs(argv) {
  const options = {
    root: "skills",
    excludePattern: "creating-skills",
    reportDir: "generated-reports",
    routingFile: "src/routing/skill-master-routing.json",
    commandFile: "commands/skill-master.md",
    indexFile: "skill-index.json",
    templateFile: "templates/advisors/advisor-blueprints.json"
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--root") {
      options.root = next;
      index += 1;
    } else if (arg === "--exclude-pattern") {
      options.excludePattern = next;
      index += 1;
    } else if (arg === "--report-dir") {
      options.reportDir = next;
      index += 1;
    } else if (arg === "--routing-file") {
      options.routingFile = next;
      index += 1;
    } else if (arg === "--command-file") {
      options.commandFile = next;
      index += 1;
    } else if (arg === "--index-file") {
      options.indexFile = next;
      index += 1;
    } else if (arg === "--template-file") {
      options.templateFile = next;
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: verify-skills.js [options]

Options:
  --root <path>              Skill root directory. Default: skills
  --exclude-pattern <text>   Exclude matching paths. Default: creating-skills
  --report-dir <path>        Report output directory. Default: generated-reports
  --routing-file <path>      Routing JSON path. Default: src/routing/skill-master-routing.json
  --command-file <path>      Command markdown path. Default: commands/skill-master.md
  --index-file <path>        Index JSON path. Default: skill-index.json
  --template-file <path>     Advisor template catalog. Default: templates/advisors/advisor-blueprints.json
`);
      process.exit(0);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath));
  } catch (error) {
    throw new Error(`Could not parse ${filePath}: ${error.message}`);
  }
}

function validateSkillNameValue(name) {
  const failures = [];

  if (!name) {
    failures.push("skill name is empty");
    return failures;
  }

  if (name.length > MAX_SKILL_NAME_LENGTH) {
    failures.push(`skill name must be ${MAX_SKILL_NAME_LENGTH} characters or fewer`);
  }

  if (!SKILL_NAME_PATTERN.test(name)) {
    failures.push("skill name must use lowercase letters, digits, and single hyphens only");
  }

  if (name.includes("--")) {
    failures.push("skill name must not contain consecutive hyphens");
  }

  return failures;
}

function trimYamlScalar(value) {
  const trimmed = String(value || "").trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function parseSkillFrontmatter(content) {
  const normalized = String(content || "").replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(normalized);
  const result = {
    fields: {},
    keys: [],
    errors: []
  };

  if (!match) {
    result.errors.push("frontmatter must start the file and close with ---");
    return result;
  }

  for (const [index, line] of match[1].split(/\r?\n/).entries()) {
    if (!line.trim()) {
      continue;
    }

    const lineMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!lineMatch) {
      result.errors.push(`frontmatter line ${index + 1} must be key: value`);
      continue;
    }

    const key = lineMatch[1];
    const value = trimYamlScalar(lineMatch[2]);

    if (Object.prototype.hasOwnProperty.call(result.fields, key)) {
      result.errors.push(`frontmatter repeats key '${key}'`);
      continue;
    }

    result.keys.push(key);
    result.fields[key] = value;
  }

  return result;
}

function descriptionQualityFailures(description) {
  const failures = [];
  const value = String(description || "");

  if (!value) {
    failures.push("description is empty");
    return failures;
  }

  if (!value.startsWith("Use when ")) {
    failures.push("description must start with 'Use when '");
  }

  if (value.length < 40) {
    failures.push("description is too short to route reliably");
  }

  if (value.length > 300) {
    failures.push("description should be 300 characters or fewer");
  }

  if (/[\r\n]/.test(value)) {
    failures.push("description must be a single line");
  }

  if (/[#`*[\]]/.test(value)) {
    failures.push("description should not contain markdown formatting");
  }

  if (/\b(first|then|step\s+\d|follow these steps|execute the following)\b/i.test(value)) {
    failures.push("description should describe triggering conditions, not workflow steps");
  }

  return failures;
}

function walkSkillFiles(rootPath) {
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && entry.name === "SKILL.md") {
        files.push(entryPath);
      }
    }
  }

  if (exists(rootPath)) {
    walk(rootPath);
  }

  return files;
}

function listMarkdownFiles(rootPath) {
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(entryPath);
      }
    }
  }

  if (exists(rootPath)) {
    walk(rootPath);
  }

  return files;
}

function score(condition, pass, fail) {
  if (condition) {
    return { Status: "PASS", Note: pass };
  }

  return { Status: "FAIL", Note: fail };
}

function auditSkill(filePath) {
  const content = readText(filePath);
  const folderName = path.basename(path.dirname(filePath));
  const frontmatter = parseSkillFrontmatter(content);
  const unsupportedKeys = frontmatter.keys.filter((key) => !FRONTMATTER_KEYS.has(key));
  const folderNameFailures = validateSkillNameValue(folderName);
  const frontmatterNameFailures = validateSkillNameValue(frontmatter.fields.name || "");
  const descriptionFailures = descriptionQualityFailures(frontmatter.fields.description || "");
  const checks = [
    score(frontmatter.errors.length === 0, "Has valid YAML frontmatter block", frontmatter.errors.join("; ") || "Invalid frontmatter"),
    score(frontmatter.keys.length === 2 && unsupportedKeys.length === 0, "Frontmatter only has name and description", unsupportedKeys.length > 0 ? `Unsupported frontmatter keys: ${unsupportedKeys.join(", ")}` : "Frontmatter must contain exactly name and description"),
    score(Boolean(frontmatter.fields.name), "Has name", "Missing name frontmatter"),
    score(folderNameFailures.length === 0, "Folder name is valid", folderNameFailures.join("; ")),
    score(frontmatterNameFailures.length === 0, "Frontmatter name is valid", frontmatterNameFailures.join("; ")),
    score(frontmatter.fields.name === folderName, "Frontmatter name matches folder", `Frontmatter name should match folder '${folderName}'`),
    score(Boolean(frontmatter.fields.description), "Has description", "Missing description frontmatter"),
    score(descriptionFailures.length === 0, "Description is trigger-only and routable", descriptionFailures.join("; ")),
    score(/^##\s+Workflow/m.test(content), "Has Workflow section", "Missing Workflow section"),
    score(/^##\s+Failure Modes/m.test(content), "Has Failure Modes section", "Missing Failure Modes section"),
    score(/^##\s+Output Format/m.test(content), "Has Output Format section", "Missing Output Format section")
  ];

  const pass = checks.filter((check) => check.Status === "PASS").length;
  const fail = checks.filter((check) => check.Status === "FAIL").length;

  return {
    Skill: path.resolve(filePath),
    Pass: pass,
    Fail: fail,
    Decision: fail === 0 ? "READY" : "NEEDS REVISION",
    Checks: checks
  };
}

function reportMarkdown(results) {
  const lines = [
    "# Skill Audit Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    ""
  ];

  for (const result of results) {
    lines.push(`## ${result.Skill}`);
    lines.push("");
    lines.push(`- Pass: ${result.Pass}`);
    lines.push(`- Fail: ${result.Fail}`);
    lines.push(`- Decision: ${result.Decision}`);
    lines.push("");
    lines.push("### Checks");
    lines.push("");
    for (const check of result.Checks) {
      lines.push(`- [${check.Status}] ${check.Note}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function writeReports(results, reportDir) {
  fs.mkdirSync(reportDir, { recursive: true });
  const jsonPath = path.join(reportDir, "skill-audit-report.json");
  const markdownPath = path.join(reportDir, "skill-audit-report.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(results, null, 2)}\n`);
  fs.writeFileSync(markdownPath, reportMarkdown(results));
  return { jsonPath, markdownPath };
}

function validateRouting(options) {
  const failures = [];
  const commandRoot = path.dirname(options.commandFile);
  const expectedCommand = path.normalize(options.commandFile);
  const commandFiles = listMarkdownFiles(commandRoot).map((filePath) => path.normalize(filePath));
  const unexpectedCommands = commandFiles.filter((filePath) => filePath !== expectedCommand);

  if (!exists(commandRoot)) {
    failures.push(`Missing commands directory: ${commandRoot}`);
  }

  if (unexpectedCommands.length > 0) {
    failures.push(`Only /skill-master is allowed; remove extra command files: ${unexpectedCommands.join(", ")}`);
  }

  if (commandFiles.length !== 1 || !exists(options.commandFile)) {
    failures.push("commands/ must expose exactly one slash command: /skill-master");
  }

  if (!exists(options.indexFile)) {
    failures.push(`Missing index file: ${options.indexFile}`);
  } else {
    const index = readJson(options.indexFile);

    if (!Array.isArray(index.commands) || index.commands.length !== 1) {
      failures.push("skill-index.json must list exactly one command: /skill-master");
    }

    for (const skill of index.skills || []) {
      if (!exists(skill.path)) {
        failures.push(`Index skill '${skill.name}' points to missing path: ${skill.path}`);
      }
    }

    for (const command of index.commands || []) {
      if (command.command !== "/skill-master" || command.path !== "commands/skill-master.md") {
        failures.push("skill-index.json command entry must expose only /skill-master at commands/skill-master.md");
      }
      if (!exists(command.path)) {
        failures.push(`Index command '${command.name}' points to missing path: ${command.path}`);
      }
      if (!exists(command.routingFile)) {
        failures.push(`Index command '${command.name}' points to missing routing file: ${command.routingFile}`);
      }
    }

    if (index.routing) {
      if (!exists(index.routing.path)) {
        failures.push(`Index routing path is missing: ${index.routing.path}`);
      }
      if (!exists(index.routing.examplesPath)) {
        failures.push(`Index routing examples path is missing: ${index.routing.examplesPath}`);
      }
    }

    if (index.templates) {
      for (const [name, templatePath] of Object.entries(index.templates)) {
        if (!exists(templatePath)) {
          failures.push(`Index template '${name}' is missing: ${templatePath}`);
        }
      }
    }

    if (index.verification && index.verification.scripts) {
      for (const [name, scriptPath] of Object.entries(index.verification.scripts)) {
        if (!exists(scriptPath)) {
          failures.push(`Index verification script '${name}' is missing: ${scriptPath}`);
        }
      }
    }
  }

  if (!exists(options.commandFile)) {
    failures.push(`Missing command file: ${options.commandFile}`);
  }

  if (!exists(options.routingFile)) {
    failures.push(`Missing routing file: ${options.routingFile}`);
  } else {
    const routing = readJson(options.routingFile);
    if (routing.command !== "/skill-master") {
      failures.push("Routing file command should be /skill-master");
    }

    const categories = routing.categories || [];
    const categoryIds = new Set(categories.map((category) => category.category));

    if (categories.length === 0) {
      failures.push("Routing file has no categories");
    }

    for (const category of categories) {
      if (!category.category) {
        failures.push("Routing category is missing category id");
      }
      if (!category.advisorSkill) {
        failures.push(`Routing category '${category.category}' is missing advisorSkill`);
      }
      if (!category.advisorPath) {
        failures.push(`Routing category '${category.category}' is missing advisorPath`);
      } else if (!exists(category.advisorPath)) {
        failures.push(`Routing category '${category.category}' points to missing advisorPath: ${category.advisorPath}`);
      }
      if (!category.exampleRequests || category.exampleRequests.length < 2) {
        failures.push(`Routing category '${category.category}' should include at least two exampleRequests`);
      }
      if (!category.negativeExamples || category.negativeExamples.length < 1) {
        failures.push(`Routing category '${category.category}' should include at least one negativeExamples entry`);
      }
      if (!category.forwardTestPrompts || category.forwardTestPrompts.length < 2) {
        failures.push(`Routing category '${category.category}' should include at least two forwardTestPrompts`);
      }
      for (const adjacent of category.adjacentCategories || []) {
        if (!categoryIds.has(adjacent)) {
          failures.push(`Routing category '${category.category}' points to unknown adjacent category: ${adjacent}`);
        }
      }
    }

    if (!exists(options.templateFile)) {
      failures.push(`Missing advisor template catalog: ${options.templateFile}`);
    } else {
      const templates = readJson(options.templateFile).categories || {};
      for (const category of categories) {
        const template = templates[category.category];
        if (!template) {
          failures.push(`Missing advisor template for routing category '${category.category}'`);
          continue;
        }
        if (!Array.isArray(template.workflowFocus) || template.workflowFocus.length < 2) {
          failures.push(`Advisor template '${category.category}' should include at least two workflowFocus entries`);
        }
        if (!Array.isArray(template.recommendedReferences) || template.recommendedReferences.length < 1) {
          failures.push(`Advisor template '${category.category}' should include recommendedReferences`);
        }
        if (!template.outputFormat) {
          failures.push(`Advisor template '${category.category}' should include outputFormat`);
        }
      }
    }
  }

  return failures;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const skillFiles = walkSkillFiles(options.root)
    .filter((filePath) => !filePath.includes(options.excludePattern));

  if (skillFiles.length === 0) {
    console.log(`No SKILL.md files found under ${options.root}`);
    return;
  }

  const results = skillFiles.map(auditSkill);
  const paths = writeReports(results, options.reportDir);

  console.log("Audit complete");
  console.log(`JSON: ${paths.jsonPath}`);
  console.log(`Markdown: ${paths.markdownPath}`);

  const routingFailures = validateRouting(options);
  if (routingFailures.length > 0) {
    console.error(`Routing validation failed:\n${routingFailures.join("\n")}`);
    process.exitCode = 1;
    return;
  }

  const failedSkills = results.filter((result) => result.Fail > 0);
  if (failedSkills.length > 0) {
    console.error(`Skill validation failed for ${failedSkills.length} file(s). See ${paths.markdownPath}`);
    process.exitCode = 1;
    return;
  }

  if (exists(options.routingFile)) {
    const routing = readJson(options.routingFile);
    console.log(`Routing: /skill-master with ${(routing.categories || []).length} categories`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
