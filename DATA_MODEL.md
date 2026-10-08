# Embedded data contracts

Status: canonical contracts for the application projections; implementation acceptance is tracked in TASKS. All collections are immutable content; transient interaction state lives separately in [architecture](ARCHITECTURE.md). Examples illustrate schema shape and do not constitute delivered teaching controls. Canonical factual data is projected into typed application modules and validated with Zod. Build-time projections never promote unsupported claims.

## Shared types and rules

IDs: stable lower-case kebab-case, unique within collection; references must resolve. Source IDs use `SRC-###`. Cross-collection DOM IDs use prefixes (`part-`, `zoom-`, `source-`) to prevent collisions. Display numbering is generated from source order.

| Shared field/type | Required | Meaning / example | Validation |
| --- | --- | --- | --- |
| Claim `{text,evidence,sourceRefs,applicability,notes}` | For factual fields | text: “T1 is P-channel”; evidence: verified; sourceRefs: [SRC-008]; applicability: UNO-TH_Rev3e | Evidence verified/inference/unverified; verified requires supporting IDs; scope explicit. |
| Claim.notes: string | Optional | “Not exact internal geometry” | Required when inference/unverified may mislead. |
| Measurement `{value,unit,meaning,precision,sourceRefs,conditions}` or null | Where numerical content appears | 16, MHz, Y2 nominal resonance, exact, [SRC-001], nominal design value | Finite value; unit/meaning/conditions; approximate needs defensible source; unknown/software scale null. Exact means stated nominal/spec condition, not infinite measurement precision. |
| representation: enum | Yes for scenes | conceptual | layout-faithful / conceptual / simplified; independent of evidence. |
| boardPosition `{x,y,rotation,mirrored}` | Physical references | 46.355,16.383,180,false | Finite original CAD mm; retain package origin/rotation, transformed only in renderer. |
| Edge `{targetId,relation,label}` | Graph neighbors | targetId: silicon-die; relation: composition | relation: composition/function/mechanism/related; graph target resolves; no assumed universal containment. |
| DepthText `{beginner,intermediate,deepDive}` | Explanations | Short mechanism, circuit detail, sourced spec | Strings or Claim arrays; all factual subclaims carry provenance; jargon agrees with terminology. |

Evidence is deliberately independent of numeric precision and representation. Do not use a single “verificationStatus: conceptual” flag to certify physical identity. If a legacy field is retained, derive it for display and retain claim-level fields.

## components: Component[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id | string | Yes | mcu-main | Unique; referenced by SVG and state. |
| name | string | Yes | ATmega328P | Matches inventory identity. |
| referenceDesignators | string[] | Yes | [ZU4] | Every entry exists in inventory; arrays support grouped cards. |
| partNumber | string or null | Yes | ATMEGA328P-PU | Null when no verified exact ordering code. |
| category / subsystem | string | Yes | microcontroller / main-mcu | Controlled vocab separates material/component/system. |
| purpose | Claim | Yes | Executes uploaded program | Beginner text with scope. |
| technicalExplanation | DepthText | Yes | Functional mechanism | No unsupported implementation details. |
| specs | Measurement[] | Yes | Nominal clock/memory specs | Empty allowed if unavailable; no guessed values. |
| ifMissing | Claim | Yes | User sketch cannot execute | Conditional absence consequence; avoid asserting all faults identical. |
| analogy / analogyLimit | string | Yes | A coordinator / also contains memory and analog circuitry | Both present; analogy labeled. |
| madeOf / worksBecauseOf | Claim[] | Yes | General package / encoded operations | Independently sourced/scoped claims. |
| zoomTargets | string[] | Yes | [ic-package] | Resolve to permitted branch nodes. |
| sourceRefs | string[] | Yes | [SRC-001,SRC-006] | Resolve; aggregate does not replace claim-level support. |
| groupedParts | PhysicalPart[] | Yes | Individual ZU4 or each C* | All referenceDesignators covered exactly once. |
| applicability | string | Yes | UNO-TH_Rev3e design | Distinguish physical production uncertainty. |
| evidence | enum | Yes | verified | Identity evidence only; explanations retain own classifications. |
| representation | enum | Yes | layout-faithful | SVG style classification. |

PhysicalPart fields: `referenceDesignator` string, `boardPosition` object, `svgId` string, `slotId` string or null, `slotPosition` SVG point or null, `tooltip` string, `assemblyEligible` boolean. All required. Non-fitted features have assemblyEligible false and null slots. Slots derive from the documented transform; grouping cannot discard their board coordinates. Hit shape is renderer-owned and inflated for input accessibility, not a physical size claim.

