import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  quizQuestions,
  signalJourneys,
  zoomLevels,
} from "../../src/content/journeys";

const assemblyRefs = [
  "ZU4",
  "X2",
  "X1",
  "U3",
  "U1",
  "U2",
  "T1",
  "Y1",
  "Y2",
  "RESET",
];
const main = (page: Page) => page.getByRole("main");
const mode = (page: Page, label: string) =>
  page.locator(".mode-nav").getByRole("button", { name: label, exact: true });
const primary = (page: Page, label: string) =>
  page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: new RegExp(`^${label}`) });
const boardPart = (page: Page, ref: string) =>
  page.locator(`[data-ref="${ref}"]`);
const sceneStatus = (page: Page) =>
  page.locator(".scene-content").getByRole("status");

async function selectPart(page: Page, ref: string) {
  await boardPart(page, ref).focus();
  await page.keyboard.press("Enter");
  await expect(boardPart(page, ref)).toHaveAttribute("aria-pressed", "true");
}

async function nextScene(page: Page, id: string) {
  const node = zoomLevels.find((node) => node.id === id)!;
  await page
    .locator(".journey-next")
    .getByRole("button", { name: node.title, exact: true })
    .click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    node.title,
  );
  await expect(main(page).getByRole("heading", { level: 1 })).toBeFocused();
}

async function enterMainChip(page: Page) {
  await selectPart(page, "ZU4");
  await page.getByRole("button", { name: "Zoom inside", exact: true }).click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    "Inside the package",
  );
}

