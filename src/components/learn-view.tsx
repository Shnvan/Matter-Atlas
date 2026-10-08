"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Search } from "lucide-react";
import {
  topics,
  pinMappings,
  materialEntries,
  zoomLevels,
  terminology,
} from "@/content";
import { useUno } from "@/lib/store";
import { Citations } from "./citations";
import { Button } from "./ui/button";
export function LearnView() {
  const s = useUno();
  if (s.mode === "pins") return <PinReference />;
  if (s.mode === "materials") return <Materials />;
  if (s.mode === "recap") return <Connections />;
  return <Topics />;
}
function Topics() {
  const s = useUno();
  const topic = topics.find((t) => t.id === s.topicId);
  const [termQuery, setTermQuery] = useState("");
  return (
    <div className="learn-view">
      {topic ? (
        <article className="topic-article">
          <button
            className="text-button"
            onClick={() => useUno.setState({ topicId: null })}
          >
            <ArrowLeft size={15} />
            All chapters
          </button>
          <div className="eyebrow">{topic.kicker}</div>
          <h1>{topic.title}</h1>
          <p className="article-lead">{topic.summary}</p>
          {topic.id === "history" && <HistoryTimeline />}
          {topic.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <Citations ids={topic.sourceRefs} />
        </article>
      ) : (
        <>
          <div className="eyebrow">THE FIELD GUIDE</div>
          <h1>
            The ideas
            <br />
            <em>inside the object.</em>
          </h1>
          <p className="article-lead">
            Follow a question, explore a chapter, or find the meaning of a new
            word.
          </p>
          <div className="chapter-list">
            {topics.map((t, i) => (
              <button key={t.id} onClick={() => s.selectTopic(t.id)}>
                <span className="chapter-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <small>{t.kicker}</small>
                  <strong>{t.title}</strong>
                  <p>{t.summary}</p>
                </span>
                <ArrowRight size={22} />
              </button>
            ))}
          </div>
          <section className="glossary">
            <h2>A language for looking closer.</h2>
            <label className="search-field">
              <Search size={17} />
              <span className="sr-only">Find a term</span>
              <input
                value={termQuery}
                onChange={(e) => setTermQuery(e.target.value)}
                placeholder="Find a term…"
              />
            </label>
            <div className="term-list">
              {terminology
                .filter((t) =>
                  `${t.term} ${t.beginner}`
                    .toLowerCase()
                    .includes(termQuery.toLowerCase()),
                )
                .map((t) => (
                  <details key={t.id}>
                    <summary>{t.term}</summary>
                    <p>{t.beginner}</p>
                    <p>{t.precise}</p>
                    <p className="model-note">
                      Common misconception: {t.misconception}
                    </p>
                    <Citations ids={t.sourceRefs} />
                  </details>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
function PinReference() {
  const [filter, setFilter] = useState("Headers");
  const [query, setQuery] = useState("");
  const pins = pinMappings.filter(
    (p) =>
      (filter === "DIP package" ? p.header === "DIP" : p.header !== "DIP") &&
      `${p.arduinoName} ${p.physicalLabel} ${p.mcuPort} ${p.powerFunction} ${p.spi.join(" ")} ${p.twi.join(" ")} ${p.uart.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="learn-view">
      <div className="eyebrow">CONNECTIONS TO THE OUTSIDE</div>
      <h1>
        Every pin
        <br />
        <em>has a role.</em>
      </h1>
      <p className="article-lead">
        The socketed Uno uses a 28-pin ATmega328P. Board labels and chip pin
        numbers describe different physical locations.
      </p>
      <div className="pin-filters">
        <label className="search-field">
          <Search size={17} />
          <span className="sr-only">Search pins</span>
          <input
            placeholder="Find a pin or function…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="depth-tabs">
          {["Headers", "DIP package"].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div
        className="pin-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Pin mapping table"
      >
        <table className="pin-table">
          <thead>
            <tr>
              <th>Pin</th>
              <th>Header / position</th>
              <th>MCU port / pin</th>
              <th>Functions</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((p) => (
              <tr key={p.id}>
                <th>{p.arduinoName || p.physicalLabel}</th>
                <td>
                  {p.header} / {p.position}
                </td>
                <td>
                  {p.mcuPort ?? "—"} / {p.mcuPackagePin ?? "—"}
                </td>
                <td>
                  {[
                    p.powerFunction,
                    p.analog,
                    p.pwm ? "PWM" : null,
                    ...p.uart,
                    ...p.spi,
                    ...p.twi,
                    ...p.interrupts,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </td>
                <td>{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pins.length === 0 && (
        <p>No pins match. Clear your search to see all pins.</p>
      )}
      <Citations ids={[...new Set(pinMappings.flatMap((p) => p.sourceRefs))]} />
    </div>
  );
}
function Materials() {
  const s = useUno();
  return (
    <div className="learn-view">
      <div className="eyebrow">A MATERIAL WORLD</div>
      <h1>
        Different structures.
        <br />
        <em>Different possibilities.</em>
      </h1>
      <p className="article-lead">
        A material’s composition and electronic structure help explain what it
        can do. These entries distinguish general models from verified board
        identities.
      </p>
      <div className="materials-list">
        {materialEntries.map((m, i) => (
          <section key={m.id} className="material-entry">
            <span className="material-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="micro-label">
                {m.compositionKind} / {m.roles.join(" · ")}
              </div>
              <h2>{m.name}</h2>
              {m.whereUsed.map((c, i) => (
                <p key={`use-${i}`}>{c.text}</p>
              ))}
              {m.whyUseful.map((c, i) => (
                <p key={`why-${i}`}>{c.text}</p>
              ))}
              <p className="model-note">{m.applicability}</p>
              <div className="material-actions">
                {m.zoomTargets.map((id) => (
                  <Button
                    key={id}
                    variant="outline"
                    onClick={() => s.enterZoom(id, null)}
                  >
                    {zoomLevels.find((n) => n.id === id)?.title ?? "Explore"}
                    <ArrowRight size={16} />
                  </Button>
                ))}
              </div>
              <Citations ids={m.sourceRefs} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
function Connections() {
  const s = useUno();
  const branches = [
    {
      title: "Microcontroller",
      ref: "ZU4",
      ids: [
        "ic-package",
        "silicon-die",
        "functional-blocks",
        "cpu-circuit",
        "logic-gates",
        "mosfet",
        "doped-silicon",
        "silicon-lattice",
        "atom",
        "electron",
      ],
    },
    {
      title: "Light-emitting diode",
      ref: "L",
      ids: ["led-junction", "carriers", "photon"],
    },
    {
      title: "Resistor",
      ref: "R1",
      ids: ["resistor-film", "heat", "conductor"],
    },
    { title: "Capacitor", ref: "C1", ids: ["capacitor-field", "dielectric"] },
    { title: "Copper conductor", ref: "pcb", ids: ["conductor", "electron"] },
  ];
  return (
    <div className="learn-view">
      <div className="eyebrow">THE CONNECTED PICTURE</div>
      <h1>
        Many paths.
        <br />
        <em>One physical world.</em>
      </h1>
      <p className="article-lead">
        Different components lead to different mechanisms. These are learning
        paths, not a claim that every step is a smaller object contained in the
        previous one.
      </p>
      <div className="connection-map">
        {branches.map((branch) => (
          <section key={branch.title}>
            <h2>{branch.title}</h2>
            <div>
              {branch.ids
                .map((id) => zoomLevels.find((n) => n.id === id))
                .filter((n) => n !== undefined)
                .map((n) => (
                  <button
                    key={n.id}
                    onClick={() => s.enterZoom(n.id, branch.ref)}
                  >
                    {n.title}
                    <ArrowRight size={14} />
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function HistoryTimeline() {
  const milestones = [
    ["2003", "Wiring thesis", "Barragán’s attributed account"],
    ["2004", "Wiring board", "A platform for learning by making"],
    ["2007", "Diecimila", "Usability shaped by classrooms"],
    ["2010", "Uno unveiled", "Maker Faire New York"],
  ];
  return (
    <section className="history-timeline" aria-label="A sourced timeline">
      <h2>A few milestones.</h2>
      <ol>
        {milestones.map(([year, title, context]) => (
          <li key={year}>
            <span className="mono">{year}</span>
            <strong>{title}</strong>
            <small>{context}</small>
          </li>
        ))}
      </ol>
      <Citations ids={["SRC-026", "SRC-034", "SRC-035"]} />
    </section>
  );
}
