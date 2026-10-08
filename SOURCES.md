# Canonical sources

Accessed 2026-10-08 (Asia/Manila). URLs were retrieved or opened during foundation research. A resolving URL alone is not verification of every claim; evidence locations and applicability below bound their use. Stable IDs never change when page numbering changes. The later website generates numbered citations in this order. Paraphrase; do not reproduce source documents wholesale.

[Research findings](RESEARCH.md) · [Hardware inventory](COMPONENT_INVENTORY.md)

## SRC-001 — UNO-TH_Rev3e schematic

- Organization/author: Arduino.
- Type: schematic.
- URL: [UNO-TH_Rev3e schematic](https://docs.arduino.cc/resources/schematics/A000066-schematics.pdf)
- Evidence location/document identity: Sheet 1 circuit symbols and net labels; title block UNO-TH_Rev3e, printed 06/03/19 12:33. Two-page PDF includes license.
- Claims supported and limits: Baseline identities, values, pin/net connectivity, buffer/power circuits. SHA-256: 2c1041200352485393108e03c5117a07d4ea03954654485526c2c56cd01f7a42. Does not establish exact production BOM.
- Access date: 2026-10-08.

## SRC-002 — A000066 CAD files

- Organization/author: Arduino.
- Type: EAGLE schematic/board archive.
- URL: [A000066 CAD files](https://docs.arduino.cc/static/6bb7a3ca51ebee82a252f60c0b418787/A000066-cad-files.zip)
- Evidence location/document identity: UNO-TH_Rev3e.brd: drawing/board/elements, signals/contactref, packages; .sch: parts/devices/nets.
- Claims supported and limits: 116 board elements, positions, package footprints, connectivity and board features. Archive SHA-256: 532b306cb153846eafc0ca9fe991d7a4dfa0c52dcefafa2efeaebf4b845ec820. Linked by official hardware page; package names are design library identifiers, not guaranteed supplier part numbers.
- Access date: 2026-10-08.

## SRC-003 — UNO R3 hardware documentation

- Organization/author: Arduino.
- Type: product documentation.
- URL: [UNO R3 hardware documentation](https://docs.arduino.cc/hardware/uno-rev3/)
- Evidence location/document identity: Features and downloadable resources.
- Claims supported and limits: Socketed ATmega328P reference, 14 digital I/O, 6 analog inputs, 16 MHz ceramic resonator.
- Access date: 2026-10-08.

## SRC-004 — Arduino UNO R3 User Manual A000066

- Organization/author: Arduino.
- Type: manual PDF.
- URL: [Arduino UNO R3 User Manual A000066](https://docs.arduino.cc/resources/datasheets/A000066-datasheet.pdf)
- Evidence location/document identity: English Board Topology table, section 3.1, printed page 7; accessed file 27 pages.
- Claims supported and limits: Manual reports SPX1117, CGRA4007-G, LMV358LIST-A.9 and ECS-160-20-4X-DU; F1 described as capacitor. Conflicts with schematic; do not use table as unqualified BOM.
- Access date: 2026-10-08.

## SRC-005 — UNO R3 Full Pinout

- Organization/author: Arduino.
- Type: pinout PDF.
- URL: [UNO R3 Full Pinout](https://docs.arduino.cc/resources/pinouts/A000066-full-pinout.pdf)
- Evidence location/document identity: Top-view pin labels and port/function callouts; last update label 6 Oct 2022.
- Claims supported and limits: Header roles, PWM/serial/interrupt mapping, supply notes. Board guidance must be distinguished from MCU absolute maximum ratings.
- Access date: 2026-10-08.

## SRC-006 — ATmega328P product documentation

- Organization/author: Microchip.
- Type: manufacturer product page and linked datasheets.
- URL: [ATmega328P product documentation](https://www.microchip.com/en-us/product/ATMEGA328P)
- Evidence location/document identity: Overview; ATmega48A/PA/88A/PA/168A/PA/328/P datasheet link.
- Claims supported and limits: 32 KB flash, 2 KB SRAM, 1 KB EEPROM, AVR peripherals. Package-specific ADC count must use datasheet; generic page lists 32-pin capabilities.
- Access date: 2026-10-08.

## SRC-007 — ATmega8U2/16U2/32U2 complete datasheet

- Organization/author: Microchip / Atmel.
- Type: manufacturer datasheet.
- URL: [ATmega8U2/16U2/32U2 complete datasheet](https://ww1.microchip.com/downloads/en/DeviceDoc/doc7799.pdf)
- Evidence location/document identity: Features, pin configuration, block diagram, USB controller and clock sections.
- Claims supported and limits: USB-capable ATmega16U2, 16 KB flash and 512-byte SRAM/EEPROM. Manufacturer document 7799; use fetched revision before claiming revision-specific details.
- Access date: 2026-10-08.

## SRC-008 — FDN340P datasheet

- Organization/author: onsemi.
- Type: manufacturer datasheet.
- URL: [FDN340P datasheet](https://www.onsemi.com/download/data-sheet/pdf/fdn340p-d.pdf)
- Evidence location/document identity: Page 1 general description, pin/marking diagrams and ratings.
- Claims supported and limits: P-channel logic-level MOSFET and manufacturer pin numbering. Rated current is not the board's usable supply current.
- Access date: 2026-10-08.

## SRC-009 — LMV358 product information

- Organization/author: Texas Instruments.
- Type: manufacturer product page/datasheet.
- URL: [LMV358 product information](https://www.ti.com/product/LMV358)
- Evidence location/document identity: Description and linked LMV3xx datasheet.
- Claims supported and limits: Dual operational amplifier; Uno uses one section for source-selection comparison and one as L LED buffer (topology from schematic).
- Access date: 2026-10-08.

## SRC-010 — LP2985 product information

- Organization/author: Texas Instruments.
- Type: manufacturer product page/datasheet.
- URL: [LP2985 product information](https://www.ti.com/product/LP2985)
- Evidence location/document identity: Description and ordering variants.
- Claims supported and limits: Low-dropout regulator family; board's LP2985-33DBVR identity from CAD/schematic. Device current capability does not supersede board 3.3 V guidance.
- Access date: 2026-10-08.

## SRC-011 — NCP1117 datasheet

- Organization/author: onsemi.
- Type: manufacturer datasheet.
- URL: [NCP1117 datasheet](https://www.onsemi.com/download/data-sheet/pdf/ncp1117-d.pdf)
- Evidence location/document identity: Description and fixed output versions/ordering information.
- Claims supported and limits: Regulator family including 5 V version; board current depends on input voltage, heat dissipation, and loads.
- Access date: 2026-10-08.

## SRC-012 — MF-MSMF Series PTC Resettable Fuses

- Organization/author: Bourns.
- Type: manufacturer datasheet.
- URL: [MF-MSMF Series PTC Resettable Fuses](https://www.bourns.com/docs/product-datasheets/mf-msmf.pdf)
- Evidence location/document identity: Electrical Characteristics and Thermal Derating tables, MF-MSMF050 row.
- Claims supported and limits: 0.50 A hold and 1.00 A trip at stated 23 C conditions; time/temperature dependent protection, not an instantaneous 500 mA cutoff.
- Access date: 2026-10-08.

## SRC-013 — Multifuse Products short form

- Organization/author: Bourns.
- Type: manufacturer technical guide.
- URL: [Multifuse Products short form](https://www.bourns.com/docs/technical-documents/technical-library/multifuse-pptc-resettable-fuses/publications/bourns_mf_ptc_short_form.pdf)
- Evidence location/document identity: How the polymer PTC device works / PTC response characteristic.
- Claims supported and limits: General polymer/carbon conductive network and heating-dependent resistance; does not establish proprietary recipe of the board's part.
- Access date: 2026-10-08.

## SRC-014 — CG0603MLC-05E / -12E ChipGuard ESD Protectors

- Organization/author: Bourns.
- Type: manufacturer datasheet.
- URL: [CG0603MLC-05E / -12E ChipGuard ESD Protectors](https://www.bourns.com/docs/Product-Datasheets/cg0603mlc-05e_cg0603mlc-12e.pdf)
- Evidence location/document identity: General Information / Electrical Characteristics / How to Order; REV E 07/20 printed.
- Claims supported and limits: Bidirectional low-capacitance ESD protector identity; connected as shunts, not series power devices.
- Access date: 2026-10-08.

## SRC-015 — ChipGuard CG0603MLC-05E / -12E product page

- Organization/author: Bourns.
- Type: manufacturer product page.
- URL: [ChipGuard CG0603MLC-05E / -12E product page](https://bourns.com/products/circuit-protection/details/chipguardesdsuppressorsaecq200qualifiedforautomotiveapplications/cg0603mlc-05e-cg0603mlc-12e-automotive)
- Evidence location/document identity: Specifications: Technology.
- Claims supported and limits: Thin Film Polymer technology; do not call these semiconductor diodes or ceramic varistors merely because the EAGLE library is named varistor.
- Access date: 2026-10-08.

## SRC-016 — Basics of Noise Countermeasures, Lesson 4: Chip ferrite beads

- Organization/author: Murata.
- Type: manufacturer educational article.
- URL: [Basics of Noise Countermeasures, Lesson 4: Chip ferrite beads](https://article.murata.com/en-us/article/basics-of-noise-countermeasures-lesson-4)
- Evidence location/document identity: Typical structure and impedance frequency characteristics.
- Claims supported and limits: General ferrite/coil construction and high-frequency losses. BLM21 suffix and ferrite composition remain unknown.
- Access date: 2026-10-08.

## SRC-017 — Basic Knowledge: Ceramic Resonators (CERALOCK)

- Organization/author: Murata.
- Type: manufacturer educational documentation.
- URL: [Basic Knowledge: Ceramic Resonators (CERALOCK)](https://www.murata.com/en-us/products/timingdevice/ceralock/overview/basic/)
- Evidence location/document identity: Overview and oscillation principle.
- Claims supported and limits: General piezoelectric ceramic resonator operation. Does not independently establish exact Y2 internal capacitance/specification.
- Access date: 2026-10-08.

## SRC-018 — Semiconductors and Doping, University Physics Vol. 3 §9.6

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Semiconductors and Doping, University Physics Vol. 3 §9.6](https://openstax.org/books/university-physics-volume-3/pages/9-6-semiconductors-and-doping)
- Evidence location/document identity: Intrinsic/extrinsic semiconductor and n/p type explanation.
- Claims supported and limits: General silicon band/carrier/dopant concepts. Not a source for the exact Uno fabrication process.
- Access date: 2026-10-08.

## SRC-019 — Semiconductor Devices, University Physics Vol. 3 §9.7

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Semiconductor Devices, University Physics Vol. 3 §9.7](https://openstax.org/books/university-physics-volume-3/pages/9-7-semiconductor-devices)
- Evidence location/document identity: p-n junction and device explanations.
- Claims supported and limits: General junction, depletion/bias and LED mechanisms; exact Uno LED compounds are unspecified.
- Access date: 2026-10-08.

## SRC-020 — Model of Conduction in Metals, University Physics Vol. 2 §9.2

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Model of Conduction in Metals, University Physics Vol. 2 §9.2](https://openstax.org/books/university-physics-volume-2/pages/9-2-model-of-conduction-in-metals)
- Evidence location/document identity: Drift velocity and conduction model.
- Claims supported and limits: General current, drift and scattering; no specific Uno signal speed or resistance-film recipe.
- Access date: 2026-10-08.

## SRC-021 — Capacitors and Capacitance, University Physics Vol. 2 §8.1

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Capacitors and Capacitance, University Physics Vol. 2 §8.1](https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance)
- Evidence location/document identity: Capacitance and conductor/dielectric structure.
- Claims supported and limits: Separated electrode charge and capacitance; distinguish field energy and dielectric polarization from charge stored inside dielectric.
- Access date: 2026-10-08.

## SRC-022 — The Hydrogen Atom, University Physics Vol. 3 §8.1

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [The Hydrogen Atom, University Physics Vol. 3 §8.1](https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom)
- Evidence location/document identity: Wave functions and probability distributions.
- Claims supported and limits: Quantum probability clouds. Hydrogen solutions are not exact multi-electron silicon/copper orbital images.
- Access date: 2026-10-08.

## SRC-023 — Photoelectric Effect, University Physics Vol. 3 §6.2

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Photoelectric Effect, University Physics Vol. 3 §6.2](https://openstax.org/books/university-physics-volume-3/pages/6-2-photoelectric-effect)
- Evidence location/document identity: Photon energy/frequency relation.
- Claims supported and limits: E = hf, general photon energy; no exact LED wavelength.
- Access date: 2026-10-08.

## SRC-024 — The Standard Model

- Organization/author: CERN.
- Type: research organization educational page.
- URL: [The Standard Model](https://home.cern/science/physics/standard-model/)
- Evidence location/document identity: Matter particles and forces/carrier particles.
- Claims supported and limits: Electrons, quarks, photons/gluons in Standard Model; optional beyond-electronics context. Do not imply the model includes gravity.
- Access date: 2026-10-08.

## SRC-025 — Ready to transform the enterprise world? We are!

- Organization/author: Arduino Team.
- Type: official historical/context blog article, 2022-06-07.
- URL: [Arduino origins and open-source philosophy](https://blog.arduino.cc/2022/06/07/ready-to-transform-the-enterprise-world-we-are/)
- Evidence location/document identity: Paragraphs describing Interaction Design Institute Ivrea, novice prototyping audience and open-source philosophy.
- Claims supported and limits: Beginner/prototyping origins and accessibility/open-source motivations. No claim about current company leadership or funding. Exact founder chronology/name story needs separate evidence. Legacy AboutUs redirects to a missing page; this replacement was opened through web research. Direct automated HTTP returned 403.
- Access date: 2026-10-08.

## SRC-026 — The Untold History of Arduino

- Organization/author: Hernando Barragan.
- Type: first-person historical account.
- URL: [The Untold History of Arduino](https://arduinohistory.github.io/)
- Evidence location/document identity: Wiring at IDII, Processing relationship and Arduino development account.
- Claims supported and limits: Participant's perspective on Wiring lineage. Attribute disputed interpretations; not a neutral adjudication of credit.
- Access date: 2026-10-08.

## SRC-027 — Sketch build process

- Organization/author: Arduino.
- Type: official developer documentation.
- URL: [Sketch build process](https://docs.arduino.cc/arduino-cli/sketch-build-process)
- Evidence location/document identity: Overview, preprocessing, compilation and upload.
- Claims supported and limits: AVR build chain to program image; source code is information processed by tools before upload.
- Access date: 2026-10-08.

## SRC-028 — ArduinoCore-avr standard pin definitions

- Organization/author: Arduino.
- Type: official source code.
- URL: [ArduinoCore-avr standard pin definitions](https://github.com/arduino/ArduinoCore-avr/blob/master/variants/standard/pins_arduino.h)
- Evidence location/document identity: digital_pin_to_port/bit_mask/timer tables and LED_BUILTIN.
- Claims supported and limits: Arduino logical pin mappings, PWM timers, standard variant. Reverify exact core version when explaining compiler output.
- Access date: 2026-10-08.

## SRC-029 — Signal Acquisition and Conditioning Seminar, Section 2

- Organization/author: Texas Instruments.
- Type: manufacturer technical seminar PDF.
- URL: [Signal Acquisition and Conditioning Seminar, Section 2](https://www.ti.com/lit/ml/slap082/slap082.pdf)
- Evidence location/document identity: PCB materials discussion: FR4 epoxy-glass.
- Claims supported and limits: General FR-4 construction; does not prove substrate formulation, thickness, finish, or solder alloy on every Uno.
- Access date: 2026-10-08.

## SRC-030 — CD1206-S01575 Switching Chip Diode

- Organization/author: Bourns.
- Type: manufacturer archived datasheet.
- URL: [CD1206-S01575 Switching Chip Diode](https://www.bourns.com/docs/technical-documents/obsolete-parts/cd1206_s01575_obsolete.pdf)
- Evidence location/document identity: Device title and switching diode electrical characteristics.
- Claims supported and limits: General device identity for D2/D3; board reset clamp topology from schematic.
- Access date: 2026-10-08.

## SRC-031 — Design Considerations for Logic Products

- Organization/author: Texas Instruments.
- Type: manufacturer application report.
- URL: [Design Considerations for Logic Products](https://www.ti.com/lit/an/sdya018/sdya018.pdf)
- Evidence location/document identity: CMOS inverter circuit and logic-state discussion.
- Claims supported and limits: General CMOS complementary pull-up/pull-down logic; not exact ATmega gate layout.
- Access date: 2026-10-08.

## SRC-032 — Assembly and Packaging Key Technologies

- Organization/author: Microchip.
- Type: manufacturer technology overview.
- URL: [Assembly and Packaging Key Technologies](https://www.microchip.com/en-us/products/services/advanced-packaging/key-technologies)
- Evidence location/document identity: Wire bond / flip chip / packaged part options.
- Claims supported and limits: General package connections vary; no exact ATmega328P cross-section or wire alloy established.
- Access date: 2026-10-08.

## SRC-033 — ArduinoCore-avr 1.8.6 standard variant

- Organization/author: Arduino.
- Type: versioned official source code.
- URL: [Version 1.8.6 standard pins](https://raw.githubusercontent.com/arduino/ArduinoCore-avr/1.8.6/variants/standard/pins_arduino.h)
- Evidence location/document identity: Tag 1.8.6; NUM_ANALOG_INPUTS, PWM/interrupt macros, port/bit/timer tables and DIP diagram; cross-checked with SRC-001/SRC-002/SRC-005 for ATmega328P board/package mapping.
- Claims supported and limits: Arduino logical aliases, six exposed ADC channels, six PWM pins, dedicated interrupts D2/D3. A6/A7 constants do not establish physical pins on the 28-pin Uno. Not a claim that 1.8.6 is the newest core.
- Access date: 2026-10-08.

## SRC-034 — One board to rule them all: History of the Arduino UNO

- Organization/author: Arduino Team.
- Type: official retrospective, 2021-12-09.
- URL: [History of the Arduino UNO](https://blog.arduino.cc/2021/12/09/one-board-to-rule-them-all-history-of-the-arduino-uno/)
- Evidence location/document identity: Rise of the Techno-Hippies; Taking Shape; Ten Thousand and UNO; The Day of the UNO.
- Claims supported and limits: Uno means one; culmination of earlier boards, 2010 New York launch and education/usability motivation. Retrospective participant accounts are attributed; no exhaustive adjudication of historical credit.
- Access date: 2026-10-08.

## SRC-035 — Dinner is Ready

- Organization/author: Massimo Banzi / Arduino.
- Type: contemporary announcement, 2010-09-24.
- URL: [Dinner is Ready](https://blog.arduino.cc/2010/09/24/dinner-is-ready/)
- Evidence location/document identity: Opening announcement and branding/communication section.
- Claims supported and limits: Announced unveiling at Maker Faire NYC on 25 September 2010; corroborates launch context without assuming every detail applies to Rev3.
- Access date: 2026-10-08.



## SRC-036 — Atomic Structure and Symbolism

- Organization/author: OpenStax / Rice University.
- Type: academic textbook section.
- URL: [Chemistry 2e, section 2.3](https://openstax.org/books/chemistry-2e/pages/2-3-atomic-structure-and-symbolism)
- Evidence location/document identity: Nuclear structure, particle charges, atomic number, neutrality, and linked periodic table.
- Claims supported and limits: General atomic identity and charge; not literal planetary trajectories or a board-specific atomic image.
- Access date: 2026-10-08.

## SRC-037 — Structure and Materials of Ceramic Capacitors

- Organization/author: Murata.
- Type: manufacturer technical FAQ.
- URL: [Ceramic capacitor structure](https://www.murata.com/support/faqs/capacitor/ceramiccapacitor/conf/0001)
- Evidence location/document identity: Multilayer capacitor structure diagram and dielectric/electrode explanation.
- Claims supported and limits: General alternating electrode and ceramic dielectric model; no attribution of exact Uno capacitor construction or chemistry.
- Access date: 2026-10-08.

## SRC-038 — Dielectric Materials in Capacitors

- Organization/author: TDK.
- Type: manufacturer educational article.
- URL: [Electronics ABC: capacitor dielectric materials](https://www.tdk.com/en/tech-mag/electronics_primer/9)
- Evidence location/document identity: Electrolytic capacitor types and oxide-film dielectric explanation.
- Claims supported and limits: General electrolytic construction and material families; does not establish Uno component procurement or composition.
- Access date: 2026-10-08.

## SRC-039 — What is an FPGA?

- Organization/author: Microchip Developer Help.
- Type: manufacturer educational article.
- URL: [FPGA memory technology overview](https://developerhelp.microchip.com/xwiki/bin/view/products/fpga/hello-fpga/what-is/)
- Evidence location/document identity: SRAM-based and Flash-based technology sections, floating-gate MOS transistor explanation.
- Claims supported and limits: General volatile SRAM and nonvolatile floating-gate flash concepts. FPGA examples do not establish exact ATmega328P memory cell layout or process.
- Access date: 2026-10-08.

## SRC-040 — Oral History of Massimo Banzi

- Organization/author: Computer History Museum / Massimo Banzi.
- Type: recorded participant oral-history transcript.
- URL: [Banzi oral history](https://archive.computerhistory.org/resources/access/text/2016/03/102740131-05-01-acc.pdf)
- Evidence location/document identity: CHM Ref X7483.2015, printed pages 11–12; first-person account of early-2005 workshops and naming Arduino after Bar Di Re Arduino in Ivrea.
- Claims supported and limits: Attributed recollection of the Arduino name and teaching context; not independent confirmation of every recalled date or a resolution of competing historical credit accounts.
- Access date: 2026-10-08.
