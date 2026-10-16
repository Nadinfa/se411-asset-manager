import { createContext, useContext, useMemo, useState } from 'react';
import { initialAssets } from '../data/assets.js';
import { addAsset as addAssetToList, deleteAsset as deleteAssetFromList, updateAsset as updateAssetInList } from '../utils/assetUtils.js';

const AssetContext = createContext(null);

export function AssetProvider({ children, startingAssets = initialAssets }) {
  const [assets, setAssets] = useState(startingAssets);

  function addAsset(asset) {
    setAssets((current) => addAssetToList(current, asset));
  }

  function updateAsset(asset) {
    setAssets((current) => updateAssetInList(current, asset));
  }

  function deleteAsset(id) {
    setAssets((current) => deleteAssetFromList(current, id));
  }

  function getAsset(id) {
    return assets.find((asset) => asset.id === id);
  }

  const value = useMemo(
    () => ({ assets, addAsset, updateAsset, deleteAsset, getAsset }),
    [assets]
  );

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used inside an AssetProvider.');
  }
  return context;
}
