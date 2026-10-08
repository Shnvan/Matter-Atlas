import type { Topic } from "./types";

export const historyParagraphs = [
  "Arduino belongs to a tradition of helping people make interactive things without first becoming electronics specialists. Its early context was teaching at the Interaction Design Institute Ivrea in Italy. Affordable hardware and approachable software lowered the cost and expertise needed for classroom experimentation. A useful history therefore includes both the board and the software environment: easy uploads, approachable commands, examples and shared designs let a beginner test an idea and see a physical response.",
  "Hernando Barragán describes starting Wiring in 2003 as an Ivrea thesis, supervised by Massimo Banzi and Casey Reas. His account identifies Processing as an important software influence and describes a 2004 Wiring board. Wiring combined an editor, toolchain, microcontroller framework, bootloader and open hardware documentation. This is an attributed participant account; the exhibit does not settle every later disagreement about credit.",
  "In his Computer History Museum oral history, Massimo Banzi recalls preparing teaching boards in early 2005 and choosing the name Arduino after Bar Di Re Arduino in Ivrea. This is his first-person recollection, rather than an independently reconstructed naming date.",
  "The bootloader matters because a program already stored in the microcontroller can accept a new program over a communication link. Coupled with integrated build tools, this reduces the equipment and procedural steps between an idea and a running sketch. Open source makes designs and code available to inspect, adapt and discuss under their licenses. That openness supports teaching, but it does not make all chips internally documented.",
  "Arduino’s official retrospective describes earlier serial boards and the 2007 Diecimila, whose name means ten thousand. It credits repeated classroom and workshop experience with changes such as automatic reset and automatic power selection. Massimo Banzi and David Cuartielles describe these usability decisions; Giorgio Olivero is credited with developing the visual identity. The goal was to reduce small obstacles that repeatedly interrupted learners.",
  "The timeline reaches Uno in 2010. A 24 September Arduino announcement advertised the next day’s unveiling at Maker Faire New York. Uno means one in Italian and marked a new stage for Arduino; it was not its first board. The Uno brought an established shape and connector arrangement together with changes in the USB interface and presentation.",
  "This exhibit uses the published socketed Uno Rev3 schematic and CAD as its reference. It distinguishes that design from earlier boards, later Arduino families and undocumented manufacturing substitutions. History explains why the platform became approachable; the board, circuit and material journeys explain how its physical parts make those experiences possible.",
];

