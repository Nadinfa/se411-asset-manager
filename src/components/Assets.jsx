import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAssets } from '../context/AssetContext.jsx';

export default function Assets() {
  const { assets, deleteAsset } = useAssets();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      const haystack = `${asset.id} ${asset.name} ${asset.brand} ${asset.model} ${asset.assignedTo}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus = status === 'All' || asset.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [assets, search, status]);

  function confirmDelete(asset) {
    if (window.confirm(`Delete ${asset.id} - ${asset.name}?`)) {
      deleteAsset(asset.id);
    }
  }

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Computer Assets</h1>
          <p>View, search, edit, and remove company computer assets.</p>
        </div>
        <Link className="btn primary link-btn" to="/assets/add">+ Add Asset</Link>
      </section>

      <section className="toolbar">
        <input
          aria-label="Search assets"
          placeholder="Search by ID, name, brand, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Available</option>
          <option>In Use</option>
          <option>Maintenance</option>
          <option>Retired</option>
        </select>
      </section>

      <section className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Asset ID</th><th>Computer</th><th>Brand / Model</th><th>Status</th><th>Assigned To</th><th>Purchase Date</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id}>
                  <td><strong>{asset.id}</strong></td>
                  <td>{asset.name}</td>
                  <td>{asset.brand} · {asset.model}</td>
                  <td><span className={`status ${asset.status.toLowerCase().replaceAll(' ', '-')}`}>{asset.status}</span></td>
                  <td>{asset.assignedTo || '—'}</td>
                  <td>{asset.purchaseDate}</td>
                  <td className="actions">
                    <Link className="text-btn" to={`/assets/edit/${asset.id}`}>Edit</Link>
                    <button className="text-btn danger" onClick={() => confirmDelete(asset)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="empty">No assets match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
