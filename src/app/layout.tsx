import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import "./globals.css";

// Two voices, both self-hosted (SIL OFL) so builds never depend on a font CDN.
// Mona Sans is the human voice: a variable grotesk whose width axis (75–125)
// widens it into the poster-sized name. Doto is the machine voice: a
// dot-matrix face used only for labels, readouts and sizes.
const mona = localFont({
  src: "./fonts/MonaSans-Variable.woff2",
  weight: "200 900",
  variable: "--font-mona",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

const doto = localFont({
  src: "./fonts/Doto-Variable.woff2",
  weight: "100 900",
  variable: "--font-doto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Hopi Pranata — Portfolio",
  description:
    "Portfolio of Jonathan Hopi Pranata, a Computer Science student (Master Track Program) at BINUS University working across UI/UX design, computer vision, and machine learning.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9eaed" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
};

// Runs before first paint: apply the saved theme (or the OS preference) so the
// page never flashes the wrong colours.
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;document.addEventListener('DOMContentLoaded',function(){var c=t==='dark'?'#0a0b0d':'#e9eaed';document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute('content',c)})})}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${mona.variable} ${doto.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
