import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { listAssets, findAsset, createAsset, saveAsset, removeAsset } from '../api/assets.js';

const AssetContext = createContext(null);
export function AssetProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async (requestedPage = 0) => {
    setLoading(true);
    setError('');
    try {
      const data = await listAssets(requestedPage, 5);
      setAssets(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) { setError(`Cannot connect to Spring backend. ${err.message}`); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh(0); }, [refresh]);

  async function addAsset(asset) { await createAsset(asset); await refresh(0); }
  async function updateAsset(asset) { await saveAsset(asset); await refresh(page); }
  async function deleteAsset(id) { await removeAsset(id); await refresh(page); }
  async function getAsset(id) { return findAsset(id); }

  const value = useMemo(() => ({ assets, page, totalPages, totalElements, loading,
    error, refresh, addAsset, updateAsset, deleteAsset, getAsset }),
    [assets, page, totalPages, totalElements, loading, error, refresh]);
  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}
export function useAssets() {
  const context = useContext(AssetContext);
  if (!context) throw new Error('useAssets must be used inside AssetProvider.');
  return context;
}