Example identity record fragment (other required educational fields supplied before rendering):

```json
{"id":"mcu-main","name":"ATmega328P","referenceDesignators":["ZU4"],"partNumber":"ATMEGA328P-PU","category":"microcontroller","subsystem":"main-mcu","applicability":"UNO-TH_Rev3e design","evidence":"verified","representation":"layout-faithful","sourceRefs":["SRC-001","SRC-002","SRC-006"]}
```

## zoomLevels: ZoomNode[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / title | string | Yes | silicon-die / Silicon die | Unique ID, readable title. |
| conceptualLevel | integer | Yes | 5 | 0-13 guide level, not physical scale. |
| branchIds | string[] | Yes | [mcu] | One node may be shared across branches. |
| abstraction | enum | Yes | physical | physical / functional / information. |
| parents / next | Edge[] | Yes | package / functional-blocks | Multiple edges supported; back uses actual visited history. |
| madeOf / explanation | Claim[] / DepthText | Yes | Semiconductor structures / circuit operation | Purpose and composition readable at every meaningful node. |
| scale | Measurement or null | Yes | null for unknown die size | Software/functional abstraction cannot receive an invented dimension. |
| scaleStatus | enum | Yes | unavailable | sourced / approximate / illustrative / not-applicable / unavailable; consistent with scale. Illustrative is not a guessed number. |
| sourceRefs | string[] | Yes | [SRC-006] | Must support functional claims, not certify invented floorplan. |
| visualType / representation | string / enum | Yes | conceptual-die / conceptual | Known renderer type or static text recovery. |
| electricalTopicId | string | Yes | fields-current | Must resolve to electrical explanation node/topic. |
| applicability | string | Yes | Functional AVR overview | Board-specific or explicitly general. |

Example: `silicon-die` at level 5 has a physical label, null dimensions, a conceptual functional diagram, a package parent, and function edges to CPU/ADC/memory nodes. `software` at level 0 is information with scaleStatus not-applicable.

## sources: Source[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / title / organization / type | string | Yes | SRC-001 / UNO-TH_Rev3e / Arduino / schematic | Match canonical bibliography. |
| url | string | Yes | Official schematic URL | Verified http(s), not invented or placeholder. |
| documentIdentity / evidenceLocation | string | Yes | UNO-TH_Rev3e / sheet 1 U5 | Preserve version/claim location where available. |
| accessed | date string | Yes | 2026-10-08 | YYYY-MM-DD user timezone. |
| claimsSupported / authorityNotes | string[] / string | Yes | Design connectivity / not every production BOM | Avoid overbroad source scope. |
| checksum | string or null | Yes | PDF SHA-256 where recorded | Null for dynamic/unhashed content; never guessed. |

The page renders [1], [2], etc. as anchors to canonical source entries, independent of SRC IDs. Do not remove a source while claims still reference it.

## quizQuestions: QuizQuestion[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / prompt / topic | string | Yes | quiz-t1 / Which device is T1? / anatomy | Unique; topic coverage across requested areas. |
| choices | `{id,text}[]` | Yes | p-channel / P-channel MOSFET | 2-4 distinct nonempty choices with stable IDs. |
| correctChoiceId | string | Yes | p-channel | Exactly one existing choice. |
| explanation | Claim | Yes | T1 FDN340P is P-channel | Supports correct answer, addresses misconception. |
| sourceRefs / relatedNodeIds | string[] | Yes | [SRC-008] / [mosfet] | Resolve; quiz never relies on an unsupported claim. |
| depth | enum | Yes | beginner | beginner/intermediate/deepDive. |

Complete example:

```json
{"id":"quiz-t1","prompt":"Which type of device is the reference Uno's FDN340P?","topic":"anatomy","choices":[{"id":"p-channel","text":"P-channel MOSFET"},{"id":"n-channel","text":"N-channel MOSFET"}],"correctChoiceId":"p-channel","explanation":{"text":"FDN340P is a P-channel MOSFET used in the USB power connection.","evidence":"verified","sourceRefs":["SRC-001","SRC-008"],"applicability":"UNO-TH_Rev3e","notes":""},"sourceRefs":["SRC-001","SRC-008"],"relatedNodeIds":["mosfet"],"depth":"beginner"}
```

