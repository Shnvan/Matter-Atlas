import { test, expect } from "@playwright/test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
test("native Chromium tab zoom at 200 percent reflows and keeps panels usable", async () => {
  const { stdout } = await promisify(execFile)(
    process.execPath,
    ["scripts/check-browser-zoom.mjs"],
    { cwd: process.cwd() },
  );
  expect(JSON.parse(stdout)).toMatchObject({
    zoom: 2,
    overflow: false,
    panels: "passed",
  });
});
