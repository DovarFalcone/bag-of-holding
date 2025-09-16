// coinUtils.ts
// D&D coin conversion utility

export type CoinType = "Cp" | "Sp" | "Ep" | "Gp" | "Pp";

// Conversion rates to GP
const COIN_TO_GP: Record<CoinType, number> = {
  Cp: 0.01,   // 1 cp = 0.01 gp
  Sp: 0.1,    // 1 sp = 0.1 gp
  Ep: 0.5,    // 1 ep = 0.5 gp
  Gp: 1,      // 1 gp = 1 gp
  Pp: 10      // 1 pp = 10 gp
};

export function coinToGp(coinType: string, amount: number): number {
  const type = coinType.charAt(0).toUpperCase() + coinType.slice(1).toLowerCase();
  if (!(type in COIN_TO_GP)) return 0;
  return amount * COIN_TO_GP[type as CoinType];
}

export function formatGpValue(value: number): string {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
