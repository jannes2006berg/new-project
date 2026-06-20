'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getCoinChart, getCoinMarket } from '@/lib/api/coingecko';
import { compactCurrency, currency } from '@/lib/portfolio';
import type { CoinChartPoint, CoinMarket } from '@/types/crypto';
import { Skeleton } from '@/components/skeleton';

export default function AssetDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [market, setMarket] = useState<CoinMarket | null>(null);
  const [chart, setChart] = useState<CoinChartPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { let mounted = true; Promise.all([getCoinMarket(id), getCoinChart(id)]).then(([m,c]) => { if (mounted) { setMarket(m); setChart(c); } }).catch((err) => setError(err instanceof Error ? err.message : 'Failed to load asset')); return () => { mounted = false; }; }, [id]);
  if (!market && !error) return <Skeleton className="h-[520px]"/>;
  if (error) return <div className="glass rounded-3xl p-8 text-rose-200">{error}</div>;
  if (!market) return null;
  return <main className="space-y-6"><section className="glass rounded-3xl p-8"><p className="text-cyan-300">Asset analytics</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-5xl font-bold">{market.name}</h1><p className="mt-2 text-slate-400 uppercase">{market.symbol} • Rank #{market.market_cap_rank}</p></div><div className="text-right"><p className="text-4xl font-semibold">{currency.format(market.current_price)}</p><p className={market.price_change_percentage_24h >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{market.price_change_percentage_24h.toFixed(2)}% today</p></div></div></section><section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"><div className="glass rounded-3xl p-6"><h2 className="mb-6 text-2xl font-semibold">30-day price action</h2><div className="h-96"><ResponsiveContainer><AreaChart data={chart}><defs><linearGradient id="asset" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a78bfa" stopOpacity={0.55}/><stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false}/><YAxis hide domain={['dataMin', 'dataMax']}/><Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(167,139,250,.25)', borderRadius: 16 }}/><Area type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} fill="url(#asset)" /></AreaChart></ResponsiveContainer></div></div><div className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">Market stats</h2><dl className="mt-6 space-y-4 text-sm"><Stat label="Market cap" value={compactCurrency.format(market.market_cap)}/><Stat label="24h volume" value={compactCurrency.format(market.total_volume)}/><Stat label="24h high" value={currency.format(market.high_24h)}/><Stat label="24h low" value={currency.format(market.low_24h)}/></dl></div></section></main>;
}
function Stat({ label, value }: { label: string; value: string }) { return <div className="flex justify-between rounded-2xl bg-white/[.04] p-4"><dt className="text-slate-400">{label}</dt><dd className="font-semibold">{value}</dd></div>; }
