param(
    [string]$Root = "skills",
    [string]$ExcludePattern = "creating-skills",
    [string]$ReportDir = "generated-reports",
    [string]$RoutingFile = "src/routing/skill-master-routing.json",
    [string]$CommandFile = "commands/skill-master.md",
    [string]$IndexFile = "skill-index.json",
    [string]$TemplateFile = "templates/advisors/advisor-blueprints.json"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-Score {
    param(
        [bool]$Condition,
        [string]$Pass,
        [string]$Fail
    )

    if ($Condition) {
        return [pscustomobject]@{ Status = "PASS"; Note = $Pass }
    }

    return [pscustomobject]@{ Status = "FAIL"; Note = $Fail }
}

function Get-SkillNameIssues {
    param([string]$Name)

    $issues = @()

    if ([string]::IsNullOrWhiteSpace($Name)) {
        $issues += "skill name is empty"
        return $issues
    }

    if ($Name.Length -gt 63) {
        $issues += "skill name must be 63 characters or fewer"
    }

    if ($Name -notmatch '^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$') {
        $issues += "skill name must use lowercase letters, digits, and single hyphens only"
    }

    if ($Name -match '--') {
        $issues += "skill name must not contain consecutive hyphens"
    }

    return $issues
}

function Get-DescriptionIssues {
    param([string]$Description)

    $issues = @()

    if ([string]::IsNullOrWhiteSpace($Description)) {
        $issues += "description is empty"
        return $issues
    }

    if (-not $Description.StartsWith("Use when ")) {
        $issues += "description must start with 'Use when '"
    }

    if ($Description.Length -lt 40) {
        $issues += "description is too short to route reliably"
    }

    if ($Description.Length -gt 300) {
        $issues += "description should be 300 characters or fewer"
    }

    if ($Description -match "[`r`n]") {
        $issues += "description must be a single line"
    }

    if ($Description -match '[#`\*\[\]]') {
        $issues += "description should not contain markdown formatting"
    }

    if ($Description -match '(?i)\b(first|then|step\s+\d|follow these steps|execute the following)\b') {
        $issues += "description should describe triggering conditions, not workflow steps"
    }

    return $issues
}

function Get-SkillFrontmatter {
    param([string]$Content)

    $result = [ordered]@{
        Fields = @{}
        Keys = @()
        Errors = @()
    }

    $match = [regex]::Match($Content, "(?s)\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)")
    if (-not $match.Success) {
        $result.Errors += "frontmatter must start the file and close with ---"
        return [pscustomobject]$result
    }

    $lines = $match.Groups[1].Value -split "\r?\n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        if ([string]::IsNullOrWhiteSpace($line)) {
            continue
        }

        $lineMatch = [regex]::Match($line, "^([A-Za-z0-9_-]+):\s*(.*)$")
        if (-not $lineMatch.Success) {
            $lineNumber = $i + 1
            $result.Errors += "frontmatter line $lineNumber must be key: value"
            continue
        }

        $key = $lineMatch.Groups[1].Value
        $value = $lineMatch.Groups[2].Value.Trim()
        if (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'"))) {
            $value = $value.Substring(1, $value.Length - 2)
        }

        if ($result.Fields.ContainsKey($key)) {
            $result.Errors += "frontmatter repeats key '$key'"
            continue
        }

        $result.Keys += $key
        $result.Fields[$key] = $value
    }

    return [pscustomobject]$result
}

