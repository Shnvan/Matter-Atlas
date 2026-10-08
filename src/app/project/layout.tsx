import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="project-page">
      <header className="project-header">
        <Link href="/">
          <ArrowLeft size={16} />
          Inside the Uno
        </Link>
        <Link href="/project/">
          Project & research
          <ArrowUpRight size={16} />
        </Link>
      </header>
      <main className="project-main">{children}</main>
    </div>
  );
}
