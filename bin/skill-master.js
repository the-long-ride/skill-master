#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const INSTALL_PATHS = [
  "AGENTS.md",
  "CHANGELOG.md",
  "GUIDELINE.md",
  "commands/skill-master.md",
  "docs",
  "scripts",
  "skill-index.json",
  "skills",
  "src",
  "templates"
];

const SKILL_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const MAX_SKILL_NAME_LENGTH = 63;
const FRONTMATTER_KEYS = new Set(["name", "description"]);

function usage() {
  console.log(`Skill Master

Usage:
  skill-master init [target] [--force] [--dry-run]
  skill-master create <name> [--category <id>] [--prompt <text>] [--with-openai] [--codex-native]
  skill-master verify [target]
  skill-master doctor [target]
  skill-master list [target]
  skill-master path
  skill-master --version

Examples:
  npx skill-master init
  npx skill-master init ./my-agent-repo
  npx skill-master create sales-call-prep --category sales-revenue --with-openai --codex-native
  npx skill-master doctor .

Commands:
  init      Copy Skill Master source files into a target project.
  create    Scaffold a new target skill from a routed advisor blueprint.
  verify    Detect the OS and run the corresponding verification script.
  doctor    Validate commands, routing, index paths, and SKILL.md files.
  list      Print routed categories and advisor skills.
  path      Print this npm package's installed path.
`);
}

