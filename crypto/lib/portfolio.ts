import type { CoinChartPoint, CoinMarket, PortfolioAsset, PortfolioPosition } from '@/types/crypto';

export const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
export const compactCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 });
export const percent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 });

export function buildPositions(assets: PortfolioAsset[], markets: CoinMarket[]): PortfolioPosition[] {
  return assets.map((asset) => {
    const market = markets.find((coin) => coin.id === asset.coinId);
    const currentPrice = market?.current_price ?? asset.purchasePrice;
    const currentValue = currentPrice * asset.amount;
    const investedValue = asset.purchasePrice * asset.amount;
    const profitLoss = currentValue - investedValue;
    const dayChangePercent = market?.price_change_percentage_24h ?? 0;
    return { ...asset, market, currentPrice, currentValue, investedValue, profitLoss, profitLossPercent: investedValue ? profitLoss / investedValue : 0, dayChangeValue: currentValue * (dayChangePercent / 100), dayChangePercent };
  });
}

export function portfolioChart(positions: PortfolioPosition[]): CoinChartPoint[] {
  const length = Math.max(...positions.map((p) => p.market?.sparkline_in_7d?.price.length ?? 0), 0);
  if (!length) return Array.from({ length: 7 }, (_, index) => ({ date: `D-${6 - index}`, value: positions.reduce((sum, p) => sum + p.currentValue, 0) * (0.94 + index * 0.01) }));
  return Array.from({ length }, (_, index) => ({
    date: index % 6 === 0 ? `${index}h` : '',
    value: positions.reduce((sum, position) => sum + ((position.market?.sparkline_in_7d?.price[index] ?? position.currentPrice) * position.amount), 0),
  }));
}
