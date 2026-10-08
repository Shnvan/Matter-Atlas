"use client";
import Link from "next/link";
import {
  SearchField,
  Input,
  Label,
  Button as AriaButton,
} from "react-aria-components";
import {
  Search,
  X,
  Cpu,
  Zap,
  Cable,
  Timer,
  RotateCcw,
  Binary,
  Activity,
  ChevronRight,
  Layers,
} from "lucide-react";
import { components } from "@/content";
import { useUno } from "@/lib/store";

const systems = [
  { label: "All systems", icon: Layers },
  { label: "Computing", icon: Cpu },
  { label: "Power", icon: Zap },
  { label: "USB", icon: Cable },
  { label: "Clock", icon: Timer },
  { label: "Reset", icon: RotateCcw },
  { label: "Digital I/O", icon: Binary },
  { label: "Analog I/O", icon: Activity },
];
export function matchesSystem(
  subsystem: string,
  category: string,
  refs: string[],
  filter: string,
) {
  if (filter === "All systems") return true;
  const s = `${subsystem} ${category}`.toLowerCase();
  if (filter === "Computing") return /microcontroller|mcu|comput/.test(s);
  if (filter === "Power") return /power|protect|regulat/.test(s);
  if (filter === "USB") return /usb/.test(s) || refs.includes("X2");
  if (filter === "Clock") return /clock|crystal|resonator/.test(s);
  if (filter === "Reset") return /reset|switch|pushbutton/.test(s);
  if (filter === "Digital I/O")
    return refs.some((r) => ["IOL", "IOH", "ICSP", "RN4", "L"].includes(r));
  return refs.some((r) => ["AD", "C4", "C10", "L2", "ZU4"].includes(r));
}
export function Navigator() {
  const s = useUno();
  const filtered = components.filter(
    (c) =>
      matchesSystem(
        c.subsystem,
        c.category,
        c.referenceDesignators,
        s.subsystem,
      ) &&
      (s.category === "All components" || c.category === s.category) &&
      `${c.name} ${c.category} ${c.referenceDesignators.join(" ")} ${c.purpose}`
        .toLowerCase()
        .includes(s.query.toLowerCase()),
  );
  return (
    <div className="navigator-content">
      <SearchField
        className="search-field"
        aria-label="Search components"
        value={s.query}
        onChange={s.setQuery}
      >
        <Label className="sr-only">Search components</Label>
        <Search size={16} />
        <Input placeholder="Find a component…" />
        <AriaButton aria-label="Clear search">
          <X size={14} />
        </AriaButton>
      </SearchField>
      <div className="nav-group-label">
        THE BOARD <span>01</span>
      </div>
      <div className="system-list" aria-label="Filter by system">
        {systems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`system-button ${s.subsystem === label ? "is-current" : ""}`}
            aria-pressed={s.subsystem === label}
            onClick={() => s.setSubsystem(label)}
          >
            <Icon size={17} />
            <span>{label}</span>
            {s.subsystem === label && <span className="selected-mark" />}
          </button>
        ))}
      </div>
      <div className="nav-group-label">
        COMPONENTS <span>{filtered.length.toString().padStart(2, "0")}</span>
      </div>
      <label className="category-filter">
        <span className="sr-only">Filter by component category</span>
        <select
          aria-label="Filter by component category"
          value={s.category}
          onChange={(e) => s.setCategory(e.target.value)}
        >
          <option>All components</option>
          {[...new Set(components.map((c) => c.category))]
            .sort()
            .map((category) => (
              <option key={category}>{category}</option>
            ))}
        </select>
      </label>
      <div className="component-list">
        {filtered.map((c) => (
          <button
            key={c.id}
            data-component-id={c.id}
            className={`component-button ${c.referenceDesignators.includes(s.selectedRef ?? "") || c.id === s.selectedRef ? "is-current" : ""}`}
            aria-pressed={
              c.referenceDesignators.includes(s.selectedRef ?? "") ||
              c.id === s.selectedRef
            }
            onClick={() => {
              if (!["explore", "explode", "signal"].includes(s.mode))
                s.setMode("explore");
              s.selectRef(c.referenceDesignators[0] ?? c.id);
            }}
          >
            <span className="component-name">
              {c.shortName}
              <small>{c.category}</small>
            </span>
            <span className="component-ref">{c.referenceDesignators[0]}</span>
            <ChevronRight size={12} />
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No matching components.</p>
          <button
            className="text-button"
            onClick={() => {
              s.setQuery("");
              s.setSubsystem("All systems");
              s.setCategory("All components");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="navigator-footer">
        <span className="tiny-dot" /> UNO REV3{" "}
        <small>Socketed reference design</small>
        <Link href="/project/">
          Project & research <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
