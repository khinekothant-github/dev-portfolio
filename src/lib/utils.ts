import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Random number between min and max
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Throttle function
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let lastCall = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

// Dev jokes for rubber duck
export const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 types of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'",
  "!false — It's funny because it's true.",
  "Why did the developer go broke? Because he used up all his cache!",
  "How do you comfort a JavaScript bug? You console it.",
  "What's a programmer's favorite hangout? Foo Bar!",
  "Algorithm: A word used by programmers when they don't want to explain what they did.",
  "It works on my machine!",
  "99 bugs in the code, take one down, patch it around... 127 bugs in the code.",
  "There's no place like 127.0.0.1",
  "Keep calm and git commit.",
  "You're doing great! Even the best code starts with a blank file.",
  "Remember: Every expert was once a beginner. Keep coding!",
  "Quack! I believe in you! Now go squash those bugs!",
];
