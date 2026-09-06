# RUNBOOK — operacje i awarie

Ten plik czyta czlowiek o 3 w nocy — zero prozy, same komendy.

## Podstawy
- Produkcja: https://www.mountaincar.is — od zamkniecia wypozyczalni dziala jako demo z notatka
  pozegnalna (ADR-0002), zywy biznes to https://garage.mountaincar.is (osobne repo: `mas-garage`)
- Hosting: Vercel, push do `main` = deploy (brak `vercel.json` — Next.js go nie wymaga)
- Repo: github.com/kamiljan11/mountaincar-is
- Sekrety: Infisical "MAS Group" (localhost:8222) lokalnie; w produkcji — zmienne srodowiskowe
  projektu w Vercel dashboard. Pelna lista zmiennych (bez wartosci): `.env.example`. NIE w repo.

## Deploy
- Standard: merge do `main` -> Vercel buduje i deployuje automatycznie
- Reczny rollback bez rewertu commita: panel Vercel -> Deployments -> "Promote to Production" na
  poprzednim, dobrym deployu

## Rollback (cel: <5 min)
```bash
git revert <sha-zlego-commita> && git push   # -> redeploy automatyczny na Vercel
# albo: w panelu Vercel -> Deployments -> poprzedni deploy -> "Promote to Production"
```

## Monitoring
- Bledy runtime: **brak Sentry / error trackera w tym repo** (zweryfikowane — zero zaleznosci
  `@sentry/*`, zero konfiguracji). Jedyne zrodlo bledow serwerowych: Vercel -> Project -> Logs
  (function logs `app/api/quote/route.ts` — patrz `docs/quality/BACKLOG.md` o `console.error`
  wywolaniach dodanych tam dla widocznosci bledow Supabase/Resend).
- Healthcheck: https://www.mountaincar.is wstaje = OK; nie ma dedykowanego `/api/health`.
- CI: zakladka Actions w repo (`Quality Gate` musi byc zielony; `Claude Code Review` pomija sie bez
  sekretu `CLAUDE_CODE_OAUTH_TOKEN` — to normalne, nie awaria).

## Typowe awarie
| Objaw | Pierwszy krok |
|---|---|
| Strona nie wstaje po deploy | rollback (wyzej), potem debug na branchu |
| Formularz wyceny "wysyla sie" ale mail nie dochodzi | Vercel Logs -> szukaj `Quote API: Resend send failed` / `Supabase insert failed` (patrz BACKLOG — API zawsze zwraca `success: true` do przegladarki niezaleznie od tych bledow) |
| Plik komponentu wyglada na binarny/base64 zamiast TSX, build pada | juz sie zdarzylo (commity `201f96a`, `37c38db`) — przywroc plik z ostatniego dobrego commita w gicie, nie edytuj recznie |
| Wygasly sekret/API key (Resend/Supabase) | Infisical -> zrotuj -> zaktualizuj zmienna w Vercel -> redeploy |
| Domena/DNS | panel ISNIC / rejestratora domeny mountaincar.is |

## Kontakty
- Wlasciciel/operator: Kamil Jan, mountainallservice@gmail.com (MAS Group)
- To wlasny produkt, nie klient zewnetrzny — decyzje biznesowe (np. cofniecie zamkniecia
  wypozyczalni, usuniecie `FarewellModal`) nalezy do Kamila, patrz ADR-0002.
