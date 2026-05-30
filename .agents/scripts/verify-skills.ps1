param(
    [string]$Root = ".agents/skills",
    [string]$ExcludePattern = "creating-skills",
    [string]$ReportDir = ".agents/reports",
    [string]$RoutingFile = ".agents/routing/skill-master-routing.json",
    [string]$CommandFile = ".agents/commands/skill-master.md"
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

$skillFiles = Get-ChildItem -Path $Root -Recurse -Filter "SKILL.md" -File |
    Where-Object { $_.FullName -notmatch [regex]::Escape($ExcludePattern) }
if (-not $skillFiles) {
    Write-Host "No SKILL.md files found under $Root"
    exit 0
}

$results = @()

foreach ($file in $skillFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    $lines = Get-Content -Path $file.FullName

    $hasName = $content -match "(?m)^name:\s*.+$"
    $hasDescription = $content -match "(?m)^description:\s*.+$"
    $descriptionUseWhen = $content -match "(?m)^description:\s*Use when"
    $hasWorkflow = $content -match "(?m)^##\s+Workflow"
    $hasFailureModes = $content -match "(?m)^##\s+Failure Modes"
    $hasOutputFormat = $content -match "(?m)^##\s+Output Format"

    $checks = @(
        (Get-Score -Condition $hasName -Pass "Has name" -Fail "Missing name frontmatter"),
        (Get-Score -Condition $hasDescription -Pass "Has description" -Fail "Missing description frontmatter"),
        (Get-Score -Condition $descriptionUseWhen -Pass "Description starts with Use when" -Fail "Description should start with Use when"),
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

if (-not (Test-Path $CommandFile)) {
    $routingFailures += "Missing command file: $CommandFile"
}

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
        }
    }
}

if ($routingFailures.Count -gt 0) {
    Write-Error ("Routing validation failed:`n" + ($routingFailures -join "`n"))
}

if (Test-Path $RoutingFile) {
    $categoryCount = (Get-Content -Path $RoutingFile -Raw | ConvertFrom-Json).categories.Count
    Write-Host "Routing: /skill-master with $categoryCount categories"
}