function Test-SingleSlashCommand {
    param([string]$CommandFile)

    $issues = @()
    $commandRoot = Split-Path -Path $CommandFile -Parent

    if (-not (Test-Path $commandRoot)) {
        $issues += "Missing commands directory: $commandRoot"
        return $issues
    }

    $expected = (Resolve-Path -Path $CommandFile -ErrorAction SilentlyContinue)
    $commandFiles = @(Get-ChildItem -Path $commandRoot -Recurse -Filter "*.md" -File)
    $unexpected = @()

    foreach ($file in $commandFiles) {
        if (-not $expected -or $file.FullName -ne $expected.Path) {
            $unexpected += $file.FullName
        }
    }

    if (-not (Test-Path $CommandFile)) {
        $issues += "missing only supported slash command: $CommandFile"
    }

    if ($unexpected.Count -gt 0) {
        $issues += "Only /skill-master is allowed; remove extra command files: $($unexpected -join ', ')"
    }

    if ($commandFiles.Count -ne 1 -or -not (Test-Path $CommandFile)) {
        $issues += "commands/ must expose exactly one slash command: /skill-master"
    }

    return $issues
}

$skillFiles = Get-ChildItem -Path $Root -Recurse -Filter "SKILL.md" -File |
    Where-Object { $_.FullName -notmatch [regex]::Escape($ExcludePattern) }
if (-not $skillFiles) {
    Write-Host "No SKILL.md files found under $Root"
    exit 0
}

$results = @()

foreach ($file in $skillFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $folderName = Split-Path -Path (Split-Path -Path $file.FullName -Parent) -Leaf
    $frontmatter = Get-SkillFrontmatter -Content $content
    $allowedKeys = @("name", "description")
    $unsupportedKeys = @($frontmatter.Keys | Where-Object { $allowedKeys -notcontains $_ })
    $hasName = $frontmatter.Fields.ContainsKey("name")
    $hasDescription = $frontmatter.Fields.ContainsKey("description")
    $frontmatterName = if ($hasName) { $frontmatter.Fields["name"] } else { "" }
    $description = if ($hasDescription) { $frontmatter.Fields["description"] } else { "" }
    $folderNameIssues = @(Get-SkillNameIssues -Name $folderName)
    $frontmatterNameIssues = @(Get-SkillNameIssues -Name $frontmatterName)
    $descriptionIssues = @(Get-DescriptionIssues -Description $description)
    $hasWorkflow = $content -match "(?m)^##\s+Workflow"
    $hasFailureModes = $content -match "(?m)^##\s+Failure Modes"
    $hasOutputFormat = $content -match "(?m)^##\s+Output Format"

    $checks = @(
        (Get-Score -Condition ($frontmatter.Errors.Count -eq 0) -Pass "Has valid YAML frontmatter block" -Fail (($frontmatter.Errors -join "; ") -replace "^$", "Invalid frontmatter")),
        (Get-Score -Condition (($frontmatter.Keys.Count -eq 2) -and ($unsupportedKeys.Count -eq 0)) -Pass "Frontmatter only has name and description" -Fail $(if ($unsupportedKeys.Count -gt 0) { "Unsupported frontmatter keys: $($unsupportedKeys -join ', ')" } else { "Frontmatter must contain exactly name and description" })),
        (Get-Score -Condition $hasName -Pass "Has name" -Fail "Missing name frontmatter"),
        (Get-Score -Condition ($folderNameIssues.Count -eq 0) -Pass "Folder name is valid" -Fail ($folderNameIssues -join "; ")),
        (Get-Score -Condition ($frontmatterNameIssues.Count -eq 0) -Pass "Frontmatter name is valid" -Fail ($frontmatterNameIssues -join "; ")),
        (Get-Score -Condition ($frontmatterName -eq $folderName) -Pass "Frontmatter name matches folder" -Fail "Frontmatter name should match folder '$folderName'"),
        (Get-Score -Condition $hasDescription -Pass "Has description" -Fail "Missing description frontmatter"),
        (Get-Score -Condition ($descriptionIssues.Count -eq 0) -Pass "Description is trigger-only and routable" -Fail ($descriptionIssues -join "; ")),
        (Get-Score -Condition $hasWorkflow -Pass "Has Workflow section" -Fail "Missing Workflow section"),
        (Get-Score -Condition $hasFailureModes -Pass "Has Failure Modes section" -Fail "Missing Failure Modes section"),
        (Get-Score -Condition $hasOutputFormat -Pass "Has Output Format section" -Fail "Missing Output Format section")
    )

    $passCount = @($checks | Where-Object { $_.Status -eq "PASS" }).Count
    $failCount = @($checks | Where-Object { $_.Status -eq "FAIL" }).Count
    $decision = if ($failCount -eq 0) { "READY" } else { "NEEDS REVISION" }

    $results += [pscustomobject]@{
        Skill = $file.FullName
        Pass = $passCount
        Fail = $failCount
        Decision = $decision
        Checks = $checks
    }
}

