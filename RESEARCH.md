# Research notebook

## Method and evidence

Research date: 2026-10-08. Official Arduino A000066 documentation, schematic and linked CAD were read; the schematic was rendered and visually inspected. EAGLE XML elements, packages and contactrefs were reconciled. Manufacturer documentation verifies device families and mechanisms. Academic sources support general physics. [SOURCES](SOURCES.md) owns bibliography and evidence locations; [inventory](COMPONENT_INVENTORY.md) owns identities/coordinates.

VERIFIED FACT means source-supported within its stated scope. EDUCATIONAL SIMPLIFICATION describes a teaching model. INFERENCE means an interpretation not directly established by a source. UNVERIFIED means evidence is unavailable or insufficient. Precision and representation are separate dimensions, not substitutes for evidence.

## Questions, searches, and findings

| Question / search terms | Sources consulted | Finding and confidence | Classification / remaining work |
| --- | --- | --- | --- |
| Arduino UNO R3 A000066 official schematic CAD | SRC-001, SRC-002, SRC-003 | UNO-TH_Rev3e files; socketed ZU4 and U3; complete 116-element board register. High. | Verified design. Production procurement unknown. |
| Uno R3 FDN340P LMV358 power selection | SRC-001, SRC-002, SRC-008, SRC-009 | U5 is dual op-amp: A compares VIN divider to 3.3 V; B buffers D13/SCK LED. T1 is P-channel. High. | Verified connectivity; teaching circuit operation follows topology. Do not infer exact switching threshold with tolerances. |
| NCP1117 LP2985 Uno Rev3 | SRC-001, SRC-002, SRC-010, SRC-011 | U1 NCP1117ST50T3G; U2 LP2985-33DBVR. High for design. | U2 label absent from some PDF extraction but visible and present in CAD. No blanket output-current claim. |
| Arduino Uno clock crystal ceramic | SRC-001, SRC-002, SRC-003, SRC-017 | Y1 16 MHz crystal with 22 pF C9/C11; Y2 CSTCE16M0V53-R0 ceramic resonator 16 MHz. High. | Y1 exact order code unknown; Y2 internal values not claimed. |
| Bourns MF-MSMF050 polymer PTC carbon | SRC-012, SRC-013 | Resettable polymer PTC; heat changes conductive network; cooling after fault/power removal permits reset. High general mechanism. | Exact formulation unknown. 500 mA is conditional hold rating, not instantaneous threshold. |
| CG0603MLC-05E ChipGuard | SRC-014, SRC-015 | Bidirectional ESD protector; manufacturer technology is thin-film polymer. High. | CAD library named varistor must not override manufacturer identity. |
| BLM21 ferrite USB Arduino | SRC-001, SRC-002, SRC-016 | L1 links USHIELD to UGND; L2 10 uH feeds AVCC. High connectivity. | Unknown L1 suffix, ferrite chemistry, and L2 supplier/core. |
| Uno reset DTR schematic | SRC-001, SRC-002, SRC-030 | DTR C5 coupling, RN1D pull-up, D2 clamp, button RESET; USB MCU reset separate. High. | Explain RESET-EN as cuttable board trace, not a loose component. |
| Arduino built-in LED power return path | SRC-001, SRC-002 | D13 -> U5B input; U5B output -> RN2A -> L -> GND. High. | GPIO controls buffer; it does not directly supply L current. |
| ATmega328P / ATmega16U2 memory peripherals | SRC-006, SRC-007 | Separate program/data/nonvolatile memories and peripheral blocks. High public functional level. | No authoritative die floorplan or exact cell cross-section established. |
| Semiconductors doping atomic probability current drift | SRC-018 through SRC-024 | General teaching physics is supported. High general concepts. | Quantum scenes simplified; hydrogen probability imagery not exact silicon orbitals. |
| FR4 glass epoxy | SRC-029 | General PCB substrate explanation supported. High general model. | Exact Uno material procurement, finish and solder alloy unverified. |
| Arduino Ivrea Wiring Processing history | SRC-025, SRC-026 | Official beginner origins and participant account of Wiring lineage. High origins; attributed credit narrative. | Founder chronology/name story/early timeline require further targeted research before final history prose. |
| AVR sketch build process | SRC-027, SRC-028 | Preprocess -> compile -> link -> program image; pin functions from core and official pinout. High. | Pin lesson and instruction example must use explicit core/datasheet version. |
| General CMOS and package connections | SRC-031, SRC-032 | Complementary logic and multiple connection technologies supported. High general mechanism. | Exact ATmega package internals and memory-cell layout remain unknown. |

## Conflicting official information

The English Board Topology table in SRC-004 names U1 SPX1117M3-L-5, U5 LMV358LIST-A.9, D1 CGRA4007-G, Y1 ECS-160-20-4X-DU and describes F1 as a capacitor. SRC-001/SRC-002 instead name NCP1117ST50T3G, LMV358IDGKR, M7, unspecified 16 MHz crystal, and MF-MSMF050-2 PTC. Record both, retain schematic baseline, and do not label the table evidence as a confirmed production revision. Generic “up to 20 MHz” MCU capability in manual is not the board's 16 MHz clock.

Source parsing failures: an old sketch-build URL and an incorrect OpenStax capacitor section number did not resolve; canonical SOURCES uses the verified current URLs. No failed URL is retained as a factual citation.

Final URL audit: direct HTTP retrieved 28 of 32 initial canonical URLs with status 200; SRC-006, SRC-015 and SRC-032 returned automated-access 403, while their content was available through web research. SRC-025's legacy AboutUs redirected to a 404; it was replaced with the verified official 2022 origins/open-source article, which also returns 403 to the direct client but opens through web research. This is an access-path limitation, not evidence that those manufacturers' claims are false. Links should be rechecked from a normal browser if reused. An attempted full ATmega328P family datasheet download was also blocked by 403; do not claim it was fully reviewed.

## Open questions and bounded consequences

| ID | Uncertainty | Consequence / resolution action |
| --- | --- | --- |
| RES-001 | Actual dated production BOM explaining manual discrepancies | Main site remains design-scoped; show discrepancy note. Require independent production evidence before naming variants. |
| RES-002 | L1 full BLM21 ordering suffix and L2 construction | Teach general ferrite/inductor function; omit impedance curve, material recipe and exact rating. |
| RES-003 | Exact solder alloy, surface finish, plastics, LED compounds, resistor films, dielectric composition | Generic family scenes only; omit specific element claims for an actual board. |
| RES-004 | ATmega die geometry, process node, cell technology and package bond metals | Conceptual scenes, no count/node/dimensions. Supplier package outlines alone do not establish interior. |
| RES-005 | Complete attributable Arduino history/timeline/name narrative | Research required before history feature task; preserve contested accounts as attributed perspectives. |
| RES-006 | Full ATmega328P package-specific pin/register review and chosen core version | Public pin table and low-level software demonstration require their own reviewed mapping before implementation. |
| RES-007 | Exact quantum/material scale examples | Scale values nullable; add only after dimensional source and scope review. |

## Next research

Before Phase 1 content projection, complete the history and package-specific pin review. Recheck any source if its content/hash changes or a contradictory source appears. Already verified design connectivity need not be researched repeatedly. Unknown proprietary details are bounded omissions rather than blockers for generic conceptual teaching.
