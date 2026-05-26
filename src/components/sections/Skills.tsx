"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { skills, skillCategories } from "@/lib/data";
import { staggerContainer } from "@/lib/animations";
import dynamic from "next/dynamic";

import type { ComponentType } from "react";
import { Sparkles } from "lucide-react";

const SkillsScene = dynamic(
  () => import("@/components/three/SkillsScene").then((m) => ({ default: m.SkillsScene })),
  { ssr: false }
);

type Category = "all" | "frontend" | "backend" | "database" | "tools";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const categories: { key: Category; label: string; icon: ComponentType<any> }[] = [
    { key: "all", label: "All Skills", icon: Sparkles },
    ...Object.entries(skillCategories).map(([key, val]) => ({
      key: key as Category,
      label: val.label,
      icon: val.icon,
    })),
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 relative">
      {/* 3D background */}
      {mounted && <SkillsScene />}

      {/* Background accent */}
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[150px] -z-10 -translate-x-1/2 animate-[meshShift_12s_ease_infinite]" />

      <div className="section-container">
        <SectionHeading title="Skills" subtitle="Tech Stack" />

        {/* Category tabs */}
        <motion.div
          className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 sm:mb-12 overflow-x-auto scrollbar-none px-2 pb-2 -mx-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "glass-card text-text-secondary hover:text-primary hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4" />
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <SkillBadge skill={skill} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
