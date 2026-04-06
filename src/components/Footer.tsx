import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-zinc-400">
          © 2026 {personal.name}
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-zinc-400">
          Designed & built with intent
        </span>
        <a
          href={`mailto:${personal.email}`}
          className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          {personal.email}
        </a>
      </div>
    </footer>
  );
}
