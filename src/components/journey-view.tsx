"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CornerUpLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { zoomLevels } from "@/content";
import { useUno } from "@/lib/store";
import { SceneIllustration } from "./scenes/SceneIllustration";
import { Button } from "./ui/button";
import { Citations } from "./citations";
export function JourneyView() {
  const s = useUno();
  const node = zoomLevels.find((n) => n.id === s.nodeId) ?? zoomLevels[0];
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [node.id]);
  return (
    <div className="journey-view">
      <div className="journey-top">
        <button className="text-button" onClick={s.returnToBoard}>
          <CornerUpLeft size={15} /> Return to {s.originRef ?? "board"}
        </button>
        <span className="micro-label">A JOURNEY THROUGH SCALE</span>
      </div>
      <nav className="journey-breadcrumbs" aria-label="Your journey">
        <button onClick={s.returnToBoard}>Uno</button>
        {s.journeyHistory.map((id, i) => (
          <span key={`${id}-${i}`}>
            <ChevronRight size={12} />
            <button
              aria-current={
                i === s.journeyHistory.length - 1 ? "step" : undefined
              }
              onClick={() => {
                if (i < s.journeyHistory.length - 1)
                  useUno.setState({
                    nodeId: id,
                    journeyHistory: s.journeyHistory.slice(0, i + 1),
                  });
              }}
            >
              {zoomLevels.find((n) => n.id === id)?.title}
            </button>
          </span>
        ))}
      </nav>
      {s.originRef === "U3" && (
        <p className="shared-model-note">
          Shared IC concepts are illustrated with an{" "}
          <strong>ATmega328P example</strong>. The ATmega16U2 USB controller has
          different capacities and peripherals. U3 remains your return target.
        </p>
      )}
      <motion.div
        key={node.id}
        className="scene-content"
        initial={
          s.reducedMotion || s.motionPaused ? false : { opacity: 0, y: 12 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24 }}
      >
        <div className="scene-heading">
          <div className="eyebrow">{node.subtitle}</div>
          <h1 tabIndex={-1} ref={heading}>
            {node.title}
          </h1>
          <p>{node.explanation}</p>
        </div>
        <SceneIllustration
          node={node}
          reducedMotion={s.reducedMotion || s.motionPaused}
        />
        <div className="scene-truth">
          <span>{node.representation.toUpperCase()} MODEL</span>
          <span>
            {node.scale
              ? `${node.scale.meaning}: ${node.scale.value} ${node.scale.unit}`
              : node.abstraction === "information"
                ? "Information has no physical size"
                : node.abstraction === "functional"
                  ? "Functional organization · no physical scale"
                  : "Physical scale not established"}
          </span>
        </div>
      </motion.div>
      <div className="journey-next">
        <Button variant="ghost" onClick={s.zoomBack}>
          <ArrowLeft size={16} />
          Back
        </Button>
        <div className="next-branches">
          {node.next.map((id, i) => (
            <Button
              key={id}
              variant={i === 0 ? "default" : "outline"}
              onClick={() => s.enterZoom(id)}
            >
              {zoomLevels.find((n) => n.id === id)?.title ?? id}
              <ArrowRight size={16} />
            </Button>
          ))}
          {node.next.length === 0 && (
            <Button onClick={s.returnToBoard}>
              Return to the board
              <CornerUpLeft size={16} />
            </Button>
          )}
        </div>
      </div>
      <details className="scene-explanation detail-disclosure">
        <summary>
          What is this made of?
          <ChevronRight size={14} />
        </summary>
        <p>{node.madeOf}</p>
        <p>{node.detail}</p>
        <Citations ids={node.sourceRefs} />
      </details>
      <div className="electrical-crosslink">
        <Zap size={14} />
        <button
          className="text-button"
          onClick={() => s.selectTopic(node.electricalTopicId)}
        >
          Connect this to charge, fields and current
        </button>
      </div>
    </div>
  );
}
export function JourneyInspector() {
  const s = useUno();
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
          {node.applicability}. This is a {node.representation} representation.{" "}
          {node.scale
            ? "Dimensions apply only under the cited conditions."
            : "Unsupported dimensions are intentionally unavailable."}
        </p>
      </div>
      <Citations ids={node.sourceRefs} />
    </div>
  );
}
