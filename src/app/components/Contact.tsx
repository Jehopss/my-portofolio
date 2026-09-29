import { ArrowUpRight } from "lucide-react";

import CopyButton from "./CopyButton";
import Frame from "./Frame";
import { contacts, socials } from "../data/portfolio";

export default function Contact() {
  const primary = contacts.find((c) => c.label === "Personal email") ?? contacts[0];

  return (
    <Frame id="contact" name="Contact">
      <p className="max-w-3xl text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.02em] text-balance">
        I’m always open to new opportunities to grow in UI/UX design, computer vision, and machine learning.{" "}
        <span className="text-muted">Feel free to reach out.</span>
      </p>

      <a
        href={primary.href}
        className="mt-10 inline-block text-[clamp(1.6rem,5.4vw,4.5rem)] leading-none font-semibold tracking-[-0.035em] [overflow-wrap:anywhere] text-ink decoration-signal decoration-2 underline-offset-8 hover:underline lg:mt-14"
      >
        {primary.value}
      </a>

      <ul className="mt-12 border-t border-rule">
        {contacts.map((contact) => (
          <li
            key={contact.label}
            className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6"
          >
            <span className="machine text-[0.875rem] text-muted">{contact.label}</span>
            <span className="flex min-w-0 items-center justify-between gap-4 sm:contents">
              <a href={contact.href} className="min-w-0 text-lg [overflow-wrap:anywhere] hover:text-signal">
                {contact.value}
              </a>
              <CopyButton value={contact.copy} label={contact.label} />
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap gap-2">
        {socials.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2.5 border border-ink px-4 text-sm font-medium transition-colors hover:bg-ink hover:text-frame"
            >
              <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              {label}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
