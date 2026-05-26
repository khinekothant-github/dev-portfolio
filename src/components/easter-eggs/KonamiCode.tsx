"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Konami Code Easter Egg
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 * Triggers a Matrix-style digital rain animation
 */
export function KonamiCode() {
  const [active, setActive] = useState(false);
  const { incrementEasterEggs } = useEasterEggs();
  const prefersReduced = useReducedMotion();
  const sequenceRef = useRef<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const konamiSequence = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
  ];

  const startMatrixRain = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>?/\\~`アイウエオカキクケコサシスセソ";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#7C3AED";
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Alternate colors for variety
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#06B6D4";
        } else {
          ctx.fillStyle = "#7C3AED";
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      sequenceRef.current.push(e.code);

      // Keep only the last 10 keys
      if (sequenceRef.current.length > 10) {
        sequenceRef.current = sequenceRef.current.slice(-10);
      }

      // Check if sequence matches
      if (
        sequenceRef.current.length === 10 &&
        sequenceRef.current.every((key, i) => key === konamiSequence[i])
      ) {
        setActive(true);
        incrementEasterEggs();
        sequenceRef.current = [];

        // Auto dismiss after 6 seconds
        setTimeout(() => setActive(false), 6000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prefersReduced, incrementEasterEggs]);

  useEffect(() => {
    if (active) {
      startMatrixRain();
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [active, startMatrixRain]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9998] cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActive(false)}
        >
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Message */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <div className="text-center card-hover rounded-2xl p-8 max-w-md">
              <p className="text-2xl font-bold gradient-text mb-2">KONAMI CODE!</p>
              <p className="text-sm text-text-secondary font-mono">
                You found the Matrix! Click anywhere to dismiss.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
