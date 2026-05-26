"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDown, Download, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % personalInfo.subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-1 pt-20 sm:pt-0"
    >
      {/* 3D Background with parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </motion.div>

      {/* Radial gradient overlays with parallax */}
      <motion.div className="absolute inset-0 -z-5" style={{ y: bgY }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 -z-5 opacity-[0.02]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <motion.div className="section-container relative z-10 text-center" style={{ y: heroY, opacity: heroOpacity }}>
        {/* Greeting badge — hidden on mobile to avoid navbar overlap */}
        <motion.div
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-text-secondary">Available for work</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black leading-[0.95] mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-text-primary">Hi, I&apos;m</span>
          <span className="block gradient-text-animated mt-2">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Animated subtitle */}
        <motion.div
          className="h-8 sm:h-10 mb-6 sm:mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={subtitleIndex}
          className="text-lg sm:text-xl md:text-2xl font-medium text-text-secondary inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ChevronRight className="w-5 h-5 text-primary" />
              {personalInfo.subtitles[subtitleIndex]}
              <span className="w-[2px] h-6 bg-primary animate-[blink-caret_1s_infinite]" />
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Summary */}
        <motion.p
          className="max-w-2xl mx-auto text-text-secondary leading-relaxed mb-8 sm:mb-10 text-sm md:text-base px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {personalInfo.summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0 pb-16 sm:pb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <MagneticButton href="#projects" variant="primary">
            View My Work
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton href="/Khine-Ko-Thant.pdf" variant="secondary" download>
            <Download className="w-4 h-4" />
            Download CV
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs text-text-tertiary tracking-widest uppercase group-hover:text-primary transition-colors">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
