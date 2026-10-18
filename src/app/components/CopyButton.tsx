"use client";

import { useEffect, useRef, useState } from "react";

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

/** A plain text button that copies a value and says so. */
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

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label.toLowerCase()}`}
      className="min-h-11 text-small text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
    >
      {copied ? "Copied" : "Copy"}
      <span className="sr-only" aria-live="polite">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </button>
  );
}
