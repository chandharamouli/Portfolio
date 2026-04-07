import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { writing } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

export default function Writing() {
  return (
    <section id="writing" className="relative py-32 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-16 bottom-10 h-72 w-72 rounded-full bg-sky-300/8 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="05" title="Writing" kicker="Notes & essays" />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {writing.map((post) => (
            <motion.a
              key={post.title}
              variants={staggerChild}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-6 glass-panel rounded-[1.5rem] transition-colors duration-300"
            >
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-400 mb-5">
                {post.tag}
              </span>
              <h3 className="font-serif text-[1.1rem] leading-snug text-zinc-50 mb-4 group-hover:text-white transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-300/75 leading-relaxed flex-1 mb-6 font-light">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-cyan-200 transition-colors">
                  Read more
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-500 group-hover:text-cyan-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
