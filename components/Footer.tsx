"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT();
  const quickLinks = [
    { k: "nav.about", href: "#about" },
    { k: "nav.fleet", href: "#fleet" },
    { k: "footer.longTerm", href: "#quote" },
    { k: "footer.privacy", href: "#" },
    { k: "footer.terms", href: "#" },
  ];
  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src="https://d1yei2z3i6k35z.cloudfront.net/16287944/69835cace7623_Asset-3288x.webp"
              alt="Mountain Car Logo"
              width={160}
              height={42}
              className="h-10 w-auto mb-4"
              unoptimized
            />
            <p className="text-white/60 text-sm leading-relaxed">{t("footer.blurb")}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>📍 Njarðarbraut 3i, 260 Reykjanesbær, Iceland</li>
              <li>
                <a href="tel:+3548888005" className="hover:text-white transition-colors">
                  📞 +354 888 8005
                </a>
              </li>
              <li>
                <a href="mailto:rental@mountaincar.is" className="hover:text-white transition-colors">
                  ✉️ rental@mountaincar.is
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.k}>
                  <a href={l.href} className="text-white/70 hover:text-white transition-colors">
                    {t(l.k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-heading font-bold mb-4">{t("footer.hours")}</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex justify-between gap-4">
                <span>{t("footer.monSat")}</span>
                <span className="text-white">10:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>{t("footer.sunday")}</span>
                <span className="text-white">{t("footer.closed")}</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="font-heading font-bold mb-1 text-sm">{t("footer.needHelp")}</p>
              <p className="text-white/60 text-xs">{t("footer.needHelpText")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © 2025 – Mountain All Service ehf. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
