# Execution tasks

Status is canonical here. TASK-001 through TASK-006 retain their accepted foundation history; TASK-007 through TASK-028 have application acceptance recorded in [TESTING](TESTING.md). DONE means the recorded acceptance scope passed, not certified usability on untested browsers, screen readers or physical devices. Optional extensions require scope selection.

## BACKLOG

### TASK-029 — Optional beyond-electronics expansion

- Phase: 16.
- Status: BACKLOG.
- Requirement IDs: CONTENT-036 (optional extension).
- Dependencies: TASK-027.
- Acceptance criteria: Nucleus/protons/neutrons/quark/gluon conceptual bonus with authoritative citations and explicit beyond-electronics note.
- Files likely affected: index.html, docs/physics/atoms-electrons.md.
- Notes: Optional enhancement; implement only after mandatory final QA and scope selection.

### TASK-030 — Optional interactive PCB layer diagram

- Phase: 16.
- Status: BACKLOG.
- Requirement IDs: FUNC-019.
- Dependencies: TASK-027.
- Acceptance criteria: Sourced/conceptual layer distinction; keyboard layer controls and static descriptions; no invented fabrication stack dimensions.
- Files likely affected: index.html, docs/electronics/pcb.md.
- Notes: Optional enhancement; implement only after mandatory final QA and scope selection.

## READY

No tasks currently in this state.

## IN PROGRESS

No tasks currently in this state.

## BLOCKED

No tasks currently in this state.

## REVIEW

No tasks currently in this state.

## DONE

### TASK-001 — Preserve briefs and establish project operating memory

- Phase: 0.
- Status: DONE.
- Requirement IDs: FOUND-001, FOUND-002.
- Dependencies: none.
- Acceptance criteria: Both briefs preserved byte-for-byte; operating documents cover approved scope, reading order, ownership and source hierarchy.
- Files likely affected: Root Markdown and docs/briefs.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-002 — Verify hardware inventory and source register

- Phase: 0.
- Status: DONE.
- Requirement IDs: CONTENT-004, RESEARCH-001, RESEARCH-003, FOUND-003.
- Dependencies: TASK-001.
- Acceptance criteria: All 116 CAD elements reconciled; critical topology visually and netlist checked; source locations and unresolved identities documented.
- Files likely affected: COMPONENT_INVENTORY.md, SOURCES.md, RESEARCH.md.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-003 — Define architecture and data contracts

- Phase: 0.
- Status: DONE.
- Requirement IDs: RESEARCH-005, FOUND-004.
- Dependencies: TASK-002.
- Acceptance criteria: Eight schemas have field types/examples/rules; source/evidence/scale dimensions are independent; navigation/state/motion contracts defined.
- Files likely affected: ARCHITECTURE.md, DATA_MODEL.md, CONTENT_MODEL.md, DECISIONS.md.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-004 — Draft topic, design, UX and accessibility memory

- Phase: 0.
- Status: DONE.
- Requirement IDs: FOUND-005.
- Dependencies: TASK-003.
- Acceptance criteria: Every requested topic document contains useful scoped content or research bounds; definitions/objectives/journeys agree with canonical records.
- Files likely affected: DESIGN.md, UX.md, ACCESSIBILITY.md, RISKS.md, docs.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-005 — Build offline documentation guide

- Phase: 0.
- Status: DONE.
- Requirement IDs: FOUND-007.
- Dependencies: TASK-004.
- Acceptance criteria: Guide opens by file URL; links work; no inactive teaching controls; responsive keyboard/contrast checks recorded.
- Files likely affected: index.html, README.md.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-006 — Validate foundation and record handoff

- Phase: 0.
- Status: DONE.
- Requirement IDs: QA-005, FOUND-006, FOUND-008, FOUND-009, FOUND-010.
- Dependencies: TASK-005.
- Acceptance criteria: Structural validator and negative fixtures pass; brief coverage and critical evidence audited; actual browser results and limits documented.
- Files likely affected: scripts/validate-foundation.ps1, TESTING.md, TASKS.md, HANDOFF.md, CHANGELOG.md.
- Acceptance evidence: Foundation validation and documented manual/browser checks passed on 2026-10-08; see TESTING historical foundation results.
- Notes: Foundation acceptance retained; new application behavior requires separate checks.

