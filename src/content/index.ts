import { z } from "zod";
import componentData from "./components.json";
import sourceData from "./sources.json";
import termData from "./terminology.json";
import pinData from "./pins.json";
import physicalData from "./physical-inventory.json";
import {
  zoomLevels,
  signalJourneys,
  quizQuestions,
  topics,
  materialEntries,
} from "./journeys";
import type { Component, Source, Term, PinRecord } from "./types";
export * from "./types";
export {
  zoomLevels,
  signalJourneys,
  quizQuestions,
  topics,
  materialEntries,
} from "./journeys";

const text = z.string().min(1),
  refs = z.array(z.string().regex(/^SRC-\d{3}$/));
const representation = z.enum(["layout-faithful", "conceptual", "simplified"]);
const evidence = z.enum(["verified", "inference", "unverified"]);
const measurement = z.object({
  value: z.number().finite(),
  unit: text,
  meaning: text,
  precision: z.enum(["exact", "approximate", "unavailable"]),
  sourceRefs: refs,
  conditions: text,
});
const claim = z
  .object({
    text,
    evidence,
    sourceRefs: refs,
    applicability: text,
    notes: z.string(),
  })
  .refine(
    (c) => c.evidence !== "verified" || c.sourceRefs.length > 0,
    "Verified claims require sources",
  );
const claims = z.record(z.string(), claim);
const position = z.object({
  x: z.number().finite(),
  y: z.number().finite(),
  rotation: z.number().finite(),
  mirrored: z.boolean(),
});
const physical = position.extend({
  referenceDesignator: text,
  boardPosition: position,
  svgId: text,
  slotId: text.nullable(),
  slotPosition: z.object({ x: z.number(), y: z.number() }).nullable(),
  tooltip: text,
  assemblyEligible: z.boolean(),
});
export const componentSchema = z.object({
  id: text,
  name: text,
  shortName: text,
  category: text,
  subsystem: text,
  referenceDesignators: z.array(text),
  partNumber: text.nullable(),
  purpose: text,
  madeOf: text,
  howItWorks: text,
  ifMissing: text,
  analogy: text,
  analogyLimit: text,
  intermediate: text,
  deepDive: text,
  sourceRefs: refs,
  zoomTargets: z.array(text),
  specs: z.array(z.object({ label: text, value: text })),
  measurements: z.array(measurement),
  representation,
  groupedParts: z.array(physical),
  applicability: text,
  evidence,
  claims,
});
export const sourceSchema = z.object({
  id: text,
  title: text,
  organization: text,
  type: text,
  url: z.url(),
  documentIdentity: text,
  evidenceLocation: text,
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  claimsSupported: z.array(text),
  authorityNotes: text,
  checksum: z.string().nullable(),
});
export const zoomSchema = z.object({
  id: text,
  title: text,
  subtitle: text,
  branchIds: z.array(text),
  madeOf: text,
  explanation: text,
  detail: text,
  sourceRefs: refs,
  next: z.array(text),
  parents: z.array(text),
  visualType: text,
  representation,
  scale: measurement.nullable(),
  scaleStatus: z.enum([
    "sourced",
    "approximate",
    "illustrative",
    "not-applicable",
    "unavailable",
  ]),
  abstraction: z.enum(["physical", "functional", "information"]),
  conceptualLevel: z.number().int().min(0).max(13),
  applicability: text,
  electricalTopicId: text,
  claims,
});
const topicSchema = z.object({
  id: text,
  title: text,
  kicker: text,
  summary: text,
  paragraphs: z.array(text).min(1),
  sourceRefs: refs,
});
const edge = z.enum(["control", "power", "data", "return", "parallel"]);
export const signalSchema = z.object({
  id: text,
  title: text,
  summary: text,
  startingEvent: text,
  finalResult: text,
  steps: z
    .array(
      z.object({
        id: text,
        title: text,
        text,
        componentRefs: z.array(text),
        edgeType: edge,
        sourceRefs: refs,
        claims,
      }),
    )
    .min(2),
  edges: z.array(
    z.object({
      fromStepId: text,
      toStepId: text,
      type: edge,
      explanation: text,
    }),
  ),
  sourceRefs: refs,
  applicability: text,
  representation,
});
export const quizSchema = z.object({
  id: text,
  prompt: text,
  choices: z
    .array(z.object({ id: text, text }))
    .min(2)
    .max(4),
  correctChoiceId: text,
  explanation: text,
  sourceRefs: refs,
  topic: text,
  relatedNodeIds: z.array(text),
  depth: z.enum(["beginner", "intermediate", "deepDive"]),
  claim,
});
export const terminologySchema = z.object({
  id: text,
  term: text,
  beginner: text,
  precise: text,
  misconception: text,
  relatedTermIds: z.array(text),
  sourceRefs: refs,
});
export const materialSchema = z.object({
  id: text,
  name: text,
  compositionKind: z.enum(["element", "compound", "mixture"]),
  roles: z.array(
    z.enum([
      "conductor",
      "semiconductor",
      "insulator-dielectric",
      "magnetic",
      "piezoelectric",
      "structural-polymer",
    ]),
  ),
  whereUsed: z.array(claim),
  whyUseful: z.array(claim),
  componentIds: z.array(text),
  zoomTargets: z.array(text),
  evidence,
  applicability: text,
  sourceRefs: refs,
  representation,
});
export const pinSchema = z.object({
  id: text,
  physicalLabel: text,
  arduinoName: text,
  header: text,
  position: z.number().int().positive(),
  mcuPort: text.nullable(),
  mcuPackagePin: z.number().int().min(1).max(28).nullable(),
  digital: z.boolean(),
  analog: text.nullable(),
  pwm: z.boolean(),
  interrupts: z.array(text),
  uart: z.array(text),
  spi: z.array(text),
  twi: z.array(text),
  powerFunction: text.nullable(),
  notes: text,
  sourceRefs: refs,
  applicability: text,
});
export const components: Component[] = componentData as Component[];
export const sources: Source[] = sourceData as Source[];
export const terminology: Term[] = termData as Term[];
export const pinMappings: PinRecord[] = pinData as PinRecord[];
export const physicalInventory = physicalData;
export const componentById = Object.fromEntries(
  components.map((c) => [c.id, c]),
);
export const zoomById = Object.fromEntries(zoomLevels.map((c) => [c.id, c]));
export const sourceById = Object.fromEntries(sources.map((c) => [c.id, c]));
export const subsystemNames = [...new Set(components.map((c) => c.subsystem))];

