import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 border-t border-zinc-200">
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
              className="group relative border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/50 rounded-2xl p-8 transition-all duration-400 overflow-hidden shadow-sm hover:shadow-xl"
            >
              {/* Large faded index number */}
              <span className="absolute top-4 right-6 font-serif text-[7rem] leading-none text-zinc-100 select-none pointer-events-none group-hover:text-zinc-200 transition-colors duration-500">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-center justify-between mb-8">
                <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-zinc-400">
                  {project.subtitle}
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.22em] text-zinc-400">
                  {project.year}
                </span>
              </div>

              <h3 className="relative font-serif text-2xl sm:text-[1.75rem] leading-tight text-zinc-900 mb-4 group-hover:text-black transition-colors">
                {project.title}
              </h3>

              <p className="relative text-sm text-zinc-500 leading-relaxed mb-6 font-light">
                {project.description}
              </p>

              <ul className="relative space-y-2 mb-8">
                {project.impact.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-500 leading-relaxed">
                    <span className="font-mono text-zinc-300 flex-shrink-0 mt-0.5">◦</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="relative flex flex-wrap gap-1.5 pt-6 border-t border-zinc-100 group-hover:border-zinc-200 transition-colors">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6rem] tracking-wide px-2 py-1 bg-zinc-100 border border-zinc-200 text-zinc-500 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10">
                <ArrowUpRight size={18} className="text-zinc-400" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
