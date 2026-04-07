import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="03" title="Projects" kicker="Systems I've built" />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              variants={staggerChild}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="group relative glass-panel-strong rounded-[1.75rem] p-8 transition-all duration-400 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-200/10 to-transparent" />
              {/* Large faded index number */}
              <span className="absolute top-4 right-6 font-serif text-[7rem] leading-none text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors duration-500">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between mb-8">
                <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-zinc-400">
                  {project.subtitle}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.22em] text-zinc-500">
                  {project.year}
                </span>
              </div>

              <h3 className="relative font-serif text-2xl sm:text-[1.75rem] leading-tight text-zinc-50 mb-4 group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <p className="relative text-sm text-zinc-300/80 leading-relaxed mb-6 font-light">
                {project.description}
              </p>

              <ul className="relative space-y-2 mb-8">
                {project.impact.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300/80 leading-relaxed">
                    <span className="font-mono text-cyan-200/60 flex-shrink-0 mt-0.5">◦</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="relative flex flex-wrap gap-1.5 pt-6 border-t border-white/10 group-hover:border-white/15 transition-colors">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6rem] tracking-wide px-2 py-1 bg-white/[0.06] border border-white/10 text-zinc-300 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
                <ArrowUpRight size={18} className="text-cyan-200/80" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
