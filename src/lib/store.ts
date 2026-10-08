import { create } from "zustand";
import {
  components,
  zoomLevels,
  signalJourneys,
  quizQuestions,
} from "@/content";

export type Mode =
  | "explore"
  | "explode"
  | "assemble"
  | "zoom"
  | "signal"
  | "topics"
  | "pins"
  | "quiz"
  | "materials"
  | "recap";
export type DetailDepth = "beginner" | "intermediate" | "deepDive";
export const ASSEMBLY_PARTS = [
  "ZU4",
  "X2",
  "X1",
  "U3",
  "U1",
  "U2",
  "T1",
  "Y1",
  "Y2",
  "RESET",
];
export const componentForRef = (ref: string | null) =>
  components.find(
    (c) => c.id === ref || c.referenceDesignators.includes(ref ?? ""),
  );

interface UnoState {
  mode: Mode;
  selectedRef: string | null;
  detailDepth: DetailDepth;
  query: string;
  subsystem: string;
  category: string;
  theme: "light" | "dark";
  navigatorOpen: boolean;
  inspectorOpen: boolean;
  focused: boolean;
  isolate: boolean;
  hideOthers: boolean;
  zoom: number;
  rotation: number;
  pan: { x: number; y: number };
  nodeId: string | null;
  journeyHistory: string[];
  originRef: string | null;
  assemblySelectedRef: string | null;
  placedRefs: string[];
  hint: boolean;
  signalId: string;
  signalStep: number;
  playing: boolean;
  quizIndex: number;
  quizAnswers: Record<string, string>;
  quizComplete: boolean;
  topicId: string | null;
  motionPaused: boolean;
  reducedMotion: boolean;
  announcement: string;
  setMode: (mode: Mode) => void;
  selectRef: (ref: string) => void;
  setDepth: (depth: DetailDepth) => void;
  setQuery: (query: string) => void;
  setSubsystem: (subsystem: string) => void;
  setCategory: (category: string) => void;
  toggleTheme: () => void;
  setPanel: (panel: "navigator" | "inspector", open: boolean) => void;
  setView: (
    patch: Partial<
      Pick<
        UnoState,
        "focused" | "isolate" | "hideOthers" | "zoom" | "rotation" | "pan"
      >
    >,
  ) => void;
  resetView: () => void;
  enterZoom: (nodeId: string, originRef?: string | null) => void;
  zoomBack: () => void;
  returnToBoard: () => void;
  selectAssembly: (ref: string) => void;
  placePart: (ref: string) => void;
  wrongPlace: () => void;
  resetAssembly: () => void;
  toggleHint: () => void;
  selectSignal: (id: string) => void;
  stepSignal: (delta: number) => void;
  restartSignal: () => void;
  togglePlaying: () => void;
  answerQuiz: (choice: string) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  selectTopic: (id: string) => void;
  setReducedMotion: (value: boolean) => void;
  toggleMotion: () => void;
}
const defaultView = {
  focused: false,
  isolate: false,
  hideOthers: false,
  zoom: 1,
  rotation: 0,
  pan: { x: 0, y: 0 },
};
export const useUno = create<UnoState>((set, get) => ({
  mode: "explore",
  selectedRef: null,
  detailDepth: "beginner",
  query: "",
  subsystem: "All systems",
  category: "All components",
  theme: "light",
  navigatorOpen: false,
  inspectorOpen: false,
  ...defaultView,
  nodeId: null,
  journeyHistory: [],
  originRef: null,
  assemblySelectedRef: null,
  placedRefs: [],
  hint: false,
  signalId: signalJourneys[0]?.id ?? "",
  signalStep: 0,
  playing: false,
  quizIndex: 0,
  quizAnswers: {},
  quizComplete: false,
  topicId: null,
  motionPaused: false,
  reducedMotion: false,
  announcement: "",
  setMode: (mode) =>
    set({
      mode,
      playing: false,
      navigatorOpen: false,
      inspectorOpen: false,
      announcement: `${mode === "zoom" ? "Scale journey" : mode} view`,
      ...(mode === "assemble" ? { ...defaultView } : {}),
    }),
  selectRef: (ref) => {
    const part = componentForRef(ref);
    if (!part) {
      set({
        announcement:
          "This board feature is not a fitted component. Select a component in the navigator.",
      });
      return;
    }
    set({
      selectedRef: ref,
      detailDepth: "beginner",
      navigatorOpen: false,
      inspectorOpen: true,
      announcement: `Selected ${part.name}, ${ref}`,
    });
  },
  setDepth: (detailDepth) => set({ detailDepth }),
  setQuery: (query) => set({ query }),
  setSubsystem: (subsystem) => set({ subsystem }),
  setCategory: (category) => set({ category }),
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
  setPanel: (panel, open) =>
    set(
      panel === "navigator" ? { navigatorOpen: open } : { inspectorOpen: open },
    ),
  setView: (patch) =>
    set((s) => ({
      ...patch,
      zoom: Math.max(0.65, Math.min(3, patch.zoom ?? s.zoom)),
    })),
  resetView: () =>
    set({ ...defaultView, announcement: "Board view restored." }),
  enterZoom: (nodeId, originRef) => {
    const node = zoomLevels.find((n) => n.id === nodeId);
    if (!node) {
      set({
        mode: "explore",
        announcement: "That scene is unavailable. Returned to the board.",
      });
      return;
    }
    const s = get();
    const continuing = s.mode === "zoom" && originRef === undefined;
    set({
      mode: "zoom",
      nodeId,
      journeyHistory: continuing ? [...s.journeyHistory, nodeId] : [nodeId],
      originRef: continuing ? s.originRef : (originRef ?? s.selectedRef),
      playing: false,
      navigatorOpen: false,
      inspectorOpen: false,
      announcement: `Now viewing ${node.title}. ${node.representation} illustration.`,
    });
  },
  zoomBack: () => {
    const h = get().journeyHistory;
    if (h.length < 2) {
      get().returnToBoard();
      return;
    }
    const next = h.slice(0, -1);
    const node = zoomLevels.find((n) => n.id === next.at(-1));
    set({
      journeyHistory: next,
      nodeId: next.at(-1)!,
      announcement: `Returned to ${node?.title ?? "previous scene"}.`,
    });
  },
  returnToBoard: () =>
    set((s) => ({
      mode: "explore",
      selectedRef: s.originRef ?? s.selectedRef,
      nodeId: null,
      journeyHistory: [],
      inspectorOpen: false,
      announcement: "Returned to the originating board component.",
    })),
  selectAssembly: (ref) => {
    if (ASSEMBLY_PARTS.includes(ref) && !get().placedRefs.includes(ref))
      set({
        assemblySelectedRef: ref,
        hint: false,
        announcement: `${componentForRef(ref)?.shortName ?? ref} selected. Choose its matching board slot.`,
      });
  },
  placePart: (ref) => {
    const s = get();
    if (
      s.assemblySelectedRef !== ref ||
      !ASSEMBLY_PARTS.includes(ref) ||
      s.placedRefs.includes(ref)
    ) {
      get().wrongPlace();
      return;
    }
    const placedRefs = [...s.placedRefs, ref];
    set({
      placedRefs,
      assemblySelectedRef: null,
      hint: false,
      announcement:
        placedRefs.length === ASSEMBLY_PARTS.length
          ? "Assembly complete. All ten parts are in place."
          : `${ref} placed. ${placedRefs.length} of ${ASSEMBLY_PARTS.length} complete.`,
    });
  },
  wrongPlace: () =>
    set({
      announcement:
        "That slot does not match. Your part remains in the tray. Try another slot or use Hint.",
    }),
  resetAssembly: () =>
    set({
      placedRefs: [],
      assemblySelectedRef: null,
      hint: false,
      announcement: "Assembly reset. Ten parts remain.",
    }),
  toggleHint: () =>
    set((s) => ({
      hint: !s.hint,
      announcement: s.assemblySelectedRef
        ? `Look for the outlined ${s.assemblySelectedRef} slot on the board.`
        : "Select a part first, then request a hint.",
    })),
  selectSignal: (id) => {
    if (signalJourneys.some((j) => j.id === id))
      set({
        signalId: id,
        signalStep: 0,
        playing: false,
        mode: "signal",
        announcement: "Signal journey ready.",
      });
  },
  stepSignal: (delta) =>
    set((s) => {
      const max =
        (signalJourneys.find((j) => j.id === s.signalId)?.steps.length ?? 1) -
        1;
      const signalStep = Math.max(0, Math.min(max, s.signalStep + delta));
      return {
        signalStep,
        playing: signalStep === max ? false : s.playing,
        announcement:
          signalJourneys.find((j) => j.id === s.signalId)?.steps[signalStep]
            ?.title ?? "",
      };
    }),
  restartSignal: () =>
    set({
      signalStep: 0,
      playing: false,
      announcement: "Signal journey restarted.",
    }),
  togglePlaying: () =>
    set((s) => ({
      playing: !s.playing,
      signalStep:
        s.signalStep >=
        (signalJourneys.find((j) => j.id === s.signalId)?.steps.length ?? 1) - 1
          ? 0
          : s.signalStep,
    })),
  answerQuiz: (choice) => {
    const s = get();
    const q = quizQuestions[s.quizIndex];
    if (!q || s.quizAnswers[q.id] || !q.choices.some((c) => c.id === choice))
      return;
    set({
      quizAnswers: { ...s.quizAnswers, [q.id]: choice },
      announcement:
        choice === q.correctChoiceId
          ? "Correct. Read the explanation below."
          : "Not quite. Read the explanation below.",
    });
  },
  nextQuestion: () =>
    set((s) =>
      s.quizAnswers[quizQuestions[s.quizIndex]?.id]
        ? s.quizIndex === quizQuestions.length - 1
          ? { quizComplete: true }
          : { quizIndex: s.quizIndex + 1 }
        : {},
    ),
  resetQuiz: () =>
    set({
      quizIndex: 0,
      quizAnswers: {},
      quizComplete: false,
      announcement: "Quiz restarted.",
    }),
  selectTopic: (topicId) =>
    set({ topicId, mode: "topics", navigatorOpen: false }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion, playing: false }),
  toggleMotion: () =>
    set((s) => ({ motionPaused: !s.motionPaused, playing: false })),
}));
