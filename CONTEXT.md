# Durable project context

## What and why

A single-page educational website bridges everyday Arduino interactions and underlying physical causes. Readers should understand both composition and operation at each meaningful level. The original prompts are preserved in [website brief](docs/briefs/website-specification.txt) and [foundation brief](docs/briefs/project-foundation-specification.txt).

## Locked constraints

- Single self-contained `index.html`: HTML5, CSS3, vanilla ES6+, inline SVG board, SVG/Canvas microscopic scenes, Pointer Events, IntersectionObserver, reduced motion.
- Opening the final HTML directly must work; no required fetch, server, build system, npm, framework, external imagery, font, or storage.
- Main reference: official socketed ATmega328P Uno Rev3; exact design baseline in [inventory](COMPONENT_INVENTORY.md).
- Plain English, jargon defined on first use, cause-and-effect explanations, labeled simplifications, no invented facts or sources.
- Foundation milestone completes the documentation and guide before substantial application code.

## Core conceptual structure

Software/information is level 0, not a physical size. The guided path has levels 1-13: board, PCB, component families, package, die, blocks, circuits, MOSFET, semiconductor structures, materials/crystals, atoms, electrons/nuclei, optional subatomic bonus. A functional block is an organizational abstraction, not necessarily a separately nested object. Branch navigation therefore forms a graph rather than a universal single chain.

Microcontroller: package -> die -> digital/analog circuits -> gates/memory/analog elements -> semiconductor structures. LED: package -> junction -> carriers -> photons. Resistor: resistive material -> scattering -> heat. Capacitor: electrodes/dielectric -> field -> energy. Copper trace: metallic structure -> mobile carriers.

## Evidence boundaries

The official manual and schematic disagree on some named components. A discrepancy does not establish a manufacturing change. Exact package interior, die floorplan, memory-cell geometry, transistor count, process node, solder alloy, LED compound, and ferrite suffix remain unknown unless specific evidence is obtained. General construction must remain labeled general.

## Consistency

Separate categories for materials, components, and systems. Use [terminology](docs/product/terminology.md) for beginner language, [sources](SOURCES.md) for source identity, and [decisions](DECISIONS.md) for accepted choices. Evidence, numerical precision, and visual representation have independent fields. Do not assign an aggregate verified label to unsupported subclaims.
