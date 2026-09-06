# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), wersjonowanie: [SemVer](https://semver.org/).
Kazdy PR dopisuje zmiany do [Unreleased]; przy release przenosimy pod numer wersji z data.

## [Unreleased]
### Added
- Pipeline jakosci: CI (build/lint/typecheck/test/semgrep/audit/licencje), Claude review na PR, szablony dokumentacji
- Notatka pozegnalna (`FarewellModal`, EN/PL/IS) informujaca o zamknieciu wypozyczalni, z odnosnikiem do
  zywego biznesu garage.mountaincar.is (retroaktywny wpis — funkcja wdrozona wczesniej, commity 90ca437/c40a581/35bf961)
- Dokumentacja przejmowalnosci: `docs/ARCHITECTURE.md`, `docs/GLOSSARY.md`, `docs/adr/0001` i `0002`,
  `LICENSE`, `.env.example`, `.github/pull_request_template.md`

### Changed
- README: status zaktualizowany na "demo (rental service closed)", link do zywego biznesu i do docs/
- `.gitignore`: `.env*` teraz z wyjatkiem `!.env.example` — szablon srodowiska ma byc sledzony, poprzednia
  regula go po cichu ignorowala
- `app/api/quote/route.ts`: bledy zapisu do Supabase / wysylki Resend sa teraz logowane (byly po cichu gubione)

### Fixed
- Usuniety martwy `lib/supabase.ts` (nieuzywany nigdzie w repo, tworzyl klienta eagerly z `!`-asercjami)
- Puste bloki `catch` w `lib/i18n.tsx`, `components/FarewellModal.tsx`, `components/QuoteForm.tsx` teraz logują kontekst zamiast cicho polykac blad
