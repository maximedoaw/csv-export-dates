import { describe, expect, it } from "vitest";

import { exportCsv, formatDate } from "../../src/export/csv";

describe("formatDate", () => {
  it("formats a UTC instant for a UTC user", () => {
    expect(formatDate("2026-03-10T15:00:00Z", "UTC")).toBe("2026-03-10");
  });

  it("uses the user's time zone (New York is UTC-5 in winter)", () => {
    expect(formatDate("2026-01-15T02:30:00Z", "America/New_York")).toBe("2026-01-14");
  });
});

describe("exportCsv", () => {
  it("writes a header and escapes cells", () => {
    const csv = exportCsv(
      [{ id: "1", customer: 'ACME, "Inc"', amount: 12, createdAt: "2026-03-10T15:00:00Z" }],
      { timeZone: "UTC" },
    );
    expect(csv).toBe('id,customer,amount,date\n1,"ACME, ""Inc""",12.00,2026-03-10');
  });
});
