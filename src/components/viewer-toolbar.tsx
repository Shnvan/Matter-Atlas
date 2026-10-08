"use client";
import {
  Focus,
  Scan,
  Eye,
  EyeOff,
  RotateCw,
  RotateCcw,
  Plus,
  Minus,
  Layers,
  MousePointer2,
} from "lucide-react";
import { componentForRef, useUno } from "@/lib/store";
import { Button } from "./ui/button";
export function ViewerToolbar() {
  const s = useUno();
  const selection = !!componentForRef(s.selectedRef)?.referenceDesignators
    .length;
  return (
    <div className="viewer-toolbar" aria-label="Board view controls">
      <div className="toolbar-group">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Zoom out"
          disabled={s.zoom <= 0.65}
          onClick={() => s.setView({ zoom: s.zoom - 0.2 })}
        >
          <Minus size={17} />
        </Button>
        <span className="zoom-readout">{Math.round(s.zoom * 100)}%</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Zoom in"
          disabled={s.zoom >= 3}
          onClick={() => s.setView({ zoom: s.zoom + 0.2 })}
        >
          <Plus size={17} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Fit board"
          onClick={s.resetView}
        >
          <Scan size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Rotate board clockwise"
          onClick={() => s.setView({ rotation: (s.rotation + 90) % 360 })}
        >
          <RotateCw size={17} />
        </Button>
      </div>
      <div className="toolbar-divider" />
      <div className="toolbar-group">
        <Button
          variant="ghost"
          disabled={!selection}
          aria-pressed={s.focused}
          onClick={() => s.setView({ focused: !s.focused })}
        >
          <Focus size={16} />
          <span>Focus</span>
        </Button>
        <Button
          variant="ghost"
          disabled={!selection}
          aria-pressed={s.isolate}
          onClick={() => s.setView({ isolate: !s.isolate, hideOthers: false })}
        >
          <Eye size={16} />
          <span>Isolate</span>
        </Button>
        <Button
          variant="ghost"
          disabled={!selection}
          aria-pressed={s.hideOthers}
          onClick={() =>
            s.setView({ hideOthers: !s.hideOthers, isolate: false })
          }
        >
          <EyeOff size={16} />
          <span>Hide others</span>
        </Button>
        <Button
          variant="ghost"
          aria-pressed={s.mode === "explode"}
          onClick={() =>
            s.setMode(s.mode === "explode" ? "explore" : "explode")
          }
        >
          <Layers size={16} />
          <span>{s.mode === "explode" ? "Reassemble" : "Explode"}</span>
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Reset board view"
        onClick={() => {
          s.resetView();
          s.setMode("explore");
        }}
      >
        <RotateCcw size={17} />
      </Button>
      <span className="pan-help">
        <MousePointer2 size={13} /> Drag empty space to pan
      </span>
    </div>
  );
}