## signalJourneys: SignalJourney[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / title | string | Yes | led-on / Built-in LED | Unique. |
| startingEvent / finalResult | Claim | Yes | GPIO changes / emitted light | Causal trigger and observable end. |
| steps | SignalStep[] | Yes | D13 controls U5B input | At least two ordered readable steps; not falsely all series. |
| edges | SignalEdge[] | Yes | GPIO control, rail supply and return | Source/target step IDs exist. |
| sourceRefs / applicability | string[] / string | Yes | [SRC-001] / UNO-TH_Rev3e | Match actual design. |
| representation | enum | Yes | simplified | Timing/particle positions not literal signal speed. |

SignalStep: id string; componentIds string[] (empty for software/information); event Claim; physicalEffect Claim; nextStepIds string[]; electricalTopicId string. SignalEdge: fromStepId/toStepId strings, type enum control/power/data/return/parallel, explanation Claim. All required. Steps describe dependency, edges describe topology. Parallel decoupling branches cannot be serialized as supply-through-capacitor paths.

## terminology: Term[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / term | string | Yes | hole / Hole | Canonical definition ID and label. |
| beginner / precise / misconception | string | Yes | Effective positive carrier | All three nonempty. |
| relatedTermIds / sourceRefs | string[] | Yes | [electron,semiconductor] / [SRC-018] | Resolve, including reciprocal context where useful. |

Definitions are owned by [terminology](docs/product/terminology.md); UI abbreviations link to fuller definitions.

## materialEntries: MaterialEntry[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / name | string | Yes | silicon / Silicon | Distinguish material from component. |
| compositionKind | enum | Yes | element | element/compound/mixture. |
| roles | enum[] | Yes | semiconductor | conductor/semiconductor/insulator-dielectric/magnetic/piezoelectric/structural-polymer. Multiple roles allowed. |
| whereUsed / whyUseful | Claim[] | Yes | General MCU die / controllable carrier behavior | Scope general versus actual Uno applicability. |
| componentIds / zoomTargets | string[] | Yes | [mcu-main] / [silicon-crystal] | Resolve; general unverified entry may have empty component list. |
| evidence / applicability / sourceRefs | enum / string / string[] | Yes | verified general / semiconductor concept / [SRC-018] | Do not attach candidate elements to an actual board without evidence. |
| representation | enum | Yes | conceptual | Atomic/material imagery classification. |

## pinMappings: PinRecord[]

| Field | Type | Required | Meaning / example | Validation |
| --- | --- | --- | --- | --- |
| id / physicalLabel / arduinoName | string | Yes | pin-d13 / 13 / D13 | Unique physical header position ID; duplicated nets need separate records. |
| header / position | string / integer | Yes | IOH / 6 | Sourced header pad position, not screen coordinates. |
| mcuPort / mcuPackagePin | string or null / integer or null | Yes | PB5 / 19 | Must match chosen 28-pin package; power/NC may be null. |
| digital / analog / pwm | boolean / string or null / boolean | Yes | true / null / false | Distinguish capabilities from default function. |
| interrupts / uart / spi / twi | string[] | Yes | [PCINT5] / [] / [SCK] / [] | Distinguish external interrupt INTn from pin change PCINTn. |
| powerFunction | string or null | Yes | null or IOREF +5V | No I/O implication for power pins. |
| notes / sourceRefs / applicability | string / string[] / string | Yes | Buffered L LED / [SRC-005] / 28-pin Uno Rev3 | Board limits separate from MCU absolute maximum values. |

## Validation before feature delivery

Check unique IDs, enums, types, all references, complete grouped physical coverage, known SVG slots, graph navigability/history, meaningful scales, provenance, source anchors, one correct quiz answer, no optional unimplemented control. Content errors block affected teaching rendering with readable recovery during development; they must be corrected before the working release. The foundation validator checks Markdown memory, while Zod/Vitest check the implemented runtime projections.

## Interaction state extension

The shared store adds theme (light/dark), focused component ID or null, isolated component ID or null, hidden component ID set, exploded flag and responsive navigator/inspector open state. Camera pan/zoom/rotation uses finite bounded values; pointer-rate updates remain in refs. Invalid component/node IDs recover to the board with readable feedback. Actual journey history stores origin and visited nodes. Static collections are not copied into the store. Assembly cancellation clears transient drag state without changing already placed parts; quiz answers can contribute to score only once.
