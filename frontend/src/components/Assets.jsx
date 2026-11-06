import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAssets } from '../context/AssetContext.jsx';
export default function Assets() {
  const { assets, page, totalPages, totalElements, loading, error, refresh, deleteAsset, getAsset } = useAssets();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [idQuery, setIdQuery] = useState('');
  const [found, setFound] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [actionError, setActionError] = useState('');
  const filtered = useMemo(() => assets.filter(a => {
    const haystack = `${a.id} ${a.name} ${a.brand} ${a.model} ${a.assignedTo}`.toLowerCase();
    return haystack.includes(search.toLowerCase()) && (status === 'All' || a.status === status);
  }), [assets, search, status]);
  async function findById(event) {
    event.preventDefault(); setLookupError(''); setFound(null);
    if (!/^\d+$/.test(idQuery.trim())) { setLookupError('Enter a numeric asset ID.'); return; }
    try { setFound(await getAsset(idQuery.trim())); }
    catch { setLookupError('Asset not found or server unavailable.'); }
  }
  async function confirmDelete(a) {
    if (!window.confirm(`Delete asset ${a.id} - ${a.name}?`)) return;
    try { setActionError(''); await deleteAsset(a.id); if (found?.id === a.id) setFound(null); }
    catch (err) { setActionError(`Cannot delete asset: ${err.message}`); }
  }
  const tableRows = found ? [found] : filtered;
  return <main className="page">
    <section className="page-header"><div><p className="eyebrow">Inventory</p><h1>Computer Assets</h1>
      <p>View, search by ID, edit and remove company computer assets.</p></div>
      <Link className="btn primary link-btn" to="/assets/add">+ Add Asset</Link></section>
    {error && <div role="alert" className="error-message">{error} Run the Spring backend on port 8080.</div>}
    {actionError && <div role="alert" className="error-message">{actionError}</div>}
    <form className="id-search" onSubmit={findById}>
      <label htmlFor="lookup-id">Search by exact asset ID</label>
      <input id="lookup-id" aria-label="Asset ID lookup" placeholder="e.g. 1" value={idQuery} onChange={e => setIdQuery(e.target.value)} />
      <button className="btn primary" type="submit">Find ID</button>
      {found && <button type="button" className="btn secondary" onClick={() => { setFound(null); setIdQuery(''); }}>Show page</button>}
    </form>
    {lookupError && <div role="alert" className="error-message">{lookupError}</div>}
    <section className="toolbar">
      <input aria-label="Search assets" placeholder="Filter the current page by name, brand, model..." value={search} onChange={e=>setSearch(e.target.value)} />
      <select aria-label="Filter by status" value={status} onChange={e=>setStatus(e.target.value)}>
        <option>All</option><option>Available</option><option>In Use</option><option>Maintenance</option><option>Retired</option>
      </select>
    </section>
    <section className="table-card"><div className="table-wrap"><table>
      <thead><tr><th>Asset ID</th><th>Computer</th><th>Brand / Model</th><th>Status</th><th>Assigned To</th><th>Purchase Date</th><th>Actions</th></tr></thead>
      <tbody>{tableRows.map(a => <tr key={a.id}><td><strong>{a.id}</strong></td><td>{a.name}</td><td>{a.brand} · {a.model}</td>
        <td><span className={`status ${a.status.toLowerCase().replaceAll(' ','-')}`}>{a.status}</span></td>
        <td>{a.assignedTo || '—'}</td><td>{a.purchaseDate}</td>
        <td className="actions"><Link className="text-btn" to={`/assets/edit/${a.id}`}>Edit</Link>
        <button className="text-btn danger" onClick={() => confirmDelete(a)}>Delete</button></td></tr>)}
        {!loading && tableRows.length === 0 && <tr><td colSpan="7" className="empty">No assets match this page/search.</td></tr>}
        {loading && <tr><td colSpan="7" className="empty">Loading assets...</td></tr>}
      </tbody></table></div></section>
    {!found && <div className="pagination">
      <span>Page {totalPages ? page + 1 : 0} of {totalPages} · {totalElements} total assets</span>
      <div><button className="btn secondary" disabled={loading || page === 0} onClick={() => refresh(page-1)}>Previous</button>
      <button className="btn secondary" disabled={loading || page + 1 >= totalPages} onClick={() => refresh(page+1)}>Next</button></div>
    </div>}
  </main>;
}
