"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { ExternalLink, Code2, Lock, Unlock } from "lucide-react";
import type { Project } from "@/types";
import { useEasterEggs } from "@/components/providers/EasterEggProvider";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { incrementEasterEggs } = useEasterEggs();

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Easter egg: hold-to-reveal on the special card
  const handleMouseDown = () => {
    if (!project.hasEasterEgg || easterEggRevealed) return;
    holdTimerRef.current = setTimeout(() => {
      setEasterEggRevealed(true);
      incrementEasterEggs();
    }, 2000);
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
  };

  // Tech badge colors (Simpler, non-gradient)
  const techColors: Record<string, { bg: string, text: string }> = {
    Laravel: { bg: "bg-red-500/10", text: "text-red-500" },
    MySQL: { bg: "bg-blue-500/10", text: "text-blue-500" },
    MapLibre: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
    Shadcn: { bg: "bg-violet-500/10", text: "text-violet-500" },
    "Vue.js": { bg: "bg-green-500/10", text: "text-green-500" },
    "REST API": { bg: "bg-amber-500/10", text: "text-amber-500" },
    "HubSpot API": { bg: "bg-orange-500/10", text: "text-orange-500" },
    "Spring MVC": { bg: "bg-lime-500/10", text: "text-lime-500" },
    Java: { bg: "bg-rose-500/10", text: "text-rose-500" },
    Android: { bg: "bg-green-500/10", text: "text-green-500" },
  };

  return (
    <motion.div
      ref={ref}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        perspective: 800,
      }}
    >
      <motion.div
          className="relative rounded-2xl overflow-hidden glass-card h-full flex flex-col"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
      >
        {/* Simplified header */}
        <div className="relative h-36 sm:h-48 overflow-hidden border-b border-white/5">
          {/* Project number */}
          <span className="absolute top-4 left-4 text-7xl font-black text-text-primary/5 font-mono select-none">
            0{index + 1}
          </span>

          {/* Project title overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-text-primary" style={{ transform: "translateZ(30px)" }}>
              {project.title}
            </h3>
          </div>

          {/* Hover overlay with links */}
          <motion.div
            className="absolute inset-0 bg-primary/5 flex items-end justify-center gap-3 pb-4 backdrop-blur-sm sm:opacity-0 sm:hover:opacity-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : undefined }}
            transition={{ duration: 0.3 }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Code2 className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </motion.div>

          {/* Easter egg indicator */}
          {project.hasEasterEgg && (
            <motion.div
              className="absolute top-4 right-4 p-1.5 rounded-lg glass cursor-pointer"
              whileHover={{ scale: 1.1 }}
              title="Hold for 2 seconds..."
            >
              {easterEggRevealed ? (
                <Unlock className="w-4 h-4 text-primary" />
              ) : (
                <Lock className="w-4 h-4 text-text-tertiary" />
              )}
            </motion.div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {easterEggRevealed && project.behindTheScenes
              ? project.behindTheScenes
              : project.description}
          </p>

          {/* Easter egg revealed badge */}
          {easterEggRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-3 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-mono text-center"
            >
              Easter Egg Unlocked
            </motion.div>
          )}

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 ${
                  techColors[tech]?.bg || "bg-gray-500/10"
                } ${techColors[tech]?.text || "text-gray-400"}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
