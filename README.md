# CSV export: dates shifted by one day

Customers located west of UTC report that dates in their CSV exports are one day off.

## Your task

1. Fork this repository and fix `formatDate` in `src/export/csv.ts` so that dates are
   formatted in the **user's time zone** (`options.timeZone`, an IANA name).
2. Keep the existing behaviour for UTC users and the CSV escaping.
3. Add tests for the cases you consider important.
4. Commit your work and submit the URL of your fork and the commit hash on Sybil.

```bash
pnpm install
pnpm test        # visible tests
pnpm typecheck
pnpm lint
```

Your submission is also checked against additional tests that are not in this repository.
