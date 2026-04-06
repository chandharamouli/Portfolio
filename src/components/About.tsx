import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { Reveal, SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

const focusAreas = [
  {
    label: "Agentic GenAI",
    detail: "Multi-agent systems, MCP tool discovery, LangGraph orchestration",
  },
  {
    label: "Hybrid RAG",
    detail: "Pinecone + Neo4j Graph RAG, intelligent query routing, faithfulness gates",
  },
  {
    label: "LLMOps",
    detail: "Ragas eval pipelines, LangSmith tracing, cost-aware model routing",
  },
  {
    label: "Safety & Guardrails",
    detail: "Two-pass validation, PII filtering, domain-specific constraints",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="01" title="About" kicker="Who I am" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6">
              {personal.about.map((para, i) => (
                <p key={i} className="text-zinc-500 text-[1.0625rem] leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-400 mb-6">
              Core focus
            </div>
            {focusAreas.map((area) => (
              <motion.div
                key={area.label}
                variants={staggerChild}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 p-5 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-zinc-900">{area.label}</h3>
                  <span className="font-mono text-zinc-300 group-hover:text-zinc-500 transition-colors">
                    →
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{area.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
