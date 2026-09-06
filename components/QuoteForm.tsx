"use client";

import { useState, useRef, useEffect } from "react";
import { useT } from "@/lib/i18n";
import { vehicleNames } from "@/lib/fleet-data";

// Single source of truth: fleet vehicles + a catch-all option.
const vehicles = [...vehicleNames, "Other / Unsure"];

type Status = "idle" | "sending" | "success" | "error";

const fieldBase =
  "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary focus-visible:border-brand-accent";
const dateBase =
  "min-w-0 appearance-none [color-scheme:dark] w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary focus-visible:border-brand-accent";

export default function QuoteForm() {
  const { t } = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      pickup_date: (form.elements.namedItem("pickup_date") as HTMLInputElement).value,
      return_date: (form.elements.namedItem("return_date") as HTMLInputElement).value,
      vehicle: (form.elements.namedItem("vehicle") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("QuoteForm: submit failed", err);
      setStatus("error");
      setError(t("quote.error"));
    }
  }

  return (
    <section id="quote" className="py-16 md:py-24 bg-brand-primary relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
            {t("quote.title")}
          </h2>
          <p className="text-white/70">{t("quote.sub")}</p>
        </div>

        {status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="bg-green-500/20 border border-green-400 text-white rounded-xl p-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          >
            <div className="text-5xl mb-4" aria-hidden="true">✅</div>
            <h3 className="font-heading font-bold text-xl mb-2">{t("quote.successTitle")}</h3>
            <p className="text-white/80">{t("quote.successText")}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 md:p-8 grid gap-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="min-w-0">
                <label htmlFor="qf-name" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.name")}</label>
                <input id="qf-name" name="name" type="text" required className={fieldBase} placeholder={t("quote.namePh")} />
              </div>
              <div className="min-w-0">
                <label htmlFor="qf-phone" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.phone")}</label>
                <input id="qf-phone" name="phone" type="tel" required className={fieldBase} placeholder="+354 888 8005" />
              </div>
            </div>

            <div>
              <label htmlFor="qf-email" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.email")}</label>
              <input id="qf-email" name="email" type="email" required className={fieldBase} placeholder="your@email.com" />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="min-w-0">
                <label htmlFor="qf-pickup" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.pickup")}</label>
                <input id="qf-pickup" name="pickup_date" type="date" required className={dateBase} />
              </div>
              <div className="min-w-0">
                <label htmlFor="qf-return" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.return")}</label>
                <input id="qf-return" name="return_date" type="date" required className={dateBase} />
              </div>
            </div>

            <div>
              <label htmlFor="qf-vehicle" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.vehicle")}</label>
              <select id="qf-vehicle" name="vehicle" className={`${fieldBase} bg-brand-primary`}>
                {vehicles.map((v) => (
                  <option key={v} value={v} className="text-slate-900 bg-white">
                    {v === "Other / Unsure" ? t("quote.vehicleOther") : v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="qf-message" className="text-white/80 text-sm font-medium block mb-1.5">{t("quote.message")}</label>
              <textarea id="qf-message" name="message" rows={4} className={`${fieldBase} resize-none`} placeholder={t("quote.messagePh")} />
            </div>

            {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-brand-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-60 w-full"
            >
              {status === "sending" ? t("quote.sending") : t("quote.send")}
            </button>
            <p className="text-white/40 text-xs text-center">🔒 {t("quote.ssl")}</p>
          </form>
        )}
      </div>
    </section>
  );
}
