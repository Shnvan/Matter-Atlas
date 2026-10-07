# Component-family branches

## Resistors and capacitors

A resistor limits current, divides voltage or biases a signal; it dissipates energy as heat. Resistance comes from carrier interactions with the material, not electron consumption. Typical film/substrate/terminal illustrations are general; Uno resistor film compositions are unknown. [SRC-020](../../SOURCES.md)

A capacitor has conductors separated by dielectric. Opposite charge on electrodes produces an electric field; the dielectric polarizes and stores field energy rather than serving as a bucket of free charge. Ceramic and electrolytic construction are different general models. Board bypass, bulk smoothing, AREF filtering and auto-reset timing examples must use the actual nets. [SRC-021](../../SOURCES.md)

## Diode and LED

Teach p/n junction, depletion, forward/reverse bias as simplified semiconductor models. LEDs emit photons through carrier recombination; exact compound/color recipe for the reference LEDs is unknown. Reset switching diodes and barrel rectifier perform different circuit roles. [SRC-019, SRC-030](../../SOURCES.md)

## Clocks, fuse and ferrite

Quartz crystal and ceramic resonator are different piezoelectric resonant elements. Avoid teaching a resonator as a powered oscillator module. [SRC-017](../../SOURCES.md)

Polymer PTC fuse: a general conductive polymer/carbon network has low resistance when cool. Fault heating increases resistance sharply; fault removal and sufficient cooling allow reset, with residual trip-state current possible. Ratings depend on time/temperature; a hold value is not a fixed immediate cutoff. [SRC-012, SRC-013](../../SOURCES.md)

Ferrite beads combine conductive path and magnetic material with frequency-dependent impedance/loss. Their noise-suppression function differs from the separate L2 supply inductor. Uno L1 family suffix/chemistry and L2 core are unknown. [SRC-016](../../SOURCES.md)

## Mechanical connections and solder

Connector teaching shows contacts, optional plating and insulating housing; no particular metals/polymer are asserted for the Uno connectors. A pushbutton closes metal contacts temporarily; general mechanism diagrams are labeled general. Solder is board-assembly joining material, with alloy unspecified. Keep the branches separate from IC/transistor hierarchy and link them to [materials](../physics/materials.md).
