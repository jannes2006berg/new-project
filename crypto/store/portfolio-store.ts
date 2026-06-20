'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PortfolioAsset } from '@/types/crypto';

const seedAssets: PortfolioAsset[] = [
  { id: 'seed-btc', coinId: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', amount: 0.42, purchasePrice: 64200, createdAt: '2026-01-08T10:00:00.000Z' },
  { id: 'seed-eth', coinId: 'ethereum', symbol: 'ETH', name: 'Ethereum', amount: 6.8, purchasePrice: 3150, createdAt: '2026-02-12T10:00:00.000Z' },
  { id: 'seed-sol', coinId: 'solana', symbol: 'SOL', name: 'Solana', amount: 95, purchasePrice: 138, createdAt: '2026-03-18T10:00:00.000Z' },
];

interface PortfolioState {
  assets: PortfolioAsset[];
  addAsset: (asset: Omit<PortfolioAsset, 'id' | 'createdAt'>) => void;
  removeAsset: (id: string) => void;
  updateAsset: (id: string, patch: Partial<Pick<PortfolioAsset, 'amount' | 'purchasePrice'>>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      assets: seedAssets,
      addAsset: (asset) => set((state) => ({
        assets: [{ ...asset, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...state.assets],
      })),
      removeAsset: (id) => set((state) => ({ assets: state.assets.filter((asset) => asset.id !== id) })),
      updateAsset: (id, patch) => set((state) => ({
        assets: state.assets.map((asset) => (asset.id === id ? { ...asset, ...patch } : asset)),
      })),
    }),
    { name: 'neon-crypto-portfolio-v1' },
  ),
);