export const additionalTopics: Topic[] = [
  {
    id: "pcb-construction",
    title: "The board is a component too",
    kicker: "PCB & assembly",
    summary: "Patterned conductors meet an insulating mechanical structure.",
    paragraphs: [
      "A trace is a patterned board conductor; a wire is a separate conductor. A pad is a connection land. A via links copper layers, while a plated through-hole can also receive a component lead. The four mounting holes do not imply four electrical connections.",
      "The CAD distinguishes top and bottom copper, pads, vias, legend and solder-mask openings. Solder mask protects selected copper; the silkscreen or legend labels parts and pins. Copper polygons form distributed connections, but their outlines alone do not prove uninterrupted finished planes.",
      "FR-4 glass reinforcement in epoxy is a general substrate model. Through-hole parts put leads through holes; surface-mount parts meet lands on the surface. Solder provides mechanical and electrical joints. Surface finishes protect exposed copper and help assembly. Exact Uno laminate, mask, plating, finish and solder-alloy recipes are unverified.",
    ],
    sourceRefs: ["SRC-002", "SRC-029"],
  },
  {
    id: "passive-construction",
    title: "Resistors, capacitors and contacts",
    kicker: "Inside ordinary parts",
    summary: "Useful branches that do not pass through a CPU or transistor.",
    paragraphs: [
      "A general film resistor has a resistive region on a supporting substrate, joined to terminals. Other constructions exist; the actual Uno films are unspecified. Resistors limit current, divide voltage and pull a node toward a known level. Dissipation warms the material without consuming charge.",
      "A ceramic capacitor model alternates conductive electrodes and ceramic dielectric. A general electrolytic model uses a thin oxide dielectric and an electrolyte-related counter-electrode system; polarity matters. These are family models, not verified cross-sections of the fitted Uno capacitors. Opposite electrode charges establish stored field energy.",
      "Decoupling capacitors make short local supply/return paths for changing currents. Larger rail capacitors buffer slower supply changes. A resistor-capacitor combination creates a characteristic time response: on the Uno, C5 couples a DTR change into reset rather than acting as a series DC power stage.",
      "Headers and connectors use conductive contacts supported by insulation. Plating may improve contact behavior, but no particular alloy or polymer is assigned here. A pushbutton mechanically closes contacts while pressed and opens them on release. The reset button changes execution state; it does not erase flash.",
    ],
    sourceRefs: [
      "SRC-001",
      "SRC-020",
      "SRC-021",
      "SRC-032",
      "SRC-037",
      "SRC-038",
    ],
  },
  {
    id: "package-construction",
    title: "Package, die and connections",
    kicker: "Microcontroller anatomy",
    summary: "The visible package protects a much smaller working structure.",
    paragraphs: [
      "A general leaded molded package can include a protective molded body, a leadframe, external leads, die attach and internal connections such as bond wires. Other packaging technologies use different structures. This is an explanatory model, not a measured cutaway of the ATmega328P.",
      "The silicon die carries devices and interconnect. The surrounding package supports it, protects it and routes connections out to the board. The socket is another separate physical object that grips the package leads. Exact bond metals, die dimensions, attachment materials and fabrication node are not established.",
      "The functional die map includes CPU, flash, SRAM, EEPROM, GPIO, timers/PWM, ADC, UART, SPI, TWI, interrupts, reset, clocks and power support. It includes both analog and digital functions. Block size and location in this exhibit indicate neither silicon area nor physical placement.",
    ],
    sourceRefs: ["SRC-006", "SRC-032"],
  },
  {
    id: "cmos-computation",
    title: "From switches to computation",
    kicker: "Logic & state",
    summary:
      "Logic functions combine with stored state to execute instructions.",
    paragraphs: [
      "In a conceptual CMOS inverter, a P-channel pull-up and N-channel pull-down respond to one input. A low input enables the pull-up and disables the pull-down, producing a high output; a high input reverses those roles. During transitions there are non-ideal currents and delays.",
      "Complementary networks also implement NAND. Series N-channel paths pull its output low only when both inputs are high; its complementary pull-up handles the other cases. AND can be formed by inverting NAND; OR has its own complementary implementation. A truth table specifies behavior, not the exact transistor layout in this AVR.",
      "Feedback and clock-controlled circuits can retain a bit. Flip-flops and latches form registers; registers and logic can form counters, arithmetic circuits and controllers. A CPU coordinates these functions to interpret encoded instructions. A source-code statement may become several instructions and need many clock cycles.",
    ],
    sourceRefs: ["SRC-031", "SRC-006", "SRC-027"],
  },
  {
    id: "semiconductor-structure",
    title: "Bonding, bands and carriers",
    kicker: "Materials physics",
    summary:
      "A solid behaves collectively, beyond a drawing of individual atoms.",
    paragraphs: [
      "Silicon has four valence electrons and forms a covalently bonded crystal. In an intrinsic semiconductor, thermal excitation can produce mobile electrons and holes. A simplified band diagram groups allowed electronic energies into bands separated by a gap; it is an energy model, not a set of physical shelves.",
      "Phosphorus is a donor example and boron an acceptor example in silicon. Doping changes carrier populations while the bulk remains approximately neutral. At a p–n junction, diffusion and the resulting electric field form a depletion region. Forward and reverse bias change transport differently.",
      "In a metal, available electronic states permit mobile carriers. The electron-sea analogy is useful but is not literal fluid between hard atomic balls. A dielectric responds mainly through bound-charge polarization in ordinary conditions. Bonding, structure and available states help explain these different electrical roles.",
    ],
    sourceRefs: ["SRC-018", "SRC-019", "SRC-020", "SRC-021"],
  },
  {
    id: "atoms-nucleus",
    title: "What the atom model means",
    kicker: "Atoms & charge",
    summary:
      "Charge and atomic identity remain distinct from a planetary picture.",
    paragraphs: [
      "A nucleus contains positively charged protons and electrically neutral neutrons. Electrons carry negative charge. Atomic number counts protons: boron has 5, silicon 14, phosphorus 15 and copper 29. A neutral atom has as many electrons as protons; ions have a different electron count.",
      "A probability cloud describes where an electron may be detected in a quantum state. It is not a path traced by a tiny planet. A simple hydrogen cloud is only a teaching example; many-electron silicon states and collective states in a solid are more complex.",
      "The nucleus is not a tiny copy of the board. Protons and neutrons are composite particles; electrons have no known smaller constituents in the Standard Model. Detailed subatomic exploration is optional and outside the electronic mechanisms shown here.",
    ],
    sourceRefs: ["SRC-022", "SRC-024", "SRC-036"],
  },
  {
    id: "timing-protection",
    title: "Resonance and protection",
    kicker: "Clock & power",
    summary: "Different mechanisms support reliable operation.",
    paragraphs: [
      "A quartz crystal and a ceramic resonator both couple mechanical strain and electrical behavior through piezoelectricity. They are different material and package families. The MCU oscillator circuit sustains timing; the resonant part is not a complete powered clock by itself.",
      "A ferrite bead contains a conductive path and magnetic ceramic material. At low frequency its conductive path can have low resistance; impedance and loss vary with frequency. Exact behavior needs the full part specification, which is unavailable for the schematic’s abbreviated BLM21 identity. L1 links USB shield and USB ground; it is not the VBUS fuse.",
      "A polymer PTC contains a conductive network whose resistance increases as fault heating changes its structure. After fault removal and cooling it can recover. The hold rating depends on test conditions; it is not an instantaneous universal cutoff. ESD shunts, reset clamps and the PTC protect against different disturbances.",
    ],
    sourceRefs: ["SRC-001", "SRC-012", "SRC-013", "SRC-016", "SRC-017"],
  },
];
