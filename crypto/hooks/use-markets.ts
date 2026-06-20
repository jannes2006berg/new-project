'use client';

import { useEffect, useMemo, useState } from 'react';
import { getMarkets } from '@/lib/api/coingecko';
import { buildPositions } from '@/lib/portfolio';
import { usePortfolioStore } from '@/store/portfolio-store';
import type { CoinMarket } from '@/types/crypto';

export function useMarkets(refreshMs = 45000) {
  const assets = usePortfolioStore((state) => state.assets);
  const [markets, setMarkets] = useState<CoinMarket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ids = useMemo(() => [...new Set(assets.map((asset) => asset.coinId))], [assets]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setError(null);
        const data = await getMarkets(ids);
        if (!cancelled) setMarkets(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load market data');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    const interval = setInterval(load, refreshMs);
    return () => { cancelled = true; clearInterval(interval); };
  }, [ids, refreshMs]);

  const positions = useMemo(() => buildPositions(assets, markets), [assets, markets]);
  return { assets, markets, positions, isLoading, error };
}
