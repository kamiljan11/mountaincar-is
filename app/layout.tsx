import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mountain Car — Car Rental Iceland",
  description:
    "Straightforward car and camper rentals in Iceland. No hidden fees, free minor damages. Based near KEF Airport.",
  keywords: "car rental Iceland, camper rental Iceland, KEF airport, Reykjanesbær",
  openGraph: {
    title: "Mountain Car — Car Rental Iceland",
    description: "Not just a rental. Your guide to Iceland's wonders.",
    url: "https://www.mountaincar.is",
    siteName: "Mountain Car",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="font-[var(--font-open-sans)]">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