function scriptForPlatform() {
  if (process.platform === "win32") {
    return {
      label: "Windows",
      script: path.join(PACKAGE_ROOT, "scripts", "verify-skills.ps1"),
      candidates: [
        { command: "pwsh", args: ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File"] },
        { command: "powershell.exe", args: ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File"] }
      ]
    };
  }

  if (process.platform === "darwin") {
    return {
      label: "macOS",
      script: path.join(PACKAGE_ROOT, "scripts", "verify-skills.sh"),
      candidates: [{ command: "sh", args: [] }]
    };
  }

  return {
    label: "Linux/Unix",
    script: path.join(PACKAGE_ROOT, "scripts", "verify-skills.sh"),
    candidates: [{ command: "sh", args: [] }]
  };
}

function runVerificationScript(targetRoot) {
  const selected = scriptForPlatform();

  if (!exists(selected.script)) {
    throw new Error(`Missing ${selected.label} verification script: ${selected.script}`);
  }

  let lastResult = null;
  for (const candidate of selected.candidates) {
    const result = spawnSync(
      candidate.command,
      [...candidate.args, selected.script],
      {
        cwd: targetRoot,
        stdio: "inherit",
        shell: false
      }
    );

    if (result.error && result.error.code === "ENOENT") {
      lastResult = result;
      continue;
    }

    if (result.error) {
      throw result.error;
    }

    return result.status || 0;
  }

  if (lastResult && lastResult.error) {
    throw new Error(`Could not find a shell for ${selected.label} verification: ${lastResult.error.message}`);
  }

  return 1;
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

function normalizeSkillName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function titleCase(value) {
  return String(value || "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    errors: [],
    body: normalized
  };

  if (!match) {
    result.errors.push("frontmatter must start the file and close with ---");
    return result;
  }

  result.body = normalized.slice(match[0].length);

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

function validateSkillFile(filePath, failures, targetRoot = process.cwd()) {
  const content = fs.readFileSync(filePath, "utf8");
  const relative = path.relative(targetRoot, filePath);
  const folderName = path.basename(path.dirname(filePath));
  const frontmatter = parseSkillFrontmatter(content);

  for (const error of frontmatter.errors) {
    failures.push(`${relative}: ${error}`);
  }

  const unsupportedKeys = frontmatter.keys.filter((key) => !FRONTMATTER_KEYS.has(key));
  if (unsupportedKeys.length > 0) {
    failures.push(`${relative}: frontmatter only supports name and description, found ${unsupportedKeys.join(", ")}`);
  }

  for (const requiredKey of FRONTMATTER_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(frontmatter.fields, requiredKey)) {
      failures.push(`${relative}: missing ${requiredKey} frontmatter`);
    }
  }

  for (const failure of validateSkillNameValue(folderName)) {
    failures.push(`${relative}: folder ${failure}`);
  }

  if (frontmatter.fields.name) {
    for (const failure of validateSkillNameValue(frontmatter.fields.name)) {
      failures.push(`${relative}: frontmatter name ${failure}`);
    }

    if (frontmatter.fields.name !== folderName) {
      failures.push(`${relative}: frontmatter name must match folder name '${folderName}'`);
    }
  }

  if (frontmatter.fields.description) {
    for (const failure of descriptionQualityFailures(frontmatter.fields.description)) {
      failures.push(`${relative}: ${failure}`);
    }
  }

  const checks = [
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

function readJsonIfExists(paths) {
  for (const filePath of paths) {
    if (exists(filePath)) {
      return readJson(filePath);
    }
  }

  return null;
}

function loadRouting(targetRoot) {
  const routing = readJsonIfExists([
    path.join(targetRoot, "src", "routing", "skill-master-routing.json"),
    path.join(PACKAGE_ROOT, "src", "routing", "skill-master-routing.json")
  ]);

  if (!routing) {
    throw new Error("Could not find skill-master-routing.json in the target or package");
  }

  return routing;
}

function loadAdvisorBlueprints(targetRoot) {
  return readJsonIfExists([
    path.join(targetRoot, "templates", "advisors", "advisor-blueprints.json"),
    path.join(PACKAGE_ROOT, "templates", "advisors", "advisor-blueprints.json")
  ]) || { categories: {} };
}

function routeCategory(routing, requestedCategory, promptText) {
  const categories = routing.categories || [];

  if (requestedCategory) {
    const normalized = normalizeSkillName(requestedCategory);
    const match = categories.find((category) => {
      return category.category === normalized ||
        normalizeSkillName(category.label) === normalized ||
        normalizeSkillName(category.advisorSkill) === normalized;
    });

    if (!match) {
      throw new Error(`Unknown category '${requestedCategory}'. Run 'skill-master list' to see valid categories.`);
    }

    return { category: match, confidence: "forced" };
  }

  const text = String(promptText || "").toLowerCase();
  let best = null;

  for (const category of categories) {
    let score = 0;
    const terms = [
      category.category,
      category.label,
      ...(category.keywords || []),
      ...(category.exampleRequests || [])
    ];

    for (const term of terms) {
      if (term && text.includes(String(term).toLowerCase())) {
        score += String(term).includes(" ") ? 3 : 2;
      }
    }

    if (!best || score > best.score) {
      best = { category, score };
    }
  }

  if (best && best.score > 0) {
    return { category: best.category, confidence: "inferred" };
  }

  const fallback = categories.find((category) => category.category === "skill-governance") || categories[0];
  return { category: fallback, confidence: "fallback" };
}

function templateList(items) {
  if (!items || items.length === 0) {
    return "- none";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function numberedList(items) {
  if (!items || items.length === 0) {
    return "1. none";
  }

  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function renderTemplate(template, values) {
  return template.replace(/\{\{([A-Za-z0-9]+)\}\}/g, (_, key) => {
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
}

function readPackageTemplate(relativePath) {
  return fs.readFileSync(path.join(PACKAGE_ROOT, relativePath), "utf8");
}

function yamlString(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function buildSkillFiles(options) {
  const {
    name,
    prompt,
    category,
    blueprint,
    codexNative,
    withOpenAi
  } = options;
  const title = titleCase(name);
  const label = category.label || titleCase(category.category);
  const description = `Use when an AI agent needs a repeatable ${label.toLowerCase()} workflow for ${title.toLowerCase()} tasks.`;
  const overview = `This scaffold was generated by Skill Master from the ${category.category} routed blueprint. Edit the references before publishing so the sources, tools, and guardrails match the real workflow.`;
  const forwardPrompts = category.forwardTestPrompts || [];
  const negativePromptExamples = (category.negativeExamples || []).map((example) => `/skill-master ${example}`);
  const values = {
    skillName: name,
    skillTitle: title,
    description,
    overview,
    categoryId: category.category,
    categoryLabel: label,
    advisorSkill: category.advisorSkill || "",
    advisorPath: category.advisorPath || "",
    routeWhen: category.routeWhen || "",
    prompt: prompt || "No prompt supplied. Replace this with the concrete human examples used to finish the skill.",
    workflowFocus: templateList(blueprint.workflowFocus),
    recommendedReferences: templateList(blueprint.recommendedReferences),
    recommendedScripts: templateList(blueprint.recommendedScripts),
    niceToHave: templateList(blueprint.niceToHave),
    exampleRequests: numberedList(category.exampleRequests),
    negativeExamples: numberedList(category.negativeExamples),
    outputFormat: blueprint.outputFormat || "Return the requested artifact, assumptions, validation checks, and open issues.",
    positivePrompts: numberedList(forwardPrompts.length > 0 ? forwardPrompts : (category.exampleRequests || []).map((example) => `/skill-master ${example}`)),
    negativePrompts: numberedList(negativePromptExamples),
    codexNative: codexNative ? "true" : "false"
  };

  const files = [
    {
      relativePath: "SKILL.md",
      content: renderTemplate(readPackageTemplate("templates/target-skill/SKILL.md"), values)
    },
    {
      relativePath: path.join("references", "blueprint.md"),
      content: renderTemplate(readPackageTemplate("templates/target-skill/blueprint.md"), values)
    },
    {
      relativePath: path.join("references", "forward-test-prompts.md"),
      content: renderTemplate(readPackageTemplate("templates/target-skill/forward-test-prompts.md"), values)
    }
  ];

  if (codexNative) {
    files.push({
      relativePath: path.join("references", "codex-native-process.md"),
      content: readPackageTemplate("templates/target-skill/codex-native-process.md")
    });
  }

  if (withOpenAi) {
    const yamlValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, yamlString(value)])
    );
    files.push({
      relativePath: path.join("agents", "openai.yaml"),
      content: renderTemplate(readPackageTemplate("templates/agents/openai.yaml"), yamlValues)
    });
  }

  return files.map((file) => ({
    ...file,
    content: file.content.replace(/\r?\n/g, "\n").trimEnd() + "\n"
  }));
}

function writeScaffoldFile(targetRoot, skillDir, file, options) {
  const filePath = path.join(skillDir, file.relativePath);
  const relative = path.relative(targetRoot, filePath);
  const existedBefore = exists(filePath);

  if (options.dryRun) {
    console.log(`${existedBefore ? "would update" : "would create"} ${relative}`);
    return;
  }

  if (existedBefore && !options.force) {
    throw new Error(`Refusing to overwrite ${relative}. Use --force to replace scaffold files.`);
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, file.content);
  console.log(`${existedBefore ? "wrote" : "created"} ${relative}`);
}

function parseArgs(argv) {
  const args = [...argv];
  const flags = new Set();
  const values = {};
  const positional = [];
  const booleanFlags = new Set([
    "--force",
    "--dry-run",
    "--help",
    "-h",
    "--version",
    "-v",
    "--with-openai",
    "--openai",
    "--codex-native"
  ]);
  const valueFlags = new Set(["--target", "--category", "--prompt", "--output"]);

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (booleanFlags.has(arg)) {
      flags.add(arg);
      continue;
    }

    if (valueFlags.has(arg)) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      const next = args[index + 1];
      if (!next || next.startsWith("--")) {
        throw new Error(`Missing value for ${arg}`);
      }
      values[key] = next;
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

function commandCreate(parsed) {
  const rawName = parsed.positional[1];
  if (!rawName) {
    throw new Error("Usage: skill-master create <name> [--category <id>] [--prompt <text>]");
  }

  const normalizedName = normalizeSkillName(rawName);
  const nameFailures = validateSkillNameValue(normalizedName);
  if (nameFailures.length > 0) {
    throw new Error(`Invalid skill name '${rawName}': ${nameFailures.join("; ")}`);
  }

  const targetRoot = path.resolve(process.cwd(), parsed.values.target || ".");
  const outputRoot = path.resolve(targetRoot, parsed.values.output || "skills");
  const skillDir = path.join(outputRoot, normalizedName);
  const force = parsed.flags.has("--force");
  const dryRun = parsed.flags.has("--dry-run");
  const withOpenAi = parsed.flags.has("--with-openai") || parsed.flags.has("--openai");
  const codexNative = parsed.flags.has("--codex-native");
  const prompt = parsed.values.prompt || rawName;
  const routing = loadRouting(targetRoot);
  const route = routeCategory(routing, parsed.values.category, `${rawName} ${prompt}`);
  const blueprintCatalog = loadAdvisorBlueprints(targetRoot);
  const blueprint = (blueprintCatalog.categories || {})[route.category.category] || {};
  const files = buildSkillFiles({
    name: normalizedName,
    prompt,
    category: route.category,
    blueprint,
    codexNative,
    withOpenAi
  });

  if (rawName !== normalizedName) {
    console.log(`Normalized skill name: ${normalizedName}`);
  }

  if (exists(skillDir) && !force && !dryRun) {
    throw new Error(`Target skill already exists: ${path.relative(targetRoot, skillDir)}. Use --force to overwrite scaffold files.`);
  }

  for (const file of files) {
    writeScaffoldFile(targetRoot, skillDir, file, { force, dryRun });
  }

  console.log("");
  console.log(`${dryRun ? "Skill scaffold dry run" : "Skill scaffold created"}: ${path.relative(targetRoot, skillDir)}`);
  console.log(`Route: ${route.category.category} (${route.confidence}) via ${route.category.advisorSkill}`);
  console.log("Next: edit references/blueprint.md, then run `npx skill-master doctor .`.");
}

function validateTemplateCatalog(targetRoot, routing, failures) {
  const templatePath = path.join(targetRoot, "templates", "advisors", "advisor-blueprints.json");

  if (!exists(templatePath)) {
    failures.push("missing advisor template catalog: templates/advisors/advisor-blueprints.json");
    return;
  }

  const catalog = readJson(templatePath);
  const templates = catalog.categories || {};

  for (const category of routing.categories || []) {
    const template = templates[category.category];
    if (!template) {
      failures.push(`missing advisor template for routing category '${category.category}'`);
      continue;
    }

    if (!Array.isArray(template.workflowFocus) || template.workflowFocus.length < 2) {
      failures.push(`advisor template '${category.category}' should include at least two workflowFocus entries`);
    }

    if (!Array.isArray(template.recommendedReferences) || template.recommendedReferences.length < 1) {
      failures.push(`advisor template '${category.category}' should include recommendedReferences`);
    }

    if (!template.outputFormat) {
      failures.push(`advisor template '${category.category}' should include outputFormat`);
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

function listMarkdownFiles(root) {
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

  if (exists(root)) {
    walk(root);
  }

  return files;
}

function validateSingleSlashCommand(targetRoot, failures) {
  const commandsRoot = path.join(targetRoot, "commands");
  const expected = path.join(commandsRoot, "skill-master.md");

  if (!exists(commandsRoot)) {
    failures.push("missing commands directory");
    return;
  }

  const commandFiles = listMarkdownFiles(commandsRoot);
  const unexpected = commandFiles.filter((filePath) => path.resolve(filePath) !== path.resolve(expected));

  if (!exists(expected)) {
    failures.push("missing only supported slash command: commands/skill-master.md");
  }

  if (unexpected.length > 0) {
    failures.push(`only /skill-master is allowed; remove extra command files: ${unexpected.map((filePath) => path.relative(targetRoot, filePath)).join(", ")}`);
  }

  if (commandFiles.length !== 1 || !exists(expected)) {
    failures.push("commands/ must expose exactly one slash command: /skill-master");
  }
}

function commandDoctor(parsed) {
  const targetArg = parsed.values.target || parsed.positional[1] || ".";
  const targetRoot = path.resolve(process.cwd(), targetArg);
  const failures = [];

  const indexPath = path.join(targetRoot, "skill-index.json");
  const commandPath = path.join(targetRoot, "commands", "skill-master.md");
  const routingPath = path.join(targetRoot, "src", "routing", "skill-master-routing.json");
  const skillsRoot = path.join(targetRoot, "skills");
  const templatesRoot = path.join(targetRoot, "templates");

  for (const required of [indexPath, commandPath, routingPath, skillsRoot, templatesRoot]) {
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
    if (!Array.isArray(index.commands) || index.commands.length !== 1) {
      failures.push("skill-index.json must list exactly one command: /skill-master");
    }

    for (const skill of index.skills || []) {
      const skillPath = path.join(targetRoot, skill.path);
      if (!exists(skillPath)) {
        failures.push(`index skill '${skill.name}' points to missing path: ${skill.path}`);
      }
    }

    for (const command of index.commands || []) {
      if (command.command !== "/skill-master" || command.path !== "commands/skill-master.md") {
        failures.push("skill-index.json command entry must expose only /skill-master at commands/skill-master.md");
      }
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

    if (index.templates) {
      for (const [name, templatePath] of Object.entries(index.templates)) {
        if (!exists(path.join(targetRoot, templatePath))) {
          failures.push(`index template '${name}' is missing: ${templatePath}`);
        }
      }
    }

    if (index.verification && index.verification.scripts) {
      for (const [name, scriptPath] of Object.entries(index.verification.scripts)) {
        if (!exists(path.join(targetRoot, scriptPath))) {
          failures.push(`index verification script '${name}' is missing: ${scriptPath}`);
        }
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
      if (!category.forwardTestPrompts || category.forwardTestPrompts.length < 2) {
        failures.push(`routing category '${category.category}' should include at least two forwardTestPrompts`);
      }
      for (const adjacent of category.adjacentCategories || []) {
        if (!categoryIds.has(adjacent)) {
          failures.push(`routing category '${category.category}' points to unknown adjacent category: ${adjacent}`);
        }
      }
    }

    if (exists(templatesRoot)) {
      validateTemplateCatalog(targetRoot, routing, failures);
    }
  }

  validateSingleSlashCommand(targetRoot, failures);

  const skillFiles = walkSkillFiles(skillsRoot)
    .filter((filePath) => !filePath.includes(`${path.sep}creating-skills${path.sep}`));
  for (const skillFile of skillFiles) {
    validateSkillFile(skillFile, failures, targetRoot);
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

function commandVerify(parsed) {
  const targetArg = parsed.values.target || parsed.positional[1] || ".";
  const targetRoot = path.resolve(process.cwd(), targetArg);
  const selected = scriptForPlatform();

  console.log(`Detected OS: ${selected.label}`);
  console.log(`Verification script: ${path.relative(process.cwd(), selected.script)}`);

  try {
    const status = runVerificationScript(targetRoot);
    process.exitCode = status;
  } catch (error) {
    console.warn(`Script verification unavailable: ${error.message}`);
    console.warn("Falling back to built-in doctor.");
    commandDoctor(parsed);
  }
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

  if (command === "create") {
    commandCreate(parsed);
    return;
  }

  if (command === "verify") {
    commandVerify(parsed);
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
