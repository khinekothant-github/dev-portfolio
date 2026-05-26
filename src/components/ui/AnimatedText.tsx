"use client";

import { motion } from "framer-motion";
import { staggerContainer, letterAnimation } from "@/lib/animations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  tag = "p",
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Tag = tag;

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        variants={staggerContainer}
        className="inline"
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split("").map((char, ci) => (
              <motion.span
                key={ci}
                variants={letterAnimation}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
