# Interaction design

## Entry and navigation

The teaching application opens on the assembled Uno and concise board overview: “Select a component to look inside.” Explore contains board exploration, explode and assembly; Journey contains scale and signals; Learn contains topics, pins and quiz. Contributor documentation is secondary under /project/. The original index.html remains the historical offline guide.

Desktop uses a 64px header, 232px navigator and 336px inspector at >=1200px. Tablet uses drawers and mobile (<768px) uses sheets. Open/close actions restore focus; selecting a component never silently enters its interior. Explicit Zoom inside starts the branch. Fit/reset remain reachable after manipulation.

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

## Camera and object visibility

Fit resets camera; pan/zoom/planar rotation have labeled keyboard controls as well as pointer input. Focus centers the selected part. Isolate dims context; Hide others removes it. Restore board clears these visibility changes. The inspector and component list remain synchronized with the selected identity. Mode changes cancel an active drag and stop mode-owned playback.
