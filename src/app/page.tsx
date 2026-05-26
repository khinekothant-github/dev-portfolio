"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorFollower } from "@/components/layout/CursorFollower";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { FunCorner } from "@/components/sections/FunCorner";
import { KonamiCode } from "@/components/easter-eggs/KonamiCode";
import { RubberDuck } from "@/components/easter-eggs/RubberDuck";
import { KeyboardShortcuts } from "@/components/easter-eggs/KeyboardShortcuts";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content - render immediately so 3D assets start loading, but keep visually hidden until loading is done */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <CursorFollower />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <FunCorner />
          <Contact />
        </main>

        <Footer />

        {/* Easter Eggs */}
        <KonamiCode />
        <RubberDuck />
        <KeyboardShortcuts />
      </motion.div>
    </>
  );
}

function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  // Simulate smooth progress up to 90% while waiting for actual assets
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= 90) return prev; // Stop simulating if we reached 90 or were forced to 100
        
        // Fast progress up to 60%, then slower up to 90%
        const increment = prev < 60 ? Math.random() * 10 + 5 : Math.random() * 2 + 1;
        if (prev + increment >= 90) return 90;
        return prev + increment;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // When actual Drei progress hits 100, we force our display to 100
  useEffect(() => {
    if (progress === 100) {
      setDisplayProgress(100);
      const timer = setTimeout(() => {
        onFinished();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinished]);

  // Fallback for cached assets: if loading never becomes active after a short delay, we assume it's ready.
  // Or if it gets stuck for 10 seconds, we force finish.
  useEffect(() => {
    let fallbackTimer: NodeJS.Timeout;
    
    if (!active && displayProgress > 0) {
       // If it's not active but we've been running for a bit, it might be cached
       fallbackTimer = setTimeout(() => {
         setDisplayProgress(100);
         setTimeout(onFinished, 500);
       }, 2000);
    }

    // Absolute fallback so user is never stuck
    const maxTimer = setTimeout(() => {
      setDisplayProgress(100);
      setTimeout(onFinished, 500);
    }, 10000);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      clearTimeout(maxTimer);
    };
  }, [active, onFinished, displayProgress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-xl shadow-primary/25 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm" />
            <span className="text-3xl font-black text-white relative z-10">KT</span>
          </div>
        </motion.div>

        <motion.div
          className="w-48 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-text-secondary font-mono text-sm tracking-widest flex flex-col items-center gap-1"
        >
          <span className="inline-block min-w-[3ch] text-right">
            {Math.round(displayProgress)}%
          </span>
          <span className="text-[10px] uppercase opacity-50">Loading Assets</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