### TASK-007 — Complete history and package-specific pin research

- Phase: 0.
- Status: DONE.
- Requirement IDs: CONTENT-002, CONTENT-003, CONTENT-038 (research dependencies).
- Dependencies: TASK-002, TASK-004, TASK-006.
- Acceptance criteria: Attributable history/timeline draft and reviewed 28-pin mapping with explicit core version; unsupported claims omitted; research questions updated.
- Files likely affected: RESEARCH.md, SOURCES.md, docs/electronics/microcontrollers.md, docs/product.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Primary/official attributed history (411 words), dated timeline, 28-pin DIP/header review and core 1.8.6 verified; SRC-026, SRC-033, SRC-034, SRC-035 and SRC-040; content tests pass.

### TASK-008 — Build teaching page shell and design tokens

- Phase: 1.
- Status: DONE.
- Requirement IDs: CONTENT-001, UX-001, ACC-001, TECH-001, TECH-005, TECH-006, UX-007.
- Dependencies: TASK-003, TASK-004, TASK-006.
- Acceptance criteria: Semantic section shell, mode/help navigation, measured AA colors and responsive layout; only working controls exposed.
- Files likely affected: src application modules, tests, DESIGN.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Strict type/lint and production static export pass. Both-theme responsive captures, semantic shell, safe allowlisted contributor routes, raw downloads and archived-guide links pass Playwright/axe.

### TASK-009 — Implement CAD-based Uno board SVG

- Phase: 2.
- Status: DONE.
- Requirement IDs: TECH-004.
- Dependencies: TASK-002, TASK-008.
- Acceptance criteria: Recognizable socketed Rev3; sourced positions/rotations; unique groups/labels/slots; grouped passives retain physical references; list equivalent.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: 116 physical CAD records projected separately from 49 teaching groups; sourced outline, footprints, rotations and copper geometry. Board selection/control screenshots and browser tests pass.

### TASK-010 — Project verified content into runtime data

- Phase: 3.
- Status: DONE.
- Requirement IDs: CONTENT-002, CONTENT-003, CONTENT-006, CONTENT-007, CONTENT-008, CONTENT-009, CONTENT-010, CONTENT-013, CONTENT-014, CONTENT-015, CONTENT-016, CONTENT-017, CONTENT-018, TECH-003, RESEARCH-004.
- Dependencies: TASK-003, TASK-007.
- Acceptance criteria: All required structured arrays and pin records conform to contracts; references/claims/branch targets validated; 21-section content coverage.
- Files likely affected: src application modules, tests, DATA_MODEL.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: All eight data contracts plus pin/topic records validated with Zod and cross-reference checks; 31 scenes, 14 topics, 8 materials, 7 signal journeys and 12 questions reviewed against sections 0–20.

### TASK-011 — Implement Explore search and selection

- Phase: 3.
- Status: DONE.
- Requirement IDs: FUNC-001, FUNC-002, FUNC-003.
- Dependencies: TASK-009, TASK-010.
- Acceptance criteria: Pointer/focus highlight; category/search filtering including empty state; list and SVG select same record with keyboard/touch.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Browser keyboard/pointer selection, shared inspector, search, category/system filters and clear/empty-state checks pass.

### TASK-012 — Implement depth-aware details and mobile sheet

- Phase: 4.
- Status: DONE.
- Requirement IDs: CONTENT-005, UX-002, UX-003, ACC-005.
- Dependencies: TASK-011.
- Acceptance criteria: Purpose/composition/mechanism/specs/absence/analogy/limits/citations; desktop region and mobile dialog; focus restored on close.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Progressive composition/mechanism/specs/absence/analogy/source details and mobile focus containment, Escape and origin restoration pass.

### TASK-013 — Implement Explode and reassemble

- Phase: 5.
- Status: DONE.
- Requirement IDs: FUNC-004.
- Dependencies: TASK-012.
- Acceptance criteria: Deterministic offsets/leader lines; selection retained; reassemble accurate; instant reduced-motion state.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Exploded leader lines, retained selection and reassembly pass browser checks; reduced-motion screenshot inspected.

### TASK-014 — Implement accessible assembly

