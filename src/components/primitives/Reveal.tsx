import { motion, useReducedMotion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";
import { type ReactNode, useRef, useEffect } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({ children, delay = 0, y = 24, className, once = true }: Props) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? "none" : "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TextReveal — clips text in from below using clipPath.
 * Each word/line reveals with a slide-up inside a masked container.
 */
type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
};

export function TextReveal({
  children,
  delay = 0,
  duration = 0.9,
  className = "",
  as = "div",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as any;

  return (
    <div className="overflow-hidden">
      <Tag
        className={className}
        initial={reduce ? {} : { y: "110%", rotateX: -20 }}
        whileInView={{ y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      >
        {children}
      </Tag>
    </div>
  );
}

/**
 * LineReveal — horizontal line animates width from 0 to 100%.
 */
export function LineReveal({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`h-px bg-white/10 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left" }}
    />
  );
}

/**
 * CountUp — animates a number from 0 to target when visible.
 */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 30 });

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, motionVal, to]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
    return unsubscribe;
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type SectionHeaderProps = {
  index: string;
  title: string;
  kicker?: string;
};

export function SectionHeader({ index, title, kicker }: SectionHeaderProps) {
  return (
    <Reveal className="mb-16">
      <div className="flex items-end justify-between gap-6 pb-6">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-xs tracking-[0.2em] text-cyan-200/70">{index}</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-zinc-50 tracking-tight">
            {title}
          </h2>
        </div>
        {kicker && (
          <span className="hidden sm:inline font-mono text-[0.65rem] tracking-[0.2em] uppercase text-zinc-400">
            {kicker}
          </span>
        )}
      </div>
      <div className="h-px bg-white/10 w-full" />
    </Reveal>
  );
}
