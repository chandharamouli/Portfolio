import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";
import { personal, certifications, education } from "@/data/portfolio";
import { Reveal, SectionHeader } from "@/components/primitives/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-4rem] bottom-0 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader index="06" title="Contact" kicker="Let's talk" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-7">
            <h3 className="font-serif text-4xl sm:text-5xl text-zinc-50 leading-[1.1] tracking-tight mb-6">
              Let's build something{" "}
              <span className="italic text-zinc-400">real.</span>
            </h3>
            <p className="text-zinc-300 leading-relaxed font-light max-w-xl mb-10">
              Open to senior GenAI engineering roles. On-site or hybrid in the US. If you're
              building systems that need to survive production, I'd like to talk.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 mb-10">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-emerald-300">
                {personal.availability}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContactLink
                href={`mailto:${personal.email}`}
                icon={<Mail size={16} />}
                label="Email"
                value={personal.email}
              />
              <ContactLink
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                icon={<Phone size={16} />}
                label="Phone"
                value={personal.phone}
              />
              <ContactLink
                href={personal.linkedin}
                external
                icon={<Linkedin size={16} />}
                label="LinkedIn"
                value="chandra-mouli-narni"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 space-y-10">
            <div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-400 mb-4">
                Certifications
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-start gap-3 p-4 glass-panel rounded-2xl"
                  >
                    <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 bg-white/[0.06] border border-white/10 text-zinc-300 flex-shrink-0 rounded">
                      {cert.issuer}
                    </span>
                    <span className="text-zinc-200 text-sm leading-relaxed">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-400 mb-4">
                Education
              </div>
              {education.map((edu) => (
                <div
                  key={edu.institution}
                  className="flex items-center gap-3 p-4 glass-panel rounded-2xl"
                >
                  <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase px-2 py-1 bg-white/[0.06] border border-white/10 text-zinc-300 rounded">
                    {edu.degree}
                  </span>
                  <span className="text-zinc-200 text-sm">{edu.institution}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type ContactLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
};

function ContactLink({ href, icon, label, value, external }: ContactLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-2 p-4 glass-panel rounded-2xl transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-zinc-400 group-hover:text-cyan-200 transition-colors">{icon}</span>
        <ArrowUpRight
          size={12}
          className="text-zinc-500 group-hover:text-cyan-200 transition-colors"
        />
      </div>
      <div>
        <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-zinc-400 mb-0.5">
          {label}
        </div>
        <div className="font-mono text-[0.7rem] text-zinc-200 group-hover:text-white transition-colors truncate">
          {value}
        </div>
      </div>
    </motion.a>
  );
}
