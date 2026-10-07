# PCB and assembly structures

## General construction model

A printed circuit board mechanically supports parts and connects them with patterned conductors. FR-4 is a glass/epoxy material class: woven glass reinforces epoxy resin. Teach that construction as a general model; no exact Uno substrate formulation or stack dimensions have been verified. [SRC-029](../../SOURCES.md)

A wire is a separate conductor; a trace is a patterned board conductor. A pad is a connection land; a via transfers a net between copper layers; a plated through-hole can connect/mount a lead and also connect layers. A mounting hole need not be plated or electrically connected. Solder mask covers selected copper; silkscreen/legend provides identification. Surface finish protects exposed lands and supports assembly, but the actual finish/alloy must not be guessed.

## Verified design geometry

The CAD has top/bottom routed copper and +5V/GND polygons, pad/SMD lands, vias, stop and legend layers, mounting holes, test pads and FD1-FD3 fiducials. Through-hole connector/MCU and surface-mount footprints coexist. Counts and positions live only in the [inventory](../../COMPONENT_INVENTORY.md). A copper polygon's drawn boundary does not prove an uninterrupted production plane. [SRC-002](../../SOURCES.md)

## Assembly and layer-view design

A future layer diagram can toggle legend, mask, top copper, general substrate and bottom copper. Mark the cross-section conceptual and omit unsupported thickness. Text alternatives explain each layer. Through-hole and surface mounting compare how leads/lands connect; solder joins metals electrically and mechanically without a verified exact alloy claim. The assembly game places educational part groups and excludes pads/fiducials/DNP entries.

## Review bounds

Surface finish, exact mask chemistry, solder alloy and board plating composition remain RES-003. Generic layer names are educational definitions, not a laboratory analysis of this board. See [materials](../physics/materials.md).
