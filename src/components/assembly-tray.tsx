"use client";
import { useRef, useState } from "react";
import { Check, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";
import { ASSEMBLY_PARTS, componentForRef, useUno } from "@/lib/store";
import { Button } from "./ui/button";
function nearbySlot(x: number, y: number) {
  const direct = document
    .elementFromPoint(x, y)
    ?.closest("[data-slot-ref]")
    ?.getAttribute("data-slot-ref");
  if (direct) return direct;
  let nearest: string | null = null;
  let best = 24;
  for (const slot of document.querySelectorAll("[data-slot-ref]")) {
    const rect = slot.getBoundingClientRect();
    const distance = Math.hypot(
      Math.max(rect.left - x, 0, x - rect.right),
      Math.max(rect.top - y, 0, y - rect.bottom),
    );
    if (rect.width && rect.height && distance < best) {
      best = distance;
      nearest = slot.getAttribute("data-slot-ref");
    }
  }
  return nearest;
}
export function AssemblyTray() {
  const s = useUno();
  const [dragLabel, setDragLabel] = useState<string | null>(null);
  const pointer = useRef<{
    id: number;
    ref: string;
    x: number;
    y: number;
  } | null>(null);
  const complete = s.placedRefs.length === ASSEMBLY_PARTS.length;
  return (
    <section className="assembly-tray" aria-label="Assembly parts tray">
      <div className="tray-heading">
        <div>
          <span className="micro-label">ASSEMBLY LAB</span>
          <h2>
            {complete
              ? "A complete board."
              : `${s.placedRefs.length} of 10 parts placed`}
          </h2>
        </div>
        <div className="tray-actions">
          <Button
            variant="ghost"
            disabled={!s.assemblySelectedRef}
            onClick={s.toggleHint}
          >
            <Lightbulb size={16} />
            Hint
          </Button>
          <Button
            variant="ghost"
            aria-label="Reset assembly"
            onClick={s.resetAssembly}
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
      <progress
        max={10}
        value={s.placedRefs.length}
        aria-label="Assembly progress"
      />
      {complete ? (
        <div className="assembly-complete">
          <Check size={20} />
          <p>
            All ten parts are in place. Each contributes a different function.
          </p>
          <Button onClick={() => s.setMode("explore")}>
            Explore your board
            <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        <>
          <div className="parts-tray">
            {ASSEMBLY_PARTS.map((ref) => {
              const c = componentForRef(ref);
              const placed = s.placedRefs.includes(ref);
              return (
                <button
                  key={ref}
                  data-tray-ref={ref}
                  className={`tray-part ${s.assemblySelectedRef === ref ? "is-selected" : ""}`}
                  disabled={placed}
                  aria-pressed={s.assemblySelectedRef === ref}
                  onClick={() => s.selectAssembly(ref)}
                  onPointerDown={(e) => {
                    if (e.button !== 0 || placed) return;
                    pointer.current = {
                      id: e.pointerId,
                      ref,
                      x: e.clientX,
                      y: e.clientY,
                    };
                    s.selectAssembly(ref);
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => {
                    const p = pointer.current;
                    if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8)
                      setDragLabel(p.ref);
                  }}
                  onPointerUp={(e) => {
                    const p = pointer.current;
                    pointer.current = null;
                    setDragLabel(null);
                    if (!p) return;
                    const moved =
                      Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8;
                    if (e.currentTarget.hasPointerCapture(e.pointerId))
                      e.currentTarget.releasePointerCapture(e.pointerId);
                    if (moved) {
                      const slot = nearbySlot(e.clientX, e.clientY);
                      if (slot === p.ref) s.placePart(p.ref);
                      else s.wrongPlace();
                    }
                  }}
                  onPointerCancel={() => {
                    pointer.current = null;
                    setDragLabel(null);
                  }}
                >
                  <span className="tray-part-icon">
                    {placed ? (
                      <Check size={20} />
                    ) : (
                      <svg viewBox="0 0 50 30" aria-hidden="true">
                        <rect
                          x="11"
                          y="7"
                          width="28"
                          height="16"
                          rx="2"
                          fill="currentColor"
                        />
                        {[14, 21, 28, 35].map((x) => (
                          <path
                            key={x}
                            d={`M${x} 2v5m0 16v5`}
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        ))}
                      </svg>
                    )}
                  </span>
                  <strong>{c?.shortName ?? ref}</strong>
                  <small>
                    {ref}
                    {placed ? " · Placed" : ""}
                  </small>
                </button>
              );
            })}
          </div>
          <p className="assembly-instruction">
            {dragLabel
              ? `Moving ${dragLabel}. Release over the matching slot.`
              : s.hint && s.assemblySelectedRef
                ? `Hint: choose the outlined ${s.assemblySelectedRef} slot. You can use Tab to reach it, then Enter.`
                : s.assemblySelectedRef
                  ? `${s.assemblySelectedRef} selected. Tap its labeled slot, or drag it into place.`
                  : "Select a part and tap its slot, or drag it onto the board. Keyboard: select with Enter, then Tab to a slot."}
          </p>
        </>
      )}
      <p className="model-note">
        An educational matching exercise; assembled hardware contains additional
        fitted parts.
      </p>
    </section>
  );
}
