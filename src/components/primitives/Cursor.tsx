import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 36;

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const hovering = useRef(false);
  const pressing = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy spring — low mass, high stiffness, minimal lag
  const x = useSpring(mouseX, { stiffness: 600, damping: 40, mass: 0.2 });
  const y = useSpring(mouseY, { stiffness: 600, damping: 40, mass: 0.2 });

  const scaleVal = useMotionValue(1);
  const opacityVal = useMotionValue(0);
  const scale = useSpring(scaleVal, { stiffness: 500, damping: 25 });
  const opacity = useSpring(opacityVal, { stiffness: 500, damping: 30 });

  const updateScale = useCallback(() => {
    scaleVal.set(pressing.current ? 0.5 : hovering.current ? 1.8 : 1);
  }, [scaleVal]);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - SIZE / 2);
      mouseY.set(e.clientY - SIZE / 2);
      if (!visible.current) {
        visible.current = true;
        opacityVal.set(1);
      }
    };

    const onDown = () => {
      pressing.current = true;
      updateScale();
    };
    const onUp = () => {
      pressing.current = false;
      updateScale();
    };

    const onLeave = () => {
      visible.current = false;
      opacityVal.set(0);
    };
    const onEnter = () => {
      visible.current = true;
      opacityVal.set(1);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-magnetic], input, textarea, [role='button']")) {
        hovering.current = true;
        updateScale();
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-magnetic], input, textarea, [role='button']")) {
        hovering.current = false;
        updateScale();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [mouseX, mouseY, opacityVal, updateScale]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      style={{ x, y, width: SIZE, height: SIZE, opacity }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-white"
        style={{ scale }}
      />
    </motion.div>
  );
}
