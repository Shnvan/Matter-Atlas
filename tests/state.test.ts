import { beforeEach, describe, expect, it } from "vitest";
import { useUno, ASSEMBLY_PARTS } from "../src/lib/store";
import { signalJourneys, quizQuestions } from "../src/content";
const initial = useUno.getState();
beforeEach(() => useUno.setState(initial, true));
describe("shared learning state", () => {
  it("selects a real reference without entering its interior", () => {
    useUno.getState().selectRef("ZU4");
    expect(useUno.getState()).toMatchObject({
      selectedRef: "ZU4",
      mode: "explore",
      inspectorOpen: true,
    });
  });
  it("rejects an unknown component without damaging selection", () => {
    useUno.getState().selectRef("ZU4");
    useUno.getState().selectRef("no-part");
    expect(useUno.getState().selectedRef).toBe("ZU4");
  });
  it("follows actual branch history and restores originating component", () => {
    const a = useUno.getState();
    a.enterZoom("ic-package", "ZU4");
    a.enterZoom("silicon-die");
    a.enterZoom("functional-blocks");
    a.zoomBack();
    expect(useUno.getState().nodeId).toBe("silicon-die");
    a.zoomBack();
    a.zoomBack();
    expect(useUno.getState()).toMatchObject({
      mode: "explore",
      selectedRef: "ZU4",
      journeyHistory: [],
    });
  });
  it("recovers invalid node navigation to the board", () => {
    useUno.getState().enterZoom("invented-node");
    expect(useUno.getState().mode).toBe("explore");
    expect(useUno.getState().announcement).toContain("unavailable");
  });
  it("requires the selected part to match and cannot double-place", () => {
    const a = useUno.getState();
    a.selectAssembly("ZU4");
    a.placePart("X2");
    expect(useUno.getState().placedRefs).toEqual([]);
    a.placePart("ZU4");
    a.placePart("ZU4");
    expect(useUno.getState().placedRefs).toEqual(["ZU4"]);
  });
  it("completes ten distinct placements then resets cleanly", () => {
    const a = useUno.getState();
    ASSEMBLY_PARTS.forEach((ref) => {
      a.selectAssembly(ref);
      a.placePart(ref);
    });
    expect(useUno.getState().placedRefs).toHaveLength(10);
    expect(useUno.getState().announcement).toContain("complete");
    a.resetAssembly();
    expect(useUno.getState()).toMatchObject({
      placedRefs: [],
      assemblySelectedRef: null,
      hint: false,
    });
  });
  it("clamps signal steps and stops at the end", () => {
    const a = useUno.getState();
    a.selectSignal(signalJourneys[0].id);
    a.stepSignal(-10);
    expect(useUno.getState().signalStep).toBe(0);
    a.togglePlaying();
    a.stepSignal(999);
    expect(useUno.getState()).toMatchObject({
      signalStep: signalJourneys[0].steps.length - 1,
      playing: false,
    });
    a.restartSignal();
    expect(useUno.getState().signalStep).toBe(0);
  });
  it("stops playback when leaving the signal view", () => {
    const a = useUno.getState();
    a.selectSignal(signalJourneys[0].id);
    a.togglePlaying();
    a.setMode("explore");
    expect(useUno.getState().playing).toBe(false);
  });
  it("scores only the first submitted valid answer", () => {
    const a = useUno.getState();
    const q = quizQuestions[0];
    a.answerQuiz("bad-id");
    expect(useUno.getState().quizAnswers).toEqual({});
    a.answerQuiz(q.correctChoiceId);
    a.answerQuiz(q.choices.find((c) => c.id !== q.correctChoiceId)!.id);
    expect(useUno.getState().quizAnswers[q.id]).toBe(q.correctChoiceId);
  });
  it("requires answers, completes all questions, and clears retry state", () => {
    const a = useUno.getState();
    a.nextQuestion();
    expect(useUno.getState().quizIndex).toBe(0);
    quizQuestions.forEach((q) => {
      a.answerQuiz(q.correctChoiceId);
      a.nextQuestion();
    });
    expect(useUno.getState().quizComplete).toBe(true);
    a.resetQuiz();
    expect(useUno.getState()).toMatchObject({
      quizIndex: 0,
      quizAnswers: {},
      quizComplete: false,
    });
  });
  it("restores camera and visibility through one reset", () => {
    const a = useUno.getState();
    a.setView({
      zoom: 20,
      isolate: true,
      hideOthers: true,
      focused: true,
      rotation: 180,
      pan: { x: 80, y: 50 },
    });
    expect(useUno.getState().zoom).toBe(3);
    a.resetView();
    expect(useUno.getState()).toMatchObject({
      zoom: 1,
      isolate: false,
      hideOthers: false,
      focused: false,
      rotation: 0,
      pan: { x: 0, y: 0 },
    });
  });
  it("motion preference interrupts automatic progression", () => {
    const a = useUno.getState();
    a.selectSignal(signalJourneys[0].id);
    a.togglePlaying();
    a.setReducedMotion(true);
    expect(useUno.getState()).toMatchObject({
      reducedMotion: true,
      playing: false,
    });
  });
});
