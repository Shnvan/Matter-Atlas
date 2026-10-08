# Decision log

Dates use Asia/Manila. Accepted decisions reflect explicit user constraints and approved plan. Amend with a new entry and a supersession link; never silently rewrite an accepted choice. Current baseline is described in [CONTEXT](CONTEXT.md).

## DEC-001 — Foundation-only milestone

- Date: 2026-10-08.
- Status: superseded for application delivery by DEC-009; retained as foundation history.
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
- Status: superseded for application delivery by DEC-009; retained as foundation history.
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



## DEC-009 — Approved static frontend migration

- Date: 2026-10-08.
- Status: accepted.
- Context: User approved the NASA-inspired redesign and six-mode application implementation after the completed foundation.
- Decision: Supersede DEC-001 milestone boundary and DEC-003 single-file/no-build constraint for the new application. Use Next.js 16.4.0, React 19.3.0, TypeScript 6.0.3, Tailwind 4.3.3 and Geist 1.7.2, with compatible libraries locked by npm after build checks. Use local HTTP static export and bundled assets/content; no hosting or required internet services.
- Consequences: Preserve root index.html as the original file-URL guide and baseline Git commit eef829b. Contributor documents receive safe allowlisted build-time routes. Historical foundation checks do not establish new app acceptance.

## DEC-010 — Warm object-first scientific workspace

- Date: 2026-10-08.
- Status: accepted.
- Decision: NASA-inspired editorial hierarchy with the brief's warm light default and complete dark theme. Desktop >=1200px uses 64px header, 232px navigator, 336px inspector; tablet drawers and mobile sheets protect board space. Explore/Journey/Learn organize all six modes. No NASA logos or endorsement implied.
- Consequences: TASK-028 is now mandatory theme work, rather than an optional late enhancement. CAD-derived layered SVG/2.5D is the initial renderer; WebGL is deferred. Visual acceptance requires screenshots and input checks.

## DEC-011 — Canonical design and execution ownership

- Date: 2026-10-08.
- Status: accepted.
- Decision: Keep DESIGN as design-system owner and UX as interaction-model owner instead of duplicating DESIGN_SYSTEM/INTERACTION_MODEL files requested by the generic redesign brief. Add docs/design/UI_AUDIT.md, .agent/PLANS.md and three narrow repository skills that link to canonical policy.
- Consequences: Inventory, bibliography, terminology, requirements and tasks retain their established ownership. Runtime data is a reviewed projection. DONE requires explicit acceptance evidence; the validator must not permanently prohibit application tasks from completion.
