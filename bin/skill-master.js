#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const INSTALL_PATHS = [
  "AGENTS.md",
  "commands",
  "docs",
  "scripts",
  "skill-index.json",
  "skills",
  "src"
];

function usage() {
  console.log(`Skill Master

Usage:
  skill-master init [target] [--force] [--dry-run]
  skill-master doctor [target]
  skill-master list [target]
  skill-master path
  skill-master --version

Examples:
  npx skill-master init
  npx skill-master init ./my-agent-repo
  npx skill-master doctor .

Commands:
  init      Copy Skill Master source files into a target project.
  doctor    Validate commands, routing, index paths, and SKILL.md files.
  list      Print routed categories and advisor skills.
  path      Print this npm package's installed path.
`);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Could not read JSON at ${filePath}: ${error.message}`);
  }
}

function exists(targetPath) {
  return fs.existsSync(targetPath);
}

function copyRecursive(source, target, options) {
  const stat = fs.statSync(source);
  const existedBefore = exists(target);

  if (options.dryRun) {
    console.log(`${existedBefore ? "would update" : "would create"} ${path.relative(options.targetRoot, target)}`);
    return;
  }

  if (existedBefore && !options.force) {
    console.log(`skip existing ${path.relative(options.targetRoot, target)}`);
    return;
  }

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(
        path.join(source, entry),
        path.join(target, entry),
        options
      );
    }
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`${existedBefore ? "wrote" : "created"} ${path.relative(options.targetRoot, target)}`);
}

function parseArgs(argv) {
  const args = [...argv];
  const flags = new Set();
  const values = {};
  const positional = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--force" || arg === "--dry-run" || arg === "--help" || arg === "-h" || arg === "--version" || arg === "-v") {
      flags.add(arg);
      continue;
    }

    if (arg === "--target") {
      values.target = args[index + 1];
      index += 1;
      continue;
    }

    positional.push(arg);
  }

  return { flags, values, positional };
}

function commandInit(parsed) {
  const targetArg = parsed.values.target || parsed.positional[1] || ".";
  const targetRoot = path.resolve(process.cwd(), targetArg);
  const force = parsed.flags.has("--force");
  const dryRun = parsed.flags.has("--dry-run");

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const relativePath of INSTALL_PATHS) {
    const source = path.join(PACKAGE_ROOT, relativePath);
    const target = path.join(targetRoot, relativePath);
    if (!exists(source)) {
      throw new Error(`Package is missing required source path: ${relativePath}`);
    }
    copyRecursive(source, target, { force, dryRun, targetRoot });
  }

  console.log("");
  console.log(`Skill Master ${dryRun ? "dry run complete" : "installed"} in ${targetRoot}`);
  console.log("Next: run `npx skill-master doctor .` from that project.");
}

function validateSkillFile(filePath, failures) {
  const content = fs.readFileSync(filePath, "utf8");
  const relative = path.relative(process.cwd(), filePath);

  const checks = [
    [/^name:\s*.+$/m, "missing name frontmatter"],
    [/^description:\s*.+$/m, "missing description frontmatter"],
    [/^description:\s*Use when/m, "description should start with Use when"],
    [/^##\s+Workflow/m, "missing Workflow section"],
    [/^##\s+Failure Modes/m, "missing Failure Modes section"],
    [/^##\s+Output Format/m, "missing Output Format section"]
  ];

  for (const [pattern, message] of checks) {
    if (!pattern.test(content)) {
      failures.push(`${relative}: ${message}`);
    }
  }
}

function walkSkillFiles(root) {
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

  if (exists(root)) {
    walk(root);
  }

  return files;
}

function commandDoctor(parsed) {
  const targetArg = parsed.values.target || parsed.positional[1] || ".";
  const targetRoot = path.resolve(process.cwd(), targetArg);
  const failures = [];

  const indexPath = path.join(targetRoot, "skill-index.json");
  const commandPath = path.join(targetRoot, "commands", "skill-master.md");
  const routingPath = path.join(targetRoot, "src", "routing", "skill-master-routing.json");
  const skillsRoot = path.join(targetRoot, "skills");

  for (const required of [indexPath, commandPath, routingPath, skillsRoot]) {
    if (!exists(required)) {
      failures.push(`missing required path: ${path.relative(targetRoot, required)}`);
    }
  }

  let index = null;
  let routing = null;

  if (exists(indexPath)) {
    index = readJson(indexPath);
  }

  if (exists(routingPath)) {
    routing = readJson(routingPath);
  }

  if (index) {
    for (const skill of index.skills || []) {
      const skillPath = path.join(targetRoot, skill.path);
      if (!exists(skillPath)) {
        failures.push(`index skill '${skill.name}' points to missing path: ${skill.path}`);
      }
    }

    for (const command of index.commands || []) {
      if (!exists(path.join(targetRoot, command.path))) {
        failures.push(`index command '${command.name}' points to missing path: ${command.path}`);
      }
      if (!exists(path.join(targetRoot, command.routingFile))) {
        failures.push(`index command '${command.name}' points to missing routing file: ${command.routingFile}`);
      }
    }

    if (index.routing) {
      if (!exists(path.join(targetRoot, index.routing.path))) {
        failures.push(`index routing path is missing: ${index.routing.path}`);
      }
      if (!exists(path.join(targetRoot, index.routing.examplesPath))) {
        failures.push(`index routing examples path is missing: ${index.routing.examplesPath}`);
      }
    }
  }

  if (routing) {
    if (routing.command !== "/skill-master") {
      failures.push("routing command should be /skill-master");
    }

    const categories = routing.categories || [];
    const categoryIds = new Set(categories.map((category) => category.category));

    if (categories.length === 0) {
      failures.push("routing file has no categories");
    }

    for (const category of categories) {
      if (!category.category) {
        failures.push("routing category is missing category id");
      }
      if (!category.advisorSkill) {
        failures.push(`routing category '${category.category}' is missing advisorSkill`);
      }
      if (!category.advisorPath) {
        failures.push(`routing category '${category.category}' is missing advisorPath`);
      } else if (!exists(path.join(targetRoot, category.advisorPath))) {
        failures.push(`routing category '${category.category}' points to missing advisorPath: ${category.advisorPath}`);
      }
      if (!category.exampleRequests || category.exampleRequests.length < 2) {
        failures.push(`routing category '${category.category}' should include at least two exampleRequests`);
      }
      if (!category.negativeExamples || category.negativeExamples.length < 1) {
        failures.push(`routing category '${category.category}' should include at least one negativeExamples entry`);
      }
      for (const adjacent of category.adjacentCategories || []) {
        if (!categoryIds.has(adjacent)) {
          failures.push(`routing category '${category.category}' points to unknown adjacent category: ${adjacent}`);
        }
      }
    }
  }

  const skillFiles = walkSkillFiles(skillsRoot)
    .filter((filePath) => !filePath.includes(`${path.sep}creating-skills${path.sep}`));
  for (const skillFile of skillFiles) {
    validateSkillFile(skillFile, failures);
  }

  if (failures.length > 0) {
    console.error("Skill Master doctor failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Skill Master doctor passed");
  console.log(`Target: ${targetRoot}`);
  console.log(`Skills checked: ${skillFiles.length}`);
  console.log(`Routing categories: ${routing ? routing.categories.length : 0}`);
}

function commandList(parsed) {
  const targetArg = parsed.values.target || parsed.positional[1] || ".";
  const targetRoot = path.resolve(process.cwd(), targetArg);
  const routingPath = path.join(targetRoot, "src", "routing", "skill-master-routing.json");

  if (!exists(routingPath)) {
    throw new Error(`Missing routing file: ${routingPath}`);
  }

  const routing = readJson(routingPath);
  for (const category of routing.categories || []) {
    console.log(`${category.category}\t${category.advisorSkill}`);
  }
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  const command = parsed.positional[0];

  if (!command || parsed.flags.has("--help") || parsed.flags.has("-h")) {
    usage();
    return;
  }

  if (parsed.flags.has("--version") || parsed.flags.has("-v") || command === "version") {
    const packageJson = readJson(path.join(PACKAGE_ROOT, "package.json"));
    console.log(packageJson.version);
    return;
  }

  if (command === "init") {
    commandInit(parsed);
    return;
  }

  if (command === "doctor") {
    commandDoctor(parsed);
    return;
  }

  if (command === "list") {
    commandList(parsed);
    return;
  }

  if (command === "path") {
    console.log(PACKAGE_ROOT);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
