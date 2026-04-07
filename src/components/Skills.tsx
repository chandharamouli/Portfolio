import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Gauge,
  Scale,
  Sliders,
  Users,
  Plug,
  GitBranch,
  TreePine,
  Eye,
  LineChart,
  Cpu,
  Cloud,
} from "lucide-react";
import {
  SiNeo4J,
  SiLangchain,
  SiGoogle,
  SiMeta,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiFastapi,
  SiNodedotjs,
  SiReact,
  SiTypescript,
  SiPrometheus,
  SiGrafana,
  SiSpacy,
  SiTensorflow,
  SiPytorch,
  SiApachespark,
  SiApachekafka,
  SiMlflow,
} from "react-icons/si";
import type { ComponentType, SVGProps } from "react";
import { skills } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// Skill → [icon, brand hex color]
const iconMap: [string, Icon, string][] = [
  ["Neo4j", SiNeo4J, "#008CC1"],
  ["LangGraph", SiLangchain, "#1C3C3C"],
  ["LangChain", SiLangchain, "#1C3C3C"],
  ["LangSmith", SiLangchain, "#1C3C3C"],
  ["Google ADK", SiGoogle, "#4285F4"],
  ["CrewAI", Users, "#6366f1"],
  ["Agentic RAG", GitBranch, "#f59e0b"],
  ["Multi-Agent", Users, "#8b5cf6"],
  ["MCP", Plug, "#10b981"],
  ["LoRA", Sliders, "#ec4899"],
  ["Llama", SiMeta, "#0081FB"],
  ["Guardrails", Shield, "#ef4444"],
  ["Ragas", Gauge, "#f97316"],
  ["LLM-as-a-Judge", Scale, "#8b5cf6"],
  ["DeepEval", Gauge, "#3b82f6"],
  ["Evidently", LineChart, "#06b6d4"],
  ["AWS", Cloud, "#FF9900"],
  ["GCP", SiGooglecloud, "#4285F4"],
  ["Vertex", SiGooglecloud, "#4285F4"],
  ["Azure", Cloud, "#0078D4"],
  ["Docker", SiDocker, "#2496ED"],
  ["Kubernetes", SiKubernetes, "#326CE5"],
  ["Terraform", SiTerraform, "#844FBA"],
  ["FastAPI", SiFastapi, "#009688"],
  ["Node", SiNodedotjs, "#5FA04E"],
  ["React", SiReact, "#61DAFB"],
  ["TypeScript", SiTypescript, "#3178C6"],
  ["Prometheus", SiPrometheus, "#E6522C"],
  ["Grafana", SiGrafana, "#F46800"],
  ["BioBERT", Brain, "#10b981"],
  ["spaCy", SiSpacy, "#09A3D5"],
  ["NLP", Brain, "#22c55e"],
  ["TensorFlow", SiTensorflow, "#FF6F00"],
  ["PyTorch", SiPytorch, "#EE4C2C"],
  ["XGBoost", TreePine, "#16a34a"],
  ["LightGBM", TreePine, "#22c55e"],
  ["SHAP", Eye, "#6366f1"],
  ["LIME", Eye, "#a78bfa"],
  ["PySpark", SiApachespark, "#E25A1C"],
  ["Kafka", SiApachekafka, "#231F20"],
  ["MLflow", SiMlflow, "#0194E2"],
];

function iconFor(label: string): { Icon: Icon; color: string } {
  for (const [key, Comp, color] of iconMap) {
    if (label.toLowerCase().includes(key.toLowerCase())) return { Icon: Comp, color };
  }
  return { Icon: Cpu, color: "#71717a" };
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="02" title="Skills" kicker="Stack & tooling" />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {skills.map((group) => (
            <motion.div
              key={group.category}
              variants={staggerChild}
              className="group relative glass-panel rounded-[1.75rem] p-7 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
              <div className="relative flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-zinc-50">{group.category}</h3>
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-500">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <motion.div
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="relative flex flex-wrap gap-2"
              >
                {group.items.map((item) => {
                  const { Icon, color } = iconFor(item);
                  return (
                    <motion.span
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 10, scale: 0.95 },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.04,
                        transition: { type: "spring", stiffness: 400, damping: 18 },
                      }}
                      className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-wide px-3 py-1.5 bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-200/30 hover:bg-white/[0.1] rounded-full cursor-default transition-all duration-200"
                    >
                      <Icon
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color }}
                        aria-hidden="true"
                      />
                      {item}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
