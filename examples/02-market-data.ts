/**
 * Example 02 — Live Market Data
 *
 * Fetches real-time BNB, BTC, and ETH prices from public APIs.
 * No API keys required.
 *
 * Usage:
 *   bun run examples/02-market-data.ts
 *   npx tsx examples/02-market-data.ts
 */

// ── Helpers ─────────────────────────────────────────────────────

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatChange(n: number): string {
  const sign = n >= 0 ? "+" : "";
  const color = n >= 0 ? "\x1b[32m" : "\x1b[31m";
  return `${color}${sign}${n.toFixed(2)}%\x1b[0m`;
}

function formatVolume(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

// ── Main ────────────────────────────────────────────────────────

console.log("╔══════════════════════════════════════════════════╗");
console.log("║   BNB Chain AI Toolkit — Live Market Data       ║");
console.log("╚══════════════════════════════════════════════════╝\n");

const tokens = ["binancecoin", "bitcoin", "ethereum", "pancakeswap-token", "venus"];
const symbols: Record<string, string> = {
  binancecoin: "BNB",
  bitcoin: "BTC",
  ethereum: "ETH",
  "pancakeswap-token": "CAKE",
  venus: "XVS",
};

console.log("⏳ Fetching live prices from CoinGecko...\n");

try {
  const ids = tokens.join(",");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=1h,24h,7d`;

  interface CoinData {
    id: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    high_24h: number;
    low_24h: number;
    market_cap_rank: number;
  }

  const data = await fetchJSON<CoinData[]>(url);

  // ── Price Table ───────────────────────────────────────────────

  console.log("  Token  Price          24h Change   Volume       Rank");
  console.log("  ────── ───────────── ────────── ──────────── ────");

  for (const coin of data) {
    const sym = (symbols[coin.id] ?? coin.symbol.toUpperCase()).padEnd(6);
    const price = formatUSD(coin.current_price).padEnd(14);
    const change = formatChange(coin.price_change_percentage_24h).padEnd(18); // includes ANSI
    const vol = formatVolume(coin.total_volume).padEnd(12);
    const rank = `#${coin.market_cap_rank}`;
    console.log(`  ${sym} ${price} ${change} ${vol} ${rank}`);
  }

  // ── BNB Deep Dive ─────────────────────────────────────────────

  const bnb = data.find((c) => c.id === "binancecoin");
  if (bnb) {
    console.log("\n\n🔶 BNB Deep Dive");
    console.log("─".repeat(40));
    console.log(`  Price:       ${formatUSD(bnb.current_price)}`);
    console.log(`  24h High:    ${formatUSD(bnb.high_24h)}`);
    console.log(`  24h Low:     ${formatUSD(bnb.low_24h)}`);
    console.log(`  24h Volume:  ${formatVolume(bnb.total_volume)}`);
    console.log(`  Market Cap:  ${formatVolume(bnb.market_cap)}`);
    console.log(`  1h Change:   ${formatChange(bnb.price_change_percentage_1h_in_currency ?? 0)}`);
    console.log(`  24h Change:  ${formatChange(bnb.price_change_percentage_24h)}`);
    console.log(`  7d Change:   ${formatChange(bnb.price_change_percentage_7d_in_currency ?? 0)}`);
  }

  // ── BSC Gas Price ─────────────────────────────────────────────

  console.log("\n\n⛽ BSC Gas Price");
  console.log("─".repeat(40));

  try {
    interface GasResponse {
      result: string;
    }
    const gasRes = await fetchJSON<GasResponse>(
      "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice"
    );
    const gasWei = parseInt(gasRes.result, 16);
    const gasGwei = gasWei / 1e9;
    console.log(`  Current:     ${gasGwei.toFixed(2)} Gwei`);
    console.log(`  Transfer:    ~${((gasGwei * 21000) / 1e9).toFixed(6)} BNB`);
    if (bnb) {
      const transferCost = ((gasGwei * 21000) / 1e9) * bnb.current_price;
      console.log(`               ~${formatUSD(transferCost)}`);
    }
  } catch {
    console.log("  (BSCScan API rate limited — try again in a moment)");
  }

  console.log("\n✅ Live data fetched successfully!\n");
} catch (error) {
  console.error("❌ Failed to fetch market data:", (error as Error).message);
  console.log("\nThis may be due to API rate limiting. Try again in a few seconds.\n");
  process.exit(1);
}
