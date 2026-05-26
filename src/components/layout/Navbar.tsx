"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";
import { navLinks, personalInfo } from "@/lib/data";
import { Menu, X, Sun, Moon } from "lucide-react";
import confetti from "canvas-confetti";

const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { incrementEasterEggs } = useEasterEggs();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNameClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 3) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.1 },
        colors: ["#7C3AED", "#06B6D4", "#ec4899", "#F59E0B"],
      });
      incrementEasterEggs();
      clickCountRef.current = 0;
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };

  const handleThemeToggle = () => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: 0.95, y: 0.05 },
      colors: theme === "dark" ? ["#F59E0B", "#fb923c", "#fbbf24"] : ["#7C3AED", "#3b82f6", "#6366f1"],
      gravity: 0.8,
      ticks: 60,
      scalar: 0.8,
    });
    toggleTheme();
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: scrollProgress,
          background: "linear-gradient(90deg, #7C3AED, #06B6D4, #ec4899)",
        }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Liquid glass background */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isScrolled ? "liquid-glass-nav" : "bg-transparent"
          }`}
        />

        <div className="section-container relative flex items-center justify-between py-4">
          {/* Logo */}
          <motion.button
            onClick={handleNameClick}
            className="text-lg font-black tracking-tight select-none cursor-pointer group relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="gradient-text-animated">{personalInfo.name.split(" ")[0]}</span>
            <span className="text-text-secondary ml-1 group-hover:text-primary transition-colors duration-300">
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 liquid-glass-pill px-2 py-2">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full nav-active-pill"
                      layoutId="activeNavPill"
                      transition={{ type: "spring", stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              );
            })}

            {/* Theme toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="relative ml-2 p-2 rounded-full liquid-glass-btn transition-all duration-300"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 90, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="w-4 h-4 text-amber-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -90, scale: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={handleThemeToggle}
              className="p-2 rounded-full liquid-glass-btn"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full liquid-glass-btn"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-72 liquid-glass-panel p-8 pt-24"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link, i) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                      }`}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06 }}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        {link.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
