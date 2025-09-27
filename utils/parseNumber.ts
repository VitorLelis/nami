export function parseNumber(value: string) {
  if (typeof value === "number") return value;
  if (!value) return NaN;

  value = value.trim();

  // Case 1: comma used as decimal separator (e.g. "1.234,56")
  if (/,\d+$/.test(value)) {
    value = value.replace(/\./g, ""); 
    value = value.replace(",", "."); 
    return Number(value);
  }

  // Case 2: dot used as decimal separator (e.g. "1,234.56")
  if (/\.\d+$/.test(value)) {
    value = value.replace(/,/g, "");
    return Number(value);
  }

  // Case 3: integers only (e.g. "1,234" or "1.234")
  value = value.replace(/[,.]/g, "");
  return Number(value);
}