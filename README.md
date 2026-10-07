# Inside the Arduino Uno: From Board to Electron

Current deliverable: populated project foundation and an offline documentation guide. The educational application is planned; none of its six modes is implemented yet. Scope and baseline follow the approved foundation plan.

## Start and run

Open `index.html` directly in a browser, or use this [project guide](index.html). It has inline CSS/system fonts and requires no server, dependency installation, network, JavaScript or persistent storage. Markdown links may open as raw text or download depending on browser/file associations; an editor provides richer document viewing.

Contributors read [AGENTS](AGENTS.md), [HANDOFF](HANDOFF.md), [TASKS](TASKS.md), then the relevant requirements, accepted decisions and topic evidence. Do not infer current implementation from a task description.

Run from repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-foundation.ps1
```

This checks structure, links, IDs, task dependencies/traceability, inventory coverage and handoff. It does not certify scientific accuracy or full accessibility. Results and actual limits are in [TESTING](TESTING.md).

## Repository map and ownership

| Documents | Purpose / canonical owner |
| --- | --- |
| AGENTS / HANDOFF / TASKS | Operating rules / current continuity / execution state. |
| PROJECT / CONTEXT / REQUIREMENTS | Vision / durable constraints / numbered obligations. |
| COMPONENT_INVENTORY / SOURCES / RESEARCH | Hardware identity and positions / bibliography / findings and uncertainty. |
| ARCHITECTURE / DATA_MODEL / CONTENT_MODEL | State/rendering modules / typed contracts / educational depth and truth labels. |
| DESIGN / UX / ACCESSIBILITY | Visual system / flows / accessible behavior contract. |
| DECISIONS / RISKS / CHANGELOG / TESTING | Accepted choices / mitigations / meaningful changes / verification evidence. |
| docs/electronics / docs/physics | Focused explanations with scope and source references. |
| docs/product / docs/engineering | Journeys/objectives/definitions and implementation contracts. |
| docs/briefs | Original user instructions preserved byte-for-byte. |
| index.html / scripts | Offline contributor guide and dependency-free validator. |

## Baseline and next work

Reference: official socketed A000066 Uno Rev3, UNO-TH_Rev3e schematic/CAD. [Inventory](COMPONENT_INVENTORY.md) accounts for every CAD element and identifies fitted-part versus PCB-feature/DNP distinctions. Current manual conflicts remain explicit; no clone/R4 identities or guessed manufacturing details enter the main anatomy.

Phase 1 teaching implementation replaces the guide in the same index.html only after its task acceptance is ready. Maintain single-file runtime and no-build constraints. Adding a component or zoom node follows the extension procedure in [ARCHITECTURE](ARCHITECTURE.md) and validation contracts in [DATA_MODEL](DATA_MODEL.md).
