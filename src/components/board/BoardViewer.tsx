"use client";

import { useId, useRef, type PointerEvent as ReactPointerEvent } from "react";
import geometry from "../../content/board-geometry.json";
import "./BoardViewer.css";

export const ASSEMBLY_REFS = [
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
] as const;
export interface BoardViewerProps {
  selectedRef: string | null;
  onSelect: (ref: string) => void;
  exploded: boolean;
  isolate: boolean;
  hideOthers: boolean;
  focused: boolean;
  rotation: number;
  zoom: number;
  pan: { x: number; y: number };
  onPanChange: (pan: { x: number; y: number }) => void;
  mode: "explore" | "explode" | "assemble" | "signal";
  highlightedRefs?: string[];
  placedRefs?: string[];
  assemblySelectedRef?: string | null;
  onPlace?: (ref: string) => void;
  onWrongPlace?: () => void;
  reducedMotion: boolean;
}
type Part = (typeof geometry.parts)[number];
type Wire = (typeof geometry.outline)[number];
const names: Record<string, string> = {
  ZU4: "ATmega328P main microcontroller",
  U3: "ATmega16U2 USB microcontroller",
  U1: "5 volt regulator",
  U2: "3.3 volt regulator",
  U5: "Dual operational amplifier",
  T1: "P-channel power selection MOSFET",
  X2: "USB Type-B connector",
  X1: "Barrel power connector",
  RESET: "Reset button",
  Y1: "USB crystal clock",
  Y2: "Main ceramic resonator clock",
  IOL: "Digital pins 0 to 7",
  IOH: "Digital pins 8 to 13 and reference",
  POWER: "Power header",
  AD: "Analog header",
  ICSP: "Main programming header",
  ICSP1: "USB programming header",
  F1: "USB resettable fuse",
  L1: "USB shield ferrite bead",
  L2: "Analog supply inductor",
  L: "Built-in LED",
  ON: "Power LED",
  TX: "Transmit activity LED",
  RX: "Receive activity LED",
  JP2: "Unpopulated expansion footprint",
  "RESET-EN": "Reset enable trace",
  GROUND: "Ground connection jumper",
};
export function boardPartName(ref: string) {
  const p = geometry.parts.find((part) => part.ref === ref);
  return names[ref] ?? (p ? `${ref} · ${p.value || "board feature"}` : ref);
}
function wirePath(w: Wire) {
  const [x, y] = w.b;
  if (!w.curve) return `L ${x} ${y}`;
  const chord = Math.hypot(x - w.a[0], y - w.a[1]);
  const radius = chord / (2 * Math.sin((Math.abs(w.curve) * Math.PI) / 360));
  return `A ${radius} ${radius} 0 ${Math.abs(w.curve) > 180 ? 1 : 0} ${w.curve < 0 ? 1 : 0} ${x} ${y}`;
}
const outline = `M ${geometry.outline[0].a.join(" ")} ${geometry.outline.map(wirePath).join(" ")} Z`;
const partCenter = (p: Part) => ({
  x: (p.bounds[0] + p.bounds[2]) / 2,
  y: (p.bounds[1] + p.bounds[3]) / 2,
});
function explodeOffset(part: Part, index: number) {
  const c = partCenter(part);
  const horizontal = (c.x - 34.29) / 34.29;
  const vertical = (c.y - 26.67) / 26.67;
  return { x: horizontal * 9, y: vertical * 9 - (index % 3) * 0.8 };
}

function Pads({ part, holes = false }: { part: Part; holes?: boolean }) {
  return (
    <g aria-hidden="true">
      {part.pads.map((p, i) => (
        <g key={i}>
          {p.shape === "round" || p.shape === "octagon" ? (
            <ellipse
              cx={p.x}
              cy={p.y}
              rx={p.w / 2}
              ry={p.h / 2}
              fill="#b8b4a0"
              stroke="#dcd9bd"
              strokeWidth=".08"
            />
          ) : (
            <rect
              x={p.x - p.w / 2}
              y={p.y - p.h / 2}
              width={p.w}
              height={p.h}
              rx=".12"
              fill="#b8bdb4"
              stroke="#e1e2d6"
              strokeWidth=".07"
            />
          )}
          {holes && p.drill > 0 && (
            <circle cx={p.x} cy={p.y} r={p.drill / 2} fill="#143d3f" />
          )}
        </g>
      ))}
    </g>
  );
}

