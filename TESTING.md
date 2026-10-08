# Testing strategy and evidence

## Foundation checks

Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-foundation.ps1`. The validator reads without mutation: all required files/content; relative links; canonical IDs and references; task ownership/status/dependencies/cycles; all 116 inventory designators; handoff headings; guide controls/IDs/fragment integrity. Its count is structural, not a scientific or accessibility certification.

Negative fixtures in a temporary copied directory must make the validator exit nonzero for missing file, broken link, unknown source, duplicate ID, dependency cycle, missing inventory row, missing handoff heading, future feature falsely DONE, and satisfied requirement with unfinished owner. No fixture modifies the real repository.

Manual audit: compare 21 section mappings and cross-cutting requirements to preserved briefs; compare critical identities and topology against rendered schematic and CAD contactrefs. Confirm original briefs byte-for-byte. Check baseline scope, unknown materials/geometry, and source discrepancies.

## Historical foundation results

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

Screenshots and test fixtures are temporary QA artifacts outside the repository. They are not required by the guide. At the foundation checkpoint, cross-browser, screen-reader, real-device touch and actual browser-zoom checks were unrun, and future teaching modes were unimplemented. The application acceptance below supersedes that delivery state. Structural validation cannot detect every contradiction or certify content accuracy.

## Continuing regression checklist

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
- Local HTTP export, offline/no storage and capability fallback work; optional effects cannot break core.
- Offscreen/hidden/inactive/paused/reduced-motion loops stop; cycle modes for runaway listeners/frames; avoid layout measurements inside animation loops.

## Final learner tests

Traverse MCU path board -> package -> die -> CPU -> logic -> MOSFET -> silicon -> atom -> electron. Explain identity/composition/mechanism at each meaningful level. Also traverse LED -> junction -> recombination -> photon and resistor -> material -> scattering -> heat. Confirm parallel branches do not imply every part contains transistors.

The historical foundation milestone ran no teaching-feature tests. Application evidence below records the implemented paths; no classroom learning-outcome study is claimed.

## Application acceptance — 2026-10-08

Windows, Node/npm, Playwright Chromium **153.0.8010.12**, local static export at http://127.0.0.1:4173/. The following checks actually passed:

| Check | Result and evidence |
| --- | --- |
| `npm run typecheck` / `npm run lint` | Strict TypeScript and ESLint pass. |
| `npm test` | 19 Vitest checks pass: schema/citation/group/coordinate/pin/branch/content invariants; actual history, invalid IDs, assembly, signal bounds, quiz scoring and recovery transitions. |
| `npm run build` | Next 16.4 static production export passes; 47 prerendered pages, including 43 allowlisted document routes. 47 raw files plus archived guide prepared at build time. |
| `npm run test:e2e` | 19 Playwright acceptance cases pass. Six modes, synchronized selection/search/category, focus/isolate/hide/rotate/pan/reset, assembly cancellation/proximity/keyboard completion, actual navigation/origins, seven signals, quiz 11/12 and retry, supporting topics/materials/pins/recap, contributor downloads/guide and no required remote requests. |
| axe | Zero WCAG 2/2.1 A/AA automated violations in six sampled states: light/dark entry, microscopic MOSFET, quiz, mobile entry and navigator dialog. Scan waits for transition completion to avoid temporary-opacity false failures. |
| Visual review/regression | All eight light/dark entry images at 360/768/1024/1440x1000 inspected, plus selected/focused/isolated/hidden/exploded/package views. Board prominence, composition, readable text, calm panels and restoration controls reviewed. Fourteen committed screenshot baselines replay successfully. |
| Focus and input | Keyboard-only board selection, pan/Home, MCU/LED journeys, quiz and all ten assembly placements pass. Compact sheets contain focus and restore the correct trigger/origin; wrong drop and pointercancel retain consistent state. Visible compact HTML buttons measured at least 44x44 CSS px. Tiny physical SVG objects have equivalent 44px list controls. |
| 200% zoom | Actual Chromium tab zoom set to 2 through a temporary local QA extension; 1440px browser window reflows to roughly 712 CSS px with no horizontal page overflow. Navigator selection, inspector and Escape work. Native CDP screenshot inspected. Separate 720x500 reflow proxy also passes. This is headless browser zoom, not a manual browser-chrome or assistive-technology session. |
| Motion lifecycle | Instrumented single teaching interval has zero idle timers; one when playing, zero for simulated document-hidden/offscreen events, restored one when visible, and zero when paused/inactive/reduced. Reduced motion disables timed play while manual steps retain explanations. No continuous microscopic animation loop. |
| Offline/errors | Browser blocks and records external requests: core controls/journeys/theme/quiz need none. No page or console errors in monitored acceptance. DOM audits find no duplicate IDs or unresolved SVG URL references in tested entry/end states; duplicated hidden camera help was removed. Local RSC segmented filenames are mapped by preview server; former Next prefetch 404 fixed and regression checked. |
| Scientific/coverage audit | Original sections 0–20 plus redesign obligations reviewed against implementation/data. 116 physical entries remain separate from 49 groups; 40 source records, 31 scenes, 14 topics, 8 materials, 32 terms, complete DIP/header pin mapping. U5B LED buffer, P-channel T1, L1 shield bead, and control/power/parallel/return distinctions retained. ATmega16U2 origins use clearly scoped shared ATmega328P illustrations. Unknown manufacturing/material/die dimensions remain null or general models. |
| Foundation validator | PASS: 48 required memory files, 106 requirements, 40 sources, 11 decisions, 30 tasks, 116 inventory elements. Links, references, dependency cycles, ownership, DONE evidence and handoff pass. Six migrated negative-fixture checks also passed at migration checkpoint. |
| Dependency audit | Production-only npm audit: zero vulnerabilities. Full audit: five dev-tool findings in the Next ESLint glob chain, with no compatible patched braces release at this checkpoint; mitigation and follow-up recorded in RISKS. |

Commands can be rerun from README. Screenshot baselines are in `tests/e2e/experience.spec.ts-snapshots/`; transient captures, extension and traces are ignored under `qa-artifacts/` and `test-results/`. A different OS/browser needs inspected baselines, not blind updates. The original guide and foundation acceptance remain recoverable.

## Remaining verification limits

NVDA/JAWS/VoiceOver, physical phone/tablet touch or pen, Firefox/Safari, low-power hardware profiling and a real beginner/teacher study were not available and are not claimed passed. The API-driven native Chromium zoom check is narrower than manual cross-browser zoom. Axe samples do not certify accessibility. The next task is an NVDA keyboard walkthrough of selection, inspector, assembly, quiz feedback and origin restoration, recording browser/version and any defects. Optional particle and interactive PCB-layer expansion remain unimplemented backlog; the current PCB cutaway is static and labeled conceptual.
