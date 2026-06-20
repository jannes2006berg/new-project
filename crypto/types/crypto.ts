export type CoinSymbol = 'BTC' | 'ETH' | 'SOL' | 'ADA' | 'BNB' | 'XRP' | 'DOGE' | 'AVAX' | 'DOT' | 'LINK' | string;

export interface PortfolioAsset {
  id: string;
  coinId: string;
  symbol: CoinSymbol;
  name: string;
  amount: number;
  purchasePrice: number;
  createdAt: string;
}

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
}

export interface PortfolioPosition extends PortfolioAsset {
  market?: CoinMarket;
  currentPrice: number;
  currentValue: number;
  investedValue: number;
  profitLoss: number;
  profitLossPercent: number;
  dayChangeValue: number;
  dayChangePercent: number;
}

export interface CoinChartPoint {
  date: string;
  value: number;
}
