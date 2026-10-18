import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <p className="hidden md:block">Built with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        <a href="#top" className="group inline-flex items-center gap-2 self-start transition-colors hover:text-fg sm:self-auto">
          Back to top
          <ArrowUp
            aria-hidden
            className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
            strokeWidth={1.75}
          />
        </a>
      </div>
    </footer>
  );
}
