import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { rawFiles } from "./document-list.mjs";
for (const directory of ["public/project/raw", "public/project/archive"]) {
  for (const file of [...rawFiles, "index.html"]) {
    const target = path.join(directory, file);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(file, target);
  }
}
console.log(
  `Prepared ${rawFiles.length} allowlisted raw documents and the archived offline guide.`,
);
