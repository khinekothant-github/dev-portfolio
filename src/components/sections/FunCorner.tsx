"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, certifications } from "@/lib/data";
import { fadeInUp } from "@/lib/animations";
import {
  GraduationCap,
  Award,
  ArrowUpRight,
  MapPin,
  Layers,
  Globe,
  BellRing,
} from "lucide-react";

/* What Khine is actually working with right now — factual, from data.ts context */
const CURRENTLY = [
  {
    icon: Layers,
    label: "Building",
    value: "ISP CRM & Network Management at MaharNet",
    color: "#8B5CF6",
  },
  {
    icon: Globe,
    label: "Stack",
    value: "Laravel · Vue.js · MySQL · Redis · REST APIs",
    color: "#06B6D4",
  },
  {
    icon: BellRing,
    label: "Integrating",
    value: "Firebase Push Notifications & Remote Config",
    color: "#F59E0B",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Yangon, Myanmar — open to remote",
    color: "#F472B6",
  },
];

export function FunCorner() {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section id="fun" className="py-16 sm:py-24 md:py-32 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-[500px] h-[600px] bg-primary/4 rounded-full blur-[200px] -z-10 animate-[meshShift_16s_ease_infinite]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[500px] bg-secondary/3 rounded-full blur-[180px] -z-10" />

      <div className="section-container relative z-10">
        <SectionHeading title="Beyond the Code" subtitle="Education & Now" />

        {/* ── Main layout: responsive grid for cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">

          {/* Education */}
          <motion.div
            className="glass-card p-5 sm:p-6 md:p-8 flex flex-col h-full"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/15">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Education</h3>
            </div>
            <div className="flex-1 space-y-6">
              {education.map((edu) => (
                <div key={edu.degree} className="pl-4 border-l-2 border-primary/25">
                  <p className="text-base font-semibold text-text-primary mb-1">{edu.degree}</p>
                  <p className="text-sm text-primary mb-1">{edu.institution}</p>
                  <p className="text-xs text-text-tertiary">{edu.year} · {edu.location}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="glass-card p-5 sm:p-6 md:p-8 flex flex-col h-full"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.05}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/15">
                <Award className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Certifications</h3>
            </div>
            <div className="flex-1 space-y-5">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-md bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-1">{cert.name}</p>
                    <p className="text-xs text-secondary mb-0.5">{cert.issuer}</p>
                    <p className="text-xs text-text-tertiary">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Currently */}
          <motion.div
            className="glass-card p-5 sm:p-6 md:p-8 flex flex-col h-full md:col-span-2 lg:col-span-1"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 rounded-xl bg-accent/10 border border-accent/15">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">Currently</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 flex-1">
              {CURRENTLY.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <div
                    className="flex items-center gap-2 mb-1.5"
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                    <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-6">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
