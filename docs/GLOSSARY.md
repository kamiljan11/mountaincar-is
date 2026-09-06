# GLOSSARY — domain terms (EN / PL / IS)

Names in code must come from here. A new term in a diff = a new row here.

| Term in code (EN) | PL | IS | Meaning / business rule |
|---|---|---|---|
| `quote` (request) | zapytanie o wycene | fyrirspurn | one row in the `quotes` table: a visitor asking to rent a specific vehicle for given dates |
| `pickup_date` / `return_date` | data odbioru / zwrotu | afhendingardagur / skiladagur | plain `date` columns, no time component; no overlap/availability check exists in this repo (that logic, if any, lives with whoever now handles enquiries manually) |
| `vehicle` | pojazd | ökutæki | free-text name matched against `lib/fleet-data.ts` → `vehicleNames`; the form always includes an "Other / Unsure" option outside the fleet list |
| `cars` / fleet | flota | bílafloti | the vehicle catalog in `lib/fleet-data.ts` — the single source of truth for both the Fleet section and the quote-form dropdown |
| addon | dodatek | aukahlutur | extra offered alongside a rental (see `components/Addons.tsx`); display-only, not part of the `quotes` schema |
| farewell notice | notatka pozegnalna | kveðjutilkynning | the dismissible modal telling visitors the rental has closed, pointing to garage.mountaincar.is (`components/FarewellModal.tsx`, ADR-0002) |
| `lang` (`en`/`pl`/`is`) | jezyk | tungumál | current UI language, held outside React state in `lib/i18n.tsx` so SSR always renders `en` |