- Phase: 6.
- Status: DONE.
- Requirement IDs: FUNC-005, FUNC-006, FUNC-007, FUNC-008.
- Dependencies: TASK-013.
- Acceptance criteria: Screen-distance snap to matching slots; incorrect return; hints/reset/progress/completion; keyboard/tap placement parity; pointercancel recovery.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Matching drops including 24 CSS-pixel proximity snapping, wrong placement, pointer cancellation/recovery, keyboard placement of all ten parts, hints, completion and reset pass.

### TASK-015 — Implement branched scale navigation

- Phase: 7.
- Status: DONE.
- Requirement IDs: CONTENT-039, FUNC-009, FUNC-010, FUNC-011, FUNC-018.
- Dependencies: TASK-010, TASK-012.
- Acceptance criteria: All conceptual levels and component branches; actual history/back to origin; source/representation/scale labels; electrical cross-link.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Full MCU, LED, resistor and capacitor paths, actual back history, branch choices, electrical cross-link and origin return pass; unsupported scales remain unavailable.

### TASK-016 — Implement package and conceptual die scenes

- Phase: 8.
- Status: DONE.
- Requirement IDs: CONTENT-019, CONTENT-020, CONTENT-021.
- Dependencies: TASK-015.
- Acceptance criteria: Package/die distinction; complete functional block map labeled conceptual; analog block not merely gates; no fabricated floorplan.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Package/die/functional blocks reviewed as conceptual; U3 origin explicitly uses an ATmega328P example with different USB-controller capacities. Package screenshot and scoped-origin test pass.

### TASK-017 — Implement logic and memory scenes

- Phase: 8.
- Status: DONE.
- Requirement IDs: CONTENT-022, CONTENT-023, CONTENT-024, FUNC-012.
- Dependencies: TASK-016.
- Acceptance criteria: NOT/AND/OR/NAND truth tables and input-driven transistor explanations; SRAM/flash/EEPROM distinctions; general memory cell labels.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Logic-input/output browser checks and source/copy audit cover NOT/AND/OR/NAND, registers and general SRAM/flash/EEPROM distinctions.

### TASK-018 — Implement general MOSFET scene and board comparison

- Phase: 8.
- Status: DONE.
- Requirement IDs: CONTENT-025, CONTENT-026, FUNC-013.
- Dependencies: TASK-017.
- Acceptance criteria: Gate/source/drain/body/dielectric/channel controls and field explanation; illustrative N-channel model contrasted explicitly with sourced P-channel T1 behavior.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Gate-controlled N-channel illustration and separate P-channel T1 source-relative explanation checked; field arrows corrected. MOSFET axe and journey checks pass.

### TASK-019 — Implement semiconductor, material and lattice scenes

- Phase: 8.
- Status: DONE.
- Requirement IDs: CONTENT-011, CONTENT-027, CONTENT-028, CONTENT-029, CONTENT-030, FUNC-014.
- Dependencies: TASK-018.
- Acceptance criteria: Intrinsic/doped silicon, carriers/junction/bands and materials categories; verified board applicability; no globally charged doped blocks.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Material navigation and intrinsic/doping/lattice/junction explanations reviewed; eight scoped entries, source references and no globally charged doped blocks.

### TASK-020 — Implement atoms, electrons and LED photon scenes

- Phase: 9.
- Status: DONE.
- Requirement IDs: CONTENT-012, CONTENT-031, CONTENT-032, CONTENT-033, CONTENT-034, CONTENT-035, CONTENT-036, CONTENT-040.
- Dependencies: TASK-019.
- Acceptance criteria: Conceptual clouds, charge/current/drift versus signals, photon mechanism/energy; sourced/null scales and static text equivalents.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Atomic clouds, nucleus/charge/current/drift, independent recombination/photon path and conserved-electron explanation pass reviewed content and browser journeys.

### TASK-021 — Implement causal signal journeys

- Phase: 10.
- Status: DONE.
- Requirement IDs: CONTENT-037, FUNC-015, UX-005.
- Dependencies: TASK-011, TASK-020.
- Acceptance criteria: USB/external power/upload/LED/ADC plus clock/reset flows; separate control/parallel/return edges; pause/step/restart and truthful L buffer path.
- Files likely affected: src application modules, tests, docs/electronics/signal-paths.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: All seven causal signal journeys step to final events, restart and play/pause; control/power/data/parallel/return relationships reviewed and timer lifecycle tests pass.

