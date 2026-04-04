import { personal, skills } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="bg-stone-50 border-y border-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-xs text-stone-300 tracking-widest">01</span>
          <h2 className="font-serif text-4xl text-stone-900">About</h2>
          <div className="flex-1 h-px bg-stone-200 ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="space-y-5">
            {personal.about.map((para, i) => (
              <p key={i} className="text-stone-600 leading-relaxed text-[1.0625rem]">
                {para}
              </p>
            ))}

            {/* Top tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["LangGraph", "Google ADK", "Neo4j", "MCP Servers", "Pinecone", "AWS", "GCP", "FastAPI", "Python"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-all duration-150 cursor-default"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Skills grid */}
          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.category}>
                <div className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-400 mb-3">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[0.7rem] px-2.5 py-1 bg-white border border-stone-200 text-stone-600 rounded-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
