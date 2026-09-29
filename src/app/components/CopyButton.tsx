"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

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

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label.toLowerCase()}`}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 border px-2.5 text-xs transition-colors ${
        copied ? "border-signal bg-signal text-signal-fg" : "border-rule-strong text-muted hover:border-ink hover:text-ink"
      }`}
    >
      <Icon aria-hidden className="size-3.5" strokeWidth={1.75} />
      {copied ? "Copied" : "Copy"}
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}
