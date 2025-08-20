export const currencyFormat = (
  value: string | number | null | undefined,
  usingText = true,
  nullText = "-"
): string => {
  const prefix = usingText ? "Rp" : "";

  const num =
    typeof value === "string" ? parseInt(value.replace(/[^\d]/g, "")) : value;

  if (isNaN(num as number)) return nullText;

  return `${prefix}${new Intl.NumberFormat("id-ID").format(num as number)}`;
};
