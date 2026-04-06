import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="04" title="Experience" kicker="Timeline" />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="absolute left-0 md:left-[180px] top-2 bottom-2 w-px bg-zinc-200" />

          <div className="space-y-14">
            {experience.map((job) => (
              <motion.div
                key={job.company + job.period}
                variants={staggerChild}
                className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 pl-6 md:pl-0"
              >
                <div className="absolute left-0 md:left-[180px] top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-zinc-300 ring-4 ring-white" />

                <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-zinc-400 md:text-right md:pr-8">
                  {job.period}
                </div>

                <div className="md:pl-8">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="font-serif text-2xl text-zinc-900">{job.role}</h3>
                    {job.current && (
                      <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full">
                        ● Current
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-zinc-400 mb-5">{job.company}</div>

                  <p className="text-sm text-zinc-500 leading-relaxed mb-5 font-light max-w-2xl">
                    {job.highlights[0]}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.6rem] tracking-wide px-2 py-1 bg-zinc-100 border border-zinc-200 text-zinc-500 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {job.tech.length > 6 && (
                      <span className="font-mono text-[0.6rem] tracking-wide px-2 py-1 text-zinc-400">
                        +{job.tech.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
