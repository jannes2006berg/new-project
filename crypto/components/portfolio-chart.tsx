'use client';
import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { CoinChartPoint } from '@/types/crypto';

export function PortfolioChart({ data }: { data: CoinChartPoint[] }) {
  return <motion.div layout className="glass rounded-3xl p-6"><div className="mb-6"><p className="text-sm text-cyan-300">Portfolio growth</p><h2 className="text-2xl font-semibold">7-day equity curve</h2></div><div className="h-80"><ResponsiveContainer><AreaChart data={data}><defs><linearGradient id="neon" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.55}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false}/><YAxis hide domain={['dataMin', 'dataMax']}/><Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(34,211,238,.25)', borderRadius: 16 }}/><Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} fill="url(#neon)" /></AreaChart></ResponsiveContainer></div></motion.div>;
}
