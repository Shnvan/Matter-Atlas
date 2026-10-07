# Materials, composition and roles

Materials must be labeled element/compound/mixture and conductor/semiconductor/insulator-dielectric/magnetic/piezoelectric/structural-polymer as appropriate. These roles are distinct from component category and circuit subsystem. A material can have multiple roles.

## Initial teaching map

| Material/model | Composition kind | Role and mechanism | Applicability / source |
| --- | --- | --- | --- |
| Silicon | Element | Semiconductor; carrier states and doping | General MCU/semiconductor explanation, not exact foundry stack; SRC-018. |
| Copper conductor | Element | Metallic bonding/conduction | General trace/metal teaching; CAD proves copper routing intent but exact alloy/finish remains bounded; SRC-002, SRC-020. |
| Glass/epoxy FR-4 | Mixture/composite | Insulating structural support | General PCB model; Uno procurement formulation not verified; SRC-029. |
| Ferrite | Compound/ceramic family | Magnetic high-frequency losses | BLM21-family general model; exact mixture unknown; SRC-016. |
| Polymer/carbon PTC | Mixture | Temperature-dependent conducting network | General Multifuse mechanism; exact recipe unknown; SRC-013. |
| Ceramic dielectric | Material family | Polarization/field behavior | General capacitor model; no exact Uno compound; SRC-021. |
| Quartz / piezoelectric ceramic | Compound / material family | Electrical-mechanical resonance | General clock models; exact Y1 crystal supplier/Y2 formulation unspecified; SRC-017. |
| Solder / contact plating / housings | Unspecified | Joining / conductive contact / insulation | No exact composition claim; RES-003. |

Sources resolve in [SOURCES](../../SOURCES.md). Do not add gold/nickel/tin/aluminium/silver/zinc/iron to an “actually present on every Uno” periodic map merely because they are common in electronics.

## Crystal comparison

Silicon's covalent structure, metallic mobile electron states, and dielectric tightly bound conduction behavior differ through atomic composition, bonding, structure and available energy states. “Sea of electrons” is a simplified metal analogy with quantum/band limitations; it is not a literal liquid. [SRC-018, SRC-020](../../SOURCES.md)

## Next work

Verify any specific material before linking it to a board feature. A conceptual material map can contain general examples, but label applicability prominently. Quantitative lattice constants/atom dimensions remain null until verified.
