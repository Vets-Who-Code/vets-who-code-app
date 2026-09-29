import edgesJson from "@data/curriculum-graph/edges.json";
import topicsJson from "@data/curriculum-graph/topics.json";
import type { GraphEdge, Topic } from "./curriculum-graph";

// Kept apart from curriculum-graph.ts so pages that only read MANIFEST or SUBJECTS
// don't bundle the full topic and edge lists.
export const TOPICS = topicsJson as Topic[];
export const EDGES = edgesJson as GraphEdge[];
