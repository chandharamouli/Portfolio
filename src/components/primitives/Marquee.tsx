const items = [
  "LangGraph",
  "Graph RAG",
  "MCP Servers",
  "Agentic AI",
  "Neo4j",
  "Pinecone",
  "Ragas",
  "LLMOps",
  "FastAPI",
  "Fine-tuning",
  "Guardrails",
  "LangSmith",
  "Multi-Agent",
  "Vertex AI",
  "AWS",
  "Azure",
  "Context Engineering",
];

function Strip() {
  return (
    <span className="flex items-center gap-8 shrink-0 animate-marquee">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-zinc-400 hover:text-zinc-100 transition-colors duration-200 cursor-default">
            {item}
          </span>
          <span className="text-white/20 text-xs">·</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="relative border-y border-white/10 bg-white/[0.03] backdrop-blur-xl py-5 overflow-hidden group">
      <div className="flex gap-8 group-hover:[animation-play-state:paused]">
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
