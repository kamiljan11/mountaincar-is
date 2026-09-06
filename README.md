# Mountain Car — Car Rental Iceland (closed — now a demo)

**Live:** [mountaincar.is](https://mountaincar.is) · **Status:** demo (rental service closed) ·
**Live business:** [garage.mountaincar.is](https://garage.mountaincar.is) ·
**Built & operated by** [Kamil Jan](https://kamiljan.com)

Mountain Car, a car rental that operated near Keflavík airport, has closed. The site stays
online as a portfolio/demo rather than being taken down or redirected — every visitor sees a
dismissible notice pointing to the garage side of the business, which is the one still trading
(see `docs/adr/0002-*.md` for why). Everything below describes the code as it still runs today.

The job of this site was narrow and it is built accordingly: present the fleet, answer the
questions that stop a booking, and get a qualified enquiry into the inbox. That pipeline (form
→ API → Supabase/Resend) is still live in the code — see `docs/ARCHITECTURE.md` before assuming
a stray form submission is a real customer.

## What it does

- **Marketing site** for the (now closed) rental — fleet, pricing context, and what was included
- **Quote request API** (`app/api/quote`) — enquiries are validated server-side and best-effort
  delivered by e-mail via Resend / saved to Supabase; see `docs/ARCHITECTURE.md` for what
  "best-effort" means here and `docs/quality/BACKLOG.md` for the gap that leaves open
- **Farewell notice** (`components/FarewellModal.tsx`) — tells visitors the rental closed and
  points them to the live business, [garage.mountaincar.is](https://garage.mountaincar.is)

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase · Resend for transactional
e-mail · deployed on Vercel.

Deliberately small: five runtime dependencies. A brochure site does not need a framework fleet.

## Docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — modules, data flow, "where is X"
- [`docs/adr/`](docs/adr/) — decisions actually made in this repo, with the rejected alternative
- [`docs/GLOSSARY.md`](docs/GLOSSARY.md) — domain terms in EN/PL/IS
- [`docs/RUNBOOK.md`](docs/RUNBOOK.md) — deploy, rollback, monitoring, known incidents
- [`docs/quality/BACKLOG.md`](docs/quality/BACKLOG.md) — known gaps, deferred on purpose, with why

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide your own Supabase and Resend keys.

```bash
npm run lint
npm run build
npx tsc --noEmit
```

## How security is handled

- **The Resend key never reaches the browser.** Mail is sent from a server-side route handler;
  the client posts a form and gets back a status, nothing more.
- **No secrets in the repo.** Production values live in Vercel's environment settings.
- **Enquiry input is validated server-side**, not only in the form.
- **CI gates every push** — build, lint, typecheck, Semgrep static analysis and a Gitleaks
  secret scan. A pre-commit hook blocks credential-shaped strings.

## Related

- [mountaincar-landing](https://github.com/kamiljan11/mountaincar-landing) — standalone landing page
- [mas-garage](https://github.com/kamiljan11/mas-garage) — the garage side of the business

## Licence

Proprietary — see [`LICENSE`](LICENSE). Published for reference, not for reuse.
