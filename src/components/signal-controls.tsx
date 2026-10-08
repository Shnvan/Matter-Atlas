"use client";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { signalJourneys } from "@/content";
import { useUno } from "@/lib/store";
import { Button } from "./ui/button";
import { Citations } from "./citations";
export function SignalControls() {
  const s = useUno();
  const j =
    signalJourneys.find((j) => j.id === s.signalId) ?? signalJourneys[0];
  const step = j.steps[s.signalStep];
  return (
    <section className="signal-controls" aria-label="Signal playback">
      <div className="signal-step">
        <span className={`edge-label edge-${step.edgeType}`}>
          {step.edgeType.toUpperCase()}
        </span>
        <div>
          <h2>{step.title}</h2>
          <p>{step.text}</p>
        </div>
      </div>
      <div className="signal-playback">
        <span className="mono">
          {String(s.signalStep + 1).padStart(2, "0")} /{" "}
          {String(j.steps.length).padStart(2, "0")}
        </span>
        <progress
          value={s.signalStep + 1}
          max={j.steps.length}
          aria-label="Journey progress"
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous signal step"
          disabled={s.signalStep === 0}
          onClick={() => s.stepSignal(-1)}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          variant="outline"
          disabled={s.reducedMotion || s.motionPaused}
          onClick={s.togglePlaying}
        >
          {s.playing ? <Pause size={16} /> : <Play size={16} />}{" "}
          {s.playing ? "Pause" : "Play"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next signal step"
          disabled={s.signalStep === j.steps.length - 1}
          onClick={() => s.stepSignal(1)}
        >
          <ChevronRight size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Restart signal journey"
          onClick={s.restartSignal}
        >
          <RotateCcw size={16} />
        </Button>
      </div>
      {(s.reducedMotion || s.motionPaused) && (
        <p className="model-note">
          Automatic playback is paused. Use Previous and Next to read every
          step.
        </p>
      )}
    </section>
  );
}
export function SignalInspector() {
  const s = useUno();
  const j =
    signalJourneys.find((j) => j.id === s.signalId) ?? signalJourneys[0];
  return (
    <div className="inspector-content">
      <div className="eyebrow">CAUSAL JOURNEYS</div>
      <h2>Follow what happens.</h2>
      <p className="inspector-lead">
        Trace energy, control and information through the real circuit.
      </p>
      <label className="field-label" htmlFor="journey-select">
        Choose a journey
      </label>
      <select
        id="journey-select"
        value={s.signalId}
        onChange={(e) => s.selectSignal(e.target.value)}
      >
        {signalJourneys.map((j) => (
          <option key={j.id} value={j.id}>
            {j.title}
          </option>
        ))}
      </select>
      <ol className="signal-step-list">
        {j.steps.map((step, i) => (
          <li key={step.id}>
            <button
              aria-current={i === s.signalStep ? "step" : undefined}
              onClick={() => {
                useUno.setState({ playing: false });
                s.stepSignal(i - s.signalStep);
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                {step.title}
                <small>{step.edgeType}</small>
              </div>
            </button>
          </li>
        ))}
      </ol>
      <p className="model-note">
        The sequence explains causes. It does not imply every component is
        connected in series. Animation timing is illustrative.
      </p>
      <Citations ids={j.sourceRefs} />
    </div>
  );
}
