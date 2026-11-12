const BASE = '/api/assets';

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Server returned ${response.status}.`);
  if (response.status === 204 || response.status === 201) return null;
  return response.json();
}

export function listAssets(page = 0, size = 5) {
  return request(`${BASE}?page=${page}&size=${size}`);
}
export function findAsset(id) { return request(`${BASE}/${id}`); }
export function createAsset(asset) {
  return request(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(asset) });
}
export function saveAsset(asset) {
  const { id, ...assetWithoutId } = asset;

  return request(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assetWithoutId)
  });
}
export function removeAsset(id) { return request(`${BASE}/${id}`, { method: 'DELETE' }); }
