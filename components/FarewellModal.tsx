"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useT } from "@/lib/i18n";

const DISMISS_KEY = "mc-farewell-dismissed";

/**
 * The notice lives in a tiny external store rather than component state so it
 * can be read during render without a setState-in-effect cascade, and so the
 * server always renders nothing (no hydration mismatch on a client-only value).
 */
const listeners = new Set<() => void>();
let cached: boolean | null = null;

function getSnapshot(): boolean {
  if (cached === null) {
    try {
      cached = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch (err) {
      // Storage blocked (private mode, embedded preview): show the notice
      // rather than silently hiding it.
      console.warn("FarewellModal: sessionStorage read failed, showing notice", err);
      cached = false;
    }
  }
  return cached;
}

function getServerSnapshot(): boolean {
  return true;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function dismissForThisSession(): void {
  cached = true;
  try {
    sessionStorage.setItem(DISMISS_KEY, "1");
  } catch (err) {
    // Non-fatal: the notice simply reappears on the next page load.
    console.warn("FarewellModal: sessionStorage write failed, notice will reappear", err);
  }
  listeners.forEach((l) => l());
}

/**
 * Farewell notice for visitors of the (now closed) rental site.
 *
 * The site stays online as a portfolio/demo, so this is deliberately
 * dismissible: it must tell a real customer that we no longer rent cars,
 * without making the pages unusable for someone browsing the build.
 * Dismissal lasts for the browser tab session only, so each fresh visit
 * sees the message.
 */
export default function FarewellModal() {
  const { t } = useT();
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissForThisSession();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="farewell-title"
    >
      <div
        className="absolute inset-0 bg-brand-primary/80 backdrop-blur-sm"
        onClick={dismissForThisSession}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={dismissForThisSession}
          aria-label={t("farewell.close")}
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full text-brand-primary/50 transition-colors hover:bg-brand-light hover:text-brand-primary"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-10 sm:px-9 sm:pb-9">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {t("farewell.kicker")}
          </p>

          <h2
            id="farewell-title"
            className="mt-2 font-heading text-2xl font-extrabold leading-tight text-brand-primary sm:text-3xl"
          >
            {t("farewell.title")}
          </h2>

          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-brand-primary/75">
            <p>{t("farewell.p1")}</p>
            <p>{t("farewell.p2")}</p>
            <p className="font-semibold text-brand-primary">{t("farewell.p3")}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://garage.mountaincar.is"
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-accent px-5 font-semibold text-white transition-colors hover:bg-[#d96f14]"
            >
              {t("farewell.cta")}
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
            <button
              type="button"
              onClick={dismissForThisSession}
              className="min-h-[48px] rounded-xl border border-brand-primary/15 px-5 font-semibold text-brand-primary/70 transition-colors hover:bg-brand-light sm:flex-none"
            >
              {t("farewell.close")}
            </button>
          </div>

          <p className="mt-5 border-t border-brand-primary/10 pt-4 text-center text-xs text-brand-primary/45">
            {t("cta.sign")}
          </p>
        </div>
      </div>
    </div>
  );
}
