"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Building2 } from "lucide-react";
import type { Experience } from "@/types";
import { useRef } from "react";

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

export function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <div className="relative flex items-start gap-8 mb-12 last:mb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-10 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 to-transparent" />
      )}

      {/* Desktop: alternating layout */}
      <motion.div ref={ref} className="hidden md:flex w-full items-start" style={{ scale }}>
        {/* Left content */}
        <motion.div
          className={`w-[calc(50%-2rem)] ${isLeft ? "text-right pr-8" : "order-3 pl-8"}`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={`glass-card p-6 group ${isLeft ? "ml-auto" : ""}`}>
            <div className={`flex items-center gap-3 mb-3 ${isLeft ? "justify-end" : ""}`}>
              <Building2 className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-bold text-text-primary">{experience.role}</h3>
            </div>

            <p className="text-primary font-semibold text-sm mb-3">{experience.company}</p>

            <div className={`flex items-center gap-4 text-xs text-text-tertiary mb-4 ${isLeft ? "justify-end" : ""}`}>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {experience.startDate} — {experience.endDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {experience.location} ({experience.type})
              </span>
            </div>

            <ul className="space-y-2">
              {experience.achievements.map((item, i) => (
                <motion.li
                  key={i}
                  className={`text-sm text-text-secondary leading-relaxed flex items-start gap-2 ${isLeft ? "flex-row-reverse text-right" : ""}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <span className="text-primary mt-1 shrink-0">▸</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Center dot */}
        <motion.div
          className="relative z-10 w-10 h-10 rounded-full bg-[var(--bg-primary)] border-2 border-primary flex items-center justify-center shrink-0 order-2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-primary animate-[pulse-glow_2s_infinite]" />
        </motion.div>

        {/* Right content (date badge on opposite side) */}
        <motion.div
          className={`w-[calc(50%-2rem)] flex items-start pt-2 ${isLeft ? "order-3 pl-8" : "text-right pr-8"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 ${isLeft ? "" : "ml-auto"}`}>
            {experience.startDate} — {experience.endDate}
          </span>
        </motion.div>
      </motion.div>

      {/* Mobile layout */}
      <div className="flex md:hidden w-full items-start gap-4">
        {/* Timeline dot */}
        <motion.div
          className="relative z-10 w-9 h-9 rounded-full bg-[var(--bg-primary)] border-2 border-primary flex items-center justify-center shrink-0"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex-1 glass-card p-5"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-base font-bold text-text-primary mb-1">{experience.role}</h3>
          <p className="text-primary font-semibold text-sm mb-2">{experience.company}</p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {experience.startDate} — {experience.endDate}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {experience.location} ({experience.type})
            </span>
          </div>

          <ul className="space-y-1.5">
            {experience.achievements.map((item, i) => (
              <li key={i} className="text-xs text-text-secondary leading-relaxed flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
