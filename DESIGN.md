# Visual design system

## Direction

Quiet interface, rich object. Combine NASA-inspired editorial hierarchy with a scientific atlas: confident typography, clear navigation, generous space, restrained lines and the recognizable Uno as the first-screen subject. Avoid marketing heroes, card grids, gradients, glows, glass effects and decorative motion. The user selected this direction; it does not imply NASA endorsement. [Audit](docs/design/UI_AUDIT.md) records the starting interface.

## Tokens

| Token | Light default | Dark |
| --- | --- | --- |
| canvas | #F3F1EB | #0C0C0B |
| surface | #FAF9F6 | #141412 |
| raised | #FFFFFF | #1B1B18 |
| ink | #11110F | #F2F0E9 |
| secondary | #6E6D68 | #A5A39B |
| hairline | #D9D6CE | #343430 |
| accent / board teal | #00979D | #00979D |
| action text / focus | #006F73 | #7DD4CF |

Teal indicates action/selection, not pervasive decoration. Measure actual text/focus contrast before shipping; darken light-theme teal text as necessary to meet AA. Power amber, digital teal, analog muted violet, clock muted green, ground charcoal and USB blue always include names/symbols. Hairlines are decorative separators, never sole control boundaries.

Use locally bundled Geist Sans and Mono; a system serif only for occasional scientific titles. Base interface body 14px with readable line height; component/scene prose 12–14px, editorial paragraphs 14–16px, documentation 14–15px. Prose is limited to roughly 65 characters wide; native 200% browser zoom is included in acceptance. Small Mono labels are supplemental metadata rather than the only explanation. Spacing: 4, 8, 12, 16, 24, 32, 48, 64px. Corners: 0 for structural panes, 4px controls, at most 8px sheets. Use a subtle sheet shadow only where layering needs explanation.

## Object workspace

At widths >=1200px: header 64px, navigator 232px, inspector 336px, remaining width dedicated to the board. At 768–1199px use drawers; below 768px use navigation and inspector sheets around a full-width viewer. Do not stack three desktop panes. Object, not title/prose, dominates the initial viewport. Contextual controls appear only for the active scene.

CAD coordinates determine physical placement; educational package shapes may simplify geometry. Selected objects use a solid boundary and label. Isolate retains faint context; hide others removes it. Explode preserves leader lines and an obvious reassemble control. All important marks have HTML descriptions.

## Motion and visual truth

UI transitions 120–250ms with natural easing; slower explanatory transitions only when they clarify causality or scale. Reduced motion switches scenes instantly. No perpetual decoration or idle animation. Labels always distinguish layout-faithful, simplified and conceptual representations. A polished die scene remains conceptual; clouds never become planetary electron orbits. Unknown dimensions stay unavailable, and software has no physical scale.

Read [UX](UX.md) for flows, [accessibility](ACCESSIBILITY.md) for behavior, and [rendering](docs/engineering/rendering.md) for coordinate truth.
