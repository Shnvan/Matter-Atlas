"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Menu,
  PanelRight,
  ArrowUpRight,
  ArrowRight,
  Layers,
  MousePointer2,
  Puzzle,
  Route,
  Orbit,
  BookOpen,
  List,
  Pause,
  Play,
} from "lucide-react";
import { useUno, type Mode, componentForRef } from "@/lib/store";
import { components, signalJourneys } from "@/content";
import { BoardViewer } from "./board/BoardViewer";
import { Navigator, matchesSystem } from "./navigator";
import { Inspector } from "./inspector";
import { ViewerToolbar } from "./viewer-toolbar";
import { Sheet } from "./ui/sheet";
import { AssemblyTray } from "./assembly-tray";
import { SignalControls } from "./signal-controls";
import { useAnimationCoordinator } from "@/hooks/use-animation-coordinator";
import { useCompactLayout } from "@/hooks/use-media";
const JourneyView = dynamic(
  () => import("./journey-view").then((m) => m.JourneyView),
  { loading: () => <p className="scene-loading">Opening the next scale…</p> },
);
const LearnView = dynamic(
  () => import("./learn-view").then((m) => m.LearnView),
  { loading: () => <p className="scene-loading">Opening the field guide…</p> },
);
const QuizView = dynamic(() => import("./quiz-view").then((m) => m.QuizView), {
  loading: () => <p className="scene-loading">Preparing your questions…</p>,
});
const isBoardMode = (
  mode: Mode,
): mode is "explore" | "explode" | "assemble" | "signal" =>
  ["explore", "explode", "assemble", "signal"].includes(mode);
