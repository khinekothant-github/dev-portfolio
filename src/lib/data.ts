import { PersonalInfo, Experience, Project, Skill, Education, Certification } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Khine Ko Thant",
  title: "Software Developer",
  email: "khinekothant@gmail.com",
  phone: "+95 9255097766",
  location: "Yangon, Myanmar",
  github: "https://github.com/khinekothant-github",
  linkedin: "https://linkedin.com/in/khine-ko-thanthmk",
  summary:
    "Highly motivated full-stack software developer with hands-on experience in PHP, Laravel, and Vue.js. Skilled in building scalable, business-logic-driven web applications and transforming requirements into reliable, high-quality solutions. Proven ability to contribute effectively in collaborative, fast-paced development teams while delivering real-world projects.",
  subtitles: [
    "Full Stack Developer",
    "Laravel Specialist",
    "API Architect",
    "Problem Solver",
    "Tech Enthusiast",
  ],
};

export const experiences: Experience[] = [
  {
    id: "maharnet",
    company: "MaharNet ISP Company",
    role: "Full Stack Web Developer",
    startDate: "Oct 2024",
    endDate: "Dec 2025",
    location: "Yangon",
    type: "Hybrid",
    achievements: [
      "Engineered and maintained the UserApp backend portal using Laravel, enabling centralized management of mobile application features",
      "Developed and deployed robust RESTful APIs for mobile and web platforms handling user authentication, data management, and service integrations",
      "Integrated Firebase services including Push Notifications and Remote Config to drive real-time user engagement and feature toggling",
      "Spearheaded feature development for the MPlus CRM & Network Management System, a custom solution for managing the complete customer lifecycle",
      "Optimized operational efficiency by integrating multiple Splynx APIs for billing, network monitoring, and customer support",
      "Implemented Redis caching to enhance application performance, reduce database load, and improve response times across critical backend services",
    ],
  },
  {
    id: "educlaas",
    company: "EduClaas",
    role: "Intern Technology Associate",
    startDate: "Mar 2024",
    endDate: "Sep 2024",
    location: "Singapore",
    type: "Remote",
    achievements: [
      "Architected a Customer Contact Management System to streamline lead assignment from social media campaigns to the sales team",
      "Developed and implemented a weighted round-robin algorithm to ensure fair and efficient lead distribution, accounting for agent availability and status",
      "Engineered a seamless integration with HubSpot CRM, synchronizing lead data to align with existing sales workflows and enhance reporting accuracy",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "urban-fix",
    title: "Urban Fix",
    description:
      "Smart city issue-reporting platform with map-based submissions and live admin dashboard.",
    longDescription:
      "A comprehensive smart city solution that allows citizens to report urban issues (potholes, broken streetlights, waste management) through an interactive map interface. Features include geolocation-based submissions, real-time status tracking, and an admin dashboard with analytics. Built with MapLibre for beautiful, performant maps.",
    technologies: ["Laravel", "MySQL", "MapLibre", "Shadcn"],
    githubUrl: "https://github.com/khinekothant-github",
    featured: true,
  },
  {
    id: "quiz-quest",
    title: "QuizQuest",
    description:
      "Secure quiz platform with authentication, roles, and API-driven quiz content.",
    longDescription:
      "An interactive quiz platform featuring user authentication with role-based access control, dynamic quiz content fetched from public APIs, real-time scoring, and progress tracking. Teachers can create custom quizzes while students can compete and track their learning progress.",
    technologies: ["Laravel", "Vue.js", "MySQL", "REST API"],
    githubUrl: "https://github.com/khinekothant-github",
    featured: true,
  },
  {
    id: "contacts-management",
    title: "Contacts Management System",
    description:
      "CRM-style system for sales agents with CRUD operations, file storage, and external API integration.",
    longDescription:
      "A professional CRM-style contact management system designed for sales teams. Features full CRUD operations, file attachment storage, advanced search and filtering, and seamless HubSpot CRM integration for synchronizing contact data across platforms.",
    technologies: ["Laravel", "MySQL", "HubSpot API"],
    githubUrl: "https://github.com/khinekothant-github",
    featured: true,
    hasEasterEgg: true,
    behindTheScenes:
      "Fun fact: This project was born from a real internship challenge at EduClaas! The weighted round-robin algorithm went through 5 iterations before I got it right. The 'eureka' moment came at 2 AM over instant noodles.",
  },
  {
    id: "financial-system",
    title: "Financial System",
    description:
      "Backend system for user data, transaction tracking, and personalized investment calculations.",
    longDescription:
      "A robust financial backend system built with Spring MVC, featuring user portfolio management, transaction history tracking, investment return calculations, and personalized financial insights. Designed with security best practices for handling sensitive financial data.",
    technologies: ["Spring MVC", "MySQL", "Java"],
    githubUrl: "https://github.com/khinekothant-github",
  },
  {
    id: "math-quiz-app",
    title: "Math Quiz Mobile App",
    description:
      "Educational mobile app with interactive quizzes and scoring system for children.",
    longDescription:
      "An Android mobile application designed to make math learning fun for children. Features multiple difficulty levels, animated feedback, progress tracking, a scoring system with achievements, and parent-friendly reporting on learning outcomes.",
    technologies: ["Java", "Android"],
    githubUrl: "https://github.com/khinekothant-github",
  },
];

import {
  FileCode2,
  Blocks,
  AppWindow,
  Palette,
  TerminalSquare,
  Box,
  Coffee,
  Leaf,
  Braces,
  Globe2,
  Database,
  HardDrive,
  Server,
  GitBranch,
  Flame,
  Layout,
  Cpu,
  Settings
} from "lucide-react";

export const skills: Skill[] = [
  // Frontend
  { name: "JavaScript", icon: FileCode2, category: "frontend", proficiency: 90 },
  { name: "Vue.js", icon: Blocks, category: "frontend", proficiency: 85 },
  { name: "React.js", icon: AppWindow, category: "frontend", proficiency: 75 },
  { name: "Tailwind CSS", icon: Palette, category: "frontend", proficiency: 90 },

  // Backend
  { name: "PHP", icon: TerminalSquare, category: "backend", proficiency: 90 },
  { name: "Laravel", icon: Box, category: "backend", proficiency: 95 },
  { name: "Java", icon: Coffee, category: "backend", proficiency: 80 },
  { name: "Spring Boot", icon: Leaf, category: "backend", proficiency: 70 },
  { name: "Python", icon: Braces, category: "backend", proficiency: 65 },
  { name: "REST APIs", icon: Globe2, category: "backend", proficiency: 92 },

  // Database
  { name: "MySQL", icon: Database, category: "database", proficiency: 88 },
  { name: "PostgreSQL", icon: HardDrive, category: "database", proficiency: 75 },
  { name: "Redis", icon: Server, category: "database", proficiency: 80 },

  // Tools
  { name: "Git & GitHub", icon: GitBranch, category: "tools", proficiency: 88 },
  { name: "Firebase", icon: Flame, category: "tools", proficiency: 78 },
];

export const education: Education[] = [
  {
    degree: "Pearson BTEC Diploma in IT",
    institution: "EduClaas (Lithan)",
    year: "2023",
    location: "Yangon",
  },
];

export const certifications: Certification[] = [
  {
    name: "Java EE: Servlets and JSP",
    issuer: "LinkedIn Learning",
    year: "2024",
  },
];

export const funFacts = [
  "I once debugged a production issue at 3 AM and celebrated with instant noodles",
  "My first program was a calculator in Java — it could only add numbers, but I was SO proud",
  "I have written more SQL queries than text messages this year",
  "I believe the best code is the code you don't have to write",
  "I drink approximately 3 cups of coffee per day while coding",
  "My favorite keyboard shortcut? Ctrl+Z. Everyone needs an undo button in life!",
];

export const skillCategories = {
  frontend: { label: "Frontend", color: "#06B6D4", icon: Layout },
  backend: { label: "Backend", color: "#7C3AED", icon: Settings },
  database: { label: "Database", color: "#F59E0B", icon: Database },
  tools: { label: "Tools & DevOps", color: "#10B981", icon: Cpu },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
