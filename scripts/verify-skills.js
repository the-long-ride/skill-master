#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const options = {
    root: "skills",
    excludePattern: "creating-skills",
    reportDir: "generated-reports",
    routingFile: "src/routing/skill-master-routing.json",
    commandFile: "commands/skill-master.md",
    indexFile: "skill-index.json"
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
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: verify-skills.js [options]

Options:
  --root <path>              Skill root directory. Default: skills
  --exclude-pattern <text>   Exclude matching paths. Default: creating-skills
  --report-dir <path>        Report output directory. Default: generated-reports
  --routing-file <path>      Routing JSON path. Default: src/routing/skill-master-routing.json
  --command-file <path>      Command markdown path. Default: commands/skill-master.md
  --index-file <path>        Index JSON path. Default: skill-index.json
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

function score(condition, pass, fail) {
  if (condition) {
    return { Status: "PASS", Note: pass };
  }

  return { Status: "FAIL", Note: fail };
}

function auditSkill(filePath) {
  const content = readText(filePath);
  const checks = [
    score(/^name:\s*.+$/m.test(content), "Has name", "Missing name frontmatter"),
    score(/^description:\s*.+$/m.test(content), "Has description", "Missing description frontmatter"),
    score(/^description:\s*Use when/m.test(content), "Description starts with Use when", "Description should start with Use when"),
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

  if (!exists(options.indexFile)) {
    failures.push(`Missing index file: ${options.indexFile}`);
  } else {
    const index = readJson(options.indexFile);

    for (const skill of index.skills || []) {
      if (!exists(skill.path)) {
        failures.push(`Index skill '${skill.name}' points to missing path: ${skill.path}`);
      }
    }

    for (const command of index.commands || []) {
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
      for (const adjacent of category.adjacentCategories || []) {
        if (!categoryIds.has(adjacent)) {
          failures.push(`Routing category '${category.category}' points to unknown adjacent category: ${adjacent}`);
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
