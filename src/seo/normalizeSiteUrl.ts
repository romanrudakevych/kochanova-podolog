/** Strip whitespace and trailing slashes from a site origin. */
export function normalizeSiteUrl(value: string | undefined | null): string {
  return (value ?? "").trim().replace(/\/+$/, "");
}
