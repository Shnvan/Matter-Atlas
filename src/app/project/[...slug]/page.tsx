import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectDocuments, documentationLink } from "@/lib/project-documents";
export function generateStaticParams() {
  return projectDocuments.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;
export default async function DocumentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = projectDocuments.find((d) => d.slug.join("/") === slug.join("/"));
  if (!doc) notFound();
  return (
    <>
      <div className="document-toolbar">
        <Link href="/project/">← All documents</Link>
        <a href={`/project/raw/${doc.file}`} download>
          Download Markdown ↗
        </a>
      </div>
      <article className="markdown-content">
        <ReactMarkdown
          skipHtml
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => {
              const url = documentationLink(doc.file, href ?? "");
              return url ? (
                <a
                  href={url}
                  {...(/^https?:/.test(url)
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {children}
                </a>
              ) : (
                <span>{children}</span>
              );
            },
            table: ({ children }) => (
              <div className="markdown-table-wrap" tabIndex={0}>
                {<table>{children}</table>}
              </div>
            ),
          }}
        >
          {doc.content}
        </ReactMarkdown>
      </article>
    </>
  );
}
