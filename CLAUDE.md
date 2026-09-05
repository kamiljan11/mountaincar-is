@AGENTS.md

# Reguly pracy w tym repo (obowiazuja kazdego agenta AI i czlowieka)

## Zanim napiszesz JAKIKOLWIEK nowy kod
1. **Grep first.** Przeszukaj repo czy istniejaca funkcja/util/komponent robi to samo. `lib/fleet-data.ts`
   jest JEDYNYM zrodlem listy pojazdow (Fleet + dropdown w QuoteForm) — nie duplikuj listy gdzie indziej.
2. Przeczytaj sasiednie pliki modulu, ktory zmieniasz. Trzymaj sie ich konwencji.
3. Zmiana architektoniczna -> najpierw ADR w `docs/adr/`, potem implementacja.

## Podczas pisania
4. **Male atomowe zmiany + Simplicity First.** Jedna logiczna zmiana naraz. Nie mieszaj refaktoru z feature.
5. **Testy sa czescia zadania.** Nowa logika = testy w tej samej zmianie.
6. Bezpieczenstwo: zero sekretow w kodzie (tylko env, patrz `.env.example`); `app/api/quote/route.ts`
   dotyka PII klienta (imie/telefon/email) — kazda zmiana tam to tier T2 minimum.
7. Nie wylaczaj lintera i nie uzywaj `any` / `@ts-ignore` / `eslint-disable` zeby "przeszlo".

## Zanim powiesz "gotowe" (Definition of Done)
8. Uruchom `npm run lint` + `npx tsc --noEmit` + `npm run build`. Czerwone = nie jest gotowe.
9. Self-review diffa oczami wrogiego recenzenta.
10. Nie commituj z `--no-verify`.
11. **Dokumentacja rowna sie kod:** zmiana funkcjonalna -> `CHANGELOG.md` [Unreleased]; zmiana
    setup/komend/env -> `README.md` + `.env.example`; zmiana deploy/ops -> `docs/RUNBOOK.md`.
12. **Flow galezi:** feature branch -> PR -> zielone CI -> merge. Nie pushuj prosto na `main`
    (to bezposredni deploy produkcyjny na Vercel).

## PG v3 (2026-09-05): tier, paradygmat, dzialy
- `pg.tier_floor: T2` — public product site z PII klienta w `quotes` (imie/telefon/email); stop-gate
  podnosi tier z diffu, nigdy nie obniza.
- Paradygmat: `~/.claude/pg/paradigm.md` — functional core / imperative shell; klasy tylko dla stanu
  z niezmiennikami; **obcy senior przejmuje repo w 1 dzien** (README 15 min, `docs/ARCHITECTURE.md`,
  `docs/GLOSSARY.md`, `docs/adr/`, `docs/RUNBOOK.md`).
- Definition of Done per tier: `~/.claude/pg/dod.md`. Przed deployem: `~/.claude/pg/prr.md`.
- Review T2+: skill `pg-review`. SQL: `node ~/.claude/bin/sql-migration-lint.js --repo . --strict`.
- Commity: Conventional Commits; PR wg `.github/pull_request_template.md`.

## Kontekst projektu
- Stack: Next.js 16 (App Router) + TypeScript (`strict: true`) + Tailwind CSS 4 + Supabase
  (`@supabase/supabase-js`) + Resend, hosting Vercel. Zero backend wlasny poza jednym route handlerze.
- Komendy: `npm run dev` / `npm run build` / `npm run lint` / `npx tsc --noEmit`
  (brak `npm test` — `e2e/smoke.spec.ts` istnieje, ale Playwright nie jest jeszcze podpiety,
  patrz `docs/quality/BACKLOG.md`)
- Plik wzorcowy sekcji strony: `components/Fleet.tsx` (czyta `lib/fleet-data.ts`, i18n przez `useT()`)
- Plik wzorcowy API/serwisu: `app/api/quote/route.ts` (jedyny route handler w repo)
