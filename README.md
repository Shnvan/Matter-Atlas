# Inside the Arduino Uno: From Board to Electron

An accurate, accessible journey from the socketed Uno Rev3 to circuits, materials, electrons and photons. The NASA-inspired local application now implements all six modes on the verified research foundation. [TASKS](TASKS.md) records actual acceptance status.

## Start here

Contributors: [AGENTS](AGENTS.md), [HANDOFF](HANDOFF.md), [TASKS](TASKS.md), then [PROJECT](PROJECT.md), [CONTEXT](CONTEXT.md) and [DECISIONS](DECISIONS.md). Hardware/content: [inventory](COMPONENT_INVENTORY.md), [sources](SOURCES.md), [research](RESEARCH.md), [data contracts](DATA_MODEL.md). Design/engineering: [DESIGN](DESIGN.md), [UX](UX.md), [ARCHITECTURE](ARCHITECTURE.md), [ACCESSIBILITY](ACCESSIBILITY.md).

## Local application and legacy guide

The application uses npm, Next.js static export and locally bundled content/fonts. Use Node.js 20.9 or later and install the exact committed dependency graph with `npm ci`. Build and open the local export:

```powershell
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4173/. For development, use `npm run dev` (port 3000). The production output is `out/`; no Node server or runtime filesystem is required beyond serving these static files.
The export requires a local HTTP server; it makes no required internet content requests. Contributor material is under /project/ in the application.

Open root [index.html](index.html) directly to read the preserved foundation guide. It is historical contributor documentation and remains usable through file://. The original foundation is also retained in Git commit eef829b. No hosting or cloud services are part of this delivery.

## Validation

From the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-foundation.ps1
```

The dependency-free validator checks required memory, links, canonical IDs, task traceability/dependencies, inventory and handoff. Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e` for application verification. Install the test browser once with `npx playwright install chromium` if absent. The browser suite starts/reuses the preview server, compares 14 reviewed Windows/Chromium baselines, checks axe, and includes native 200% tab zoom. Baselines for another OS/browser must be inspected before accepting updates. Application checks are separate from memory validation; see [TESTING](TESTING.md) for actual results and limitations.

## Evidence and ownership

The hardware reference remains UNO-TH_Rev3e A000066, not every production Uno. The inventory accounts for 116 CAD elements and preserves manual discrepancies. Bibliography and terminology remain canonical; application data is a reviewed projection. [Migration ExecPlan](.agent/PLANS.md) describes sequencing; [UI audit](docs/design/UI_AUDIT.md) records the initial interface; source briefs remain in docs/briefs.

## Maintaining content

The bundle is a reviewed projection, not a replacement for canonical facts. `src/content` contains typed records and Zod validation; `src/lib/store.ts` owns interaction transitions. `scripts/generate-board.py <official .brd path>` regenerates layout geometry from SRC-002; it is not needed to build. Review generated diffs and source applicability before changing content. `npm run format` formats source/test files. See HANDOFF for the next verification task and known limits.
