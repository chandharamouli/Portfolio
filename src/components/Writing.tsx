import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { writing } from "@/data/portfolio";
import { SectionHeader, staggerParent, staggerChild } from "@/components/primitives/Reveal";

export default function Writing() {
  return (
    <section id="writing" className="relative py-32 border-t border-zinc-200">
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
              className="group relative flex flex-col p-6 border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-zinc-400 mb-5">
                {post.tag}
              </span>
              <h3 className="font-serif text-[1.1rem] leading-snug text-zinc-900 mb-4 group-hover:text-black transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-6 font-light">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-300 group-hover:text-zinc-500 transition-colors">
                  Read more
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
