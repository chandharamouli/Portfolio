import { personal, certifications, education } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-16">
        <span className="font-mono text-xs text-stone-300 tracking-widest">04</span>
        <h2 className="font-serif text-4xl text-stone-900">Contact</h2>
        <div className="flex-1 h-px bg-stone-200 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <h3 className="font-serif text-3xl text-stone-900 leading-tight mb-6">
            Let's build something{" "}
            <em className="text-stone-400">real.</em>
          </h3>
          <p className="text-stone-500 leading-relaxed mb-10">
            Open to senior GenAI engineering roles — on-site or hybrid in the US. If you're building
            systems that need to survive production, I'd like to talk.
          </p>

          <div className="space-y-3">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-4 p-4 border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
            >
              <span className="text-stone-300 text-lg w-6 text-center">✉</span>
              <span className="font-mono text-sm text-stone-500 group-hover:text-stone-800 transition-colors">
                {personal.email}
              </span>
            </a>
            <a
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 p-4 border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
            >
              <span className="text-stone-300 text-lg w-6 text-center">✆</span>
              <span className="font-mono text-sm text-stone-500 group-hover:text-stone-800 transition-colors">
                {personal.phone}
              </span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
            >
              <span className="font-mono text-xs font-bold text-stone-300 w-6 text-center">in</span>
              <span className="font-mono text-sm text-stone-500 group-hover:text-stone-800 transition-colors">
                linkedin.com/in/chandra-mouli-narni
              </span>
            </a>
          </div>
        </div>

        {/* Right: certs + education */}
        <div className="space-y-8">
          {/* Certifications */}
          <div>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-400 mb-4">
              Certifications
            </div>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-start gap-3 p-4 bg-stone-50 border border-stone-100"
                >
                  <span className="font-mono text-[0.6rem] tracking-widest uppercase px-2 py-1 bg-white border border-stone-200 text-stone-500 flex-shrink-0 mt-0.5">
                    {cert.issuer}
                  </span>
                  <span className="text-stone-600 text-sm leading-relaxed">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-400 mb-4">
              Education
            </div>
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="flex items-center gap-3 p-4 bg-stone-50 border border-stone-100"
              >
                <span className="font-mono text-[0.6rem] tracking-widest uppercase px-2 py-1 bg-white border border-stone-200 text-stone-500">
                  {edu.degree}
                </span>
                <span className="text-stone-600 text-sm">{edu.institution}</span>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-400 mb-4">
              Availability
            </div>
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-emerald-700 text-sm">{personal.availability}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
