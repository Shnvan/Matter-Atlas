# Interaction design

## Entry and navigation

Current entry is an offline project guide with documentation links and honest phase status. The future teaching page begins with a short mode explanation, the assembled board, and a visible “illustrations may be simplified and not to scale” note. Navigation exposes Explore, Explode, Assemble, Zoom, Signal Journey, and Quiz only when all respective controls work. Supporting sections have an in-page contents list.

## Explore and detail flow

Focus/hover a part -> highlight and short label -> click/Enter -> shared detail content -> beginner purpose/composition/mechanism -> expand depth or enter zoom. Search and category filters update a matching HTML list and highlights; zero results show “No matching components” and a clear-filter action. Desktop panel remains adjacent; narrow screens open a modal bottom sheet with close and focus restoration.

## Explode and assembly

Explode -> deterministic offsets and leader lines -> select part for details -> reassemble. With reduced motion, positions switch immediately.

Assemble -> parts tray + slots -> select/drag part -> place on matching slot -> correct snap and live feedback -> progress -> completion. Wrong drop returns to tray/origin and explains the mismatch. Tap or keyboard selection then slot placement follows the same rule. Hint highlights the selected part's target; reset clears placements and announces progress. Assembly is an educational matching exercise, not a manufacturing process or instruction to dismantle a powered board.

## Zoom and signal journeys

ATmega328P -> general package illustration -> conceptual die -> functional CPU block -> circuit/gate -> general MOSFET -> semiconductor -> material/crystal -> atom -> electron/nucleus. Each node gives composition, mechanism, representation, supported scale, sources, electrical explanation, and graph neighbors. Back follows visited history and eventually restores the originating part. LED/resistor/capacitor paths use different branch nodes.

Select signal journey -> textual causal steps and board highlights -> step forward/back or play -> pause/restart -> final explanation. Show control edges and power/return paths distinctly. Teacher can pause at any step and use readable state text without motion.

## Quiz and recovery

Choose an answer -> submit -> immediate explanation and source -> next -> final score -> retry. Choices cannot score repeatedly. Empty/unavailable data produces an informative message and a working return action; invalid route/ID returns to the board with an explanation. Reduced motion, no storage, and unavailable optional effects do not remove core functionality.

## Journeys and input

Free beginner: explore one part with short content. Guided student: follow the full graph path with position and progress. Teacher: directly select a signal/logic scene, pause, and expand explanation. Keyboard-only learner: skip link, component list, native mode controls, accessible detail, graph buttons, and select/place assembly. No essential instruction uses “hover” without a focus/tap alternative.

See [six learner journeys](docs/product/user-journeys.md), [interaction contract](docs/engineering/interactions.md), and [accessibility](ACCESSIBILITY.md).
