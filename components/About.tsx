"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

export default function About() {
  const { t } = useT();
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-[0.2em] text-brand-accent text-sm font-semibold mb-3">
              {t("about.kicker")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              {t("about.title")}
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">{t("about.p1")}</p>
            <p className="text-slate-600 mb-4 leading-relaxed">{t("about.p2")}</p>
            <p className="text-slate-600 leading-relaxed">{t("about.p3")}</p>

            <div className="flex items-center gap-4 mt-8">
              <Image
                src="https://d1yei2z3i6k35z.cloudfront.net/16287944/698b6e3f9c0ac_gosix.jpg"
                alt="Gosia — Owner & Founder"
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
                unoptimized
              />
              <div>
                <p className="font-heading font-bold text-brand-primary">Gosia</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">{t("about.role")}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://d1yei2z3i6k35z.cloudfront.net/16287944/698b70653ba5c_Untitleddesign.jpg"
              alt="Mountain Car in Iceland"
              width={600}
              height={500}
              className="rounded-2xl object-cover w-full h-[260px] md:h-[420px]"
              unoptimized
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-5 py-3 shadow-lg">
              <p className="text-xs text-slate-500 uppercase tracking-widest">{t("about.badge1")}</p>
              <p className="font-heading font-bold text-brand-primary">{t("about.badge2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