function PartAppearance({
  p,
  metal,
  plastic,
}: {
  p: Part;
  metal: string;
  plastic: string;
}) {
  const [x, y, right, bottom] = p.bounds;
  const w = Math.max(right - x, 0.8),
    h = Math.max(bottom - y, 0.8);
  const c = partCenter(p);
  const header = ["IOL", "IOH", "AD", "POWER"].includes(p.ref);
  const programmer = ["ICSP", "ICSP1"].includes(p.ref);
  const led = ["L", "ON", "TX", "RX"].includes(p.ref);
  if (!p.populated || p.feature) return <Pads part={p} holes />;
  if (header || programmer)
    return (
      <g>
        <rect
          x={x - 0.12}
          y={y - 0.2}
          width={w + 0.24}
          height={h + 0.65}
          rx=".3"
          fill="#101615"
        />
        <rect
          x={x}
          y={y - 0.18}
          width={w}
          height={h}
          rx=".25"
          fill={plastic}
          stroke="#4b514b"
          strokeWidth=".15"
        />
        {p.pads.map((pad, i) => (
          <g key={i}>
            <rect
              x={pad.x - 0.79}
              y={pad.y - 0.79}
              width="1.58"
              height="1.58"
              fill="#363931"
              stroke="#737466"
              strokeWidth=".12"
            />
            <rect
              x={pad.x - 0.48}
              y={pad.y - 0.48}
              width=".96"
              height=".96"
              fill={programmer ? "#c8ac68" : "#080d0d"}
              stroke={programmer ? "#f0dc99" : "#817257"}
              strokeWidth=".11"
            />
          </g>
        ))}
      </g>
    );
  if (p.ref === "ZU4")
    return (
      <g>
        <rect
          x={x - 0.55}
          y={y - 0.7}
          width={w + 1.1}
          height={h + 1.7}
          rx=".45"
          fill="#111916"
          stroke="#0b1715"
          strokeWidth=".35"
        />
        {p.pads.map((pad, i) => (
          <rect
            key={i}
            x={pad.x - 0.42}
            y={pad.y - 0.6}
            width=".84"
            height="1.8"
            rx=".1"
            fill={metal}
            stroke="#808b86"
            strokeWidth=".08"
          />
        ))}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx=".48"
          fill={plastic}
          stroke="#4d534d"
          strokeWidth=".18"
        />
        <path
          d={`M ${right} ${c.y - 1} A 1 1 0 0 0 ${right} ${c.y + 1}`}
          fill="#121815"
          stroke="#686d61"
          strokeWidth=".13"
        />
        <circle cx={right - 1.8} cy={bottom - 1.2} r=".3" fill="#7c8272" />
        <text
          x={c.x}
          y={c.y + 0.32}
          textAnchor="middle"
          fontSize="1.48"
          fontFamily="monospace"
          letterSpacing=".13"
          fill="#b7beb0"
        >
          ATMEGA328P-PU
        </text>
        <path
          d={`M ${x + 1} ${y + 0.6} H ${right - 1}`}
          stroke="#818677"
          strokeWidth=".12"
          opacity=".65"
        />
      </g>
    );
  if (p.ref === "X2")
    return (
      <g>
        <rect x={x} y={y + 0.5} width={w} height={h} rx=".65" fill="#3e4947" />
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx=".55"
          fill={metal}
          stroke="#8b9692"
          strokeWidth=".2"
        />
        <path
          d={`M ${x + 1} ${y + 0.6} H ${right - 0.5} V ${bottom - 0.6} H ${x + 1}`}
          fill="none"
          stroke="#f2f1df"
          strokeWidth=".23"
        />
        <rect
          x={x - 0.4}
          y={y + 0.65}
          width="2"
          height={h - 1.3}
          rx=".5"
          fill="#444c49"
          stroke="#c3cbc6"
          strokeWidth=".3"
        />
        <rect
          x={x - 0.08}
          y={y + 1.5}
          width=".7"
          height={h - 3}
          rx=".15"
          fill="#152323"
        />
        <path
          d={`M ${x + 4} ${y} V ${y + 2.2} M ${x + 4} ${bottom} V ${bottom - 2.2} M ${right - 2} ${y} V ${y + 1.8} M ${right - 2} ${bottom} V ${bottom - 1.8}`}
          stroke="#7c8984"
          strokeWidth=".25"
        />
        <text
          x={c.x + 1}
          y={c.y + 0.6}
          fontSize="1.6"
          fill="#697870"
          textAnchor="middle"
          fontWeight="600"
        >
          USB
        </text>
      </g>
    );
  if (p.ref === "X1")
    return (
      <g>
        <rect x={x} y={y + 0.6} width={w} height={h} rx=".5" fill="#101716" />
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx=".4"
          fill={plastic}
          stroke="#4b514b"
          strokeWidth=".2"
        />
        <path
          d={`M ${x + 4} ${y} V ${bottom}`}
          stroke="#161e1b"
          strokeWidth=".45"
        />
        <rect
          x={x - 0.3}
          y={y + 0.5}
          width="2.6"
          height={h - 1}
          rx="1.1"
          fill="#151d1b"
          stroke="#596059"
          strokeWidth=".2"
        />
        <rect
          x={x}
          y={y + 1.7}
          width="1.8"
          height={h - 3.4}
          rx=".8"
          fill="#060d0c"
        />
        <path
          d={`M ${x + 5} ${y + 0.75} H ${right - 0.75}`}
          stroke="#777d72"
          strokeWidth=".15"
        />
      </g>
    );
  if (p.ref === "PC1" || p.ref === "PC2")
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx=".7" fill="#2e3b36" />
        <circle cx={c.x} cy={c.y + 0.3} r={Math.min(w, h) / 2} fill="#68776d" />
        <circle
          cx={c.x}
          cy={c.y}
          r={Math.min(w, h) / 2 - 0.12}
          fill={metal}
          stroke="#d5d6c1"
          strokeWidth=".16"
        />
        <path
          d={`M ${c.x - 1.5} ${c.y} H ${c.x + 1.5} M ${c.x} ${c.y - 1.5} V ${c.y + 1.5}`}
          stroke="#758078"
          strokeWidth=".12"
        />
        <path
          d={`M ${x + 0.6} ${y + 0.9} V ${bottom - 0.9}`}
          stroke="#39413a"
          strokeWidth=".7"
        />
        <text
          x={c.x}
          y={c.y + 0.4}
          textAnchor="middle"
          fontSize="1"
          fill="#374c43"
        >
          47
        </text>
      </g>
    );
  if (p.ref === "RESET")
    return (
      <g>
        <Pads part={p} />
        <rect
          x={x + 0.3}
          y={y + 0.15}
          width={w - 0.6}
          height={h - 0.3}
          rx=".35"
          fill={metal}
          stroke="#435d54"
          strokeWidth=".16"
        />
        <rect
          x={c.x - 1.35}
          y={c.y - 1.4}
          width="2.7"
          height="2.8"
          rx=".5"
          fill="#a79d8a"
          stroke="#494e44"
          strokeWidth=".18"
        />
        {[x + 0.75, right - 0.75].map((v) => (
          <circle key={v} cx={v} cy={c.y} r=".24" fill="#52645a" />
        ))}
      </g>
    );
  if (p.ref === "Y1" || p.ref === "Y2")
    return (
      <g>
        <Pads part={p} />
        <rect
          x={x}
          y={y + 0.2}
          width={w}
          height={h}
          rx={p.ref === "Y1" ? h / 2 : 0.45}
          fill="#66766f"
        />
        <rect
          x={x}
          y={y}
          width={w}
          height={h - 0.1}
          rx={p.ref === "Y1" ? h / 2 : 0.45}
          fill={metal}
          stroke="#d0d5c2"
          strokeWidth=".15"
        />
        {p.ref === "Y1" && (
          <text
            x={c.x}
            y={c.y + 0.35}
            textAnchor="middle"
            fontSize=".9"
            fill="#566a60"
          >
            16 MHz
          </text>
        )}
      </g>
    );
  const isCap = /^C\d/.test(p.ref);
  const isFuse = p.ref === "F1";
  const color = led
    ? p.ref === "ON"
      ? "#8daa70"
      : "#d2b465"
    : isFuse
      ? "#bca772"
      : isCap
        ? "#ad9670"
        : plastic;
  return (
    <g>
      <Pads part={p} />
      <rect x={x} y={y + 0.12} width={w} height={h} rx=".12" fill="#24443b" />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={p.ref === "U3" ? 0.22 : 0.1}
        fill={color}
        stroke={isCap || led ? "#d1c8a8" : "#626e60"}
        strokeWidth=".09"
      />
      {p.ref === "U3" && (
        <>
          <circle cx={x + 0.5} cy={bottom - 0.5} r=".19" fill="#a4ae9e" />
          <text
            x={c.x}
            y={c.y + 0.25}
            textAnchor="middle"
            fontSize=".78"
            fill="#b7c3b0"
          >
            16U2
          </text>
        </>
      )}
      {p.ref === "U1" && (
        <text
          x={c.x}
          y={c.y + 0.3}
          textAnchor="middle"
          fontSize=".85"
          fill="#bcc9b4"
          transform={`rotate(-90 ${c.x} ${c.y})`}
        >
          1117
        </text>
      )}
      {/^RN/.test(p.ref) && (
        <path
          d={`M ${c.x} ${y + 0.25} V ${bottom - 0.25}`}
          stroke="#a3aa94"
          strokeWidth=".14"
        />
      )}
      {/^[DL]\d/.test(p.ref) && (
        <path
          d={`M ${x + 0.3} ${y + 0.2} V ${bottom - 0.2}`}
          stroke="#a6b19c"
          strokeWidth=".28"
        />
      )}
    </g>
  );
}