/** Returns readable errors; caller/build decides how to present an invalid content bundle. */
export function validateContent(): string[] {
  const errors: string[] = [];
  const collections: [string, unknown[], z.ZodType][] = [
    ["components", components, componentSchema],
    ["sources", sources, sourceSchema],
    ["zoomLevels", zoomLevels, zoomSchema],
    ["signalJourneys", signalJourneys, signalSchema],
    ["quizQuestions", quizQuestions, quizSchema],
    ["terminology", terminology, terminologySchema],
    ["materialEntries", materialEntries, materialSchema],
    ["pinMappings", pinMappings, pinSchema],
    ["topics", topics, topicSchema],
  ];
  for (const [name, data, schema] of collections) {
    const seen = new Set<string>();
    for (const value of data) {
      const parsed = schema.safeParse(value);
      if (!parsed.success) errors.push(`${name}: ${parsed.error.message}`);
      const id = (value as { id: string }).id;
      if (seen.has(id)) errors.push(`${name}: duplicate ${id}`);
      seen.add(id);
    }
  }
  const verifyRefs = (
    ids: string[],
    table: Record<string, unknown>,
    owner: string,
  ) => {
    for (const id of ids)
      if (!table[id]) errors.push(`${owner}: unresolved ${id}`);
  };
  const scanSources = (value: unknown, owner: string) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach((v) => scanSources(v, owner));
      return;
    }
    for (const [key, v] of Object.entries(value)) {
      if (key === "sourceRefs") verifyRefs(v as string[], sourceById, owner);
      else scanSources(v, owner);
    }
  };
  collections.forEach(([name, data]) => scanSources(data, name));
  scanSources(topics, "topics");
  for (const part of components) {
    verifyRefs(part.zoomTargets, zoomById, part.id);
    if (
      part.referenceDesignators.slice().sort().join() !==
      part.groupedParts
        .map((p) => p.referenceDesignator)
        .sort()
        .join()
    )
      errors.push(`${part.id}: grouped physical references mismatch`);
    for (const p of part.groupedParts) {
      const original = physicalInventory.find(
        (r) => r.referenceDesignator === p.referenceDesignator,
      );
      if (
        !original ||
        ["x", "y", "rotation", "mirrored"].some(
          (k) =>
            original[k as keyof typeof original] !== p[k as keyof typeof p],
        )
      )
        errors.push(`${part.id}: physical coordinates differ from inventory`);
    }
  }
  const topicIds = Object.fromEntries(topics.map((t) => [t.id, t]));
  for (const node of zoomLevels) {
    verifyRefs([...node.next, ...node.parents], zoomById, node.id);
    verifyRefs([node.electricalTopicId], topicIds, node.id);
    if (node.abstraction === "information" && node.scale !== null)
      errors.push(`${node.id}: information has no physical scale`);
    if (
      node.scale === null &&
      ["sourced", "approximate"].includes(node.scaleStatus)
    )
      errors.push(`${node.id}: missing scale measurement`);
  }
  for (const journey of signalJourneys) {
    const stepIds = Object.fromEntries(journey.steps.map((s) => [s.id, s]));
    for (const step of journey.steps)
      verifyRefs(step.componentRefs, componentById, step.id);
    for (const e of journey.edges)
      verifyRefs([e.fromStepId, e.toStepId], stepIds, journey.id);
  }
  for (const question of quizQuestions) {
    if (
      question.choices.filter((c) => c.id === question.correctChoiceId)
        .length !== 1
    )
      errors.push(`${question.id}: invalid correct choice`);
    if (
      new Set(question.choices.map((c) => c.id)).size !==
      question.choices.length
    )
      errors.push(`${question.id}: duplicate choice ID`);
    verifyRefs(question.relatedNodeIds, zoomById, question.id);
  }
  if (quizQuestions.length !== 12)
    errors.push("Expected exactly 12 quiz questions");
  const terms = Object.fromEntries(terminology.map((t) => [t.id, t]));
  for (const term of terminology)
    verifyRefs(term.relatedTermIds, terms, term.id);
  for (const material of materialEntries) {
    verifyRefs(material.componentIds, componentById, material.id);
    verifyRefs(material.zoomTargets, zoomById, material.id);
  }
  for (const node of zoomLevels)
    for (const next of node.next)
      if (zoomById[next] && !zoomById[next].parents.includes(node.id))
        errors.push(`${node.id}: missing reciprocal parent ${next}`);
  const dipPins = pinMappings.filter((p) => p.header === "DIP");
  if (new Set(dipPins.map((p) => p.position)).size !== 28)
    errors.push("Expected unique DIP positions");
  if (pinMappings.filter((p) => p.header === "DIP").length !== 28)
    errors.push("Expected all 28 DIP pins");
  return errors;
}