const exploreModes = [
  { mode: "explore", label: "Explore", icon: MousePointer2 },
  { mode: "explode", label: "Explode", icon: Layers },
  { mode: "assemble", label: "Assemble", icon: Puzzle },
] as const;
const journeyModes = [
  { mode: "zoom", label: "Scale journey", icon: Orbit },
  { mode: "signal", label: "Signal journeys", icon: Route },
] as const;
const learnModes = [
  { mode: "topics", label: "Field guide", icon: BookOpen },
  { mode: "materials", label: "Materials", icon: Layers },
  { mode: "pins", label: "Pin reference", icon: List },
  { mode: "recap", label: "Connections", icon: Route },
  { mode: "quiz", label: "Test yourself", icon: Puzzle },
] as const;
export function AppShell() {
  const s = useUno();
  const stageRef = useRef<HTMLDivElement>(null);
  const compact = useCompactLayout();
  useAnimationCoordinator();
  const section = ["explore", "explode", "assemble"].includes(s.mode)
    ? "Explore"
    : ["zoom", "signal"].includes(s.mode)
      ? "Journey"
      : "Learn";
  useEffect(() => {
    document.documentElement.dataset.theme = s.theme;
  }, [s.theme]);
  useEffect(() => {
    if (s.mode === "explore" && s.selectedRef)
      requestAnimationFrame(() => {
        const panelOpen = useUno.getState().inspectorOpen;
        if (!panelOpen) {
          const origin =
            document.querySelector<HTMLElement>(
              `[data-ref="${s.selectedRef}"]`,
            ) ?? document.querySelector<HTMLElement>(".uno-board-svg");
          origin?.focus({ preventScroll: true });
        }
      });
  }, [s.mode, s.selectedRef]);
  const openMode = (mode: Mode) => {
    if (mode === "zoom" && !s.nodeId)
      s.enterZoom(
        componentForRef(s.selectedRef)?.zoomTargets[0] ?? "ic-package",
        s.selectedRef ?? "ZU4",
      );
    else s.setMode(mode);
  };
  const journey = signalJourneys.find((j) => j.id === s.signalId);
  const step = journey?.steps[s.signalStep];
  const highlightedRefs =
    s.mode === "signal"
      ? step?.componentRefs.flatMap(
          (id) =>
            components.find((c) => c.id === id)?.referenceDesignators ?? [],
        )
      : s.mode === "assemble"
        ? s.hint && s.assemblySelectedRef
          ? [s.assemblySelectedRef]
          : []
        : s.query ||
            s.subsystem !== "All systems" ||
            s.category !== "All components"
          ? components
              .filter(
                (c) =>
                  matchesSystem(
                    c.subsystem,
                    c.category,
                    c.referenceDesignators,
                    s.subsystem,
                  ) &&
                  (s.category === "All components" ||
                    c.category === s.category) &&
                  `${c.name} ${c.category} ${c.referenceDesignators.join(" ")} ${c.purpose}`
                    .toLowerCase()
                    .includes(s.query.toLowerCase()),
              )
              .flatMap((c) => c.referenceDesignators)
          : [];
  return (
    <div
      className={`application section-${section.toLowerCase()} mode-${s.mode}`}
    >
      <a className="skip-link" href="#workspace">
        Skip to the interactive workspace
      </a>
      <header className="app-header">
        <Link href="/" className="brand" aria-label="Inside the Uno home">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              d="M8 8h16v16H8zM12 2v6m8-6v6M12 24v6m8-6v6M2 12h6m-6 8h6m16-8h6m-6 8h6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M13 13h6v6h-6z" fill="currentColor" />
          </svg>
          <span>
            inside<span className="brand-uno">uno</span>
            <small>FROM BOARD TO ELECTRON</small>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          {(["Explore", "Journey", "Learn"] as const).map((label) => (
            <button
              key={label}
              aria-current={section === label ? "page" : undefined}
              onClick={() =>
                openMode(
                  label === "Explore"
                    ? "explore"
                    : label === "Journey"
                      ? "zoom"
                      : "topics",
                )
              }
            >
              {label}
              <span className="nav-arrow">↗</span>
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <span className="edition-label">AN INTERACTIVE ATLAS</span>
          <button
            className="icon-button theme-toggle"
            aria-label={
              s.theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            onClick={s.toggleTheme}
          >
            {s.theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <Link
            href="/project/"
            className="project-link"
            aria-label="Project and research documentation"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </header>
      <div className="workspace-layout">
        <aside className="desktop-navigator" aria-label="Component navigator">
          <Navigator />
        </aside>
        <main id="workspace" tabIndex={-1} className="workspace" ref={stageRef}>
          <div className="workspace-navigation">
            <button
              data-open-navigator
              className="icon-button mobile-panel-button"
              aria-label="Open component navigator"
              onClick={() => s.setPanel("navigator", true)}
            >
              <Menu size={19} />
            </button>
            <nav className="mode-nav" aria-label={`${section} views`}>
              {(section === "Explore"
                ? exploreModes
                : section === "Journey"
                  ? journeyModes
                  : learnModes
              ).map(({ mode, label, icon: Icon }) => (
                <button
                  key={mode}
                  aria-current={s.mode === mode ? "page" : undefined}
                  onClick={() => openMode(mode)}
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <button
              data-open-inspector
              className="icon-button mobile-panel-button"
              aria-label="Open details"
              onClick={() => s.setPanel("inspector", true)}
            >
              <PanelRight size={19} />
            </button>
          </div>
          {isBoardMode(s.mode) ? (
            <>
              <div className="object-heading">
                <div>
                  <div className="eyebrow">
                    {s.mode === "assemble"
                      ? "LEARN BY PUTTING IT TOGETHER"
                      : s.mode === "signal"
                        ? "FOLLOW THE CONNECTIONS"
                        : "01 / THE COMPLETE BOARD"}
                  </div>
                  <h1>
                    {s.mode === "assemble"
                      ? "Piece by piece."
                      : s.mode === "signal"
                        ? journey?.title
                        : "Arduino Uno"}
                    {s.mode === "explore" && (
                      <span className="revision">REV3</span>
                    )}
                  </h1>
                </div>
                <div className="object-heading-note">
                  {s.mode === "explode"
                    ? "Separate the parts. Keep the connections."
                    : s.mode === "assemble"
                      ? "Select a part, then its matching slot."
                      : s.mode === "signal"
                        ? "Control · power · information · return"
                        : "A familiar object. An extraordinary interior."}
                </div>
              </div>
              <div className="board-space">
                <span
                  className="registration registration-tl"
                  aria-hidden="true"
                />
                <span
                  className="registration registration-br"
                  aria-hidden="true"
                />
                <BoardViewer
                  selectedRef={s.selectedRef}
                  onSelect={s.selectRef}
                  exploded={s.mode === "explode"}
                  isolate={s.isolate}
                  hideOthers={s.hideOthers}
                  focused={s.focused}
                  rotation={s.rotation}
                  zoom={s.zoom}
                  pan={s.pan}
                  onPanChange={(pan) => s.setView({ pan })}
                  mode={s.mode}
                  highlightedRefs={highlightedRefs}
                  placedRefs={s.placedRefs}
                  assemblySelectedRef={s.assemblySelectedRef}
                  onPlace={s.placePart}
                  onWrongPlace={s.wrongPlace}
                  reducedMotion={s.reducedMotion || s.motionPaused}
                />
              </div>
              {s.mode === "assemble" ? (
                <AssemblyTray />
              ) : s.mode === "signal" ? (
                <SignalControls />
              ) : (
                <>
                  <div className="board-caption-row">
                    <span>
                      <span className="tiny-dot" />{" "}
                      {s.selectedRef
                        ? `${s.selectedRef} / ${componentForRef(s.selectedRef)?.shortName}`
                        : "Select any component to begin"}
                    </span>
                    <button
                      className="text-button"
                      onClick={() =>
                        s.enterZoom(
                          componentForRef(s.selectedRef)?.zoomTargets[0] ??
                            "ic-package",
                          s.selectedRef ?? "ZU4",
                        )
                      }
                    >
                      Look inside <ArrowRight size={15} />
                    </button>
                  </div>
                  <ViewerToolbar />
                </>
              )}
            </>
          ) : s.mode === "zoom" ? (
            <JourneyView />
          ) : s.mode === "quiz" ? (
            <QuizView />
          ) : (
            <LearnView />
          )}
          <footer className="workspace-footer">
            <span>
              INSIDE THE UNO <span className="footer-separator">/</span>{" "}
              {s.mode === "zoom"
                ? "FROM HARDWARE TO PHYSICS"
                : "AN OPEN HARDWARE EXPLORATION"}
            </span>
            <button
              aria-label={
                s.motionPaused
                  ? "Enable explanatory motion"
                  : "Pause explanatory motion"
              }
              onClick={s.toggleMotion}
            >
              {s.motionPaused ? <Play size={12} /> : <Pause size={12} />}
              <span>
                {s.motionPaused
                  ? "Motion paused"
                  : s.reducedMotion
                    ? "Reduced motion"
                    : "Motion"}
              </span>
            </button>
          </footer>
        </main>
        <aside className="desktop-inspector" aria-label="Object details">
          <Inspector />
        </aside>
      </div>
      <div className="sr-only" aria-live="polite" role="status">
        {s.announcement}
      </div>
      {compact && (
        <div className="responsive-sheets">
          <Sheet
            open={s.navigatorOpen}
            onOpenChange={(v) => s.setPanel("navigator", v)}
            title="Explore the board"
          >
            <Navigator />
          </Sheet>
          <Sheet
            open={s.inspectorOpen}
            onOpenChange={(v) => s.setPanel("inspector", v)}
            title="Object details"
            side="right"
          >
            <Inspector />
          </Sheet>
        </div>
      )}
    </div>
  );
}
