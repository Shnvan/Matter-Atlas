import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const extension = path.resolve("qa-artifacts/zoom-extension");
await mkdir(extension, { recursive: true });
await writeFile(
  path.join(extension, "manifest.json"),
  JSON.stringify({
    manifest_version: 3,
    name: "Owned local QA zoom",
    version: "1.0",
    permissions: ["tabs"],
    background: { service_worker: "worker.js" },
  }),
);
await writeFile(
  path.join(extension, "worker.js"),
  "chrome.runtime.onInstalled.addListener(() => {});",
);
const context = await chromium.launchPersistentContext("", {
  channel: "chromium",
  headless: true,
  viewport: null,
  args: [
    "--window-size=1440,1000",
    `--disable-extensions-except=${extension}`,
    `--load-extension=${extension}`,
  ],
});
try {
  const worker =
    context.serviceWorkers()[0] ??
    (await context.waitForEvent("serviceworker"));
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.waitForSelector(".uno-board-svg");
  const before = await page.evaluate(() => innerWidth);
  const zoom = await worker.evaluate(async () => {
    const tabsAPI = chrome.tabs;
    const tabs = await tabsAPI.query({ url: "http://127.0.0.1:4173/*" });
    await tabsAPI.setZoom(tabs[0].id, 2);
    return tabsAPI.getZoom(tabs[0].id);
  });
  assert.equal(zoom, 2);
  await page.waitForTimeout(300);
  assert.ok((await page.evaluate(() => innerWidth)) <= before / 2 + 1);
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.getByRole("button", { name: "Open component navigator" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "ATmega328P MCU ZU4", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("heading", { name: "ATmega328P", exact: true })
    .waitFor({ state: "visible" });
  await page.keyboard.press("Escape");
  const session = await context.newCDPSession(page);
  const capture = await session.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(
    "qa-artifacts/native-zoom-200.png",
    Buffer.from(capture.data, "base64"),
  );
  console.log(
    JSON.stringify({
      browser: context.browser()?.version(),
      zoom,
      before,
      after: await page.evaluate(() => innerWidth),
      overflow: false,
      panels: "passed",
    }),
  );
} finally {
  await context.close();
}
