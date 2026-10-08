import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
const root = path.resolve("out");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
    let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
    } catch {
      // Next's segmented RSC requests use dots; the static exporter writes folders.
      const name = path.basename(file);
      if (name.startsWith("__next.") && name.endsWith(".txt")) {
        const segments = name.slice(0, -4).split(".");
        file =
          path.join(
            path.dirname(file),
            segments.slice(0, 2).join("."),
            ...segments.slice(2),
          ) + ".txt";
      } else file = path.join(file, "index.html");
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found. Return to / to explore the board.");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Inside the Uno: http://127.0.0.1:${port}`),
);
