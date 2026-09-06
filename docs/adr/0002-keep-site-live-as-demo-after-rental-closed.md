# ADR-0002 — Wypozyczalnia zamknieta: strona zostaje online jako demo, nie redirect/down

Data: 2026-09-05 (retrospektywne — wdrozone w commitach 90ca437/c40a581/35bf961) | Status: przyjete

**Kontekst:** Mountain Car (wypozyczalnia aut) zakonczyla dzialalnosc. Zywy biznes MAS-u w tej niszy to
teraz garage.mountaincar.is (warsztat). Strona mountaincar.is ma nadal ruch (SEO, stare linki, zakladki).

**Decyzja:** domena zostaje online, kod (Fleet/QuoteForm/API) nietkniety, ale `app/layout.tsx` montuje
globalnie `FarewellModal` (EN/PL/IS, tresci w `lib/i18n.tsx`) z CTA na `garage.mountaincar.is`. Modal jest
dismissable na czas sesji karty (`sessionStorage`) — wraca przy kazdej nowej wizycie.

**Rozwazone alternatywy:** (1) 301 redirect calej domeny na garage.mountaincar.is — odrzucone: bez
wyjasnienia byly klient laduje na obcej dla niego stronie warsztatu i nie rozumie co sie stalo; (2) zdjac
strone (DNS/host down) — odrzucone: traci wartosc jako portfolio/demo builda (i18n, design, integracje).

**Konsekwencje:** `QuoteForm` → `/api/quote` → Supabase `quotes` + Resend nadal DZIALA — realne zgloszenia
moga nadal wpadac od osob, ktore nie doczytaly modala. Nikt nie monitoruje juz tej skrzynki jako "biznes
live" w tym samym sensie co wczesniej.

**Pulapki dla przyszlego siebie:** NIE przywracaj "pelnej" wypozyczalni ani nie usuwaj `FarewellModal` bez
decyzji biznesowej Kamila — to nie jest bug do naprawienia. Jesli kiedys trzeba naprawde wylaczyc formularz
(a nie tylko ostrzec), zrob to jawnie w `QuoteForm`/`route.ts`, nie przez usuniecie modala.