function Write-Reports {
    param(
        [array]$Results,
        [string]$TargetDir
    )

    New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

    $jsonPath = Join-Path $TargetDir "skill-audit-report.json"
    $mdPath = Join-Path $TargetDir "skill-audit-report.md"

    $Results | ConvertTo-Json -Depth 8 | Set-Content -Path $jsonPath

    $md = @()
    $md += "# Skill Audit Report"
    $md += ""
    $md += "Generated: $(Get-Date -Format s)"
    $md += ""
    
    foreach ($r in $Results) {
        $md += "## $($r.Skill)"
        $md += ""
        $md += "- Pass: $($r.Pass)"
        $md += "- Fail: $($r.Fail)"
        $md += "- Decision: $($r.Decision)"
        $md += ""
        $md += "### Checks"
        $md += ""
    
        foreach ($c in $r.Checks) {
            $md += "- [$($c.Status)] $($c.Note)"
        }
    
        $md += ""
    }

    $md | Set-Content -Path $mdPath

    return [pscustomobject]@{
        JsonPath = $jsonPath
        MarkdownPath = $mdPath
    }
}

$paths = $null
try {
    $paths = Write-Reports -Results $results -TargetDir $ReportDir
}
catch [System.UnauthorizedAccessException] {
    $fallbackDir = "generated-reports"
    Write-Warning "Could not write reports to '$ReportDir'. Writing to '$fallbackDir' instead."
    $paths = Write-Reports -Results $results -TargetDir $fallbackDir
}

Write-Host "Audit complete"
Write-Host "JSON: $($paths.JsonPath)"
Write-Host "Markdown: $($paths.MarkdownPath)"

$routingFailures = @()

if (-not (Test-Path $IndexFile)) {
    $routingFailures += "Missing index file: $IndexFile"
}
else {
    $index = Get-Content -Path $IndexFile -Raw | ConvertFrom-Json

    if (-not $index.commands -or $index.commands.Count -ne 1) {
        $routingFailures += "skill-index.json must list exactly one command: /skill-master"
    }

    foreach ($skill in $index.skills) {
        if (-not (Test-Path $skill.path)) {
            $routingFailures += "Index skill '$($skill.name)' points to missing path: $($skill.path)"
        }
    }

    foreach ($command in $index.commands) {
        if ($command.command -ne "/skill-master" -or $command.path -ne "commands/skill-master.md") {
            $routingFailures += "skill-index.json command entry must expose only /skill-master at commands/skill-master.md"
        }

        if (-not (Test-Path $command.path)) {
            $routingFailures += "Index command '$($command.name)' points to missing path: $($command.path)"
        }

        if (-not (Test-Path $command.routingFile)) {
            $routingFailures += "Index command '$($command.name)' points to missing routing file: $($command.routingFile)"
        }
    }

    if (-not (Test-Path $index.routing.path)) {
        $routingFailures += "Index routing path is missing: $($index.routing.path)"
    }

    if (-not (Test-Path $index.routing.examplesPath)) {
        $routingFailures += "Index routing examples path is missing: $($index.routing.examplesPath)"
    }

    if ($index.templates) {
        foreach ($template in $index.templates.PSObject.Properties) {
            if (-not (Test-Path $template.Value)) {
                $routingFailures += "Index template '$($template.Name)' is missing: $($template.Value)"
            }
        }
    }

    if ($index.verification -and $index.verification.scripts) {
        foreach ($script in $index.verification.scripts.PSObject.Properties) {
            if (-not (Test-Path $script.Value)) {
                $routingFailures += "Index verification script '$($script.Name)' is missing: $($script.Value)"
            }
        }
    }
}

