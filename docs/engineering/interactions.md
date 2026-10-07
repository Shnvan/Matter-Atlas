# Interaction contracts

Mode changes and learner actions pass through explicit state transitions in [ARCHITECTURE](../../ARCHITECTURE.md). Use one board/list delegation handler and native control handlers; no unnecessary global per-part listeners.

## Selection and focus

Click/tap/Enter/Space selects the same component data ID. Hover/focus preview does not forcibly steal selection. Search and filters synchronize list/highlights; selected details remain readable even when filter removes their list entry. Close restores originating focus, with a stable list fallback if its exact node disappeared. Invalid IDs get explanation and board recovery.

## Assembly

Capture pointer only during active drag; transform pointer coordinates with the inverse SVG matrix. Store origin for wrong-drop/cancel recovery. Compare matching-slot proximity in screen pixels (default 24 px); eligibility and target match precede snapping. Keyboard/tap select and choose-slot placement invokes the same PLACE_PART action without requiring geometric dragging. Hint identifies current selected part's correct slot; reset releases capture and clears progress. Non-drag regions retain scrolling.

## Graph and signal

ENTER_ZOOM stores origin/history. Next/branch selection pushes actual node; Back pops actual visit. A conceptual-level number is progress, not measured scale. Signal step changes labels/highlights and typed edge styling; pause leaves state explanatory, restart resets index.

## Quiz

Choices are native radio controls in fieldsets; submit locks one answer, announces feedback and updates score once. Next moves focus to question heading; final/retry are explicit. Inputs never inject HTML. See [UX](../../UX.md) and [ACCESSIBILITY](../../ACCESSIBILITY.md).
