import { personal } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="font-mono text-xs text-stone-400">
          © 2026 {personal.name}
        </span>
        <span className="font-mono text-xs text-stone-400">
          {personal.email}
        </span>
      </div>
    </footer>
  );
}
