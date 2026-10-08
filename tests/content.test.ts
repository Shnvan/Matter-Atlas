import { describe, expect, it } from "vitest";
import {
  validateContent,
  components,
  physicalInventory,
  pinMappings,
  zoomLevels,
  zoomById,
  quizQuestions,
  topics,
  componentSchema,
  signalJourneys,
} from "../src/content";

describe("reviewed content projection", () => {
  it("validates all typed collections and references", () =>
    expect(validateContent()).toEqual([]));
  it("keeps physical inventory separate from teaching groups", () => {
    expect(physicalInventory).toHaveLength(116);
    expect(
      new Set(physicalInventory.map((p) => p.referenceDesignator)).size,
    ).toBe(116);
    expect(components.length).toBeLessThan(116);
  });
  it("rejects verified claims with no source", () => {
    const example = structuredClone(components[0]);
    example.claims.purpose.sourceRefs = [];
    expect(componentSchema.safeParse(example).success).toBe(false);
  });
  it("maps 28-pin DIP, PWM and duplicate Rev3 contacts", () => {
    const dip = pinMappings.filter((p) => p.header === "DIP");
    expect(dip.map((p) => p.position)).toEqual(
      Array.from({ length: 28 }, (_, i) => i + 1),
    );
    expect(dip.find((p) => p.arduinoName === "D13")).toMatchObject({
      mcuPort: "PB5",
      mcuPackagePin: 19,
      spi: ["SCK"],
    });
    expect(dip.find((p) => p.arduinoName === "A0")).toMatchObject({
      mcuPort: "PC0",
      mcuPackagePin: 23,
    });
    expect(dip.filter((p) => p.pwm).map((p) => p.arduinoName)).toEqual([
      "D3",
      "D5",
      "D6",
      "D9",
      "D10",
      "D11",
    ]);
    expect(
      pinMappings.some((p) => p.analog === "A6" || p.analog === "A7"),
    ).toBe(false);
    expect(pinMappings.find((p) => p.id === "pin-ioh-9")).toMatchObject({
      arduinoName: "SDA",
      mcuPackagePin: 27,
    });
    expect(pinMappings.find((p) => p.id === "pin-ioh-10")).toMatchObject({
      arduinoName: "SCL",
      mcuPackagePin: 28,
    });
  });
  it("preserves reciprocal MCU and independent LED paths", () => {
    const follow = (path: string[]) =>
      path
        .slice(1)
        .forEach((id, i) => expect(zoomById[path[i]].next).toContain(id));
    follow([
      "ic-package",
      "silicon-die",
      "functional-blocks",
      "cpu-circuit",
      "logic-gates",
      "mosfet",
      "doped-silicon",
      "silicon-lattice",
      "atom",
      "electron",
    ]);
    follow(["led-junction", "carriers", "photon"]);
    expect(zoomById["resistor-film"].next).not.toContain("mosfet");
    expect(zoomById.software).toMatchObject({
      abstraction: "information",
      scale: null,
      scaleStatus: "not-applicable",
    });
    for (const node of zoomLevels)
      for (const target of node.next)
        expect(zoomById[target].parents).toContain(node.id);
  });
  it("has twelve questions and a 300–500 word history", () => {
    expect(quizQuestions).toHaveLength(12);
    const count = topics
      .find((t) => t.id === "history")!
      .paragraphs.join(" ")
      .split(/\s+/).length;
    expect(count).toBeGreaterThanOrEqual(300);
    expect(count).toBeLessThanOrEqual(500);
  });
  it("distinguishes the five causal relationships", () => {
    const kinds = new Set(
      signalJourneys.flatMap((j) => j.edges.map((e) => e.type)),
    );
    expect([...kinds]).toEqual(
      expect.arrayContaining([
        "control",
        "power",
        "data",
        "return",
        "parallel",
      ]),
    );
  });
});
