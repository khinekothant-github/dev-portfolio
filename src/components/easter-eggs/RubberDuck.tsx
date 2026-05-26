"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { devJokes } from "@/lib/utils";
import { Bug } from "lucide-react";

/**
 * Rubber Duck Debugging Mascot
 * A draggable floating duck that gives random dev jokes when clicked
 */
export function RubberDuck() {
  const [joke, setJoke] = useState<string | null>(null);
  const [jokeTimeout, setJokeTimeout] = useState<NodeJS.Timeout | null>(null);
  const { duckVisible } = useEasterEggs();
  const prefersReduced = useReducedMotion();

  if (prefersReduced || !duckVisible) return null;

  const showJoke = () => {
    const randomJoke = devJokes[Math.floor(Math.random() * devJokes.length)];
    setJoke(randomJoke);

    if (jokeTimeout) clearTimeout(jokeTimeout);
    const timeout = setTimeout(() => setJoke(null), 4000);
    setJokeTimeout(timeout);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[100]"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {joke && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 w-64 p-4 rounded-xl card-hover text-sm text-text-secondary leading-relaxed"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {joke}
            {/* Speech bubble triangle */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 bg-[var(--bg-glass)] border-r border-b border-[var(--border-color)] backdrop-blur-[24px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Duck button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-grab active:cursor-grabbing hover:shadow-amber-500/50 transition-shadow"
        onClick={showJoke}
        drag
        dragConstraints={{
          top: -300,
          left: -300,
          right: 0,
          bottom: 0,
        }}
        dragElastic={0.1}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        aria-label="Rubber duck debugger"
        title="Click me for a dev joke!"
      >
        <Bug className="w-6 h-6 text-white" />
      </motion.button>
    </motion.div>
  );
}
