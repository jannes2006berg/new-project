import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function MetricCard({ label, value, change, positive = true }: { label: string; value: string; change?: string; positive?: boolean }) {
  return <div className="glass neon rounded-3xl p-6"><p className="text-sm text-slate-400">{label}</p><div className="mt-3 flex items-end justify-between"><h3 className="text-3xl font-semibold tracking-tight">{value}</h3>{change && <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${positive ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'}`}>{positive ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>} {change}</span>}</div></div>;
}
