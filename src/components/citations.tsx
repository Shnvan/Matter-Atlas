"use client";
import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { sources } from "@/content";
export function Citations({
  ids,
  compact = false,
}: {
  ids: string[];
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const refs = sources.filter((s) => ids.includes(s.id));
  return (
    <div className={`citations ${compact ? "citations-compact" : ""}`}>
      <button
        className="source-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <BookOpen size={14} />
        {refs.length} {refs.length === 1 ? "source" : "sources"}{" "}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      {expanded && (
        <ol>
          {refs.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noreferrer">
                [{sources.indexOf(s) + 1}] {s.title}
                <ArrowUpRight size={12} />
              </a>
              <small>
                {s.organization} · {s.evidenceLocation}
              </small>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
