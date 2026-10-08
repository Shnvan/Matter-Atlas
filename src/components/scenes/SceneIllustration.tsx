"use client";

import { useId, useState, type ReactNode } from "react";
import type { ZoomNode } from "@/content/types";
import styles from "./SceneIllustration.module.css";

type Props = { node: ZoomNode; reducedMotion: boolean };
const ink = "var(--ink)";
const muted = "var(--muted)";
const line = "var(--line)";
const accent = "var(--teal)";
const surface = "var(--surface)";
const canvas = "var(--canvas)";
const wire = { fill: "none", stroke: muted, strokeWidth: 2 };

function Label({
  x,
  y,
  children,
  small = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  small?: boolean;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" style={{ fontSize: small ? 12 : 15 }}>
      {children}
    </text>
  );
}
function Box({
  x,
  y,
  width = 150,
  height = 76,
  title,
  subtitle,
  active = false,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title: string;
  subtitle?: string;
  active?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={active ? canvas : surface}
        stroke={active ? accent : muted}
        strokeWidth={active ? 3 : 1.5}
        rx="3"
      />
      <Label x={x + width / 2} y={y + (subtitle ? 32 : height / 2 + 5)}>
        {title}
      </Label>
      {subtitle && (
        <Label x={x + width / 2} y={y + 53} small>
          {subtitle}
        </Label>
      )}
    </g>
  );
}
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = muted,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1),
    tip = 8;
  return (
    <g stroke={color} strokeWidth="2" fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path
        d={`M${x2 - tip * Math.cos(angle - 0.45)},${y2 - tip * Math.sin(angle - 0.45)} L${x2},${y2} L${x2 - tip * Math.cos(angle + 0.45)},${y2 - tip * Math.sin(angle + 0.45)}`}
      />
    </g>
  );
}
function Carrier({
  x,
  y,
  hole = false,
}: {
  x: number;
  y: number;
  hole?: boolean;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="9"
        fill={hole ? surface : accent}
        stroke={hole ? ink : accent}
        strokeWidth="1.5"
      />
      <path
        d={`M${x - 4},${y}h8${hole ? ` M${x},${y - 4}v8` : ""}`}
        stroke={hole ? ink : canvas}
        strokeWidth="1.4"
      />
    </g>
  );
}
function Cloud({ nucleus = false }: { nucleus?: boolean }) {
  return (
    <g>
      {Array.from({ length: 240 }, (_, i) => {
        const angle = i * 2.399963,
          distance = 128 * Math.sqrt((i + 0.5) / 240),
          flatten = 0.78;
        return (
          <circle
            key={i}
            cx={380 + Math.cos(angle) * distance}
            cy={160 + Math.sin(angle) * distance * flatten}
            r={1.5 + (i % 3) * 0.4}
            fill={accent}
            opacity={0.85 - distance / 180}
          />
        );
      })}
      {nucleus && (
        <>
          <circle cx="380" cy="160" r="9" fill={ink} />
          <path d="M389 160H540V107" {...wire} />
          <Label x={568} y={95}>
            Nucleus
          </Label>
        </>
      )}
      <Label x={380} y={300}>
        Density represents detection probability—not a trajectory.
      </Label>
    </g>
  );
}

export function SceneIllustration(props: Props) {
  return <Illustration key={props.node.id} {...props} />;
}

