// Human-readable titles for the 53 domain ids in src/data/curriculum-graph/subjects.json.
// The graph JSON is generated output carrying only `id` + `topicCount` and must not be
// hand-edited (docs/curriculum-graph/README.md), so the titles live here. A test asserts
// this key set equals the graph's domain ids exactly, so the map cannot drift.
export const DOMAIN_TITLES: Record<string, string> = {
    // Systems & Tooling
    filesystem: "Filesystem",
    "text-processing": "Text Processing",
    "shell-streams": "Streams & Pipes",
    "shell-config": "Shell Configuration",
    packages: "Package Managers",
    processes: "Processes & Signals",
    remote: "Remote Systems & SSH",
    scripting: "Shell Scripting",
    editor: "Editor & Debugger",
    "version-control": "Version Control",
    // Engineering Practice
    requirements: "Requirements",
    "design-practice": "Design Practice",
    agile: "Agile Delivery",
    documentation: "Documentation",
    "code-review": "Code Review",
    algorithms: "Algorithms & Data Structures",
    // Web Interface
    markup: "HTML & Semantic Markup",
    styling: "CSS & Layout",
    dom: "The DOM",
    react: "React",
    nextjs: "Next.js",
    "ai-interface": "AI Interfaces",
    media: "Media & Analytics",
    // Programming Languages
    "js-core": "JavaScript Core",
    "ts-types": "TypeScript Types",
    "py-core": "Python Core",
    "py-production": "Production Python",
    // Data & Storage
    sql: "SQL",
    modeling: "Data Modeling",
    ingestion: "Data Ingestion",
    vectors: "Embeddings & Vectors",
    // Services & APIs
    http: "HTTP",
    contracts: "API Contracts",
    validation: "Validation & Pydantic",
    fastapi: "FastAPI",
    streaming: "Streaming Responses",
    // AI Systems
    "model-foundations": "Model Foundations",
    "model-integration": "Model Integration",
    tools: "Tool Use & MCP",
    prompting: "Prompt Engineering",
    context: "Context Engineering",
    retrieval: "Retrieval (RAG)",
    agents: "Agents",
    // Reliability & Operations
    "testing-foundations": "Testing Foundations",
    "testing-frontend": "Frontend Testing",
    "testing-backend": "Backend Testing",
    evals: "LLM Evals",
    observability: "Observability",
    performance: "Performance",
    delivery: "Delivery & CI/CD",
    harness: "Harness Engineering",
    safety: "AI Safety & Governance",
    career: "Career",
};