async function noAxeViolations(page: Page) {
  const scene = page.locator(".scene-content");
  if (await scene.count()) await expect(scene).toHaveCSS("opacity", "1");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    result.violations,
    JSON.stringify(
      result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
      null,
      2,
    ),
  ).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(
    main(page).getByRole("heading", { level: 1, name: /Arduino Uno/ }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test.afterEach(async ({ page }) => {
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    const missing = [...document.querySelectorAll("svg *")]
      .flatMap((e) =>
        [...e.attributes].flatMap((a) =>
          [...a.value.matchAll(/url\(#([^)]*)\)/g)].map((m) => m[1]),
        ),
      )
      .filter((id) => !document.getElementById(id));
    return { duplicates, missing };
  });
  expect(audit).toEqual({ duplicates: [], missing: [] });
});

test("board selection, progressive details, search, subsystem filters and empty recovery", async ({
  page,
}) => {
  await selectPart(page, "ZU4");
  const inspector = page.getByRole("complementary", { name: "Object details" });
  await expect(
    inspector.getByRole("heading", { name: "ATmega328P", exact: true }),
  ).toBeVisible();
  await expect(
    inspector.getByRole("heading", { name: "What is it made of?" }),
  ).toBeVisible();
  await inspector
    .getByRole("button", { name: "Deep dive", exact: true })
    .click();
  await expect(
    inspector.getByRole("button", { name: "Deep dive", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await inspector
    .getByText("What if it were missing?", { exact: true })
    .click();
  await expect(inspector.locator("details").first()).toHaveAttribute(
    "open",
    "",
  );
  const navigator = page.getByRole("complementary", {
    name: "Component navigator",
  });
  const search = navigator.getByRole("searchbox", {
    name: "Search components",
  });
  await search.fill("FDN340P");
  await expect(navigator.locator(".component-button")).toHaveCount(1);
  await navigator.locator(".component-button").click();
  await expect(boardPart(page, "T1")).toHaveAttribute("aria-pressed", "true");
  await search.fill("unfindable component 987");
  await expect(
    navigator.getByText("No matching components.", { exact: true }),
  ).toBeVisible();
  await navigator.getByRole("button", { name: "Clear filters" }).click();
  await expect(search).toHaveValue("");
  await navigator.getByRole("button", { name: "Clock", exact: true }).click();
  await expect(navigator.locator(".component-button")).toHaveCount(6);
  await expect(navigator.locator(".component-list")).toContainText("Y1");
  await expect(navigator.locator(".component-list")).toContainText("Y2");
  await navigator
    .getByRole("button", { name: "All systems", exact: true })
    .click();
  await expect(navigator.locator(".component-button")).toHaveCount(49);
  await navigator
    .getByRole("combobox", { name: "Filter by component category" })
    .selectOption("LED");
  await expect(navigator.locator(".component-button")).toHaveCount(4);
  await navigator
    .getByRole("combobox", { name: "Filter by component category" })
    .selectOption("All components");
});

test("object view controls preserve selection and restore the board", async ({
  page,
}) => {
  await selectPart(page, "ZU4");
  await page.getByRole("button", { name: "Focus", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Focus", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Isolate", exact: true }).click();
  await expect(page.locator(".uno-board-context")).toHaveAttribute(
    "opacity",
    "0.3",
  );
  await page.getByRole("button", { name: "Hide others", exact: true }).click();
  await expect(page.locator('.uno-component[role="button"]')).toHaveCount(1);
  await page.getByRole("button", { name: "Fit board" }).click();
  await expect(
    page.getByRole("button", { name: "Hide others", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.locator(".zoom-readout")).toHaveText("120%");
  await page.getByRole("button", { name: "Rotate board clockwise" }).click();
  await expect(page.locator(".uno-board-svg > g").first()).toHaveAttribute(
    "transform",
    /rotate\(90\)/,
  );
  await mode(page, "Explode").click();
  await expect(
    page.getByRole("button", { name: "Reassemble", exact: true }),
  ).toBeVisible();
  await expect(boardPart(page, "ZU4")).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Reassemble", exact: true }).click();
  await page.getByRole("button", { name: "Reset board view" }).click();
  await expect(page.locator(".zoom-readout")).toHaveText("100%");
  await expect(
    page.getByRole("button", { name: "Focus", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  const camera = page.locator(".uno-board-svg > g").first();
  const restoredTransform = await camera.getAttribute("transform");
  await page
    .getByRole("group", { name: "Interactive Arduino Uno Rev3 board" })
    .focus();
  await page.keyboard.press("ArrowRight");
  await expect(camera).not.toHaveAttribute("transform", restoredTransform!);
  await page.keyboard.press("Home");
  await expect(camera).toHaveAttribute("transform", restoredTransform!);
});

test("the full MCU path supports model inputs, history and origin return", async ({
  page,
}) => {
  await enterMainChip(page);
  for (const id of [
    "silicon-die",
    "functional-blocks",
    "cpu-circuit",
    "logic-gates",
  ])
    await nextScene(page, id);
  await expect(sceneStatus(page)).toContainText("The output is 0");
  await page.getByRole("button", { name: "Input A: 0", exact: true }).click();
  await expect(sceneStatus(page)).toContainText("The output is 0");
  await page.getByRole("button", { name: "Input B: 0", exact: true }).click();
  await expect(sceneStatus(page)).toContainText("The output is 1");
  await main(page).getByRole("combobox").selectOption("NOT");
  await expect(page.getByRole("button", { name: /^Input B:/ })).toHaveCount(0);
  await expect(sceneStatus(page)).toContainText("The output is 0");
  await nextScene(page, "mosfet");
  await page
    .getByRole("button", { name: "Gate control: LOW", exact: true })
    .click();
  await expect(sceneStatus(page)).toContainText("conductive electron channel");
  for (const id of ["doped-silicon", "silicon-lattice", "atom", "electron"])
    await nextScene(page, id);
  await expect(
    page.getByRole("navigation", { name: "Your journey" }),
  ).toContainText("An atom");
  await expect(main(page).getByRole("img")).toHaveAccessibleName(
    /Electron and probability/,
  );
  await expect(sceneStatus(page)).toContainText("not consumed");
  await main(page).getByRole("button", { name: "Back", exact: true }).click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    "An atom",
  );
  await main(page)
    .getByRole("button", { name: "Return to ZU4", exact: true })
    .click();
  await expect(boardPart(page, "ZU4")).toHaveAttribute("aria-pressed", "true");
  await expect(boardPart(page, "ZU4")).toBeFocused();
});

test("the LED branch explains carriers, energy transfer and photons independently", async ({
  page,
}) => {
  await selectPart(page, "L");
  await page.getByRole("button", { name: "Zoom inside", exact: true }).click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    "Inside a light-emitting diode",
  );
  await page
    .getByRole("button", { name: "Bias: no applied bias", exact: true })
    .click();
  await expect(sceneStatus(page)).toContainText("Forward bias");
  await nextScene(page, "carriers");
  await page
    .getByRole("button", {
      name: "Show light-emitting transition",
      exact: true,
    })
    .click();
  await expect(sceneStatus(page)).toContainText("The electron remains");
  await nextScene(page, "photon");
  await page
    .getByRole("button", {
      name: "Show light-emitting transition",
      exact: true,
    })
    .click();
  await expect(main(page).getByRole("img")).toHaveAccessibleName(/photon/i);
  await expect(
    page.getByRole("navigation", { name: "Your journey" }),
  ).not.toContainText("Logic gates");
  await main(page)
    .getByRole("button", { name: "Return to L", exact: true })
    .click();
  await expect(boardPart(page, "L")).toBeFocused();
});

test("assembly rejects mismatches, allows keyboard placement, completes and resets", async ({
  page,
}) => {
  await mode(page, "Assemble").click();
  await page.locator('[data-tray-ref="ZU4"]').focus();
  await page.keyboard.press("Enter");
  await page.locator('[data-slot-ref="X2"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status").last()).toContainText(
    "That slot does not match",
  );
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "0");
  await page.getByRole("button", { name: "Hint", exact: true }).click();
  await expect(page.locator('[data-slot-ref="ZU4"]')).toHaveClass(/is-ready/);
  for (const ref of assemblyRefs) {
    await page.locator(`[data-tray-ref="${ref}"]`).focus();
    await page.keyboard.press("Enter");
    await page.locator(`[data-slot-ref="${ref}"]`).focus();
    await page.keyboard.press("Enter");
  }
  await expect(
    main(page).getByRole("heading", { name: "A complete board.", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "10");
  await page
    .getByRole("button", { name: "Reset assembly", exact: true })
    .click();
  await expect(
    main(page).getByRole("heading", { name: "0 of 10 parts placed" }),
  ).toBeVisible();
});

test("assembly pointer cancellation retains the part and pointer placement recovers", async ({
  page,
}) => {
  await mode(page, "Assemble").click();
  const part = page.locator('[data-tray-ref="ZU4"]');
  const box = await part.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width / 2 + 20, box!.y - 30);
  await part.dispatchEvent("pointercancel", {
    pointerId: 1,
    pointerType: "mouse",
    bubbles: true,
  });
  await page.mouse.up();
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "0");
  await expect(part).toBeEnabled();
  await part.click();
  await page.locator('[data-slot-ref="ZU4"]').click();
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "1");
  const second = page.locator('[data-tray-ref="X2"]');
  const from = await second.boundingBox();
  const to = await page.locator('[data-slot-ref="X2"]').boundingBox();
  expect(from).not.toBeNull();
  expect(to).not.toBeNull();
  await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
  await page.mouse.down();
  await page.mouse.move(to!.x + to!.width / 2, to!.y + to!.height / 2, {
    steps: 8,
  });
  await page.mouse.up();
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "2");
});

test("all causal signal journeys step, stop at their final event and restart", async ({
  page,
}) => {
  await primary(page, "Journey").click();
  await mode(page, "Signal journeys").click();
  for (const journey of signalJourneys) {
    await page
      .getByLabel("Choose a journey", { exact: true })
      .selectOption(journey.id);
    await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
      journey.title,
    );
    await expect(
      page.getByRole("button", { name: "Previous signal step" }),
    ).toBeDisabled();
    for (let i = 1; i < journey.steps.length; i++)
      await page.getByRole("button", { name: "Next signal step" }).click();
    await expect(main(page).getByRole("heading", { level: 2 })).toHaveText(
      journey.steps.at(-1)!.title,
    );
    await expect(
      page.getByRole("button", { name: "Next signal step" }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Restart signal journey" }).click();
    await expect(main(page).getByRole("heading", { level: 2 })).toHaveText(
      journey.steps[0].title,
    );
  }
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("progressbar", { name: "Journey progress" }),
  ).toHaveAttribute("value", "2", { timeout: 6000 });
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  const value = await page
    .getByRole("progressbar", { name: "Journey progress" })
    .getAttribute("value");
  await page.waitForTimeout(3800);
  await expect(
    page.getByRole("progressbar", { name: "Journey progress" }),
  ).toHaveAttribute("value", value!);
});

test("quiz requires an answer, explains mistakes, scores twelve questions and retries", async ({
  page,
}) => {
  await primary(page, "Learn").click();
  await mode(page, "Test yourself").click();
  for (const [index, question] of quizQuestions.entries()) {
    await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
      question.prompt,
    );
    await expect(
      page.getByRole("button", { name: "Check answer", exact: true }),
    ).toBeDisabled();
    const choice = question.choices.find((choice) =>
      index === 0
        ? choice.id !== question.correctChoiceId
        : choice.id === question.correctChoiceId,
    )!;
    await page
      .getByRole("radio", {
        name: new RegExp(choice.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      })
      .check();
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    const feedback = page.getByRole("region", { name: "Answer explanation" });
    await expect(feedback).toContainText(question.explanation);
    await expect(feedback.getByRole("heading")).toContainText(
      index === 0 ? "Not quite" : "That’s right",
    );
    await expect(page.getByRole("radio").first()).toBeDisabled();
    await page
      .getByRole("button", {
        name:
          index === quizQuestions.length - 1
            ? "See your results"
            : "Next question",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".quiz-score")).toHaveText("11/ 12");
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    quizQuestions[0].prompt,
  );
  await expect(page.getByRole("radio").first()).not.toBeChecked();
  await expect(
    page.getByRole("button", { name: "Check answer", exact: true }),
  ).toBeDisabled();
});

test("field guide, glossary, materials, pin search and connections open useful content", async ({
  page,
}) => {
  await primary(page, "Learn").click();
  await main(page)
    .getByRole("button", { name: /Why this board exists/ })
    .click();
  await expect(
    main(page).getByRole("heading", {
      name: "Why this board exists",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "All chapters", exact: true }).click();
  await page.getByRole("textbox", { name: "Find a term" }).fill("photon");
  await expect(page.locator(".term-list details")).toHaveCount(1);
  await mode(page, "Materials").click();
  await expect(
    main(page).getByRole("heading", { name: "Silicon", exact: true }),
  ).toBeVisible();
  await mode(page, "Pin reference").click();
  await page.getByRole("textbox", { name: "Search pins" }).fill("D13");
  await expect(page.getByRole("table")).toContainText("PB5");
  await expect(page.getByRole("table")).toContainText("19");
  await page.getByRole("textbox", { name: "Search pins" }).fill("no_such_pin");
  await expect(main(page)).toContainText("No pins match");
  await mode(page, "Connections").click();
  await expect(
    main(page).getByRole("heading", {
      name: "Light-emitting diode",
      exact: true,
    }),
  ).toBeVisible();
  await main(page)
    .getByRole("button", { name: "Electron and probability", exact: true })
    .first()
    .click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    "Electron and probability",
  );
});

test("mobile sheets provide keyboard access, Escape and trigger focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 900 });
  const trigger = page.getByRole("button", {
    name: "Open component navigator",
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const nav = page.getByRole("dialog", { name: "Explore the board" });
  await expect(nav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("dialog", { name: "Explore the board" })
    .locator('[data-component-id="mcu-main"]')
    .click();
  const details = page.getByRole("dialog", { name: "Object details" });
  await expect(details).toBeVisible();
  await expect(
    details.getByRole("heading", { name: "ATmega328P", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(details).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open details" }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("theme and reduced motion work without external assets or runtime content requests", async ({
  page,
}) => {
  const remote: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => {
    if (
      /^https?:/.test(request.url()) &&
      new URL(request.url()).origin !== "http://127.0.0.1:4173"
    )
      remote.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error")
      errors.push(`${message.text()} ${message.location().url}`);
  });
  await page.route("**/*", (route) =>
    /^https?:/.test(route.request().url()) &&
    new URL(route.request().url()).origin !== "http://127.0.0.1:4173"
      ? route.abort()
      : route.continue(),
  );
  await page.reload();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await primary(page, "Journey").click();
  await mode(page, "Signal journeys").click();
  await expect(
    page.getByRole("button", { name: "Play", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Next signal step" }).click();
  await expect(
    page.getByRole("progressbar", { name: "Journey progress" }),
  ).toHaveAttribute("value", "2");
  await primary(page, "Learn").click();
  await mode(page, "Test yourself").click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    quizQuestions[0].prompt,
  );
  expect(remote).toEqual([]);
  expect(errors).toEqual([]);
});

test("contributor routes preserve readable memory, downloads and the archived guide", async ({
  page,
  request,
}) => {
  await page
    .getByRole("link", {
      name: "Project and research documentation",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/project\/$/);
  await page.getByRole("link", { name: /^Current handoff/ }).click();
  await expect(page).toHaveURL(/\/project\/HANDOFF\/$/);
  await expect(
    page.getByRole("heading", { name: "Current State", exact: true }),
  ).toBeVisible();
  const download = page.getByRole("link", { name: /^Download Markdown/ });
  const raw = await request.get((await download.getAttribute("href"))!);
  expect(raw.ok()).toBe(true);
  expect(await raw.text()).toContain("# Current State");
  await page.getByRole("link", { name: /^← All documents/ }).click();
  await page.getByRole("link", { name: /^Original offline guide/ }).click();
  await expect(page).toHaveURL(/\/project\/archive\/index\.html$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Inside the Arduino Uno",
  );
  const guideLinks = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links
        .map((link) => (link as HTMLAnchorElement).href)
        .filter((href) => href.startsWith("http://127.0.0.1:4173")),
    );
  expect(guideLinks.length).toBeGreaterThan(20);
  for (const url of guideLinks)
    expect((await request.get(url)).ok(), `Archived guide link: ${url}`).toBe(
      true,
    );
});

test("WCAG automated checks cover both themes, microscopic scene, quiz and mobile dialogs", async ({
  page,
}) => {
  await noAxeViolations(page);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await noAxeViolations(page);
  await enterMainChip(page);
  for (const id of [
    "silicon-die",
    "functional-blocks",
    "cpu-circuit",
    "logic-gates",
    "mosfet",
  ])
    await nextScene(page, id);
  await noAxeViolations(page);
  await primary(page, "Learn").click();
  await mode(page, "Test yourself").click();
  await noAxeViolations(page);
  await primary(page, "Explore").click();
  await page.setViewportSize({ width: 360, height: 900 });
  await noAxeViolations(page);
  await page.getByRole("button", { name: "Open component navigator" }).click();
  await noAxeViolations(page);
});

test("capture responsive and object-state images for manual visual review", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ["light", "dark"]) {
      if ((await page.locator("html").getAttribute("data-theme")) !== theme)
        await page
          .getByRole("button", { name: `Switch to ${theme} theme` })
          .click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `qa-artifacts/explore-${theme}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      await expect(page).toHaveScreenshot(`explore-${theme}-${width}.png`, {
        fullPage: true,
        animations: "disabled",
      });
    }
  }
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await selectPart(page, "ZU4");
  await page.screenshot({
    path: "qa-artifacts/selected.png",
    fullPage: true,
    animations: "disabled",
  });
  await expect(page).toHaveScreenshot("selected.png", {
    fullPage: true,
    animations: "disabled",
  });
  for (const [label, name] of [
    ["Focus", "focused"],
    ["Isolate", "isolated"],
    ["Hide others", "hidden"],
  ] as const) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await page.screenshot({
      path: `qa-artifacts/${name}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: "disabled",
    });
  }
  await page.getByRole("button", { name: "Fit board" }).click();
  await mode(page, "Explode").click();
  await page.screenshot({
    path: "qa-artifacts/exploded.png",
    fullPage: true,
    animations: "disabled",
  });
  await expect(page).toHaveScreenshot("exploded.png", {
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Zoom inside", exact: true }).click();
  await expect(main(page).getByRole("heading", { level: 1 })).toHaveText(
    "Inside the package",
  );
  await expect(main(page).getByRole("img")).toBeVisible();
  await page.screenshot({
    path: "qa-artifacts/microscopic-package.png",
    fullPage: true,
    animations: "disabled",
  });
  await expect(page).toHaveScreenshot("microscopic-package.png", {
    fullPage: true,
    animations: "disabled",
  });
});
