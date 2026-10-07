# Decision log

Dates use Asia/Manila. Accepted decisions reflect explicit user constraints and approved plan. Amend with a new entry and a supersession link; never silently rewrite an accepted choice. Current baseline is described in [CONTEXT](CONTEXT.md).

## DEC-001 — Foundation-only milestone

- Date: 2026-10-08.
- Status: accepted.
- Context: Deliver the requested external project memory before the teaching application.
- Options considered: Build full site immediately; foundation then site; foundation only.
- Decision: Foundation only, with a useful offline documentation guide.
- Reasoning: User selected this boundary and approved the plan.
- Consequences: Six modes remain future tasks; the initial HTML is not advertised as the teaching website.

## DEC-002 — Socketed Uno Rev3 schematic baseline

- Date: 2026-10-08.
- Status: accepted.
- Context: Official manual and schematic disagree on some component descriptions.
- Options considered: Merge identities; follow manual; scope facts to schematic/CAD.
- Decision: Use published UNO-TH_Rev3e A000066 socketed reference; isolate manual discrepancies.
- Reasoning: A named design has reproducible values and connectivity.
- Consequences: Production variants need independent evidence; no CH340/R4 substitutions.

## DEC-003 — Local-only single-file delivery

- Date: 2026-10-08.
- Status: accepted.
- Context: The application must open directly without tooling or required assets.
- Options considered: Hosted framework; buildless external files; self-contained HTML.
- Decision: Vanilla ES6+, inline CSS/SVG/Canvas in index.html; no required fetch/import/CDN; no GSAP by default.
- Reasoning: Fits offline use and user's no-dependency constraint.
- Consequences: Logical modules share one file; documentation remains separate.

## DEC-004 — SVG board derived from official coordinates

- Date: 2026-10-08.
- Status: accepted.
- Context: Recognizable anatomy needs source-based placement and interaction.
- Options considered: Hand-drawn approximate layout; external board photo; CAD-based SVG.
- Decision: Use CAD package origins/rotations with documented SVG transform and educational shapes.
- Reasoning: Keeps positions traceable and keyboard/pointer controls feasible.
- Consequences: Label layout-faithful educational illustration; grouping never erases physical references.

## DEC-005 — Conceptual internals and scale boundaries

- Date: 2026-10-08.
- Status: accepted.
- Context: Exact die geometry, process details and memory cells are not verified.
- Options considered: Invent plausible floorplan; omit all microscopic teaching; labeled concepts.
- Decision: Teach conceptual die/gate/memory/package scenes with independent evidence/representation/precision fields.
- Reasoning: Mechanisms can be taught without claiming proprietary geometry.
- Consequences: No numerical scale for software; unknown sizes remain null; a planar N-MOS scene is not FDN340P geometry.

## DEC-006 — Canonical memory ownership

- Date: 2026-10-08.
- Status: accepted.
- Context: Many documents can otherwise diverge on identity, terminology and status.
- Options considered: Duplicate all facts; one huge document; explicit owners with links.
- Decision: Inventory owns hardware, SOURCES bibliography, terminology definitions, REQUIREMENTS obligations, TASKS status, DECISIONS accepted changes.
- Reasoning: Allows independent sessions to find truth quickly.
- Consequences: Embedded future data is a reviewed projection; no added build system.

## DEC-007 — Accessible interactions from inception

- Date: 2026-10-08.
- Status: accepted.
- Context: Dragging, tiny SVG parts and animated scenes can exclude learners.
- Options considered: Mouse-first; retrofit accessibility; shared accessible actions.
- Decision: Native controls/list alternatives, select/place assembly, focus restoration, static descriptions and motion lifecycle.
- Reasoning: Keyboard, touch and reduced-motion paths are acceptance criteria.
- Consequences: Screen-reader and real-device tests require manual evidence; no blanket conformance claim.

## DEC-008 — Preserve briefs and validate memory

- Date: 2026-10-08.
- Status: accepted.
- Context: Foundation must retain provenance and detect broken cross-references.
- Options considered: Only chat; copy prompts into every document; archived briefs and validator.
- Decision: Add docs/briefs originals and one dependency-free PowerShell validator; retain all requested documents.
- Reasoning: Preserves intent without duplication and checks references/dependencies.
- Consequences: No ceremonial empty files. Structural checks supplement factual/manual review.