export function BoardViewer(props: BoardViewerProps) {
  const uid = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const camera = useRef<SVGGElement>(null);
  const drag = useRef<{
    clientX: number;
    clientY: number;
    x: number;
    y: number;
    nextX: number;
    nextY: number;
  } | null>(null);
  const selected = geometry.parts.find((p) => p.ref === props.selectedRef);
  const center =
    props.focused && selected ? partCenter(selected) : { x: 34.29, y: 26.67 };
  const scale = props.zoom * (props.focused && selected ? 1.65 : 1);
  const cameraTransform = (x: number, y: number) =>
    `translate(${34.29 + x} ${26.67 + y}) rotate(${props.rotation}) scale(${scale}) translate(${-center.x} ${-center.y})`;
  const metallic = `url(#${uid}-metal)`;
  const plastic = `url(#${uid}-plastic)`;
  const physical = geometry.parts
    .filter(
      (p) =>
        !p.mirrored &&
        !p.ref.startsWith("TP_") &&
        !["ORIGIN", "GND_TP", "GND_TP1"].includes(p.ref),
    )
    .sort((a, b) => Number(b.feature) - Number(a.feature));
  function startPan(event: ReactPointerEvent<SVGSVGElement>) {
    if (
      event.button !== 0 ||
      (event.target as Element).closest("[data-ref], [data-slot-ref]")
    )
      return;
    drag.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      x: props.pan.x,
      y: props.pan.y,
      nextX: props.pan.x,
      nextY: props.pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-panning");
  }
  function movePan(event: ReactPointerEvent<SVGSVGElement>) {
    if (!drag.current || !svg.current) return;
    const rect = svg.current.getBoundingClientRect();
    const ratio = Math.max(91 / rect.width, 75 / rect.height);
    drag.current.nextX =
      drag.current.x + (event.clientX - drag.current.clientX) * ratio;
    drag.current.nextY =
      drag.current.y + (event.clientY - drag.current.clientY) * ratio;
    camera.current?.setAttribute(
      "transform",
      cameraTransform(drag.current.nextX, drag.current.nextY),
    );
  }
  function endPan(event: ReactPointerEvent<SVGSVGElement>) {
    if (!drag.current) return;
    props.onPanChange({ x: drag.current.nextX, y: drag.current.nextY });
    drag.current = null;
    event.currentTarget.classList.remove("is-panning");
  }
  function cancelPan(event: ReactPointerEvent<SVGSVGElement>) {
    drag.current = null;
    camera.current?.setAttribute(
      "transform",
      cameraTransform(props.pan.x, props.pan.y),
    );
    event.currentTarget.classList.remove("is-panning");
  }
  function place(target: string, dragged?: string) {
    if ((dragged || props.assemblySelectedRef) === target)
      props.onPlace?.(target);
    else props.onWrongPlace?.();
  }
  return (
    <div
      className={`uno-board-stage${props.reducedMotion ? " uno-reduced-motion" : ""}`}
    >
      <svg
        ref={svg}
        className="uno-board-svg"
        viewBox="-11 -11 91 75"
        role="group"
        tabIndex={0}
        aria-label="Interactive Arduino Uno Rev3 board"
        aria-describedby={`${uid}-camera-help`}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          const directions: Record<string, [number, number]> = {
            ArrowLeft: [-5, 0],
            ArrowRight: [5, 0],
            ArrowUp: [0, -5],
            ArrowDown: [0, 5],
          };
          const direction = directions[e.key];
          if (direction) {
            e.preventDefault();
            props.onPanChange({
              x: props.pan.x + direction[0],
              y: props.pan.y + direction[1],
            });
          } else if (e.key === "Home") {
            e.preventDefault();
            props.onPanChange({ x: 0, y: 0 });
          }
        }}
        onPointerDown={startPan}
        onPointerMove={movePan}
        onPointerUp={endPan}
        onPointerCancel={cancelPan}
      >
        <title>Arduino Uno Rev3 · socketed ATmega328P</title>
        <desc>
          Layout-faithful educational illustration derived from the official
          UNO-TH Rev3e CAD. Package surfaces are simplified. Select a component
          to inspect it. The component navigator provides an equivalent list.
        </desc>
        <defs>
          <linearGradient id={`${uid}-pcb`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#208c91" />
            <stop offset=".56" stopColor="#177e85" />
            <stop offset="1" stopColor="#106b75" />
          </linearGradient>
          <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2=".25" y2="1">
            <stop stopColor="#cfd5cb" />
            <stop offset=".24" stopColor="#eef0e1" />
            <stop offset=".52" stopColor="#a9b6ad" />
            <stop offset="1" stopColor="#d4d9cd" />
          </linearGradient>
          <linearGradient id={`${uid}-plastic`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#394039" />
            <stop offset=".16" stopColor="#29312d" />
            <stop offset="1" stopColor="#1a211e" />
          </linearGradient>
          <filter
            id={`${uid}-shadow`}
            x="-20%"
            y="-20%"
            width="140%"
            height="150%"
          >
            <feDropShadow
              dx=".25"
              dy="1.6"
              stdDeviation="1.35"
              floodColor="#172e2a"
              floodOpacity=".15"
            />
          </filter>
        </defs>
        <g ref={camera} transform={cameraTransform(props.pan.x, props.pan.y)}>
          <g
            opacity={props.isolate && selected ? 0.3 : 1}
            className="uno-board-context"
          >
            <path d={outline} transform="translate(0 .7)" fill="#16434a" />
            <path
              d={outline}
              fill={`url(#${uid}-pcb)`}
              stroke="#12626b"
              strokeWidth=".2"
              filter={`url(#${uid}-shadow)`}
            />
            <g fill="none" stroke="#75c4b4" opacity=".18" aria-hidden="true">
              {geometry.traces.map((t, i) => (
                <path
                  key={i}
                  d={`M ${t.a.join(" ")} ${wirePath(t)}`}
                  strokeWidth={Math.max(0.07, Math.min(t.width, 0.4))}
                />
              ))}
            </g>
            <g aria-hidden="true">
              {geometry.vias.map((v, i) => (
                <circle
                  key={i}
                  cx={v.x}
                  cy={v.y}
                  r={v.r + 0.1}
                  fill="#143f43"
                  stroke="#83b29c"
                  strokeWidth=".1"
                />
              ))}
            </g>
            {geometry.holes.map((h, i) => (
              <g key={i}>
                <circle
                  cx={h.x}
                  cy={h.y}
                  r={h.r + 0.65}
                  fill="#5da297"
                  stroke="#acb69a"
                  strokeWidth=".1"
                />
                <circle cx={h.x} cy={h.y} r={h.r} className="uno-mount-hole" />
                <path
                  d={`M ${h.x - h.r} ${h.y} A ${h.r} ${h.r} 0 0 1 ${h.x + h.r} ${h.y}`}
                  fill="none"
                  stroke="#184b4c"
                  strokeWidth=".2"
                />
              </g>
            ))}
            <g
              fill="#e8f1dc"
              opacity=".87"
              fontFamily="Arial, sans-serif"
              aria-hidden="true"
            >
              {geometry.texts.map((t, i) => (
                <text
                  key={i}
                  x={t.x}
                  y={t.y}
                  fontSize={t.size * 0.84}
                  transform={`rotate(${t.rotation} ${t.x} ${t.y})`}
                >
                  {t.text}
                </text>
              ))}
              <text
                x="44.8"
                y="19.7"
                textAnchor="middle"
                fontSize="7.3"
                fontWeight="700"
                letterSpacing=".1"
              >
                UNO
              </text>
              <text
                x="44.8"
                y="23.2"
                textAnchor="middle"
                fontSize="1.2"
                letterSpacing=".85"
              >
                ARDUINO
              </text>
              <text x="35" y="11.2" fontSize="1.1" letterSpacing=".08">
                DIGITAL (PWM ~)
              </text>
              <text x="32" y="47.2" fontSize="1.05" letterSpacing=".15">
                POWER
              </text>
              <text x="51.6" y="47.2" fontSize="1.05" letterSpacing=".15">
                ANALOG IN
              </text>
              <text x="2.5" y="8.2" fontSize="1.05">
                RESET
              </text>
              <text x="32.2" y="42.8" fontSize=".9" letterSpacing=".1">
                ATmega328P · Rev3
              </text>
              {["L", "TX", "RX", "ON"].map((ref) => {
                const p = geometry.parts.find((p) => p.ref === ref)!;
                return (
                  <text
                    key={ref}
                    x={p.bounds[2] + 0.65}
                    y={partCenter(p).y + 0.35}
                    fontSize="1"
                  >
                    {ref}
                  </text>
                );
              })}
            </g>
          </g>
          {physical.map((p, i) => {
            const c = partCenter(p);
            const isSelected = p.ref === props.selectedRef;
            const signal = props.highlightedRefs?.includes(p.ref);
            const assembly =
              props.mode === "assemble" &&
              (ASSEMBLY_REFS as readonly string[]).includes(p.ref);
            const missing = assembly && !props.placedRefs?.includes(p.ref);
            if (props.hideOthers && selected && !isSelected) return null;
            const offset =
              props.exploded && !p.feature
                ? explodeOffset(p, i)
                : { x: 0, y: 0 };
            const [x, y, r, b] = p.bounds;
            const title = `${p.ref}: ${boardPartName(p.ref)}`;
            if (missing)
              return (
                <g
                  key={p.ref}
                  data-slot-ref={p.ref}
                  role="button"
                  tabIndex={0}
                  aria-label={`Place ${boardPartName(p.ref)} in slot ${p.ref}`}
                  className={`uno-assembly-slot${props.assemblySelectedRef === p.ref ? " is-ready" : ""}`}
                  onClick={() => place(p.ref)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      place(p.ref);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    place(
                      p.ref,
                      e.dataTransfer.getData("application/x-uno-ref") ||
                        e.dataTransfer.getData("text/plain"),
                    );
                  }}
                >
                  <title>{`${title} · empty placement slot`}</title>
                  <Pads part={p} holes />
                  <rect
                    x={Math.min(x - 0.65, c.x - 2.2)}
                    y={Math.min(y - 0.65, c.y - 2.2)}
                    width={Math.max(r - x + 1.3, 4.4)}
                    height={Math.max(b - y + 1.3, 4.4)}
                    rx=".5"
                    className="uno-slot-outline"
                  />
                  <text
                    x={c.x}
                    y={c.y + 0.4}
                    textAnchor="middle"
                    fill="#fffde9"
                    fontFamily="monospace"
                    fontWeight="600"
                    fontSize="1.2"
                  >
                    {p.ref}
                  </text>
                </g>
              );
            return (
              <g
                key={p.ref}
                opacity={props.isolate && selected && !isSelected ? 0.13 : 1}
                className="uno-component-layer"
              >
                {props.exploded && !p.feature && (
                  <line
                    x1={c.x}
                    y1={c.y}
                    x2={c.x + offset.x}
                    y2={c.y + offset.y}
                    stroke="var(--board-leader, #707c6d)"
                    strokeWidth=".12"
                    strokeDasharray=".5 .5"
                    opacity=".6"
                  />
                )}
                <g
                  transform={`translate(${offset.x} ${offset.y})`}
                  className="uno-part-position"
                >
                  <g
                    data-ref={p.ref}
                    role={p.feature || !p.populated ? undefined : "button"}
                    tabIndex={p.feature || !p.populated ? undefined : 0}
                    aria-label={p.feature || !p.populated ? undefined : title}
                    aria-pressed={
                      p.feature || !p.populated ? undefined : isSelected
                    }
                    className={`uno-component${isSelected ? " is-selected" : ""}${signal ? " is-signal" : ""}`}
                    onClick={
                      p.feature || !p.populated
                        ? undefined
                        : () => props.onSelect(p.ref)
                    }
                    onKeyDown={
                      p.feature || !p.populated
                        ? undefined
                        : (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              props.onSelect(p.ref);
                            }
                          }
                    }
                  >
                    <title>{title}</title>
                    <rect
                      x={x - 0.5}
                      y={y - 0.5}
                      width={r - x + 1}
                      height={b - y + 1}
                      rx=".6"
                      fill="transparent"
                      className="uno-hit"
                    />
                    <PartAppearance p={p} metal={metallic} plastic={plastic} />
                    {!p.feature && p.populated && (
                      <rect
                        x={x - 0.55}
                        y={y - 0.55}
                        width={r - x + 1.1}
                        height={b - y + 1.1}
                        rx=".65"
                        className="uno-selection"
                      />
                    )}
                  </g>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      <span id={`${uid}-camera-help`} className="sr-only">
        Select components with Enter or Space. Focus the board itself and use
        arrow keys to pan; Home centers the camera. Labeled zoom, rotation and
        fit controls follow the board.
      </span>
      <p className="uno-board-caption">
        <span>UNO REV3 / TOP VIEW</span>
        <span>Layout-faithful · simplified surfaces</span>
      </p>
    </div>
  );
}
