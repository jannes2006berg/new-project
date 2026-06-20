import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Coins } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = { title: 'NeonVault Crypto Portfolio', description: 'Realtime crypto portfolio tracker with CoinGecko market data.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="mx-auto max-w-7xl px-5 py-6"><nav className="mb-8 flex items-center justify-between glass rounded-3xl px-5 py-4"><Link href="/" className="flex items-center gap-3 text-xl font-bold"><span className="grid size-10 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300"><Coins /></span>NeonVault</Link><div className="flex gap-2 text-sm text-slate-300"><Link className="rounded-full px-4 py-2 hover:bg-white/10" href="/">Dashboard</Link><Link className="rounded-full px-4 py-2 hover:bg-white/10" href="/portfolio"><BarChart3 className="mr-2 inline size-4"/>Portfolio</Link></div></nav>{children}</div></body></html>;
}
