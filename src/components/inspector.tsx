"use client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Info,
  ChevronRight,
} from "lucide-react";
import { componentForRef, useUno, type DetailDepth } from "@/lib/store";
import { zoomLevels } from "@/content";
import { Citations } from "./citations";
import { Button } from "./ui/button";
import { SignalInspector } from "./signal-controls";

export function Inspector() {
  const s = useUno();
  const c = componentForRef(s.selectedRef);
  if (s.mode === "signal") return <SignalInspector />;
  if (s.mode === "zoom") {
    const node = zoomLevels.find((n) => n.id === s.nodeId) ?? zoomLevels[0];
    return (
      <div className="inspector-content">
        <div className="eyebrow">WHAT YOU ARE LOOKING AT</div>
        <h2>{node.title}</h2>
        <p className="inspector-lead">{node.subtitle}</p>
        <section className="detail-section">
          <h3>What is it made of?</h3>
          <p>{node.madeOf}</p>
        </section>
        <section className="detail-section">
          <h3>How does it work?</h3>
          <p>{node.explanation}</p>
        </section>
        <details className="detail-disclosure">
          <summary>
            A closer look
            <ChevronRight size={14} />
          </summary>
          <p>{node.detail}</p>
        </details>
        <div className="inspector-note">
          <p>
            {node.applicability}. This is a {node.representation}{" "}
            representation.{" "}
            {node.scale
              ? "Dimensions apply only under the cited conditions."
              : "Unsupported dimensions are intentionally unavailable."}
          </p>
        </div>
        <Citations ids={node.sourceRefs} />
      </div>
    );
  }
  if (!c)
    return (
      <div className="inspector-content overview-inspector">
        <div className="eyebrow">YOUR FIELD GUIDE</div>
        <div className="overview-symbol">
          <Cpu size={36} strokeWidth={1} />
        </div>
        <h2>
          A small board.
          <br />
          <em>A remarkable world.</em>
        </h2>
        <p className="inspector-lead">
          Every component has a job. Every material has a reason to be here.
        </p>
        <div className="hairline" />
        <p className="micro-label">START EXPLORING</p>
        <h3>
          Select a component
          <br />
          to look inside.
        </h3>
        <p>
          Click the board or choose a part from the navigator. Follow it from
          its purpose down to the physics that makes it work.
        </p>
        <button
          className="suggested-component"
          onClick={() => s.selectRef("ZU4")}
        >
          <Cpu size={21} />
          <span>
            Start with the main chip<small>ATmega328P · ZU4</small>
          </span>
          <ArrowUpRight size={18} />
        </button>
        <details className="detail-disclosure">
          <summary>
            How to explore
            <ChevronRight size={14} />
          </summary>
          <p>
            <strong>Explore:</strong> select a part for its purpose, materials
            and mechanism. <strong>Explode:</strong> separate parts with their
            locations preserved. <strong>Assemble:</strong> match ten parts to
            their slots using drag or select-and-place.
          </p>
          <p>
            <strong>Journey:</strong> Zoom inside follows component-specific
            scale branches; Signal journeys trace control, power, data and
            return paths. <strong>Learn:</strong> read the field guide and pin
            reference, then try the 12-question quiz.
          </p>
          <p>
            Tab and Enter reach components and controls. Back retraces your
            journey; Return restores the board. Microscopic scenes are
            conceptual and have no assumed physical scale. Motion can be paused.
          </p>
        </details>
        <div className="inspector-note">
          <Info size={16} />
          <p>
            Based on the socketed Uno Rev3. Board layout follows the published
            design; internal scenes are clearly labeled teaching models.
          </p>
        </div>
        <Citations ids={["SRC-001", "SRC-002"]} />
      </div>
    );
  return (
    <div className="inspector-content" key={c.id}>
      <div className="eyebrow">COMPONENT / {s.selectedRef}</div>
      <div className="detail-category">
        <span className="tiny-dot" />
        {c.category}
      </div>
      <h2>{c.shortName}</h2>
      <p className="part-number">{c.name}</p>
      <p className="inspector-lead">{c.purpose}</p>
      {c.specs.length > 0 && (
        <dl className="spec-list">
          {c.specs.map((spec, i) => (
            <div key={`${spec.label}-${i}`}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="depth-tabs" aria-label="Explanation depth">
        {(["beginner", "intermediate", "deepDive"] as DetailDepth[]).map(
          (depth, i) => (
            <button
              key={depth}
              aria-pressed={s.detailDepth === depth}
              onClick={() => s.setDepth(depth)}
            >
              {["Essentials", "Closer look", "Deep dive"][i]}
            </button>
          ),
        )}
      </div>
      <section className="detail-section">
        <h3>How does it work?</h3>
        <p>
          {s.detailDepth === "beginner"
            ? c.howItWorks
            : s.detailDepth === "intermediate"
              ? c.intermediate
              : c.deepDive}
        </p>
      </section>
      <section className="detail-section">
        <h3>What is it made of?</h3>
        <p>{c.madeOf}</p>
      </section>
      <details className="detail-disclosure">
        <summary>
          What if it were missing?
          <ChevronRight size={14} />
        </summary>
        <p>{c.ifMissing}</p>
      </details>
      <details className="detail-disclosure">
        <summary>
          A useful analogy
          <ChevronRight size={14} />
        </summary>
        <p>{c.analogy}</p>
        <p className="muted">Where it stops working: {c.analogyLimit}</p>
      </details>
      <div className="zoom-actions">
        {c.zoomTargets.map((id, i) => (
          <Button
            key={id}
            variant={i === 0 ? "default" : "outline"}
            onClick={() => s.enterZoom(id, s.selectedRef)}
          >
            <ArrowDownRight size={18} />
            {i === 0
              ? "Zoom inside"
              : (zoomLevels.find((n) => n.id === id)?.title ?? "Related scene")}
          </Button>
        ))}
      </div>
      <div className="evidence-label">
        {c.evidence === "verified"
          ? "Sourced reference design"
          : "Evidence limited"}{" "}
        <span>· {c.representation}</span>
      </div>
      <Citations ids={c.sourceRefs} />
    </div>
  );
}
