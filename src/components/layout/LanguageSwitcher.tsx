"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const otherLocale = locale === "fr" ? "en" : "fr";
  const segments = pathname.split("/");
  segments[1] = otherLocale;
  const otherPath = segments.join("/");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] border font-mono text-[11px] font-medium tracking-[0.1em] cursor-pointer transition-all ${
          open
            ? "text-primary bg-surface-2 border-border"
            : "text-ink-dim bg-transparent border-transparent hover:text-primary hover:bg-surface-2 hover:border-border"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px] stroke-[1.8]">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
        {locale.toUpperCase()}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        role="menu"
        className={`absolute top-[calc(100%+8px)] right-0 min-w-[170px] bg-white border border-border rounded-xl p-1.5 shadow-[0_12px_36px_rgba(20,24,64,0.08),0_2px_8px_rgba(20,24,64,0.04)] z-[100] transition-all duration-200 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1"
        }`}
      >
        <span
          role="menuitem"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-primary bg-accent/[0.08] cursor-default"
        >
          {locale === "fr" ? "Français" : "English"}
          <span className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.12em] text-ink-dim">{locale.toUpperCase()}</span>
            <span className="text-accent font-bold text-[13px]">✓</span>
          </span>
        </span>
        <Link
          href={otherPath}
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-ink transition-colors hover:bg-surface-2 hover:text-primary"
        >
          {otherLocale === "fr" ? "Français" : "English"}
          <span className="font-mono text-[10px] tracking-[0.12em] text-ink-dim">{otherLocale.toUpperCase()}</span>
        </Link>
      </div>
    </div>
  );
}
