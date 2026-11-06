import { beforeEach, afterEach, expect, test, vi } from 'vitest';
import { createAsset, findAsset, listAssets, saveAsset } from '../assets.js';
const response = (body, status=200) => ({ ok: status < 400, status, json: async () => body });
beforeEach(() => { global.fetch = vi.fn(); });
afterEach(() => { vi.restoreAllMocks(); });
test('lists a page from Spring backend', async () => {
  fetch.mockResolvedValue(response({ content: [], totalPages: 0 }));
  await listAssets(1, 5);
  expect(fetch).toHaveBeenCalledWith('/api/assets?page=1&size=5', undefined);
});
test('searches by ID', async () => {
  fetch.mockResolvedValue(response({ id: 7 }));
  expect((await findAsset(7)).id).toBe(7);
});
test('posts new asset as JSON', async () => {
  fetch.mockResolvedValue(response(null, 201));
  await createAsset({ name: 'Laptop' });
  expect(fetch.mock.calls[0][1].method).toBe('POST');
});
test('updates by PUT', async () => {
  fetch.mockResolvedValue(response(null, 204));
  await saveAsset({ id: 8, name: 'Laptop' });
  expect(fetch.mock.calls[0][0]).toBe('/api/assets/8');
});
