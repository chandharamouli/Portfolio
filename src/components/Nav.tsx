import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { personal } from "@/data/portfolio";
import MagneticButton from "@/components/primitives/MagneticButton";

const links = ["About", "Skills", "Projects", "Experience", "Writing", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    // keep alive — framer reads it for the progress bar
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/70 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-200/40 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span />


        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${isActive ? "text-zinc-50" : ""}`}>{link}</span>
              </button>
            );
          })}
          <MagneticButton
            as="a"
            href={`mailto:${personal.email}`}
            className="ml-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase px-4 py-2 bg-zinc-50 text-zinc-950 hover:bg-white rounded-full transition-all duration-200 shadow-[0_0_30px_rgba(125,211,252,0.2)]"
          >
            Hire me
          </MagneticButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-zinc-100 transition-all duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-zinc-100 transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-zinc-100 transition-all duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#030712]/90 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="font-mono text-xs tracking-[0.18em] uppercase text-zinc-400 hover:text-zinc-50 text-left py-2 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
