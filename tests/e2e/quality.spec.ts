import { test, expect } from "@playwright/test";

test("passive and USB branches preserve physical origin and scope", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const [ref, title, next] of [
    ["R1", "Inside a resistor", "Electrical energy becomes heat"],
    ["C1", "Inside a capacitor", "A polarizable insulator"],
  ] as const) {
    await page.locator(`[data-ref="${ref}"]`).focus();
    await page.keyboard.press("Enter");
    await page
      .getByRole("button", { name: "Zoom inside", exact: true })
      .click();
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toHaveText(title);
    await page
      .locator(".journey-next")
      .getByRole("button", { name: next, exact: true })
      .click();
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toHaveText(next);
    await page
      .getByRole("button", { name: `Return to ${ref}`, exact: true })
      .click();
    await expect(page.locator(`[data-ref="${ref}"]`)).toBeFocused();
  }
  await page
    .getByRole("complementary", { name: "Component navigator" })
    .locator('[data-component-id="pcb"]')
    .click();
  await expect(
    page
      .getByRole("complementary", { name: "Object details" })
      .getByRole("heading", { name: "PCB & copper", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Zoom inside", exact: true }).click();
  await page
    .getByRole("button", { name: "Return to pcb", exact: true })
    .click();
  await expect(
    page.getByRole("group", { name: "Interactive Arduino Uno Rev3 board" }),
  ).toBeFocused();
  await page.locator('[data-ref="U3"]').focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Zoom inside", exact: true }).click();
  await expect(page.locator(".shared-model-note")).toContainText(
    "ATmega328P example",
  );
  await expect(page.locator(".shared-model-note")).toContainText(
    "different capacities",
  );
});

test("single teaching timer stops when hidden, offscreen, inactive, paused or reduced", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const timers = new Set<number>();
    const originalSet = window.setInterval.bind(window);
    const originalClear = window.clearInterval.bind(window);
    const audit = {
      timers,
      hidden: false,
      intersection: null as IntersectionObserverCallback | null,
    };
    Object.assign(window, { timerAudit: audit });
    window.setInterval = ((
      handler: TimerHandler,
      delay?: number,
      ...args: unknown[]
    ) => {
      const id = originalSet(handler, delay, ...args);
      if (delay === 3500) timers.add(id);
      return id;
    }) as typeof window.setInterval;
    window.clearInterval = ((id?: number) => {
      if (id !== undefined) timers.delete(id);
      originalClear(id);
    }) as typeof window.clearInterval;
    Object.defineProperty(document, "hidden", { get: () => audit.hidden });
    const Observer = window.IntersectionObserver;
    window.IntersectionObserver = class extends Observer {
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
      ) {
        super(callback, options);
        audit.intersection = callback;
      }
    };
  });
  await page.goto("/");
  const count = () =>
    page.evaluate(
      () =>
        (window as unknown as { timerAudit: { timers: Set<number> } })
          .timerAudit.timers.size,
    );
  await expect.poll(count).toBe(0);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: /^Journey/ })
    .click();
  await page
    .locator(".mode-nav")
    .getByRole("button", { name: "Signal journeys", exact: true })
    .click();
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect.poll(count).toBe(1);
  for (const hidden of [true, false]) {
    await page.evaluate((hidden) => {
      (
        window as unknown as { timerAudit: { hidden: boolean } }
      ).timerAudit.hidden = hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    }, hidden);
    await expect.poll(count).toBe(hidden ? 0 : 1);
  }
  for (const isIntersecting of [false, true]) {
    await page.evaluate((isIntersecting) => {
      const audit = (
        window as unknown as {
          timerAudit: { intersection: IntersectionObserverCallback };
        }
      ).timerAudit;
      audit.intersection(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    }, isIntersecting);
    await expect.poll(count).toBe(isIntersecting ? 1 : 0);
  }
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect.poll(count).toBe(0);
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await expect.poll(count).toBe(1);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: /^Learn/ })
    .click();
  await expect.poll(count).toBe(0);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("button", { name: /^Journey/ })
    .click();
  await page
    .locator(".mode-nav")
    .getByRole("button", { name: "Signal journeys", exact: true })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(count).toBe(0);
  await expect(
    page.getByRole("button", { name: "Play", exact: true }),
  ).toBeDisabled();
});

test("200 percent equivalent reflow and mobile control targets remain usable", async ({
  page,
}) => {
  // 720x500 CSS px is the reflow viewport of a 1440x1000 window at 200% zoom.
  // This checks reflow, not the browser chrome's native zoom implementation.
  await page.setViewportSize({ width: 720, height: 500 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open component navigator" }).click();
  await page
    .getByRole("dialog")
    .getByRole("searchbox", { name: "Search components" })
    .fill("ATmega328P");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "ATmega328P MCU ZU4", exact: true })
    .click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "ATmega328P", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 360, height: 900 });
  const tooSmall = await page.locator("button:visible").evaluateAll((buttons) =>
    buttons
      .filter((b) => {
        const r = b.getBoundingClientRect();
        return r.width < 43.9 || r.height < 43.9;
      })
      .map((b) => b.getAttribute("aria-label") || b.textContent),
  );
  expect(tooSmall).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("assembly snaps a matching drop within 24 screen pixels of its slot", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .locator(".mode-nav")
    .getByRole("button", { name: "Assemble", exact: true })
    .click();
  const from = await page.locator('[data-tray-ref="RESET"]').boundingBox();
  const target = await page.locator('[data-slot-ref="RESET"]').boundingBox();
  expect(from).not.toBeNull();
  expect(target).not.toBeNull();
  await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
  await page.mouse.down();
  await page.mouse.move(target!.x + target!.width / 2, target!.y - 12, {
    steps: 8,
  });
  await page.mouse.up();
  await expect(
    page.getByRole("progressbar", { name: "Assembly progress" }),
  ).toHaveAttribute("value", "1");
});
