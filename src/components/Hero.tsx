import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { personal } from "@/data/portfolio";
import { CountUp } from "@/components/primitives/Reveal";
import MagneticButton from "@/components/primitives/MagneticButton";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));
const profileImg = `${import.meta.env.BASE_URL}profile.png`;

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
  };

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950 bg-glow-top"
    >
      {/* 3D scene layer */}
      {!reduce && (
        <div className="absolute inset-0 pointer-events-none lg:hidden">
          <div className="absolute inset-y-0 right-[-8%] w-[72%] opacity-90 lg:opacity-100 scale-[1.08]">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
        </div>
      )}

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-80 w-80 rounded-full bg-fuchsia-300/10 blur-3xl" />
      </div>

      {!reduce && (
        <div className="absolute inset-y-10 right-6 hidden lg:block w-[34rem] rounded-[2.25rem] border border-white/10 bg-white/[0.02] shadow-[0_0_120px_rgba(56,189,248,0.08)] pointer-events-none">
          <div className="absolute inset-0 rounded-[2.25rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent_38%,transparent)]" />
          <div className="absolute left-8 top-8 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-zinc-500">
            Interactive system canvas
          </div>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      {/* Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none mix-blend-overlay" />

      {/* Radial mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,transparent,rgba(9,9,11,0.84)_78%)] pointer-events-none" />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="relative max-w-6xl mx-auto w-full px-6 pt-28 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center"
        >
          <div>
            {/* Eyebrow */}
            <motion.div variants={fade} className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-zinc-700" />
              <span className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-zinc-500">
                {personal.title} / Available for work
              </span>
            </motion.div>

            {/* Name */}
            <h1
              className="font-serif leading-[0.88] tracking-tight text-white mb-6"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              {["Chandra", "mouli", "Narni"].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`block ${word === "mouli" ? "italic text-zinc-400" : ""}`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              variants={fade}
              className="max-w-xl text-zinc-300 text-lg leading-relaxed font-light mb-8"
            >
              I build{" "}
              <span className="text-white font-normal">operational-grade GenAI systems</span>{" "}
              that ship to production — not prototypes that gather dust.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fade} className="flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="#projects"
                className="group inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] uppercase px-6 py-3.5 bg-zinc-100 text-zinc-950 hover:bg-white rounded-full transition-all duration-200"
              >
                View work
                <ArrowDownRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
                />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.2em] uppercase px-6 py-3.5 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 rounded-full transition-all duration-200"
              >
                <Mail size={14} />
                Contact
              </MagneticButton>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div variants={fade} className="justify-self-center lg:justify-self-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-zinc-700/40 via-transparent to-zinc-800/20 blur-2xl" />
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-56 h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-zinc-800"
              >
                <img
                  src={profileImg}
                  alt={personal.name}
                  className="w-full h-full object-cover object-top grayscale contrast-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats band — count-up animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 pt-8 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { to: 9, suffix: "+", label: "Years in ML/AI" },
            { to: 4, suffix: "", label: "Industries" },
            { to: 6, suffix: "+", label: "Production LLM systems" },
            { to: 2, suffix: "", label: "Cloud certifications" },
          ].map(({ to, suffix, label }) => (
            <div key={label}>
              <div className="font-serif text-4xl text-zinc-100 leading-none mb-2">
                <CountUp to={to} suffix={suffix} />
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-500">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
