'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { currency, percent } from '@/lib/portfolio';
import type { PortfolioPosition } from '@/types/crypto';

export function AssetTable({ positions, editable = false, onRemove }: { positions: PortfolioPosition[]; editable?: boolean; onRemove?: (id: string) => void }) {
  return <div className="glass overflow-hidden rounded-3xl"><div className="grid grid-cols-6 gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-widest text-slate-500"><span className="col-span-2">Asset</span><span>Holdings</span><span>Value</span><span>P/L</span><span></span></div>{positions.map((p) => <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={p.id} className="grid grid-cols-6 items-center gap-4 border-b border-white/5 px-6 py-4 last:border-0"><Link href={`/assets/${p.coinId}`} className="col-span-2"><b>{p.symbol}</b><p className="text-sm text-slate-400">{p.name}</p></Link><span>{p.amount} <small className="text-slate-500">@ {currency.format(p.purchasePrice)}</small></span><span>{currency.format(p.currentValue)}</span><span className={p.profitLoss >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{currency.format(p.profitLoss)} <small>({percent.format(p.profitLossPercent)})</small></span><span className="text-right">{editable && <button onClick={() => onRemove?.(p.id)} className="rounded-full bg-rose-400/10 px-3 py-1 text-sm text-rose-300 hover:bg-rose-400/20">Remove</button>}</span></motion.div>)}</div>;
}
