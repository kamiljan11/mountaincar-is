# ADR-0001 — Next.js + Vercel + Supabase + Resend, not the no-code funnel builder

Data: 2026-09-05 (retrospektywne — decyzja juz wdrozona) | Status: przyjete

**Kontekst:** repo zaczyna sie od "Initial commit — Mountain Car Next.js site migrated from system.io"
— strona wczesniej stala na no-code funnel builderze. Potrzebne bylo: pelna kontrola nad layoutem,
i18n (EN/PL/IS), wlasny formularz wyceny bez lock-inu w cudzej platformie.

**Decyzja:** Next.js 16 (App Router) + TypeScript + Tailwind CSS, hosting Vercel (push do `main` =
deploy), dane leadow w Supabase (`quotes`), mail transakcyjny przez Resend z `app/api/quote/route.ts`.

**Rozwazone alternatywy:** (1) zostac na funnel builderze — odrzucone: brak i18n, brak kontroli nad
danymi z formularza, brak mozliwosci wlasnego CI/jakosci; (2) Lovable (jak czesc floty siostrzanych
stron) — nie rozwazane w tym repo (brak `lovable-tagger`, brak dowodu w historii commitow).

**Konsekwencje:** wlasny kod = wlasna odpowiedzialnosc za CI/lint/typy/bezpieczenstwo (stad
`.github/workflows/quality.yml`); Resend i Supabase sa opcjonalne w kodzie (`getResend()`/`getSupabase()`
zwracaja `null` bez klucza) — formularz dziala nawet czesciowo skonfigurowany, ale patrz ADR-0002 o tym,
co to dzis realnie znaczy.

**Pulapki dla przyszlego siebie:** brak `vercel.json` jest zamierzony — Next.js na Vercelu nie go
potrzebuje; nie dodawaj go "dla porzadku". `RESEND_FROM_EMAIL` musi byc zweryfikowana domena w Resend,
inaczej wysylka po cichu nie dojdzie mimo `success: true` w odpowiedzi API (patrz BACKLOG).
