# Requirements and traceability

The preserved [website brief](docs/briefs/website-specification.txt) is mapped by section number §0-§20; the [foundation brief](docs/briefs/project-foundation-specification.txt) maps by named responsibility. Priorities: must = required; optional = enhancement. Status: planned / review / satisfied. Foundation review does not satisfy unimplemented website behavior. Hardware inventory requirements can be satisfied independently of UI rendering.

| ID | Description | Priority | Verification method | Status | Original specification mapping | Implementation task |
| --- | --- | --- | --- | --- | --- | --- |
| CONTENT-001 | Explain six modes and illustration/scale limitations. | must | Source and educational-copy review | satisfied | §0 | TASK-008 |
| CONTENT-002 | Write 300-500 word history with verified origins, key people, Wiring/Processing lineage, accessibility, open source and bootloader motivations. | must | Source and educational-copy review | satisfied | §1 | TASK-010 |
| CONTENT-003 | Add sourced timeline, early boards, Uno significance and meanings/naming with disputed stories attributed. | must | Source and educational-copy review | satisfied | §1 | TASK-010 |
| CONTENT-004 | Inventory all meaningful components and subsystems against official schematic/CAD; distinguish fitted parts, units and groups. | must | Source and educational-copy review | satisfied | §2 | TASK-002 |
| CONTENT-005 | Each component exposes identity, category, location, SVG, purpose, technical mechanism, supported specs, absence, bounded analogy, composition, operating principle, zoom and sources. | must | Source and educational-copy review | satisfied | §2 | TASK-012 |
| CONTENT-006 | Keep PCB/component/material/system categories distinct and clone variations separately labeled. | must | Source and educational-copy review | satisfied | §2 / accuracy rules | TASK-010 |
| CONTENT-007 | Explain general FR-4 glass/epoxy and trace/pad/via/plated-hole/plane structures. | must | Source and educational-copy review | satisfied | §3 | TASK-010 |
| CONTENT-008 | Explain mask, silkscreen, surface finish, solder, surface/through-hole mounting, wire versus trace and pad versus via/through-hole. | must | Source and educational-copy review | satisfied | §3 | TASK-010 |
| CONTENT-009 | Resistor branch covers construction, material bounds, terminals/substrate, limiting/division/pull-up and heat. | must | Source and educational-copy review | satisfied | §4A | TASK-010 |
| CONTENT-010 | Capacitor branch covers electrodes/dielectric, ceramic/electrolytic construction, field/energy, decoupling/smoothing/timing. | must | Source and educational-copy review | satisfied | §4B | TASK-010 |
| CONTENT-011 | Diode branch covers p/n junction, depletion and forward/reverse bias. | must | Source and educational-copy review | satisfied | §4C | TASK-019 |
| CONTENT-012 | LED branch covers package/die/junction/carriers/photon emission and composition-dependent color with no guessed compounds. | must | Source and educational-copy review | satisfied | §4D | TASK-020 |
| CONTENT-013 | Distinguish ceramic resonator and quartz crystal; explain piezoelectricity and mechanical/electrical resonance. | must | Source and educational-copy review | satisfied | §4E | TASK-010 |
| CONTENT-014 | Polyfuse branch uses verified general construction, heating/resistance and cooling/reset; conditional ratings. | must | Source and educational-copy review | satisfied | §4F | TASK-010 |
| CONTENT-015 | Ferrite branch explains magnetic ceramic/high-frequency impedance/DC behavior without guessing exact L1 chemistry. | must | Source and educational-copy review | satisfied | §4G | TASK-010 |
| CONTENT-016 | Connector branch covers metal contacts, possible plating and insulation with board-specific uncertainty. | must | Source and educational-copy review | satisfied | §4H | TASK-010 |
| CONTENT-017 | Pushbutton branch explains contacts, mechanism, open/closed circuit without exact unsupported internals. | must | Source and educational-copy review | satisfied | §4I | TASK-010 |
| CONTENT-018 | Solder branch avoids exact alloy claim until board-production evidence exists. | must | Source and educational-copy review | satisfied | §4J | TASK-010 |
| CONTENT-019 | ATmega package branch distinguishes enclosure/die, general mould/leadframe/leads/connections/die attach with package-variation labels. | must | Source and educational-copy review | satisfied | §5 | TASK-016 |
| CONTENT-020 | Conceptual die includes CPU, flash, SRAM, EEPROM, GPIO, timers/PWM, ADC, UART, SPI, TWI, interrupts, reset, clocks and support/power. | must | Source and educational-copy review | satisfied | §6 | TASK-016 |
| CONTENT-021 | Trace functional blocks to digital/analog circuits, gates/registers/memory/transistors/interconnects without fabricated floorplan. | must | Source and educational-copy review | satisfied | §6 | TASK-016 |
| CONTENT-022 | Explain complementary CMOS with input voltage -> device state -> output for NOT, AND, OR and NAND. | must | Source and educational-copy review | satisfied | §7 | TASK-017 |
| CONTENT-023 | Explain gates -> registers/flip-flops -> counters -> arithmetic/control -> CPU; instructions are encoded information. | must | Source and educational-copy review | satisfied | §7 | TASK-017 |
| CONTENT-024 | Distinguish volatile SRAM, nonvolatile flash and EEPROM; label undocumented ATmega cell implementations as general concepts. | must | Source and educational-copy review | satisfied | §8 | TASK-017 |
| CONTENT-025 | MOSFET scene identifies source/drain/gate/body/dielectric/channel/interconnect and electric-field-controlled conduction. | must | Source and educational-copy review | satisfied | §9 | TASK-018 |
| CONTENT-026 | Explain no mechanical switch inside MOSFET; include verified P-channel board device separately from general N-channel model. | must | Source and educational-copy review | satisfied | §9 | TASK-018 |
| CONTENT-027 | Explain silicon crystal, covalent bonds/valence, intrinsic/thermal carriers, doping/donors/acceptors, n/p and holes. | must | Source and educational-copy review | satisfied | §10 | TASK-019 |
| CONTENT-028 | Explain junction/depletion/electric fields/simplified bands with boron/phosphorus examples; pure silicon already semiconductor. | must | Source and educational-copy review | satisfied | §10 | TASK-019 |
| CONTENT-029 | Materials map classifies element/compound/mixture, role, board applicability and usefulness without assuming every listed material exists on every Uno. | must | Source and educational-copy review | satisfied | §11 | TASK-019 |
| CONTENT-030 | Compare silicon covalent lattice, metal/mobile electrons and dielectric through bonding/structure/available energy states; label sea analogy. | must | Source and educational-copy review | satisfied | §12 | TASK-019 |
| CONTENT-031 | Atom shows nucleus/electrons/cloud; explain charges, atomic number and neutrality with relevant element examples. | must | Source and educational-copy review | satisfied | §13 | TASK-020 |
| CONTENT-032 | Historical Bohr diagram if used has visible nonliteral planetary-orbit limitation. | must | Source and educational-copy review | satisfied | §13 | TASK-020 |
| CONTENT-033 | Electrical layer accessible at every zoom node explains charge/voltage/current/field/resistance/capacitance. | must | Source and educational-copy review | satisfied | §14 | TASK-020 |
| CONTENT-034 | Distinguish slow net drift from propagation; no unsourced speed percentage, consumed electrons or charge disappearance. | must | Source and educational-copy review | satisfied | §14 | TASK-020 |
| CONTENT-035 | Explain LED electrical energy -> recombination -> photons and frequency/energy/color; intensity alone does not set composition-defined color. | must | Source and educational-copy review | satisfied | §15 | TASK-020 |
| CONTENT-036 | Explain nucleus/protons/neutrons; optional beyond-electronics bonus marks quarks/gluons and Standard Model boundaries. | must | Source and educational-copy review | satisfied | §16 | TASK-020 |
| CONTENT-037 | Document USB, external power, upload, built-in LED and ADC causal journeys with actual topology and return paths. | must | Source and educational-copy review | satisfied | §17 | TASK-021 |
| CONTENT-038 | Pin table includes board/Arduino/MCU functions, digital/analog/PWM/interrupt/serial/power and notes verified against official sources. | must | Source and educational-copy review | satisfied | §18 | TASK-022 |
| CONTENT-039 | Clickable master recap includes full MCU path and parallel LED/resistor/capacitor/copper paths. | must | Source and educational-copy review | satisfied | §19 | TASK-015 |
| CONTENT-040 | Limits section covers simplified scales/atoms/current conventions/holes, mixed analog-digital die, proprietary geometry and quantum rigor. | must | Source and educational-copy review | satisfied | §20 | TASK-020 |
| FUNC-001 | Select board part by click/Enter and open details. | must | Manual behavior/content audit | satisfied | Explore | TASK-011 |
| FUNC-002 | Highlight part on hover/focus and synchronize list selection. | must | Manual behavior/content audit | satisfied | Explore | TASK-011 |
| FUNC-003 | Search and filter by category with clear-filter/empty-state recovery. | must | Manual behavior/content audit | satisfied | Explore | TASK-011 |
| FUNC-004 | Explode components with leader lines and reassemble view. | must | Manual behavior/content audit | satisfied | Explode | TASK-013 |
| FUNC-005 | Drag part to correct slot using Pointer Events and proximity snapping. | must | Manual behavior/content audit | satisfied | Assemble | TASK-014 |
| FUNC-006 | Wrong drop restores origin; pointer cancellation restores consistent state. | must | Manual behavior/content audit | satisfied | Assemble | TASK-014 |
| FUNC-007 | Hints, reset, progress and completion work. | must | Manual behavior/content audit | satisfied | Assemble | TASK-014 |
| FUNC-008 | Select and place parts by keyboard/tap without dragging. | must | Manual behavior/content audit | satisfied | Assemble | TASK-014 |
| FUNC-009 | Enter component-specific branch and return to originating component. | must | Manual behavior/content audit | satisfied | Zoom | TASK-015 |
| FUNC-010 | Offer previous/next, hierarchy position and graph branch choices at every node. | must | Manual behavior/content audit | satisfied | Zoom | TASK-015 |
| FUNC-011 | Show supported scales and meaningful logarithmic indicator only for measured physical dimensions. | must | Manual behavior/content audit | satisfied | Zoom | TASK-015 |
| FUNC-012 | Interactively toggle logic gate inputs and see explanatory output/device states. | must | Manual behavior/content audit | satisfied | §7 | TASK-017 |
| FUNC-013 | Control MOSFET gate and see carrier/channel/current explanatory changes. | must | Manual behavior/content audit | satisfied | §9 | TASK-018 |
| FUNC-014 | Interact with the periodic/material map. | must | Manual behavior/content audit | satisfied | §11 | TASK-019 |
| FUNC-015 | Run/pause/step/restart signal journeys with text equivalent. | must | Manual behavior/content audit | satisfied | Signal | TASK-021 |
| FUNC-016 | Quiz has 10-15 questions, immediate explanations, final score and retry. | must | Manual behavior/content audit | satisfied | Quiz | TASK-023 |
| FUNC-017 | Quiz scores each question once; retry clears answers. | must | Manual behavior/content audit | satisfied | Quiz | TASK-023 |
| FUNC-018 | Recap nodes navigate corresponding scene/branch. | must | Manual behavior/content audit | satisfied | §19 | TASK-015 |
| FUNC-019 | Provide an optional interactive PCB layer diagram. | optional | Keyboard/pointer layer and text checks | planned | §3 optional | TASK-030 |
| UX-001 | First-time help describes navigation and modes briefly. | must | Manual behavior/content audit | satisfied | §0 | TASK-008 |
| UX-002 | Desktop detail region and mobile bottom sheet expose the same content. | must | Manual behavior/content audit | satisfied | Explore / responsive | TASK-012 |
| UX-003 | Beginner/intermediate/deep dive progressively disclose information. | must | Manual behavior/content audit | satisfied | Content model | TASK-012 |
| UX-004 | Errors have explanatory message and working recovery; no dead controls or placeholder content in delivered feature. | must | Manual behavior/content audit | satisfied | Process / output | TASK-027 |
| UX-005 | Teacher can directly select scenes and pause explanations; learner progress is visible. | must | Manual behavior/content audit | satisfied | UX | TASK-021 |
| ACC-001 | Semantic page structure, names, headings, focus visibility and logical order. | must | Manual behavior/content audit | satisfied | Design accessibility | TASK-008 |
| ACC-002 | All actions are keyboard usable, including board exploration and assembly. | must | Manual behavior/content audit | satisfied | Accessibility | TASK-024 |
| ACC-003 | Pointer Events support mouse/touch/pen; controls are touch-friendly. | must | Manual behavior/content audit | satisfied | Stack / board modes | TASK-024 |
| ACC-004 | SVG/Canvas scenes have equivalent descriptions and nonvisual controls. | must | Manual behavior/content audit | satisfied | Accessibility | TASK-024 |
| ACC-005 | Mobile dialog contains/restores focus and has explicit close/Escape behavior. | must | Manual behavior/content audit | satisfied | Details | TASK-012 |
| ACC-006 | Live announcements explain placement/quiz outcomes without animation chatter. | must | Manual behavior/content audit | satisfied | Accessibility | TASK-024 |
| ACC-007 | Reduced motion and pause preserve meaning; no essential interaction requires motion. | must | Manual behavior/content audit | satisfied | Accessibility / performance | TASK-026 |
| ACC-008 | Measure WCAG AA text/control contrast and check 200% zoom/readability. | must | Manual behavior/content audit | satisfied | Accessibility | TASK-024 |
| ACC-009 | Zoom slider/quiz have native semantics, labels and accessible value/feedback. | must | Manual behavior/content audit | satisfied | Accessibility | TASK-024 |
| PERF-001 | Animations stop offscreen, inactive, document-hidden, paused or reduced-motion. | must | Manual behavior/content audit | satisfied | Performance | TASK-026 |
| PERF-002 | Single animation coordinator avoids runaway requestAnimationFrame and unnecessary global listeners. | must | Manual behavior/content audit | satisfied | Performance | TASK-026 |
| PERF-003 | Avoid layout thrashing and excessive SVG DOM; use practical event delegation. | must | Manual behavior/content audit | satisfied | Performance | TASK-026 |
| PERF-004 | No horizontal page overflow at phone/tablet/laptop/desktop sizes. | must | Manual behavior/content audit | satisfied | Responsive | TASK-026 |
| TECH-001 | Next.js static export, strict TypeScript, React and bundled assets; preserve original file-URL guide. | must | Type/build/offline export checks | satisfied | Redesign §16; supersedes original tech stack via DEC-009 | TASK-008 |
| TECH-002 | Core export works over local HTTP without required internet assets or localStorage. | must | Offline browser requests audit | satisfied | Redesign migration; DEC-009 | TASK-027 |
| TECH-003 | Use structured components/zoomLevels/sources/quizQuestions before rendering repeated UI. | must | Manual behavior/content audit | satisfied | Data model | TASK-010 |
| TECH-004 | Stable unique SVG group IDs, category/labels/tab behavior/slot coordinates and tooltip metadata. | must | Manual behavior/content audit | satisfied | SVG requirements | TASK-009 |
| TECH-005 | Freeze compatible dependency versions in npm lockfile after installation and build checks. | must | Lockfile/build audit | satisfied | Redesign §16; DEC-009 | TASK-008 |
| RESEARCH-001 | Verify board claims using official/manufacturer sources; keep uncertainty explicit. | must | Manual behavior/content audit | satisfied | Research rules | TASK-002 |
| RESEARCH-002 | Never fabricate identities/parts/specs/nodes/counts/dimensions/compositions/history/URLs/citations. | must | Manual behavior/content audit | satisfied | Accuracy rules | TASK-025 |
| RESEARCH-003 | Scope main anatomy to official socketed Rev3 and label differences without clone contamination. | must | Manual behavior/content audit | satisfied | Target board | TASK-002 |
| RESEARCH-004 | Keep source IDs canonical and render numbered bibliography including title/organization/type/URL. | must | Manual behavior/content audit | satisfied | Sources requirements | TASK-010 |
| RESEARCH-005 | Separate evidence, numerical precision, and representation labels. | must | Manual behavior/content audit | satisfied | Research / models | TASK-003 |
| RESEARCH-006 | Paraphrase sources with exact claim applicability and evidence location. | must | Manual behavior/content audit | satisfied | Research rules | TASK-025 |
| QA-001 | No console errors, duplicate IDs, invalid SVG references or dead controls. | must | Manual behavior/content audit | satisfied | QA software | TASK-027 |
| QA-002 | Manual keyboard/touch/reduced-motion/response checks and source-reference checks recorded. | must | Manual behavior/content audit | satisfied | QA software | TASK-027 |
| QA-003 | Beginner can traverse Uno -> ATmega -> die -> CPU -> logic -> MOSFET -> silicon -> atom -> electron with explanations. | must | Manual behavior/content audit | satisfied | Final test | TASK-027 |
| QA-004 | Learner can follow LED -> junction -> recombination -> photon and resistor -> material -> scattering -> heat without transistor misconception. | must | Manual behavior/content audit | satisfied | Final test | TASK-027 |
| QA-005 | Guide links and file URL layouts at 360/768/1440 are checked; actual unavailable tests recorded. | must | Manual behavior/content audit | satisfied | Foundation validation | TASK-006 |
| FOUND-001 | Populate all requested documentation with useful initial content and preserve original briefs. | must | Foundation document/validator/manual audit | satisfied | Foundation structure | TASK-001 |
| FOUND-002 | Keep stable operating manual, source hierarchy and canonical owners. | must | Foundation document/validator/manual audit | satisfied | AGENTS / context | TASK-001 |
| FOUND-003 | Reconcile all schematic/CAD entries with locations, roles, quantities, sources, status and notes. | must | Foundation document/validator/manual audit | satisfied | Inventory | TASK-002 |
| FOUND-004 | Define eight schemas with types, requiredness, meanings, examples and rules. | must | Foundation document/validator/manual audit | satisfied | Data model | TASK-003 |
| FOUND-005 | Document design/UX/accessibility, topic research, terminology, measurable objectives and six learner journeys. | must | Foundation document/validator/manual audit | satisfied | Topic structure | TASK-004 |
| FOUND-006 | Maintain numbered requirements and dependency-aware phased tasks with acceptance/file/status notes. | must | Foundation document/validator/manual audit | satisfied | Requirements / tasks | TASK-006 |
| FOUND-007 | Provide offline guide reflecting foundation status without unfinished controls. | must | Foundation document/validator/manual audit | satisfied | Approved milestone | TASK-005 |
| FOUND-008 | Validator checks files/content/links/IDs/references/dependencies/cycles/inventory/handoff/status honesty. | must | Foundation document/validator/manual audit | satisfied | Validation | TASK-006 |
| FOUND-009 | Update handoff, testing, decisions and changelog after substantial work. | must | Foundation document/validator/manual audit | satisfied | AI workflow | TASK-006 |
| FOUND-010 | Future features remain planned until their own acceptance checks pass. | must | Foundation document/validator/manual audit | satisfied | Definition of done | TASK-006 |

All requirements map to one owning task in [TASKS](TASKS.md); task dependencies supply the sequence. The optional particle expansion is detailed by TASK-029; the required nucleus explanation remains in TASK-020. Foundation statuses move to satisfied only after recorded acceptance.


## Redesign additions

Original IDs remain stable. Revised technology rows explicitly supersede the original delivery constraint; all original scientific and accessibility obligations continue.

| ID | Requirement | Priority | Verification | Status | Original mapping | Owner task |
| --- | --- | --- | --- | --- | --- | --- |
| TECH-006 | Contributor routes use an explicit build-time allowlist, safe Markdown rendering, translated internal links and raw downloads. | must | Route and link browser tests | satisfied | Redesign documentation separation | TASK-008 |
| UX-006 | Warm light default and warm dark theme preserve contrast and interaction state without persistent storage. | must | Both-theme contrast/screenshots | satisfied | Redesign §5–6; DEC-010 | TASK-028 |
| UX-007 | Board dominates entry; responsive shell uses specified desktop dimensions and tablet/mobile drawers or sheets. | must | 360/768/1024/1440 screenshots and keyboard | satisfied | Redesign workspace | TASK-008 |
