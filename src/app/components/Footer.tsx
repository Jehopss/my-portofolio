import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="shell flex flex-col gap-3 pt-4 pb-12 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="machine text-[0.8125rem]">Set in Mona Sans &amp; Doto · Built with Next.js</p>
      <a href="#top" className="hover:text-ink">
        Back to top ↑
      </a>
    </footer>
  );
}
