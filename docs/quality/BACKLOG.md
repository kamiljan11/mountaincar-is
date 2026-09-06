# Quality backlog — deliberately deferred (not silently dropped)

Each item: what, evidence, why deferred, suggested next step. Written during the PG v3
github-ready pass (`chore/pg-v3-github-ready`, 2026-09-05). Nothing here blocks this PR.

## T3 — RLS: `quotes` policy missing explicit WITH CHECK
- **Evidence**: `node ~/.claude/bin/sql-migration-lint.js --repo . --min-severity high` →
  `[HIGH] R2 001_quotes.sql:18 — FOR ALL policy has USING but no WITH CHECK`.
- **What**: `create policy "Service role full access" on quotes for all using (auth.role() = 'service_role');`
  has no explicit `WITH CHECK`.
- **Why not fixed here**: Postgres defaults an omitted `WITH CHECK` to the `USING` expression for
  `UPDATE`/`ALL` policies, so this specific policy is very likely equivalent in practice — and the
  `quotes` table holds real customer PII (name/phone/email), so a migration touching its RLS goes
  through Kamil, not an unattended PR (`pg/github-ready.md`: no migrations/deploys from this pass).
  Separately: Supabase's `service_role` key bypasses RLS entirely by default, which makes this
  specific policy close to a no-op either way — worth confirming before spending effort on it.
- **Suggested fix** (new migration, not an edit to `001_quotes.sql`):
  `alter policy "Service role full access" on quotes with check (auth.role() = 'service_role');`
- **Decision needed**: Kamil — apply the migration above, or explicitly accept as-is.

## Dormant E2E job — `e2e/smoke.spec.ts` has no runner wired up
- **Evidence**: `.github/workflows/quality.yml` job `e2e` gates every step on
  `hashFiles('playwright.config.ts', 'playwright.config.js') != ''`; neither file exists, `@playwright/test`
  is not a devDependency, so the job's steps all skip (job shows green, but tests never run).
- **Why not fixed here**: wiring it up (config + devDependency + an install of the Chromium binary)
  is a real new CI failure surface that could not be verified end-to-end from this pass without
  risking a red badge on first run — worse than the current honest "not wired up" state
  (`pg/github-ready.md`: "czerwony badge = gorzej niz brak").
- **Suggested next step**: add `playwright.config.ts` (baseURL + `webServer: npm run build && npm start`)
  and `@playwright/test` as a devDependency, confirm `npx playwright test` passes locally against a
  production build, then let CI run it for real on the next PR.

## Silent-failure surface in `app/api/quote/route.ts` — narrowed, not eliminated
- **Done in this PR**: Supabase insert errors and Resend send errors are now `console.error`-logged
  instead of silently discarded; a fully-unconfigured deploy (neither env group set) now logs loudly.
- **Still open**: the route still always answers `{ success: true }` to the browser once validation
  passes, even if the Supabase insert or the Resend send then fails — by design (a backend hiccup
  shouldn't make a real visitor re-submit), but it means nobody currently *alerts* on those log lines.
- **Suggested next step**: if Vercel log alerting/Sentry is ever added to this repo, point it at these
  two `console.error` call sites first.

## `POST` in `app/api/quote/route.ts` is now 69 lines (paradigm.md guideline: <= 60)
- **Evidence**: `node ~/.claude/bin/fleet-metrics.js --repo . --json` → `functions.over60: 1`,
  `maxLen: {length: 69, name: "POST", file: "app/api/quote/route.ts"}` (see `baseline-metrics.json`).
- **Why not fixed here**: the 9 extra lines are exactly the error-logging added in this PR (see above)
  — splitting the handler is a real refactor (extract `saveQuote`/`emailQuote` helpers), which is a
  behavior-neutral change worth its own review rather than folding into a silent-catch fix.
- **Suggested next step**: extract the Supabase-insert and Resend-send blocks into two small
  functional-core-style helpers in a follow-up PR; keep the route handler as the imperative shell.

## `eslint.config.mas-strict.mjs` — fleet strict baseline dropped in, not merged
- Added by `mas-quality-init.ps1` as a comparison file (repo already had its own `eslint.config.mjs`,
  so the bootstrap didn't overwrite it). Not merged in this PR — reconciling would mean fixing whatever
  new violations it surfaces, which is a separate, larger change.
- **Suggested next step**: `npx eslint -c eslint.config.mas-strict.mjs . --max-warnings=0`, review the
  diff in violations, merge deliberately.

## `tsconfig.base.json` — fleet strict compiler baseline dropped in, not wired
- Added by the bootstrap for future opt-in (`noUncheckedIndexedAccess`, `noImplicitOverride`, etc.).
  `tsconfig.json` does **not** currently `extend` it — this repo's own `tsconfig.json` (already
  `strict: true`) is untouched, so this PR introduces zero new type-check surface.
- **Suggested next step**: opt in behind its own PR once someone budgets time to fix whatever
  `noUncheckedIndexedAccess` turns up (Supabase query results are the classic source).
