# Durable project context

## What and why

A single-page educational website bridges everyday Arduino interactions and underlying physical causes. Readers should understand both composition and operation at each meaningful level. The original prompts are preserved in [website brief](docs/briefs/website-specification.txt) and [foundation brief](docs/briefs/project-foundation-specification.txt).

## Current constraints

- The approved [redesign brief](docs/briefs/redesign-specification.txt) and DEC-009 supersede single-file/no-framework delivery for the new application.
- Next.js static export, React, strict TypeScript, Tailwind, bundled Geist; npm lockfile; local HTTP delivery. No required runtime internet, content fetch, accounts or persistent storage.
- Root index.html retains the foundation guide and direct-file behavior. Contributor material is accessible through a safe build-time /project/ route.
- NASA-inspired editorial hierarchy, warm light default, dark alternative, a dominant CAD-derived board viewer, progressive inspector and explicit Zoom inside.
- Main reference remains official socketed ATmega328P Uno Rev3; exact design baseline in [inventory](COMPONENT_INVENTORY.md).
- Plain English, defined jargon, causal explanations, labeled simplifications and no invented facts or citations.

## Core conceptual structure

Software/information is level 0, not a physical size. The guided path has levels 1-13: board, PCB, component families, package, die, blocks, circuits, MOSFET, semiconductor structures, materials/crystals, atoms, electrons/nuclei, optional subatomic bonus. A functional block is an organizational abstraction, not necessarily a separately nested object. Branch navigation therefore forms a graph rather than a universal single chain.

Microcontroller: package -> die -> digital/analog circuits -> gates/memory/analog elements -> semiconductor structures. LED: package -> junction -> carriers -> photons. Resistor: resistive material -> scattering -> heat. Capacitor: electrodes/dielectric -> field -> energy. Copper trace: metallic structure -> mobile carriers.

## Evidence boundaries

The official manual and schematic disagree on some named components. A discrepancy does not establish a manufacturing change. Exact package interior, die floorplan, memory-cell geometry, transistor count, process node, solder alloy, LED compound, and ferrite suffix remain unknown unless specific evidence is obtained. General construction must remain labeled general.

## Consistency

Separate categories for materials, components, and systems. Use [terminology](docs/product/terminology.md) for beginner language, [sources](SOURCES.md) for source identity, and [decisions](DECISIONS.md) for accepted choices. Evidence, numerical precision, and visual representation have independent fields. Do not assign an aggregate verified label to unsupported subclaims.
