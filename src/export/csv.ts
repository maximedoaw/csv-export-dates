export type Row = {
  id: string;
  customer: string;
  amount: number;
  /** Instant of the order, stored in UTC (ISO 8601). */
  createdAt: string;
};

export type ExportOptions = {
  /** IANA time zone of the user who downloads the export, e.g. "America/New_York". */
  timeZone: string;
};

const HEADER = ["id", "customer", "amount", "date"];

function escapeCell(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Formats an instant as YYYY-MM-DD. */
export function formatDate(iso: string, _timeZone: string): string {
  const date = new Date(iso);
  // BUG (reported by customers west of UTC): dates are shifted by one day.
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function exportCsv(rows: readonly Row[], options: ExportOptions): string {
  const lines = rows.map((row) =>
    [row.id, row.customer, row.amount.toFixed(2), formatDate(row.createdAt, options.timeZone)]
      .map((cell) => escapeCell(String(cell)))
      .join(","),
  );
  return [HEADER.join(","), ...lines].join("\n");
}
