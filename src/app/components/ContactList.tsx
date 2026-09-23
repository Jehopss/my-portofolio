"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";

import { EASE, fadeUp, stagger } from "./motion";
import { contacts, socials } from "../data/portfolio";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / insecure contexts: fall back to a hidden textarea.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label.toLowerCase()}`}
      className={`relative inline-flex h-8 min-w-[5.25rem] items-center justify-center overflow-hidden rounded-full border px-3 text-xs transition-colors duration-300 ${
        copied
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-line text-muted hover:border-line-strong hover:text-fg"
      }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? (
            <Check aria-hidden className="size-3.5" strokeWidth={2} />
          ) : (
            <Copy aria-hidden className="size-3.5" strokeWidth={1.75} />
          )}
          {copied ? "Copied" : "Copy"}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}

export default function ContactList() {
  return (
    <>
      <motion.ul
        className="mt-12 border-t border-line"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {contacts.map((contact) => (
          <motion.li
            key={contact.label}
            variants={fadeUp}
            className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{contact.label}</span>
            <span className="flex items-center justify-between gap-4 sm:justify-end">
              <a href={contact.href} className="link-draw text-lg break-all text-fg sm:text-xl">
                {contact.value}
              </a>
              <CopyButton value={contact.copy} label={contact.label} />
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.ul
        className="mt-10 flex flex-wrap gap-3"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {socials.map(({ label, href, icon: Icon }) => (
          <motion.li key={label} variants={fadeUp}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors duration-300 hover:bg-surface"
            >
              <Icon aria-hidden className="size-4" strokeWidth={1.75} />
              {label}
              <ArrowUpRight
                aria-hidden
                className="size-3.5 text-muted transition-[translate,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
