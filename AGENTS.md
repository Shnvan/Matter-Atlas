# Agent operating manual

## Mission and scope

Build **Inside the Arduino Uno: From Board to Electron**, an accurate, accessible educational experience for beginners. Every meaningful object answers what it is made of and how it works. The current milestone implements the six educational modes in a NASA-inspired scientific workspace on the verified foundation. TASKS records actual completion; the archived offline guide remains recoverable.

Non-goals: hardware simulation with engineering accuracy, programming an attached board, cloud services, accounts, exhaustive proprietary chip reconstruction, and clone-board anatomy in the main reference.

## Start here

1. Read this file, [HANDOFF](HANDOFF.md), and [TASKS](TASKS.md).
2. Read [PROJECT](PROJECT.md), [CONTEXT](CONTEXT.md), and the relevant requirements.
3. Read accepted [DECISIONS](DECISIONS.md), architecture, data model, and relevant research documents.
4. Inspect the actual implementation before choosing one task.
5. Verify uncertainty, implement within scope, check acceptance, update documentation, and write the handoff.

## Source of truth

In a conflict use: verified official/manufacturer evidence; [REQUIREMENTS](REQUIREMENTS.md); accepted decisions; architecture/data model; implementation; tasks; handoff; conversational assumptions. Scientific explanations use verified academic evidence. A newer document alone does not establish a hardware revision. Record conflicting sources in [RESEARCH](RESEARCH.md), then correct affected documents explicitly.

Canonical owners: hardware identity and board locations in [COMPONENT_INVENTORY](COMPONENT_INVENTORY.md); bibliography in [SOURCES](SOURCES.md); definitions in [terminology](docs/product/terminology.md); requirements in REQUIREMENTS; decisions in DECISIONS; execution status in TASKS. Topic explanations link to these owners. The original briefs in `docs/briefs/` are preserved provenance, not an additional mutable specification.

## Engineering conventions

The application uses Next.js static export, React, strict TypeScript, Tailwind, locally bundled Geist, typed/Zod-validated content and Zustand shared interaction state. Use npm and the committed lockfile. Serve the export over local HTTP; root index.html remains the historical file-URL guide. No required internet assets, runtime content fetches, analytics, accounts, hosting or persistent-storage-dependent core behavior. DEC-009 supersedes the original single-file/no-build constraint.

Separate shell, viewer, navigator, inspector, toolbar, educational scenes, assembly, signals, quiz and citations. Use SVG/2.5D first; do not initialize WebGL without an accepted educational need. Keep high-frequency camera/pointer values in refs and one animation coordinator. React escapes learner text; contributor Markdown uses safe rendering from a build-time allowlist. Never interpret user input as HTML.
Keep CSS colors in custom properties and repeated content in structured data. Do not replace accepted assumptions or make broad refactors without recording a new decision. Do not introduce a control without implemented behavior and acceptance checks.

## Research and citations

**When uncertain, verify before implementing.** Use official Arduino schematic/CAD/pinout, original manufacturer documentation, then verified academic references. Inspect circuit connections visually and in the CAD netlist; text extraction alone can omit values. Preserve source title, URL, document identity, access date, claim location, and supported scope. Use stable `SRC-###` references; the later page generates numbered citations from them.

Never invent component names or part numbers, specifications, manufacturing nodes, die sizes, transistor counts, compositions, measurements, citations, quotes, or URLs. Never silently substitute clones, R4, or another package. Distinguish the documented design from every physical production board. Never silently promote an inference to a verified fact.

## Educational truth

Track evidence, numerical precision, and representation separately. Label conceptual die maps, general package interiors, memory models, microscopic animations, and historical analogies. Components follow their physically appropriate branches. Resistors and capacitors do not all reduce to transistors. Pure silicon is a semiconductor before doping. Doped material is approximately electrically neutral; holes are effective carriers. No planetary electron trajectories, consumed electrons, or electron drift presented as signal speed. Software is information, with no assigned physical scale. Unsupported dimensions are null, not guessed.

## Accessibility and verification

Follow [ACCESSIBILITY](ACCESSIBILITY.md) and [TESTING](TESTING.md). All actions need keyboard access; dragging needs select/place alternatives. Keep visible focus, text alternatives, logical focus restoration, touch targets, AA contrast, and reduced-motion support. Canvas is supplemental to readable descriptions. Pause animation offscreen and when inactive or hidden.

Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-foundation.ps1` after documentation changes. Run relevant browser checks for UI changes. A static validator cannot establish scientific correctness, screen-reader usability, or real-device touch behavior. Record what ran, what passed, and what remains untested.

## Completion and handoff

A task is DONE only when its acceptance evidence exists. Feature completion additionally requires verified content, resolving citations, working keyboard/touch alternatives, reduced motion, responsive checks, no introduced console errors, and updated documentation. Never mark unimplemented features done.

After every substantial session update TASKS, relevant research/decisions, meaningful CHANGELOG entries, and every required HANDOFF heading. Keep handoff current and short. Important discoveries must survive in the repository. Avoid parallel edits to canonical files; if multiple contributors work, assign bounded tasks and one integration owner.

## Repository skills

Use the narrow [UI art direction](.agents/skills/ui-art-direction/SKILL.md), [Arduino fact verification](.agents/skills/arduino-fact-verification/SKILL.md), and [frontend quality gate](.agents/skills/frontend-quality-gate/SKILL.md) workflows when their described work applies. Maintain the living execution plan in [.agent/PLANS.md](.agent/PLANS.md). DESIGN and UX remain canonical; skills link rather than duplicate policy.
