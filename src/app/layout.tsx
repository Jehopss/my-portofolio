import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import "lenis/dist/lenis.css";
import "./globals.css";
import Providers from "./components/Providers";

// The one typeface for the whole site: Outfit, a clean geometric sans
// (variable 100–900, SIL OFL). Self-hosted, so builds never depend on Google Fonts.
const outfit = localFont({
  src: "./fonts/Outfit-Variable.woff2",
  weight: "100 900",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Hopi Pranata — Portfolio",
  description:
    "Portfolio of Jonathan Hopi Pranata, a Computer Science student (Master Track Program) at BINUS University working across UI/UX design, computer vision, and machine learning.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#101312" },
  ],
};

// Runs before first paint: apply the saved theme (or the OS preference) so the
// page never flashes the wrong colours.
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;document.addEventListener('DOMContentLoaded',function(){var c=t==='dark'?'#101312':'#f4f3ee';document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute('content',c)})})}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={outfit.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
