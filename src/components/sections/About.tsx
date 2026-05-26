"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";
import { fadeInUp, fadeInLeft, fadeInRight, blurIn } from "@/lib/animations";
import Image from "next/image";
import { MapPin, Briefcase, Code2, Rocket } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "2+", icon: Briefcase },
  { label: "Projects Built", value: "5+", icon: Rocket },
  { label: "Technologies", value: "15+", icon: Code2 },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px] -z-10 animate-[meshShift_12s_ease_infinite]" />

      <div className="section-container">
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Avatar + visual element */}
          <motion.div
            className="relative flex justify-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Avatar container with glow */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden">
                {/* Gradient border effect */}
                <div className="absolute -inset-[2px] bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl animate-[gradientShift_4s_ease_infinite]" style={{ backgroundSize: "200% 200%" }} />
                <div className="absolute inset-[2px] bg-[var(--bg-secondary)] rounded-[14px] flex items-center justify-center overflow-hidden">
                  {/* Photo avatar */}
                  <Image
                    src="/aboutphoto.png"
                    alt="Khine Ko Thant"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-primary/10 border border-primary/20 text-[10px] sm:text-xs font-semibold text-primary flex items-center gap-1.5"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Laravel Expert
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl glass-card text-[10px] sm:text-xs font-semibold"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary" />
                  {personalInfo.location}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="text-text-secondary leading-relaxed mb-6"
              variants={fadeInUp}
            >
              {personalInfo.summary}
            </motion.p>

            <motion.p
              className="text-text-secondary leading-relaxed mb-8"
              variants={fadeInUp}
              custom={0.1}
            >
              I specialize in building robust web applications with <span className="text-primary font-semibold">Laravel</span> and <span className="text-primary font-semibold">Vue.js</span>, crafting clean APIs, and integrating complex third-party services. I&apos;m passionate about writing clean, efficient code that solves real business problems.
            </motion.p>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 sm:p-4 rounded-xl glass-card group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <AnimatedCounter value={stat.value} isInView={isInView} delay={i * 200} />
                  <p className="text-xs text-text-tertiary mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Animated counter component
function AnimatedCounter({
  value,
  isInView,
  delay,
}: {
  value: string;
  isInView: boolean;
  delay: number;
}) {
  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = value.replace(/\d+/, "");

  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => `${Math.round(v)}${suffix}`);

  if (isInView) {
    setTimeout(() => {
      motionVal.set(num);
    }, delay);
  }

  return (
    <motion.span className="text-xl sm:text-2xl font-bold gradient-text block">
      {rounded}
    </motion.span>
  );
}
