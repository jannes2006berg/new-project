'use client';
import { Activity, Wallet } from 'lucide-react';
import { AssetTable } from '@/components/asset-table';
import { MetricCard } from '@/components/metric-card';
import { PortfolioChart } from '@/components/portfolio-chart';
import { Skeleton } from '@/components/skeleton';
import { useMarkets } from '@/hooks/use-markets';
import { currency, percent, portfolioChart } from '@/lib/portfolio';

export default function Dashboard() {
  const { positions, isLoading, error } = useMarkets();
  const total = positions.reduce((sum, p) => sum + p.currentValue, 0);
  const day = positions.reduce((sum, p) => sum + p.dayChangeValue, 0);
  const invested = positions.reduce((sum, p) => sum + p.investedValue, 0);
  if (isLoading) return <div className="grid gap-6"><Skeleton className="h-36"/><Skeleton className="h-96"/></div>;
  return <main className="space-y-6"><section className="grid gap-4 md:grid-cols-3"><MetricCard label="Total Balance" value={currency.format(total)} change={percent.format(day / Math.max(total - day, 1))} positive={day >= 0}/><MetricCard label="Daily Change" value={currency.format(day)} change="24h live" positive={day >= 0}/><MetricCard label="Total P/L" value={currency.format(total - invested)} change={percent.format((total - invested) / Math.max(invested, 1))} positive={total >= invested}/></section>{error && <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-200"><Activity className="mr-2 inline"/> {error}. Showing cost-basis fallback where needed.</div>}<section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]"><PortfolioChart data={portfolioChart(positions)}/><div className="glass rounded-3xl p-6"><Wallet className="mb-4 text-cyan-300"/><h2 className="text-2xl font-semibold">Top assets</h2><div className="mt-6 space-y-4">{positions.sort((a,b)=>b.currentValue-a.currentValue).slice(0,4).map((p)=><div key={p.id} className="flex items-center justify-between rounded-2xl bg-white/[.04] p-4"><div><b>{p.symbol}</b><p className="text-sm text-slate-400">{p.amount} coins</p></div><span>{currency.format(p.currentValue)}</span></div>)}</div></div></section><AssetTable positions={positions}/></main>;
}
