import type { CoinChartPoint, CoinMarket } from '@/types/crypto';

const API_BASE = 'https://api.coingecko.com/api/v3';

export const SUPPORTED_COINS = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
];

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { next: { revalidate: 30 } });
  if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getMarkets(coinIds: string[]): Promise<CoinMarket[]> {
  const ids = [...new Set(coinIds)].join(',');
  if (!ids) return [];
  return request<CoinMarket[]>(`/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`);
}

export async function getCoinMarket(coinId: string): Promise<CoinMarket | null> {
  const markets = await getMarkets([coinId]);
  return markets[0] ?? null;
}

export async function getCoinChart(coinId: string, days = 30): Promise<CoinChartPoint[]> {
  const data = await request<{ prices: [number, number][] }>(`/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
  return data.prices.map(([timestamp, value]) => ({
    date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(timestamp),
    value,
  }));
}
