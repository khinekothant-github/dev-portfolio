"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
}

/**
 * A clean, minimalist button with outline/ghost styles.
 * Formerly "MagneticButton", it now focuses on a sleek, professional aesthetic.
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  download,
}: MagneticButtonProps) {
  const baseStyles = "relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 overflow-hidden group border-2";

  const variantStyles = {
    primary:
      "border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md hover:shadow-primary/20",
    secondary:
      "border-border hover:border-text-primary text-text-primary bg-bg-card hover:bg-bg-card-hover",
    ghost:
      "border-transparent text-text-secondary hover:text-primary hover:bg-primary/5",
  };

  const content = (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={onClick}
        download={download}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block focus:outline-none">
      {content}
    </button>
  );
}
