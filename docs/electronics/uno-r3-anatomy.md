# Uno Rev3 anatomy

The canonical [inventory](../../COMPONENT_INVENTORY.md) is the socketed UNO-TH_Rev3e design, not a procurement BOM for every physical Uno. It accounts for all CAD elements and preserves package origins, rotations, source IDs and production uncertainty.

## System view

ZU4 executes the user program. U3 handles USB-to-UART bridge firmware. Each has its own clock and programming header. U1 derives +5V from VIN; U2 derives +3V3 from +5V. U5A and T1 govern the USB-to-5V connection, while U5B buffers the built-in L LED. RESET pulls the main reset net low. Headers expose power and GPIO nets. These functions share the PCB conductors and return paths, rather than forming one serial chain. Sources: [SRC-001, SRC-002](../../SOURCES.md).

## Teaching decomposition

Start with assembled board and category/subsystem filters. Expose major connectors, chips, clocks, power/protection, LEDs and reset first; group repetitive bypass capacitors only if their differing roles remain visible. Network units are not separate physical packages. Keep test pads, cuttable jumpers, fiducials and mounting holes as PCB features. JP2 is an unpopulated footprint; FRAME1 is CAD metadata.

Materials, parts and systems are different levels: copper is a material; an inductor is a part; analog supply filtering is a subsystem role. Clicking a part leads to its physically appropriate branch. A resistor never enters an IC-die path just because both sit on the same board.

## Evidence limitations

Exact board composition, solder alloy, plating, and proprietary chip internals are not established. Current-manual differences are in [RESEARCH](../../RESEARCH.md). Main teaching illustrations remain visibly layout-faithful/conceptual as appropriate. Retain the title and revision of each source if the board reference changes.
