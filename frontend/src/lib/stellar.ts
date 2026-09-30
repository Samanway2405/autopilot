import { horizonAccountUrl } from "./network";

export interface StellarBalance {
  xlm: string;
  otherAssets: Array<{ asset: string; balance: string }>;
  isUnfunded: boolean;
}

export async function fetchStellarBalance(publicKey: string): Promise<StellarBalance> {
  try {
    const res = await fetch(horizonAccountUrl(publicKey), {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return { xlm: "0.0000000", otherAssets: [], isUnfunded: true };
    }

    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const balances: any[] = data.balances ?? [];

    const xlmBalance = balances.find((b) => b.asset_type === "native");
    const otherAssets = balances
      .filter((b) => b.asset_type !== "native")
      .map((b) => ({
        asset: b.asset_code ?? "Unknown",
        balance: b.balance,
      }));

    return {
      xlm: xlmBalance?.balance ?? "0.0000000",
      otherAssets,
      isUnfunded: false,
    };
  } catch {
    return { xlm: "0.0000000", otherAssets: [], isUnfunded: true };
  }
}

export function formatXLM(balance: string | number): string {
  const num = typeof balance === "number" ? balance : parseFloat(balance);
  if (isNaN(num)) return "0.00";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(num);
}

export function formatUSDC(balance: string | number): string {
  const num = typeof balance === "number" ? balance : parseFloat(balance);
  if (isNaN(num)) return "0.00";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatAsset(amount: string | number, asset: string = "XLM"): string {
  const upper = asset.toUpperCase();
  if (upper === "USDC") return `${formatUSDC(amount)} USDC`;
  return `${formatXLM(amount)} XLM`;
}

export function truncateAddress(address: string, lead = 6, tail = 4): string {
  if (!address || address.length <= lead + tail) return address || "";
  return `${address.slice(0, lead)}...${address.slice(-tail)}`;
}

