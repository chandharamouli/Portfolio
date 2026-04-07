import { lazy, Suspense } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/primitives/Cursor";
import Marquee from "@/components/primitives/Marquee";

const SiteScene = lazy(() => import("@/components/three/SiteScene"));

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-zinc-100 antialiased selection:bg-cyan-200 selection:text-zinc-950">
      <div className="fixed inset-0 z-0 bg-site-radial" />
      <div className="fixed inset-0 z-0 bg-site-grid opacity-40" />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-90">
        <Suspense fallback={null}>
          <SiteScene />
        </Suspense>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_80%_35%,rgba(216,180,254,0.08),transparent_22%),linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.86)_72%)]" />

      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Writing />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
