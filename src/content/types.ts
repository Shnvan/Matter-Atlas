export type Evidence = "verified" | "inference" | "unverified";
export type Representation = "layout-faithful" | "conceptual" | "simplified";
export interface Claim {
  text: string;
  evidence: Evidence;
  sourceRefs: string[];
  applicability: string;
  notes: string;
}
export interface Measurement {
  value: number;
  unit: string;
  meaning: string;
  precision: "exact" | "approximate" | "unavailable";
  sourceRefs: string[];
  conditions: string;
}
export interface PhysicalPart {
  referenceDesignator: string;
  x: number;
  y: number;
  rotation: number;
  mirrored: boolean;
  boardPosition: { x: number; y: number; rotation: number; mirrored: boolean };
  svgId: string;
  slotId: string | null;
  slotPosition: { x: number; y: number } | null;
  tooltip: string;
  assemblyEligible: boolean;
}
export interface Component {
  id: string;
  name: string;
  shortName: string;
  category: string;
  subsystem: string;
  referenceDesignators: string[];
  partNumber: string | null;
  purpose: string;
  madeOf: string;
  howItWorks: string;
  ifMissing: string;
  analogy: string;
  analogyLimit: string;
  intermediate: string;
  deepDive: string;
  sourceRefs: string[];
  zoomTargets: string[];
  specs: { label: string; value: string }[];
  measurements: Measurement[];
  representation: Representation;
  groupedParts: PhysicalPart[];
  applicability: string;
  evidence: Evidence;
  claims: Record<string, Claim>;
}
export interface ZoomNode {
  id: string;
  title: string;
  subtitle: string;
  branchIds: string[];
  madeOf: string;
  explanation: string;
  detail: string;
  sourceRefs: string[];
  next: string[];
  parents: string[];
  visualType: string;
  representation: Representation;
  scale: Measurement | null;
  scaleStatus:
    | "sourced"
    | "approximate"
    | "illustrative"
    | "not-applicable"
    | "unavailable";
  abstraction: "physical" | "functional" | "information";
  conceptualLevel: number;
  applicability: string;
  electricalTopicId: string;
  claims: Record<string, Claim>;
}
export interface Source {
  id: string;
  title: string;
  organization: string;
  type: string;
  url: string;
  documentIdentity: string;
  evidenceLocation: string;
  accessed: string;
  claimsSupported: string[];
  authorityNotes: string;
  checksum: string | null;
}
export type EdgeType = "control" | "power" | "data" | "return" | "parallel";
export interface SignalStep {
  id: string;
  title: string;
  text: string;
  componentRefs: string[];
  edgeType: EdgeType;
  sourceRefs: string[];
  claims: Record<string, Claim>;
}
export interface SignalJourney {
  id: string;
  title: string;
  summary: string;
  startingEvent: string;
  finalResult: string;
  steps: SignalStep[];
  edges: {
    fromStepId: string;
    toStepId: string;
    type: EdgeType;
    explanation: string;
  }[];
  sourceRefs: string[];
  applicability: string;
  representation: Representation;
}
export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: { id: string; text: string }[];
  correctChoiceId: string;
  explanation: string;
  sourceRefs: string[];
  topic: string;
  relatedNodeIds: string[];
  depth: "beginner" | "intermediate" | "deepDive";
  claim: Claim;
}
export interface Topic {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  paragraphs: string[];
  sourceRefs: string[];
}
export interface Term {
  id: string;
  term: string;
  beginner: string;
  precise: string;
  misconception: string;
  relatedTermIds: string[];
  sourceRefs: string[];
}
export interface MaterialEntry {
  id: string;
  name: string;
  compositionKind: "element" | "compound" | "mixture";
  roles: string[];
  whereUsed: Claim[];
  whyUseful: Claim[];
  componentIds: string[];
  zoomTargets: string[];
  evidence: Evidence;
  applicability: string;
  sourceRefs: string[];
  representation: Representation;
}
export interface PinRecord {
  id: string;
  physicalLabel: string;
  arduinoName: string;
  header: string;
  position: number;
  mcuPort: string | null;
  mcuPackagePin: number | null;
  digital: boolean;
  analog: string | null;
  pwm: boolean;
  interrupts: string[];
  uart: string[];
  spi: string[];
  twi: string[];
  powerFunction: string | null;
  notes: string;
  sourceRefs: string[];
  applicability: string;
}
