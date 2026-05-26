"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { X, Keyboard, Info } from "lucide-react";
import { funFacts } from "@/lib/data";

/**
 * Keyboard Shortcuts Easter Egg
 * Press ? to open a hidden modal with shortcuts and fun facts
 */
export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const { incrementEasterEggs } = useEasterEggs();
  const prefersReduced = useReducedMotion();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "?") {
        setOpen((prev) => !prev);
        if (!hasOpened) {
          incrementEasterEggs();
          setHasOpened(true);
        }
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prefersReduced, incrementEasterEggs, hasOpened]);

  const shortcuts = [
    { keys: ["?"], description: "Toggle this modal" },
    { keys: ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"], description: "Konami Code" },
    { keys: ["Triple Click"], description: "Click name 3x for confetti" },
    { keys: ["Hold 2s"], description: "Hold a project card for secrets" },
    { keys: ["Esc"], description: "Close any overlay" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg card-hover rounded-2xl p-8 overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-text-tertiary" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Keyboard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Keyboard Shortcuts</h3>
                <p className="text-xs text-text-tertiary">You found a secret!</p>
              </div>
            </div>

            {/* Shortcuts list */}
            <div className="space-y-3 mb-8">
              {shortcuts.map((shortcut, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card)] border border-border/50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex gap-1.5 flex-wrap">
                    {shortcut.keys.map((key, ki) => (
                      <kbd
                        key={ki}
                        className="px-2 py-1 rounded-md bg-[var(--bg-tertiary)] text-xs font-mono text-text-primary border border-border/50"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary ml-3">
                    {shortcut.description}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Fun facts */}
            <div className="border-t border-border/50 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-secondary">Random Fun Fact</span>
              </div>
              <p className="text-sm text-text-secondary italic">
                &ldquo;{funFacts[Math.floor(Math.random() * funFacts.length)]}&rdquo;
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
