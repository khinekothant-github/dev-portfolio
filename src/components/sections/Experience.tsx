"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[150px] -z-10 animate-[meshShift_12s_ease_infinite]" />

      <div className="section-container">
        <SectionHeading title="Experience" subtitle="My Journey" />

        <div className="relative max-w-5xl mx-auto">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              experience={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
