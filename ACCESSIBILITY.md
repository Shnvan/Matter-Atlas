# Accessibility contract

Target WCAG 2.2 AA behavior. This is a design contract, not a conformance claim. Future application testing is tracked in [TESTING](TESTING.md).

- Semantic header/nav/main/section/footer, one h1, ordered headings, skip link, meaningful document title and English language.
- All visible controls have accessible names and visible focus. Use native buttons/inputs where possible. Enter/Space activates actions, Escape closes temporary dialogs, Tab follows a logical order.
- SVG has a title/description and component IDs. Avoid exposing decorative subpaths as separate controls. Provide a synchronized HTML component list so small shapes are not the sole navigation route.
- Canvas has adjacent scene descriptions and accessible controls. Text explains state and outcomes without reading animation frames.
- Desktop component panel is a labeled region. Mobile modal sheet moves focus to its heading/close control, confines focus, closes with Escape/explicit button, and restores the activating component/list control.
- Assembly always offers select part -> select slot -> place, with the same correctness logic as dragging. Pointer capture supports touch/pen; pointercancel restores state. Do not disable page scrolling outside the drag surface.
- Use polite live regions for placement results, quiz feedback, and progress. Do not announce every movement or repeat long descriptions.
- Zoom range control has a label/value text and native keyboard behavior; discrete nodes remain available as buttons. Unsupported physical sizes have no numeric slider position pretending to be a measurement.
- Quiz uses fieldset/legend and native choices, explicit submission, immediate explanation, and a final score announcement. Do not indicate right/wrong using color alone.
- Text contrast at least 4.5:1 for normal text, 3:1 for large text; meaningful graphical controls/focus at least 3:1. Measure rendered token pairs.
- Aim for 44x44 CSS px touch targets. Provide readable layout at 200% zoom and narrow width without page overflow; large tables scroll within labeled containers.
- prefers-reduced-motion yields static scenes and immediate state changes. A user pause is persistent within the session; hidden/inactive/offscreen animation stops.

Screen-reader checks require actual manual testing; automated semantic inspection is insufficient. Test the initial guide's skip link and document links now, and the full contract as features are implemented. No learner progress depends on storage or mouse use.
