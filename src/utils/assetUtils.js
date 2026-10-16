export function addAsset(assets, asset) {
  return [...assets, asset];
}

export function updateAsset(assets, updatedAsset) {
  return assets.map((asset) =>
    asset.id === updatedAsset.id ? { ...asset, ...updatedAsset } : asset
  );
}

export function deleteAsset(assets, id) {
  return assets.filter((asset) => asset.id !== id);
}

export function validateAsset(asset, assets = [], originalId = null) {
  const required = ['id', 'name', 'brand', 'model', 'status', 'purchaseDate'];
  const missing = required.filter((field) => !String(asset[field] ?? '').trim());

  if (missing.length) {
    return `Please complete all required fields: ${missing.join(', ')}.`;
  }

  const normalizedOriginalId = originalId?.toLowerCase() ?? null;
  const duplicate = assets.some(
    (item) => item.id.toLowerCase() === asset.id.toLowerCase() && item.id.toLowerCase() !== normalizedOriginalId
  );

  if (duplicate) {
    return 'Asset ID must be unique.';
  }

  return '';
}
