'use client';
import { AddAssetForm } from '@/components/add-asset-form';
import { AssetTable } from '@/components/asset-table';
import { Skeleton } from '@/components/skeleton';
import { useMarkets } from '@/hooks/use-markets';
import { usePortfolioStore } from '@/store/portfolio-store';

export default function PortfolioPage() {
  const { positions, isLoading } = useMarkets();
  const removeAsset = usePortfolioStore((state) => state.removeAsset);
  return <main className="space-y-6"><div><p className="text-cyan-300">Portfolio management</p><h1 className="text-4xl font-bold tracking-tight">Positions, cost basis and live P/L</h1></div><AddAssetForm />{isLoading ? <Skeleton className="h-80" /> : <AssetTable positions={positions} editable onRemove={removeAsset}/>}</main>;
}
