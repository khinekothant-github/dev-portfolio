import type { ComponentType } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
  hasEasterEgg?: boolean;
  behindTheScenes?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string; // "Hybrid" | "Remote" | "On-site"
  achievements: string[];
}

export interface Skill {
  name: string;
  icon: ComponentType<any>;
  category: "frontend" | "backend" | "database" | "tools";
  proficiency: number; // 0-100
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string;
  subtitles: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}
