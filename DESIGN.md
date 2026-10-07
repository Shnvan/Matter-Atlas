# Visual design system

## Principles

An Arduino-inspired electronics workbench: readable, orderly, and restrained. Explanations lead; illustrations support them. Use labels, shapes, and line styles in addition to color. The current guide establishes these defaults; later scenes inherit them.

## Tokens

| Token | Dark default | Light proposal |
| --- | --- | --- |
| background | #0B1218 | #F4F7F8 |
| surface | #14212B | #FFFFFF |
| raised | #1B2D39 | #E7EFF2 |
| text | #EAF3F6 | #14212B |
| muted | #AFBFCA | #405563 |
| accent | #00979D | #00979D |
| link/focus | #73E3DE | #006A70 |
| border | #36505F | #B8CBD2 |
| caution | #F2C879 | #765000 |

Use teal as an accent and graphical fill. Do not assume white small text on #00979D passes AA; use the brighter link token or dark text on bright surfaces and measure actual contrast. Light theme is optional backlog work, not currently delivered.

Typography: system sans for body/headings; system monospace for identifiers and measurements. Body 1rem, line-height 1.6; headings fluid via clamp. Limit prose to about 70 characters per line. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 px. Radii: 8 px controls, 16 px cards, 24 px major containers. Borders 1 px; elevation uses one subtle shadow rather than bright glows.

## Components and illustrations

Cards include title/category, purpose, composition/mechanism, citation, and depth controls. Board components keep CAD-relative placement and visible location markers. Selection uses outline and label. Explode retains leader lines. Icons are simple inline strokes with labels; avoid unlabeled icon-only actions. Diagram arrows distinguish control, energy/data, and return path using a legend.

Microscopic drawings show a visible badge: conceptual or simplified. A conceptual die map uses functional regions, not a fabricated physical floorplan. Atoms use probability-cloud shapes, not planetary motion. Quantitative size labels appear only with verified context. Board graphics use “Layout-faithful educational illustration” unless fidelity is separately established.

## Motion and responsive behavior

Short transitions around 150-250 ms; never rely on animation for meaning. Reduced motion removes continuous movement and spatial travel. Scene timing is explanatory, not physical speed. Phones use single-column sections and bottom-sheet details; tablets stack or split based on content width; desktop uses a board with adjacent details. Ensure 44 px control targets and no document-wide sideways overflow; tables may have a labeled contained scroll region.

## Visual truth rules

Zoom transitions do not imply true scale. Electron dots do not represent a complete quantum description or measured drift speed. Current arrows use declared conventional-current direction; carrier scenes distinguish electron motion. Conceptual internals never become exact through visual polish. All scene meaning has readable text. See [accessibility](ACCESSIBILITY.md) and [rendering](docs/engineering/rendering.md).
