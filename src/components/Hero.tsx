import { personal } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-6xl mx-auto"
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-stone-300" />
        <span className="font-mono text-xs tracking-widest uppercase text-stone-400">
          {personal.title} · {personal.location}
        </span>
      </div>

      {/* Name */}
      <h1 className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] tracking-tight text-stone-900 mb-8">
        <span className="block">Chandra</span>
        <span className="block italic text-stone-400">mouli</span>
        <span className="block">Narni</span>
      </h1>

      {/* Tagline */}
      <p className="max-w-lg text-stone-500 text-lg leading-relaxed mb-10 font-light">
        {personal.tagline}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 mb-20">
        <a
          href={`mailto:${personal.email}`}
          className="font-mono text-xs tracking-widest uppercase px-6 py-3 bg-stone-900 text-white hover:bg-stone-700 transition-colors duration-200"
        >
          Get in touch
        </a>
        <button
          onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
          className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-900 transition-all duration-200"
        >
          See my work
        </button>
      </div>

      {/* Stats */}
      <div className="border-t border-stone-100 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {[
          { num: "9+", label: "Years exp." },
          { num: "4", label: "Companies" },
          { num: "3", label: "Industries" },
          { num: "2", label: "Certifications" },
        ].map(({ num, label }) => (
          <div key={label}>
            <div className="font-serif text-4xl text-stone-900 leading-none mb-1">{num}</div>
            <div className="font-mono text-xs tracking-widest uppercase text-stone-400">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
