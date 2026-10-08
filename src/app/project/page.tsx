import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectDocuments } from "@/lib/project-documents";
export default function ProjectPage() {
  return (
    <>
      <div className="eyebrow">BEHIND THE ATLAS</div>
      <h1>
        Research, decisions
        <br />
        <em>and the work in progress.</em>
      </h1>
      <p>
        The project memory records what is known, what is simplified, and how
        this experience is built. The reference is the published socketed Uno
        Rev3 design.
      </p>
      <div className="document-toolbar">
        <Link href="/project/HANDOFF/">Current handoff →</Link>
        <Link href="/project/archive/index.html" prefetch={false}>
          Original offline guide ↗
        </Link>
      </div>
      <div className="project-doc-list">
        {projectDocuments.map((doc) => (
          <Link href={`/project/${doc.slug.join("/")}/`} key={doc.file}>
            <span>
              {doc.title}
              <small>{doc.file}</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
    </>
  );
}
