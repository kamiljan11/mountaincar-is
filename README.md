# Mountain Car — Car Rental Iceland

**Live:** [mountaincar.is](https://mountaincar.is) · **Status:** production · **Built & operated by** [Kamil Jan](https://kamiljan.com)

Public site for Mountain Car, a car rental operating near Keflavík airport. *"Not just a
rental — your guide to Iceland's wonders."*

The job of this site is narrow and it is built accordingly: present the fleet, answer the
questions that stop a booking, and get a qualified enquiry into the inbox. Reservations
themselves are handled by the internal rental manager, not here.

## What it does

- **Marketing site** for the rental — fleet, pricing context, and what is actually included
- **Quote request API** (`app/api/quote`) — enquiries are validated server-side and delivered
  by e-mail via Resend, so a form submission cannot be lost in a browser tab

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase · Resend for transactional
e-mail · deployed on Vercel.

Deliberately small: five runtime dependencies. A brochure site does not need a framework fleet.

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

Proprietary. Published for reference, not for reuse.
