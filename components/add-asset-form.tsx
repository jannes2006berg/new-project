'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SUPPORTED_COINS } from '@/lib/api/coingecko';
import { usePortfolioStore } from '@/store/portfolio-store';

export function AddAssetForm() {
  const addAsset = usePortfolioStore((state) => state.addAsset);
  const [coinId, setCoinId] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const selected = SUPPORTED_COINS.find((coin) => coin.id === coinId) ?? SUPPORTED_COINS[0];
  return <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={(event) => { event.preventDefault(); if (!Number(amount) || !Number(purchasePrice)) return; addAsset({ coinId: selected.id, symbol: selected.symbol, name: selected.name, amount: Number(amount), purchasePrice: Number(purchasePrice) }); setAmount(''); setPurchasePrice(''); }} className="glass rounded-3xl p-6"><h2 className="text-2xl font-semibold">Add position</h2><p className="mt-1 text-sm text-slate-400">Manual cost basis, live CoinGecko pricing.</p><div className="mt-6 grid gap-4 md:grid-cols-4"><select className="input" value={coinId} onChange={(e) => setCoinId(e.target.value)}>{SUPPORTED_COINS.map((coin) => <option key={coin.id} value={coin.id}>{coin.symbol} — {coin.name}</option>)}</select><input className="input" placeholder="Amount" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /><input className="input" placeholder="Purchase price USD" inputMode="decimal" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} /><button className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,.35)] transition hover:bg-cyan-200">Add asset</button></div></motion.form>;
}
