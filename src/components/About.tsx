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
    <section id="about" className="relative py-32 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="01" title="About" kicker="Who I am" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-7">
            <div className="glass-panel rounded-[2rem] p-8 sm:p-10 space-y-6">
              {personal.about.map((para, i) => (
                <p key={i} className="text-zinc-300 text-[1.0625rem] leading-relaxed font-light">
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
                className="group glass-panel rounded-2xl p-5 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-zinc-50">{area.label}</h3>
                  <span className="font-mono text-zinc-500 group-hover:text-cyan-200 transition-colors">
                    →
                  </span>
                </div>
                <p className="text-sm text-zinc-300/80 leading-relaxed">{area.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
