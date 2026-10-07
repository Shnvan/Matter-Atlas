# Educational content model

## Every meaningful object

Provide identity/category/location; plain purpose; technical mechanism; composition; what happens if absent; bounded analogy; analogy limitation; next zoom options; sources; evidence status; and representation label. Use the [inventory](COMPONENT_INVENTORY.md) for identities and [terminology](docs/product/terminology.md) for definitions.

## Depth

| Depth | Reader sees | Example |
| --- | --- | --- |
| Beginner | Short purpose, made of, cause/effect, key limitation | A MOSFET gate creates an electric field that changes conduction. |
| Intermediate | Term definitions, relevant circuit paths, conditions | Distinguish gate-source voltage and N-channel/P-channel behavior. |
| Deep dive | Supported technical specs, equations with assumptions, sources | Datasheet conditions for an on-resistance value, without treating it as a board current limit. |

Keep beginner content visible first. Deeper content is explicit expansion, not mandatory prerequisites. Analogies assist a real explanation; never substitute an analogy for mechanism.

## Truth dimensions

Evidence: verified / inference / unverified. Precision: exact / approximate / unavailable. Representation: layout-faithful / conceptual / simplified. A general verified MOSFET explanation with a simplified drawing does not verify ATmega device geometry. Record provenance at claim/spec level, not merely on the parent card.

Scale is nullable. Include units, measurement meaning, source, and conditions for any number. Software and organizational blocks use no physical scale. Do not interpolate unknown sizes along a logarithmic indicator.

## Branches and cross-links

Separate MCU, LED, resistor, capacitor, conductor, connector, clock, ferrite, fuse, switch, and solder branches. Connect branches through shared material and electrical concepts without implying universal containment. Every zoom node links to an electrical explanation and to its originating selection. Recap is a clickable graph of the same data.

## Copy review

Use short English paragraphs and define jargon at first use. Explain mechanism before analogy. Distinguish board-specific facts from general construction. Label conceptual diagrams in the scene itself and its text alternative. Do not assign exact solder, LED, plastic, plating, or dielectric compositions to the Uno without board-specific evidence.

Initial content examples and open research are in [electronics](docs/electronics/uno-r3-anatomy.md), [semiconductors](docs/physics/semiconductor.md), and [learning objectives](docs/product/learning-objectives.md).