### TASK-022 — Implement accessible pin reference

- Phase: 11.
- Status: DONE.
- Requirement IDs: CONTENT-038.
- Dependencies: TASK-010.
- Acceptance criteria: Reviewed header/port/peripheral mappings, PWM/interrupt/UART/SPI/I2C/power notes; reserved/duplicate pins explicit; readable mobile table.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Complete reviewed DIP/header/ICSP mapping, PWM and duplicate SDA/SCL contacts pass content tests and searchable pin-reference browser checks.

### TASK-023 — Implement sourced quiz

- Phase: 12.
- Status: DONE.
- Requirement IDs: FUNC-016, FUNC-017.
- Dependencies: TASK-020, TASK-022.
- Acceptance criteria: 10-15 questions span all requested areas; one-score-per-answer; immediate explanations, final score and retry; keyboard and touch.
- Files likely affected: src application modules, tests and relevant canonical documents.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Twelve sourced questions, answer-required behavior, mistakes/explanations, one-score-per-answer, final score 11/12 and retry pass browser and state checks.

### TASK-024 — Audit accessibility across complete experience

- Phase: 13.
- Status: DONE.
- Requirement IDs: ACC-002, ACC-003, ACC-004, ACC-006, ACC-008, ACC-009.
- Dependencies: TASK-014, TASK-021, TASK-023.
- Acceptance criteria: Manual keyboard/screen-reader, focus, live feedback, touch alternatives, contrast, reduced motion and zoom checks recorded; failures fixed.
- Files likely affected: src application modules, tests, TESTING.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Keyboard completion, modal restoration, live feedback, desktop/mobile axe scans, 44 px compact controls and native Chromium 200% tab zoom pass. Screen-reader/physical-device checks recorded unavailable in TESTING.

### TASK-025 — Audit scientific and hardware content

- Phase: 14.
- Status: DONE.
- Requirement IDs: RESEARCH-002, RESEARCH-006.
- Dependencies: TASK-024.
- Acceptance criteria: Every board claim scoped/cited; no clone mixing; no invented internals/scales; branch and software-to-physical journeys verified.
- Files likely affected: src application modules, tests, SOURCES.md, RESEARCH.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Critical baseline identities/topology, source applicability, all required original learning areas and conceptual/null scale boundaries audited; Zod/reference tests pass. Production discrepancies remain bounded.

### TASK-026 — Check animation, performance and responsive layouts

- Phase: 15.
- Status: DONE.
- Requirement IDs: ACC-007, PERF-001, PERF-002, PERF-003, PERF-004.
- Dependencies: TASK-025.
- Acceptance criteria: Offscreen/hidden/inactive motion stops; no runaway frames/layout thrashing; phone/tablet/laptop/desktop checks pass.
- Files likely affected: src application modules, tests, TESTING.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Eight viewport/theme screenshots and six object-state screenshots inspected and replayable baselines established. One teaching timer stops under hidden/offscreen/inactive/paused/reduced lifecycle signals; no page overflow.

### TASK-027 — Run final teaching-site QA and handoff

- Phase: 16.
- Status: DONE.
- Requirement IDs: UX-004, TECH-002, QA-001, QA-002, QA-003, QA-004.
- Dependencies: TASK-026.
- Acceptance criteria: All modes work from local HTTP static export without required internet/storage; no console errors/dead controls; three required beginner paths work; docs/status updated.
- Files likely affected: src application modules, tests, TESTING.md, HANDOFF.md, CHANGELOG.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Local HTTP export, both required main learner paths plus passive branches, documentation and no required remote assets pass browser checks. No console/page errors in the monitored acceptance path; type/lint/unit/export/memory checks pass. Limitations retained in TESTING.

### TASK-028 — Implement required light and dark themes

- Phase: 16.
- Status: DONE.
- Requirement IDs: UX-006.
- Dependencies: TASK-008.
- Acceptance criteria: Full theme tokens have measured contrast; interactions and scenes remain readable; toggle works without storage.
- Files likely affected: src application modules, tests, DESIGN.md.
- Notes: Application acceptance recorded on 2026-10-08; see TESTING for checks and limits.
- Acceptance evidence: Default light and dark switching, no storage dependence, both-theme axe contrast and eight responsive screenshots pass.

