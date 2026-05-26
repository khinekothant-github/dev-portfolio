"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique technologies for filter
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => techs.add(t)));
    return ["All", ...Array.from(techs)];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.technologies.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] -z-10 animate-[meshShift_15s_ease_infinite]" />

      <div className="section-container">
        <SectionHeading title="Projects" subtitle="My Work" />

        {/* Filter bar */}
        <motion.div
          className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 sm:mb-12 overflow-x-auto scrollbar-none px-2 pb-2 -mx-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {allTechs.map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeFilter === tech
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "glass-card text-text-secondary hover:text-primary hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Easter egg hint */}
        <motion.p
          className="text-center text-xs text-text-tertiary/40 mt-8 font-mono flex items-center justify-center gap-1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>Tip:</span> Try holding click on a project card for 2 seconds...
        </motion.p>
      </div>
    </section>
  );
}
