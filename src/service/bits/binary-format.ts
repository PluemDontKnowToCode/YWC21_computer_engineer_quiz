export function binary(value: number): string {
  return (value >>> 0).toString(2).padStart(8, "0").slice(-8);
}
