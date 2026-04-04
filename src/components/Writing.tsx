import { writing } from "@/data/portfolio";

export default function Writing() {
  return (
    <section id="writing" className="bg-stone-50 border-y border-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-xs text-stone-300 tracking-widest">03</span>
          <h2 className="font-serif text-4xl text-stone-900">Writing</h2>
          <div className="flex-1 h-px bg-stone-200 ml-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200">
          {writing.map((post) => (
            <a
              key={post.title}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-8 flex flex-col hover:bg-stone-50 transition-colors duration-200"
            >
              <span className="font-mono text-[0.6rem] tracking-widest uppercase text-stone-400 mb-4">
                {post.tag}
              </span>
              <h3 className="font-serif text-[1.05rem] text-stone-900 leading-snug mb-4 group-hover:text-stone-600 transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <span className="font-mono text-[0.65rem] tracking-widest uppercase text-stone-300 group-hover:text-stone-500 mt-6 transition-colors duration-200">
                Read on LinkedIn →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
