"use client";

import { motion } from "framer-motion";
import { staggerContainer, letterAnimation } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-10 sm:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      {subtitle && (
        <motion.span
          className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-3"
          variants={letterAnimation}
        >
          {subtitle}
        </motion.span>
      )}

      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
        variants={staggerContainer}
      >
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterAnimation}
            className={char === " " ? "inline" : "inline-block"}
            style={char === " " ? { width: "0.3em" } : {}}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h2>
    </motion.div>
  );
}
