import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { EasterEggProvider } from "@/components/providers/EasterEggProvider";

export const metadata: Metadata = {
  title: "Khine Ko Thant — Software Developer Portfolio",
  description:
    "Full-stack software developer specializing in PHP, Laravel, Vue.js, and modern web technologies. Building scalable, business-logic-driven web applications.",
  keywords: [
    "Khine Ko Thant",
    "Software Developer",
    "Full Stack Developer",
    "Laravel Developer",
    "Vue.js",
    "PHP",
    "Web Developer",
    "Myanmar",
  ],
  authors: [{ name: "Khine Ko Thant" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Khine Ko Thant — Software Developer",
    description:
      "Full-stack developer crafting scalable web applications with Laravel, Vue.js, and modern technologies.",
    siteName: "Khine Ko Thant Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khine Ko Thant — Software Developer",
    description:
      "Full-stack developer crafting scalable web applications with Laravel, Vue.js, and modern technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise-overlay">
        <ThemeProvider>
          <EasterEggProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </EasterEggProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
