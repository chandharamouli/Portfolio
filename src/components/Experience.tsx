import { useState } from "react";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-xs text-stone-300 tracking-widest">02</span>
        <h2 className="font-serif text-4xl text-stone-900">Experience</h2>
        <div className="flex-1 h-px bg-stone-200 ml-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0">
        {/* Sidebar tabs */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-stone-100 overflow-x-auto md:overflow-visible mb-8 md:mb-0">
          {experience.map((job, i) => (
            <button
              key={job.company}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 md:flex-shrink text-left px-4 py-4 md:py-5 transition-all duration-150 border-b-2 md:border-b-0 md:border-l-2 ${
                active === i
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-200"
              }`}
            >
              <div className="font-mono text-xs tracking-widest uppercase whitespace-nowrap md:whitespace-normal">
                {job.company}
              </div>
              {active === i && (
                <div className="hidden md:block font-mono text-[0.6rem] text-stone-400 mt-1">
                  {job.period}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="md:pl-12">
          {/* Role header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="font-serif text-2xl text-stone-900">{job.role}</h3>
              {job.current && (
                <span className="font-mono text-[0.6rem] tracking-widest uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-xs text-stone-400">
              <span>{job.company}</span>
              {job.location && (
                <>
                  <span>·</span>
                  <span>{job.location}</span>
                </>
              )}
              <span>·</span>
              <span>{job.period}</span>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-4 mb-8">
            {job.highlights.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-stone-300 text-sm mt-0.5 flex-shrink-0">→</span>
                <p className="text-stone-600 leading-relaxed text-[0.9375rem]">{item}</p>
              </li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2">
            {job.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[0.65rem] tracking-wide px-2.5 py-1 bg-stone-50 border border-stone-200 text-stone-500"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
