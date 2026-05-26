"use client";

import { motion } from "framer-motion";
import { glowPulse } from "@/lib/animations";
import type { Skill } from "@/types";
import { skillCategories } from "@/lib/data";

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  const categoryColor = skillCategories[skill.category]?.color || "#7C3AED";

  return (
    <motion.div
      className="relative group cursor-default"
      variants={glowPulse}
      custom={index * 0.05}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div
          className="relative p-3 sm:p-4 rounded-xl glass-card text-center overflow-hidden group-hover:border-primary/30 transition-colors"
        >
        {/* Icon */}
        <div className="flex justify-center mb-2 relative z-10">
          {(() => {
            const Icon = skill.icon;
            return <Icon className="w-6 h-6 text-text-secondary group-hover:text-primary transition-colors" />;
          })()}
        </div>

        {/* Name */}
        <p className="text-sm font-medium text-text-primary relative z-10 mb-2">
          {skill.name}
        </p>

        {/* Proficiency bar */}
        <div className="w-full h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden relative z-10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: categoryColor }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Proficiency tooltip on hover */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            background: categoryColor,
            color: "#fff",
          }}
        >
          {skill.proficiency}%
        </motion.div>
      </div>
    </motion.div>
  );
}
