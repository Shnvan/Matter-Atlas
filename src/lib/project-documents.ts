import fs from "node:fs";
import path from "node:path";
import { documentFiles, rawFiles } from "../../scripts/document-list.mjs";
export const projectDocuments = documentFiles.map((file) => {
  const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
  return {
    file,
    slug: file.replace(/\.md$/, "").split("/"),
    title: content.match(/^# (.+)$/m)?.[1] ?? file,
    content,
  };
});
export function documentationLink(file: string, href: string) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [target, fragment] = href.split("#");
  const resolved = path.posix.normalize(
    path.posix.join(path.posix.dirname(file), target),
  );
  if (documentFiles.includes(resolved))
    return `/project/${resolved.replace(/\.md$/, "")}/${fragment ? "#" + fragment : ""}`;
  if (rawFiles.includes(resolved))
    return `/project/raw/${resolved}${fragment ? "#" + fragment : ""}`;
  if (resolved === "index.html") return "/project/archive/index.html";
  return undefined;
}
