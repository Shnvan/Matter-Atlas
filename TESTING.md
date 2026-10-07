# Testing strategy and evidence

## Foundation checks

Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-foundation.ps1`. The validator reads without mutation: all required files/content; relative links; canonical IDs and references; task ownership/status/dependencies/cycles; all 116 inventory designators; handoff headings; guide controls/IDs/fragment integrity. Its count is structural, not a scientific or accessibility certification.

Negative fixtures in a temporary copied directory must make the validator exit nonzero for missing file, broken link, unknown source, duplicate ID, dependency cycle, missing inventory row, missing handoff heading, future feature falsely DONE, and satisfied requirement with unfinished owner. No fixture modifies the real repository.

Manual audit: compare 21 section mappings and cross-cutting requirements to preserved briefs; compare critical identities and topology against rendered schematic and CAD contactrefs. Confirm original briefs byte-for-byte. Check baseline scope, unknown materials/geometry, and source discrepancies.

## Current-session results

Date: 2026-10-08, Asia/Manila. The following checks actually ran:

| Check | Result and evidence |
| --- | --- |
| Structural validator, Windows PowerShell | PASS: 42 required files, 103 requirements, 32 sources, 8 decisions, 30 tasks, 116 inventory rows; links, canonical IDs, dependencies/cycles, traceability and handoff checks pass. Initial script-root default binding was corrected before final validation. |
| Nine negative validator fixtures | PASS: copied temporary fixtures reject missing file, broken link, unknown source, duplicate ID, dependency cycle, missing inventory row, missing handoff heading, falsely DONE future task, and falsely satisfied requirement. Real repository unaffected. |
| Original brief preservation | PASS: both local copies match their attachment bytes exactly. |
| Coverage audit | PASS: section mappings 0-20 present; manual review also checked modes, research/accuracy, schemas, source policy, accessibility, performance and foundation duties against preserved briefs. |
| CAD reconciliation | PASS: all 116 element names/values/origin coordinates match parsed official .brd; critical roles checked against contactrefs and visually rendered schematic. SHA-256 matches recorded baseline. |
| File URL browser check | PASS in bundled Chromium 145.0.7632.6 using Playwright, headless; viewports 360x1000, 768x1000 and 1440x1000; zero console/page errors and zero HTTP requests. |
| Keyboard and guide links | PASS: Tab reaches visible skip link; Enter navigates main; next Tab reaches first document; focused links have 3 px outline. Enter opens local HANDOFF.md and its text. All 42 document-link instances target existing files; link heights at least 44 px. |
| Responsive and visual review | PASS: no page overflow at three requested widths; viewport images for all widths and complete desktop layout inspected. At 1440 px, 200% root font-size enlargement also has no page overflow (not a browser zoom test). |
| Contrast measurements | PASS: text/background ratios 16.74:1 and 14.55:1; muted text 9.99:1 and 8.68:1; link/focus 12.36:1 and 10.74:1 across guide background/surface. Decorative accents are not sole information carriers. |
| Reduced motion / offline guide | PASS: guide loaded with reduced-motion setting; it has no script, animation, storage or external required asset. No teaching-scene lifecycle is claimed tested. |
| Source URL retrieval audit | 28 initial URLs returned direct HTTP 200. Three returned automated-access 403 but opened via web research; legacy SRC-025 redirected to 404 and was replaced with verified official origins article (direct client 403). See RESEARCH for access limits. |

Screenshots and test fixtures are temporary QA artifacts outside the repository. They are not required by the guide. Cross-browser, screen-reader, real-device touch and actual browser-zoom checks remain unrun; future teaching modes and learner outcomes remain unimplemented/untested. Structural validation cannot detect every contradiction or certify content accuracy.

## Future functional checklist

- Explore hover/focus/select, search/category/clear/empty state; every meaningful part opens correct data.
- Details reveal all required fields/depth/source and restore focus; mobile sheet closes safely.
- Explode has leader lines and reassembly; selection survives transitions.
- Assembly correct snap, wrong return, hints/reset/progress/completion; drag and select/place agree; cancel releases capture.
- Zoom graph levels/branches/breadcrumbs, previous/next and origin return; electrical cross-links; supported/null scale behavior.
- Gate truth tables and MOSFET control explanations reflect inputs; scene text agrees.
- Signal play/pause/step/restart; correct control/power/return/parallel path and final state.
- Quiz feedback/explanations/score/retry; no double scoring; 10-15 questions cover requested subjects.
- Pin functions and duplicate nets match official package-specific mapping.

## Accessibility and responsive checklist

- Keyboard-only complete tasks, native control semantics, sensible focus, Escape/restore on sheet, no trap outside modal.
- Screen-reader labels/heading order, SVG descriptions, Canvas equivalent text, live results without frame chatter.
- Real touch/pen dragging plus tap/place; 44 px targets, page scrolling preserved outside drag area.
- AA contrast, visible focus, reduced-motion static equivalents, user pause, 200% zoom.
- Narrow/large phone (360/430), tablet (768), laptop (1280), desktop (1440); no page overflow. Initial guide target widths: 360/768/1440.

## Content and technical checklist

- Every board claim cited or bounded; no clone contamination; source anchors/URLs resolve; terms agree.
- No invented node/count/size/recipe/floorplan; correct doping neutrality/holes, capacitors, drift, photons and analog blocks.
- No console errors, duplicate IDs, bad SVG references, inactive controls or placeholder content.
- File URL, offline/no storage and capability fallback work; optional effects cannot break core.
- Offscreen/hidden/inactive/paused/reduced-motion loops stop; cycle modes for runaway listeners/frames; avoid layout measurements inside animation loops.

## Final learner tests

Traverse MCU path board -> package -> die -> CPU -> logic -> MOSFET -> silicon -> atom -> electron. Explain identity/composition/mechanism at each meaningful level. Also traverse LED -> junction -> recombination -> photon and resistor -> material -> scattering -> heat. Confirm parallel branches do not imply every part contains transistors.

No future teaching feature, real-device touch, screen-reader, Firefox/Safari or complete learning-outcome test has run in this foundation milestone. Record browser/version/date/input and failures as work proceeds.