function Illustration({ node, reducedMotion }: Props) {
  const id = useId();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [gate, setGate] = useState("AND");
  const [power, setPower] = useState(true);
  const [event, setEvent] = useState(0);
  const [doping, setDoping] = useState("pure");
  const [sample, setSample] = useState(50);
  let graphic: ReactNode;
  let controls: ReactNode = null;
  let explanation = node.explanation;
  const toggle = (label: string, value: boolean, action: () => void) => (
    <button type="button" aria-pressed={value} onClick={action}>
      {label}: {value ? "ON" : "OFF"}
    </button>
  );

  switch (node.visualType) {
    case "package":
      graphic = (
        <g>
          <path
            d="M155 145L212 88H575L633 145V240H155Z"
            fill={canvas}
            stroke={ink}
            strokeWidth="2"
          />
          <path d="M155 145H633M212 88V145M575 88V145" {...wire} />
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} stroke={muted} strokeWidth="7">
              <path d={`M${189 + i * 45} 238v30h-12`} />
              <path d={`M${225 + i * 34} 88V66h12`} />
            </g>
          ))}
          <rect
            x="289"
            y="139"
            width="195"
            height="69"
            fill={surface}
            stroke={accent}
            strokeWidth="2"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d={`M${305 + i * 30} 204Q${305 + i * 30} 221 ${194 + i * 64} 237`}
              {...wire}
            />
          ))}
          <Label x={386} y={175}>
            Semiconductor die
          </Label>
          <Label x={387} y={39}>
            General protective package cutaway
          </Label>
          <Label x={387} y={316}>
            External terminals connect the protected interior to the board.
          </Label>
        </g>
      );
      break;
    case "die":
    case "blocks":
      graphic = (
        <g>
          <rect
            x="100"
            y="43"
            width="560"
            height="248"
            fill={canvas}
            stroke={ink}
            strokeWidth="2"
          />
          <Label x={380} y={76}>
            ATmega328P EXAMPLE · FUNCTIONAL ORGANIZATION
          </Label>
          <Box
            x={127}
            y={105}
            width={154}
            height={122}
            title="CPU"
            subtitle="Instructions & control"
            active
          />
          <Box
            x={317}
            y={105}
            width={141}
            title="Flash"
            subtitle="32 KB program"
          />
          <Box
            x={491}
            y={105}
            width={141}
            title="SRAM"
            subtitle="2 KB working"
          />
          <Box x={317} y={207} width={141} height={58} title="EEPROM" />
          <Box x={491} y={207} width={141} height={58} title="Peripherals" />
          <path
            d="M281 166H300V240H317M300 143H317M458 143H491M458 236H491"
            {...wire}
          />
          <Label x={205} y={260} small>
            Exact die geometry unavailable
          </Label>
        </g>
      );
      break;
    case "circuit":
      graphic =
        node.id === "analog-circuit" ? (
          <g>
            <path
              d="M300 81L300 269L471 175Z"
              fill={surface}
              stroke={ink}
              strokeWidth="2"
            />
            <Label x={319} y={136}>
              +
            </Label>
            <Label x={319} y={230}>
              −
            </Label>
            <path d="M140 131H300M140 220H300M471 175H638" {...wire} />
            <Label x={166} y={104}>
              Input
            </Label>
            <Label x={160} y={252}>
              Reference / feedback
            </Label>
            <Label x={598} y={155}>
              Output
            </Label>
            <Label x={380} y={313}>
              A functional amplifier symbol—not a transistor floorplan.
            </Label>
          </g>
        ) : (
          <g>
            <Box
              x={75}
              y={125}
              width={155}
              title="Register"
              subtitle="Stored state"
            />
            <Arrow x1={230} y1={163} x2={302} y2={163} />
            <Box
              x={305}
              y={125}
              width={155}
              title="Logic"
              subtitle="Derive next state"
              active
            />
            <Arrow x1={460} y1={163} x2={530} y2={163} />
            <Box
              x={535}
              y={125}
              width={150}
              title="Register"
              subtitle="Updated state"
            />
            <path d="M610 201V267H155V201" {...wire} />
            <Label x={380} y={291}>
              Clock coordinates state updates
            </Label>
            <Label x={380} y={73}>
              Computing combines memory and transformation.
            </Label>
          </g>
        );
      break;
    case "logic": {
      const output =
        gate === "NOT"
          ? !a
          : gate === "AND"
            ? a && b
            : gate === "OR"
              ? a || b
              : !(a && b);
      const devices =
        gate === "NOT"
          ? `The conceptual P-channel pull-up is ${a ? "OFF" : "ON"} and N-channel pull-down is ${a ? "ON" : "OFF"}.`
          : gate === "NAND" || gate === "AND"
            ? `In the conceptual NAND stage, the N-channel A/B devices are ${a ? "ON" : "OFF"}/${b ? "ON" : "OFF"} in series; the P-channel A/B devices are ${a ? "OFF" : "ON"}/${b ? "OFF" : "ON"} in parallel. ${gate === "AND" ? "A following inverter reverses the NAND result." : "The output has a pull-down path only when both inputs are high."}`
            : `In the conceptual NOR stage, the N-channel A/B devices are ${a ? "ON" : "OFF"}/${b ? "ON" : "OFF"} in parallel; the P-channel A/B devices are ${a ? "OFF" : "ON"}/${b ? "OFF" : "ON"} in series. A following inverter produces OR.`;
      explanation = `${gate}: input A is ${Number(a)}${gate === "NOT" ? "" : ` and input B is ${Number(b)}`}. The output is ${Number(output)}. ${devices} Logic states represent voltage ranges. This ideal CMOS teaching model does not specify the ATmega gate layout or transient behavior.`;
      controls = (
        <>
          <label>
            Gate{" "}
            <select value={gate} onChange={(e) => setGate(e.target.value)}>
              {["NOT", "AND", "OR", "NAND"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <button type="button" aria-pressed={a} onClick={() => setA(!a)}>
            Input A: {Number(a)}
          </button>
          {gate !== "NOT" && (
            <button type="button" aria-pressed={b} onClick={() => setB(!b)}>
              Input B: {Number(b)}
            </button>
          )}
        </>
      );
      graphic = (
        <g>
          <Box
            x={84}
            y={79}
            width={100}
            height={68}
            title={`A = ${Number(a)}`}
            active={a}
          />
          <path d="M184 113H293V151H322" {...wire} />
          {gate !== "NOT" && (
            <>
              <Box
                x={84}
                y={209}
                width={100}
                height={68}
                title={`B = ${Number(b)}`}
                active={b}
              />
              <path d="M184 243H293V195H322" {...wire} />
            </>
          )}
          <rect
            x="322"
            y="99"
            width="145"
            height="151"
            rx="55"
            fill={surface}
            stroke={ink}
            strokeWidth="2"
          />
          <Label x={394} y={183}>
            {gate}
          </Label>
          <Arrow
            x1={467}
            y1={174}
            x2={554}
            y2={174}
            color={output ? accent : muted}
          />
          <Box
            x={568}
            y={135}
            width={113}
            height={76}
            title={`OUT = ${Number(output)}`}
            active={output}
          />
          <Label x={380} y={321}>
            Change the inputs. Predict the output.
          </Label>
        </g>
      );
      break;
    }
    case "transistor": {
      const p = node.id === "p-mosfet";
      controls = (
        <button type="button" aria-pressed={a} onClick={() => setA(!a)}>
          {p ? "Gate relative to source" : "Gate control"}:{" "}
          {a ? (p ? "sufficiently negative" : "HIGH") : p ? "near zero" : "LOW"}
        </button>
      );
      explanation = p
        ? `P-channel functional model: ${a ? "a sufficiently negative gate-to-source voltage enables conduction" : "a gate near source voltage leaves the channel off"}. This planar picture does not depict the FDN340P trench structure or body diode.`
        : `General N-channel enhancement model: ${a ? "sufficiently positive gate-to-source voltage creates a conductive electron channel" : "LOW gate control leaves no induced conducting channel in this model"}. The gate is insulated from the body.`;
      graphic = (
        <g>
          <rect
            x="135"
            y="175"
            width="490"
            height="100"
            fill={canvas}
            stroke={muted}
          />
          <rect
            x="151"
            y="176"
            width="116"
            height="48"
            fill={surface}
            stroke={ink}
          />
          <rect
            x="493"
            y="176"
            width="116"
            height="48"
            fill={surface}
            stroke={ink}
          />
          <rect
            x="269"
            y="157"
            width="222"
            height="14"
            fill={surface}
            stroke={muted}
          />
          <rect
            x="282"
            y="122"
            width="196"
            height="30"
            fill={a ? accent : canvas}
            stroke={ink}
          />
          <path d="M380 64V122M206 96V176M551 96V176" {...wire} />
          <Label x={207} y={78}>
            Source
          </Label>
          <Label x={552} y={78}>
            Drain
          </Label>
          <Label x={380} y={48}>
            Insulated gate
          </Label>
          <Label x={380} y={256}>
            Semiconductor body
          </Label>
          <Label x={380} y={314}>
            Gate dielectric separates the gate from the body.
          </Label>
          {a && (
            <>
              <rect
                x="267"
                y="179"
                width="226"
                height="12"
                fill={accent}
                opacity=".65"
              />
              {[305, 355, 405, 455].map((x) => (
                <Arrow
                  key={x}
                  x1={x}
                  y1={p ? 192 : 141}
                  x2={x}
                  y2={p ? 141 : 192}
                  color={accent}
                />
              ))}
            </>
          )}
          <Label x={380} y={224}>
            {a ? "Channel enabled" : "Channel not induced"}
          </Label>
        </g>
      );
      break;
    }
    case "lattice": {
      const doped = node.id === "doped-silicon";
      if (doped)
        controls = (
          <label>
            Material model{" "}
            <select value={doping} onChange={(e) => setDoping(e.target.value)}>
              <option value="pure">Pure silicon</option>
              <option value="n">N-type · donors</option>
              <option value="p">P-type · acceptors</option>
            </select>
          </label>
        );
      explanation = doped
        ? doping === "pure"
          ? "Pure silicon is already a semiconductor. The bonds here are a two-dimensional simplification of a three-dimensional crystal."
          : `${doping === "n" ? "Donors increase mobile electron" : "Acceptors increase hole"} population. Ionized dopants and carriers together leave the material approximately electrically neutral.`
        : "Shared electronic bonding forms an ordered three-dimensional crystal. This flat arrangement is a conceptual diagram, not exact silicon crystal geometry.";
      graphic = (
        <g>
          {Array.from({ length: 20 }, (_, i) => {
            const x = 177 + (i % 5) * 100,
              y = 64 + Math.floor(i / 5) * 65;
            return (
              <g key={i}>
                {i % 5 < 4 && <path d={`M${x + 16} ${y}h68`} {...wire} />}
                {i < 15 && <path d={`M${x} ${y + 16}v33`} {...wire} />}
                <circle
                  cx={x}
                  cy={y}
                  r="18"
                  fill={i === 7 && doping !== "pure" ? accent : surface}
                  stroke={ink}
                />
                <Label x={x} y={y + 5} small>
                  {i === 7 && doping !== "pure"
                    ? doping === "n"
                      ? "P"
                      : "B"
                    : "Si"}
                </Label>
              </g>
            );
          })}
          {doping !== "pure" && (
            <Carrier x={437} y={154} hole={doping === "p"} />
          )}
          <Label x={380} y={319}>
            {doping === "pure"
              ? "Covalent bonding · simplified lattice"
              : `${doping === "n" ? "Phosphorus donor" : "Boron acceptor"} example · approximately neutral bulk`}
          </Label>
        </g>
      );
      break;
    }
    case "atom":
    case "electron":
      graphic = <Cloud nucleus={node.visualType === "atom"} />;
      explanation =
        node.visualType === "atom"
          ? "Conceptual probability cloud around a nucleus. Cloud density indicates likelihood of detection. This is not an exact silicon orbital, a scale drawing, or an electron trajectory."
          : "A conceptual detection-probability distribution, not an electron’s physical size. An electron is elementary in the Standard Model and is not consumed by a circuit.";
      break;
    case "junction":
      controls = (
        <button type="button" aria-pressed={a} onClick={() => setA(!a)}>
          Bias: {a ? "forward" : "no applied bias"}
        </button>
      );
      explanation = `${a ? "Forward bias reduces the barrier and enables increased carrier injection" : "At equilibrium, carrier redistribution creates a depletion region and built-in field"}. ${node.id === "led-junction" ? "A suitable light-emitting material can release part of the recombination energy as photons." : "This is a general junction model; actual current depends on device and conditions."}`;
      graphic = (
        <g>
          <rect
            x="105"
            y="90"
            width="275"
            height="170"
            fill={surface}
            stroke={muted}
          />
          <rect
            x="380"
            y="90"
            width="275"
            height="170"
            fill={canvas}
            stroke={muted}
          />
          <rect
            x={a ? 358 : 328}
            y="90"
            width={a ? 44 : 104}
            height="170"
            fill={line}
          />
          <Label x={213} y={59}>
            P region
          </Label>
          <Label x={548} y={59}>
            N region
          </Label>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <Carrier
                x={151 + (i % 3) * 61}
                y={130 + Math.floor(i / 3) * 85}
                hole
              />
              <Carrier
                x={488 + (i % 3) * 61}
                y={130 + Math.floor(i / 3) * 85}
              />
            </g>
          ))}
          {a && (
            <>
              <Arrow x1={302} y1={170} x2={362} y2={170} color={accent} />
              <Arrow x1={458} y1={170} x2={398} y2={170} color={accent} />
            </>
          )}
          <Label x={380} y={306}>
            Depletion region {a ? "narrows" : "at equilibrium"} · no physical
            scale assigned
          </Label>
        </g>
      );
      break;
    case "carriers":
    case "photon":
      controls = (
        <button type="button" onClick={() => setEvent(event + 1)}>
          Show {event ? "another " : ""}light-emitting transition
        </button>
      );
      explanation = event
        ? `Transition ${event}: an electron occupies a lower-energy state. In this light-emitting example, the energy difference leaves as a photon. The electron remains; other events may transfer energy to heat.`
        : "Choose a light-emitting transition to see the energy transfer. The drawn wave represents emitted light, not an electron traveling out of the circuit.";
      graphic = (
        <g>
          <path d="M135 103H330M135 240H330" {...wire} />
          <Label x={221} y={78}>
            Higher-energy state
          </Label>
          <Label x={225} y={275}>
            Lower-energy state
          </Label>
          <Carrier x={225} y={event ? 240 : 103} />
          {event ? (
            <>
              <Arrow x1={277} y1={109} x2={277} y2={222} />
              <path
                d="M350 174Q370 135 390 174T430 174T470 174T510 174T550 174T590 174T630 174"
                stroke={accent}
                strokeWidth="3"
                fill="none"
              />
              <Label x={504} y={229}>
                Photon energy: E = hf
              </Label>
              <Arrow x1={460} y1={110} x2={595} y2={110} color={accent} />
            </>
          ) : (
            <>
              <Carrier x={285} y={240} hole />
              <Label x={520} y={173}>
                Energy can become light.
              </Label>
            </>
          )}
          <Label x={380} y={324}>
            Energy diagram · height represents energy, not material distance.
          </Label>
        </g>
      );
      break;
    case "resistor":
    case "heat":
    case "ptc": {
      const ptc = node.visualType === "ptc";
      controls = toggle(ptc ? "Fault heating" : "Energy transfer", a, () =>
        setA(!a),
      );
      explanation = ptc
        ? `The polymer network is ${a ? "hotter: conductive paths become less connected and resistance rises" : "cool: conductive paths remain connected"}. This is a thermal model, not an exact trip time or universal current threshold.`
        : `${a ? "Electrical energy is transferring into microscopic motion in the material" : "The scene is paused before energy transfer"}. Carriers are not consumed; charge continues through the complete circuit.`;
      graphic = (
        <g>
          <rect
            x="136"
            y="107"
            width="490"
            height="137"
            rx="4"
            fill={canvas}
            stroke={ink}
          />
          <path d="M54 175H136M626 175H706" {...wire} />
          {Array.from({ length: 24 }, (_, i) => {
            const x = 162 + (i % 8) * 61,
              y = 132 + Math.floor(i / 8) * 43;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill={muted} />
                {a && (
                  <path
                    d={`M${x - 14} ${y - 6}l-5 6 5 6 M${x + 14} ${y - 6}l5 6-5 6`}
                    fill="none"
                    stroke={accent}
                  />
                )}
              </g>
            );
          })}
          {[0, 1, 2, 3].map((i) => (
            <Carrier key={i} x={185 + i * 115} y={154 + (i % 2) * 44} />
          ))}
          <Arrow x1={230} y1={64} x2={523} y2={64} />
          <Label x={380} y={45}>
            Electrical energy enters the material
          </Label>
          <Label x={380} y={299}>
            {ptc
              ? a
                ? "Thermal change increases resistance"
                : "Cool network: lower resistance"
              : a
                ? "Increased microscopic motion → heating"
                : "A material interaction model, not a film recipe"}
          </Label>
        </g>
      );
      break;
    }
    case "capacitor":
    case "dielectric":
      controls = toggle("Applied voltage", a, () => setA(!a));
      explanation = a
        ? "Opposite electrode charge establishes an electric field. Bound charges in the dielectric polarize; normal steady DC does not flow freely through it."
        : "With no applied voltage in this simplified model, the net separated electrode charge and field are zero.";
      graphic = (
        <g>
          <rect x="262" y="59" width="18" height="217" fill={ink} />
          <rect x="481" y="59" width="18" height="217" fill={ink} />
          <rect
            x="289"
            y="59"
            width="183"
            height="217"
            fill={canvas}
            stroke={line}
          />
          <path d="M124 168H262M499 168H636" {...wire} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {a && (
                <>
                  <Label x={246} y={98 + i * 50}>
                    +
                  </Label>
                  <Label x={514} y={98 + i * 50}>
                    −
                  </Label>
                  <Arrow
                    x1={300}
                    y1={94 + i * 50}
                    x2={459}
                    y2={94 + i * 50}
                    color={accent}
                  />
                </>
              )}
            </g>
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${331 + (i % 2) * 88} ${120 + Math.floor(i / 2) * 57}) rotate(${a ? 0 : i * 53})`}
            >
              <line x1="-12" x2="12" stroke={muted} />
              <circle cx="-12" r="4" fill={accent} />
              <circle cx="12" r="4" fill={surface} stroke={ink} />
            </g>
          ))}
          <Label x={380} y={307}>
            Conductive electrode · polarizable dielectric · conductive electrode
          </Label>
        </g>
      );
      break;
    case "conductor":
      controls = (
        <button type="button" onClick={() => setEvent(event + 1)}>
          Advance a conceptual drift step
        </button>
      );
      explanation = `Step ${event}: electron drift points left; conventional current points right. These markers explain direction, not actual speed. Electrical influence propagates much faster than the net carrier drift.`;
      graphic = (
        <g>
          <rect
            x="98"
            y="103"
            width="562"
            height="136"
            fill={canvas}
            stroke={muted}
          />
          {Array.from({ length: 27 }, (_, i) => (
            <circle
              key={i}
              cx={124 + (i % 9) * 64}
              cy={123 + Math.floor(i / 9) * 48}
              r="6"
              fill={muted}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <Carrier
              key={i}
              x={125 + ((i * 67 + 530 - (event % 12) * 10) % 520)}
              y={i % 2 ? 157 : 202}
            />
          ))}
          <Arrow x1={194} y1={69} x2={568} y2={69} />
          <Label x={380} y={45}>
            Conventional current →
          </Label>
          <Arrow x1={568} y1={282} x2={194} y2={282} color={accent} />
          <Label x={380} y={314}>
            ← Net electron drift · fixed lattice markers are schematic
          </Label>
        </g>
      );
      break;
    case "pcb":
      graphic = (
        <g>
          {[
            { y: 81, h: 24, label: "Surface protection", color: surface },
            { y: 105, h: 19, label: "Top copper", color: accent },
            { y: 124, h: 102, label: "Insulating substrate", color: canvas },
            { y: 226, h: 19, label: "Bottom copper", color: accent },
            { y: 245, h: 24, label: "Surface protection", color: surface },
          ].map((l) => (
            <g key={l.y}>
              <path
                d={`M125 ${l.y}H513L566 ${l.y - 21}V${l.y + l.h - 21}L513 ${l.y + l.h}H125Z`}
                fill={l.color}
                stroke={muted}
              />
              <path d={`M566 ${l.y + l.h / 2 - 21}H594`} {...wire} />
              <text x="605" y={l.y + l.h / 2 - 16} style={{ fontSize: 11 }}>
                {l.label}
              </text>
            </g>
          ))}
          <path d="M269 102V245M285 102V245" stroke={ink} strokeWidth="5" />
          <Label x={278} y={50}>
            Conductive via joins layers
          </Label>
          <path d="M278 58V82" {...wire} />
          <Label x={370} y={316}>
            General layer model · thicknesses and formulation unspecified
          </Label>
        </g>
      );
      break;
    case "memory":
      controls = toggle("Supply power", power, () => setPower(!power));
      explanation = power
        ? "Supply is present. SRAM can retain its working state, while flash and EEPROM retain their encoded data."
        : "Supply removed: SRAM working state is no longer retained. Flash and EEPROM retain encoded data without normal operating power. Restoring power initializes a new example SRAM state.";
      graphic = (
        <g>
          <Label x={380} y={50}>
            Information is represented by physical state.
          </Label>
          {[
            {
              x: 75,
              title: "Flash",
              subtitle: "Program · nonvolatile",
              bits: "10110010",
            },
            {
              x: 297,
              title: "SRAM",
              subtitle: "Working · volatile",
              bits: power ? "01011001" : "— — — —",
            },
            {
              x: 519,
              title: "EEPROM",
              subtitle: "Values · nonvolatile",
              bits: "11001010",
            },
          ].map((m) => (
            <g key={m.title}>
              <Box
                x={m.x}
                y={103}
                width={169}
                height={143}
                title={m.title}
                subtitle={m.subtitle}
                active={power || m.title !== "SRAM"}
              />
              <Label x={m.x + 84} y={212}>
                {m.bits}
              </Label>
            </g>
          ))}
          <Label x={380} y={298}>
            Example patterns · not a reconstruction of memory cells
          </Label>
        </g>
      );
      break;
    case "adc":
      controls = (
        <label>
          Input fraction of reference{" "}
          <input
            aria-label="ADC input percentage"
            type="range"
            min="0"
            max="100"
            value={sample}
            onChange={(e) => setSample(Number(e.target.value))}
          />{" "}
          {sample}%
        </label>
      );
      explanation = `Idealized conversion: ${sample}% of the reference gives illustrative code ${Math.min(1023, Math.floor((sample / 100) * 1024))} out of 1024 possible codes. Noise, reference accuracy and the real conversion transfer function matter.`;
      graphic = (
        <g>
          <path d="M105 260V65M105 260H300" {...wire} />
          <path
            d={`M105 ${260 - sample * 1.8}H278`}
            stroke={accent}
            strokeWidth="3"
          />
          <Label x={200} y={300}>
            Analog input / reference
          </Label>
          <Arrow x1={300} y1={164} x2={345} y2={164} />
          <Box
            x={359}
            y={115}
            width={150}
            height={100}
            title="10-bit ADC"
            subtitle="1024 possible codes"
          />
          <Arrow x1={509} y1={164} x2={559} y2={164} />
          <Label x={636} y={166}>
            {Math.min(1023, Math.floor((sample / 100) * 1024))}
          </Label>
          <Label x={636} y={195}>
            Digital code
          </Label>
        </g>
      );
      break;
    case "software":
      graphic = (
        <g>
          {[
            { x: 60, title: "Sketch", sub: "Source text" },
            { x: 293, title: "Build tools", sub: "Compile + link" },
            { x: 526, title: "Program image", sub: "Instruction bytes" },
          ].map((v, i) => (
            <g key={v.title}>
              <Box
                x={v.x}
                y={110}
                width={175}
                height={110}
                title={v.title}
                subtitle={v.sub}
                active={i === 2}
              />
              {i < 2 && (
                <Arrow x1={v.x + 175} y1={166} x2={v.x + 223} y2={166} />
              )}
            </g>
          ))}
          <Label x={380} y={65}>
            A transformation of information
          </Label>
          <Label x={380} y={286}>
            Upload stores bytes. Later, the CPU executes instructions.
          </Label>
          <Label x={380} y={319}>
            No physical zoom scale applies.
          </Label>
        </g>
      );
      break;
    case "regulator":
      graphic = (
        <g>
          <Label x={94} y={143}>
            Input rail
          </Label>
          <Arrow x1={75} y1={174} x2={226} y2={174} />
          <Box
            x={240}
            y={131}
            width={210}
            height={84}
            title="Controlled pass element"
            active
          />
          <Arrow x1={450} y1={174} x2={677} y2={174} />
          <Label x={626} y={143}>
            Output rail
          </Label>
          <path d="M571 174V283H427M285 283H187V73H343V131" {...wire} />
          <Box x={285} y={246} width={142} height={68} title="Feedback" />
          <Label x={380} y={45}>
            Functional loop · energy loss becomes heat
          </Label>
        </g>
      );
      break;
    case "protection":
      controls = toggle("Transient event", a, () => setA(!a));
      explanation = a
        ? "In this conceptual transient, the protection branch conducts toward the shield node. It is a shunt branch, not a series USB data component."
        : "During normal signaling, the protection part remains a shunt branch connected between a data line and shield. This is thin-film polymer protection, not an ordinary diode model.";
      graphic = (
        <g>
          <path d="M82 105H680M380 105V162M380 234V287H660" {...wire} />
          <circle cx="380" cy="105" r="5" fill={ink} />
          <Label x={153} y={77}>
            USB data line
          </Label>
          <Box
            x={290}
            y={161}
            width={180}
            height={73}
            title="Protection branch"
            active={a}
          />
          <Label x={579} y={317}>
            Shield node
          </Label>
          {a && <Arrow x1={408} y1={114} x2={408} y2={154} color={accent} />}
          <Label x={597} y={146}>
            Normal data path →
          </Label>
        </g>
      );
      break;
    case "magnetic":
      graphic = (
        <g>
          <path
            d="M76 165H203c0-81 63-81 63 0s63 81 63 0s63-81 63 0s63 81 63 0s63-81 63 0H687"
            fill="none"
            stroke={ink}
            strokeWidth="5"
          />
          <path
            d="M211 98Q382 4 551 98M211 242Q382 336 551 242"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <Label x={382} y={51}>
            Magnetic response to current
          </Label>
          <Label x={382} y={315}>
            General inductive model—not L1 or L2 internal construction
          </Label>
        </g>
      );
      break;
    case "resonator":
      graphic = (
        <g>
          <rect
            x="184"
            y="100"
            width="188"
            height="126"
            fill={canvas}
            stroke={ink}
          />
          <path
            d="M165 94V232M391 94V232M77 163H165M391 163H439"
            stroke={muted}
            strokeWidth="3"
          />
          <Label x={278} y={158}>
            Resonant body
          </Label>
          <Label x={278} y={185} small>
            Piezoelectric response
          </Label>
          <path
            d="M454 163Q472 87 490 163T526 163T562 163T598 163T634 163T670 163"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
          />
          <Label x={567} y={256}>
            Periodic timing signal
          </Label>
          <Label x={380} y={51}>
            Electrical excitation ↔ mechanical resonance
          </Label>
          <Label x={380} y={316}>
            Wave and package are illustrative; neither clock’s geometry is
            shown.
          </Label>
        </g>
      );
      break;
    case "contacts":
      controls = toggle("Contact closed", a, () => setA(!a));
      explanation = a
        ? "The conductive contacts touch, joining the two circuit nodes. A switch changes connectivity; its actual purpose follows the schematic."
        : "The contact is open, interrupting this path. Shape alone does not identify the voltage, signal, or return function.";
      graphic = (
        <g>
          <rect
            x="229"
            y="89"
            width="300"
            height="165"
            fill={canvas}
            stroke={muted}
          />
          <path d="M70 186H290M470 186H690" stroke={ink} strokeWidth="5" />
          <circle
            cx="290"
            cy="186"
            r="9"
            fill={surface}
            stroke={ink}
            strokeWidth="3"
          />
          <circle
            cx="470"
            cy="186"
            r="9"
            fill={surface}
            stroke={ink}
            strokeWidth="3"
          />
          <path
            d={`M290 186L470 ${a ? 186 : 121}`}
            stroke={a ? accent : ink}
            strokeWidth="5"
          />
          <Label x={380} y={51}>
            Mechanical contact model
          </Label>
          <Label x={380} y={301}>
            {a ? "Connected circuit nodes" : "Open path between contacts"}
          </Label>
        </g>
      );
      break;
    default:
      graphic = (
        <g>
          <Label x={380} y={153}>
            A diagram for this topic is not yet available.
          </Label>
          <Label x={380} y={185}>
            Use the accompanying explanation.
          </Label>
        </g>
      );
  }

  return (
    <figure
      className={styles.figure}
      data-scene={node.visualType}
      data-reduced-motion={reducedMotion}
    >
      <svg
        className={styles.stage}
        viewBox="0 0 760 350"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{node.title} — conceptual model</title>
        <desc id={`${id}-desc`}>{explanation}</desc>
        {graphic}
      </svg>
      {controls && (
        <div
          className={styles.controls}
          role="group"
          aria-label={`${node.title} model controls`}
        >
          {controls}
        </div>
      )}
      <figcaption className={styles.caption}>
        <strong>Conceptual model · no physical scale assigned</strong>
        <p
          className={styles.status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {explanation}
        </p>
      </figcaption>
    </figure>
  );
}