if (-not (Test-Path $CommandFile)) {
    $routingFailures += "Missing command file: $CommandFile"
}

$routingFailures += @(Test-SingleSlashCommand -CommandFile $CommandFile)

if (-not (Test-Path $RoutingFile)) {
    $routingFailures += "Missing routing file: $RoutingFile"
}
else {
    $routing = Get-Content -Path $RoutingFile -Raw | ConvertFrom-Json

    if ($routing.command -ne "/skill-master") {
        $routingFailures += "Routing file command should be /skill-master"
    }

    if (-not $routing.categories -or $routing.categories.Count -eq 0) {
        $routingFailures += "Routing file has no categories"
    }
    else {
        $categoryIds = @($routing.categories | ForEach-Object { $_.category })

        foreach ($category in $routing.categories) {
            if (-not $category.category) {
                $routingFailures += "Routing category is missing category id"
            }

            if (-not $category.advisorSkill) {
                $routingFailures += "Routing category '$($category.category)' is missing advisorSkill"
            }

            if (-not $category.advisorPath) {
                $routingFailures += "Routing category '$($category.category)' is missing advisorPath"
            }
            elseif (-not (Test-Path $category.advisorPath)) {
                $routingFailures += "Routing category '$($category.category)' points to missing advisorPath: $($category.advisorPath)"
            }

            if (-not $category.exampleRequests -or $category.exampleRequests.Count -lt 2) {
                $routingFailures += "Routing category '$($category.category)' should include at least two exampleRequests"
            }

            if (-not $category.negativeExamples -or $category.negativeExamples.Count -lt 1) {
                $routingFailures += "Routing category '$($category.category)' should include at least one negativeExamples entry"
            }

            if (-not $category.forwardTestPrompts -or $category.forwardTestPrompts.Count -lt 2) {
                $routingFailures += "Routing category '$($category.category)' should include at least two forwardTestPrompts"
            }

            foreach ($adjacent in $category.adjacentCategories) {
                if ($categoryIds -notcontains $adjacent) {
                    $routingFailures += "Routing category '$($category.category)' points to unknown adjacent category: $adjacent"
                }
            }
        }

        if (-not (Test-Path $TemplateFile)) {
            $routingFailures += "Missing advisor template catalog: $TemplateFile"
        }
        else {
            $templates = Get-Content -Path $TemplateFile -Raw | ConvertFrom-Json
            foreach ($category in $routing.categories) {
                $templateProperty = $templates.categories.PSObject.Properties[$category.category]
                if (-not $templateProperty) {
                    $routingFailures += "Missing advisor template for routing category '$($category.category)'"
                    continue
                }

                $template = $templateProperty.Value
                if (-not $template.workflowFocus -or $template.workflowFocus.Count -lt 2) {
                    $routingFailures += "Advisor template '$($category.category)' should include at least two workflowFocus entries"
                }

                if (-not $template.recommendedReferences -or $template.recommendedReferences.Count -lt 1) {
                    $routingFailures += "Advisor template '$($category.category)' should include recommendedReferences"
                }

                if (-not $template.outputFormat) {
                    $routingFailures += "Advisor template '$($category.category)' should include outputFormat"
                }
            }
        }
    }
}

if ($routingFailures.Count -gt 0) {
    Write-Error ("Routing validation failed:`n" + ($routingFailures -join "`n"))
}

$failedSkills = @($results | Where-Object { $_.Fail -gt 0 })
if ($failedSkills.Count -gt 0) {
    Write-Error "Skill validation failed for $($failedSkills.Count) file(s). See $($paths.MarkdownPath)"
}

if (Test-Path $RoutingFile) {
    $categoryCount = (Get-Content -Path $RoutingFile -Raw | ConvertFrom-Json).categories.Count
    Write-Host "Routing: /skill-master with $categoryCount categories"
}
