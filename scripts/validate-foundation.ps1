# Dependency-free checks for durable project memory. No files are modified.
[CmdletBinding()]
param([string]$Root = '')
$ErrorActionPreference = 'Stop'
if (-not $Root) { $Root = Split-Path -Parent $PSScriptRoot }
$Root = [IO.Path]::GetFullPath($Root)
$issues = New-Object 'System.Collections.Generic.List[string]'
function Fail([string]$Message) { $issues.Add($Message) }
$required = @(
 'README.md','AGENTS.md','PROJECT.md','CONTEXT.md','REQUIREMENTS.md','ARCHITECTURE.md',
 'DESIGN.md','UX.md','CONTENT_MODEL.md','DATA_MODEL.md','COMPONENT_INVENTORY.md',
 'RESEARCH.md','SOURCES.md','DECISIONS.md','TASKS.md','TESTING.md','ACCESSIBILITY.md',
 'RISKS.md','HANDOFF.md','CHANGELOG.md','index.html',
 'docs/briefs/website-specification.txt','docs/briefs/project-foundation-specification.txt',
 'docs/electronics/uno-r3-anatomy.md','docs/electronics/power-system.md',
 'docs/electronics/microcontrollers.md','docs/electronics/pcb.md','docs/electronics/passives.md',
 'docs/electronics/signal-paths.md','docs/physics/transistor.md','docs/physics/semiconductor.md',
 'docs/physics/materials.md','docs/physics/atoms-electrons.md','docs/physics/photons.md',
 'docs/product/user-journeys.md','docs/product/learning-objectives.md','docs/product/terminology.md',
 'docs/engineering/rendering.md','docs/engineering/interactions.md',
 'docs/engineering/performance.md','docs/engineering/browser-support.md',
 'scripts/validate-foundation.ps1'
)
$texts = @{}
foreach ($relative in $required) {
 $path = Join-Path $Root $relative
 if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { Fail "Missing file: $relative"; continue }
 $body = [IO.File]::ReadAllText($path)
 if ($body.Trim().Length -lt 100) { Fail "Insufficient substantive content: $relative" }
 if ($relative.EndsWith('.md') -or $relative -eq 'index.html') { $texts[$relative] = $body }
}
foreach ($relative in $texts.Keys) {
 $body = $texts[$relative]
 if ($relative.EndsWith('.md')) {
  $links = [regex]::Matches($body, '\[[^\]\r\n]*\]\((?<target>[^)]+)\)')
 } else {
  $links = [regex]::Matches($body, 'href="(?<target>[^"]+)"')
 }
 foreach ($match in $links) {
  $target = $match.Groups['target'].Value.Trim().Trim('<','>')
  if ($target -match '^(https?://|mailto:|codex:)' -or $target.StartsWith('#')) { continue }
  $target = [uri]::UnescapeDataString(($target -split '#',2)[0])
  $base = Split-Path -Parent (Join-Path $Root $relative)
  $resolved = [IO.Path]::GetFullPath((Join-Path $base $target))
  if (-not $resolved.StartsWith($Root + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
   Fail "Link outside repository in ${relative}: $target"; continue
  }
  if (-not (Test-Path -LiteralPath $resolved -PathType Leaf)) { Fail "Broken relative link in ${relative}: $target" }
 }
}
function Definitions([string]$File, [string]$Pattern) {
 $set = @{}
 if (-not $texts.ContainsKey($File)) { return $set }
 foreach ($m in [regex]::Matches($texts[$File],$Pattern)) {
  $id = $m.Groups[1].Value
  if ($set.ContainsKey($id)) { Fail "Duplicate definition $id in $File" }
  $set[$id] = $true
 }
 if ($set.Count -eq 0) { Fail "No canonical IDs in $File" }
 return $set
}
$requirements = Definitions 'REQUIREMENTS.md' '(?m)^\| ((?:FUNC|CONTENT|UX|ACC|PERF|TECH|RESEARCH|QA|FOUND)-\d{3}) \|'
$sources = Definitions 'SOURCES.md' '(?m)^## (SRC-\d{3})\b'
$decisions = Definitions 'DECISIONS.md' '(?m)^## (DEC-\d{3})\b'
$tasks = Definitions 'TASKS.md' '(?m)^### (TASK-\d{3})\b'
$known = @{}
foreach ($set in @($requirements,$sources,$decisions,$tasks)) { foreach ($id in $set.Keys) { $known[$id] = $true } }
foreach ($relative in $texts.Keys) {
 foreach ($m in [regex]::Matches($texts[$relative],'\b(?:FUNC|CONTENT|UX|ACC|PERF|TECH|RESEARCH|QA|FOUND|SRC|DEC|TASK)-\d{3}\b')) {
  if (-not $known.ContainsKey($m.Value)) { Fail "Unknown ID $($m.Value) referenced in $relative" }
 }
}
$taskInfo = @{}
if ($texts.ContainsKey('TASKS.md')) {
 $section = ''
 $current = ''
 foreach ($line in ($texts['TASKS.md'] -split '\r?\n')) {
  if ($line -match '^## (BACKLOG|READY|IN PROGRESS|BLOCKED|REVIEW|DONE)$') { $section = $Matches[1] }
  if ($line -match '^### (TASK-\d{3})\b') {
   $current = $Matches[1]
   $taskInfo[$current] = @{ Section=$section; Status=''; Phase=-1; Dependencies=@(); Requirements=@(); Acceptance=$false; Files=$false }
  }
  if (-not $current) { continue }
  if ($line -match '^- Status: (.+?)\.$') { $taskInfo[$current].Status = $Matches[1] }
  if ($line -match '^- Phase: (\d+)\.$') { $taskInfo[$current].Phase = [int]$Matches[1] }
  if ($line -match '^- Dependencies: (.+)$') { $taskInfo[$current].Dependencies = @([regex]::Matches($Matches[1],'TASK-\d{3}') | ForEach-Object Value) }
  if ($line -match '^- Requirement IDs: (.+)$') { $taskInfo[$current].Requirements = @([regex]::Matches($Matches[1],'(?:FUNC|CONTENT|UX|ACC|PERF|TECH|RESEARCH|QA|FOUND)-\d{3}') | ForEach-Object Value) }
  if ($line -match '^- Acceptance criteria: .{30,}') { $taskInfo[$current].Acceptance = $true }
  if ($line -match '^- Files likely affected: .+') { $taskInfo[$current].Files = $true }
 }
 foreach ($id in $taskInfo.Keys) {
  $task = $taskInfo[$id]
  if ($task.Status -ne $task.Section) { Fail "Task section/status disagree: $id" }
  if ($task.Phase -lt 0 -or -not $task.Acceptance -or -not $task.Files -or $task.Requirements.Count -eq 0) { Fail "Incomplete task contract: $id" }
  foreach ($dep in $task.Dependencies) {
   if (-not $taskInfo.ContainsKey($dep)) { Fail "Unknown dependency $dep in $id" }
   elseif ($task.Status -in @('READY','DONE') -and $taskInfo[$dep].Status -ne 'DONE') { Fail "$id is $($task.Status) with unfinished dependency $dep" }
  }
  if ([int]($id -replace 'TASK-','') -ge 7 -and $task.Status -eq 'DONE') { Fail "Future task marked DONE in foundation milestone: $id" }
 }
}
$visit = @{}
function VisitTask([string]$Id, [string[]]$Path) {
 if ($visit[$Id] -eq 'visiting') { Fail ('Dependency cycle: ' + (($Path + $Id) -join ' -> ')); return }
 if ($visit[$Id] -eq 'done' -or -not $taskInfo.ContainsKey($Id)) { return }
 $visit[$Id] = 'visiting'
 foreach ($dep in $taskInfo[$Id].Dependencies) { VisitTask $dep ($Path + $Id) }
 $visit[$Id] = 'done'
}
foreach ($id in $taskInfo.Keys) { VisitTask $id @() }
if ($texts.ContainsKey('REQUIREMENTS.md')) {
 foreach ($line in ($texts['REQUIREMENTS.md'] -split '\r?\n')) {
  if ($line -notmatch '^\| (?:FUNC|CONTENT|UX|ACC|PERF|TECH|RESEARCH|QA|FOUND)-\d{3} \|') { continue }
  $cells = @($line.Trim('|').Split('|') | ForEach-Object { $_.Trim() })
  if ($cells.Count -ne 7) { Fail "Malformed requirement row: $line"; continue }
  $id = $cells[0]; $owner = $cells[6]
  if ($cells[2] -notin @('must','optional') -or $cells[4] -notin @('planned','review','satisfied')) { Fail "Invalid requirement enum: $id" }
  if (-not $taskInfo.ContainsKey($owner)) { Fail "Requirement owner absent: $id / $owner"; continue }
  if ($id -notin $taskInfo[$owner].Requirements) { Fail "Requirement missing from owning task: $id / $owner" }
  if ($cells[4] -eq 'satisfied' -and $taskInfo[$owner].Status -ne 'DONE') { Fail "Satisfied requirement has unfinished owner: $id" }
 }
}
if ($texts.ContainsKey('COMPONENT_INVENTORY.md')) {
 $count = 0; $refs = @{}
 foreach ($line in ($texts['COMPONENT_INVENTORY.md'] -split '\r?\n')) {
  if ($line -notmatch '^\| ([^|]+) \|.*verified design; production unspecified') { continue }
  $ref = $Matches[1].Trim(); $count++
  if ($refs.ContainsKey($ref)) { Fail "Duplicate inventory designator: $ref" }; $refs[$ref] = $true
  if ($line -notmatch 'SRC-\d{3}') { Fail "Inventory row has no citation: $ref" }
 }
 if ($count -ne 116) { Fail "Baseline inventory must reconcile 116 CAD elements; found $count" }
}
$handoffHeadings = @('Current State','What Was Completed','What Changed','Files Modified','Important Decisions','Verified Facts Added','Known Problems','Unresolved Questions','Current In-Progress Task','Recommended Next Task','How to Verify Current Work','Warnings for the Next Agent')
if ($texts.ContainsKey('HANDOFF.md')) {
 foreach ($heading in $handoffHeadings) {
  if ($texts['HANDOFF.md'] -notmatch ('(?m)^# '+[regex]::Escape($heading)+'\r?$')) { Fail "Missing handoff heading: $heading" }
 }
}
if ($texts.ContainsKey('index.html')) {
 $html = $texts['index.html']
 if (-not $html.TrimStart().StartsWith('<!--')) { Fail 'index.html must begin with stack explanation comment' }
 if ($html -match '(?i)<script\b|<button\b|<canvas\b|localStorage|<link[^>]+stylesheet') { Fail 'Foundation guide contains application controls/dependencies' }
 $ids = @{}
 foreach ($m in [regex]::Matches($html,'\bid="([^"]+)"')) {
  if ($ids.ContainsKey($m.Groups[1].Value)) { Fail "Duplicate HTML ID: $($m.Groups[1].Value)" }; $ids[$m.Groups[1].Value]=$true
 }
 foreach ($m in [regex]::Matches($html,'href="#([^"]+)"')) { if (-not $ids.ContainsKey($m.Groups[1].Value)) { Fail "Broken guide fragment: $($m.Groups[1].Value)" } }
}
if ($issues.Count) {
 foreach ($issue in $issues) { Write-Output "FAIL: $issue" }
 Write-Output "Foundation validation failed: $($issues.Count) issue(s)."
 exit 1
}
Write-Output "PASS: $($required.Count) required files; $($requirements.Count) requirements; $($sources.Count) sources; $($decisions.Count) decisions; $($tasks.Count) tasks; 116 inventory elements."
Write-Output 'PASS: relative links, canonical references, task traceability/dependencies/cycles, handoff headings and foundation status checks.'
Write-Output 'LIMIT: structural checks do not establish scientific correctness or browser/accessibility conformance. See TESTING.md.'
exit 0
