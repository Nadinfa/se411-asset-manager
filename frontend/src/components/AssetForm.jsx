import { useEffect, useState } from 'react';
const blankAsset = { name: '', brand: '', model: '', status: 'Available', assignedTo: '', purchaseDate: '' };

export default function AssetForm({ initialAsset, onSave, onCancel }) {
  const [form, setForm] = useState(initialAsset || blankAsset);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const editing = Boolean(initialAsset);
  useEffect(() => { setForm(initialAsset || blankAsset); setError(''); }, [initialAsset]);

  async function handleSubmit(event) {
    event.preventDefault();
    const missing = ['name','brand','model','status','purchaseDate'].filter(key => !String(form[key] ?? '').trim());
    if (missing.length) { setError(`Please complete all required fields: ${missing.join(', ')}.`); return; }
    setSaving(true); setError('');
    try { await onSave(form); }
    catch (err) { setError(`Could not save asset: ${err.message}`); }
    finally { setSaving(false); }
  }
  const handleChange = e => setForm(current => ({ ...current, [e.target.name]: e.target.value }));
  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-heading"><div><p className="eyebrow">{editing ? 'Update record' : 'New record'}</p>
        <h2>{editing ? 'Edit Asset' : 'Add Asset'}</h2></div>
        <p>{editing ? 'Update the information below.' : 'The database assigns the asset ID automatically.'}</p>
      </div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="form-grid">
        {editing && <label>Asset ID<input value={form.id} disabled readOnly aria-label="Asset ID" /></label>}
        <label>Computer Name *<input aria-label="Computer Name" name="name" value={form.name} onChange={handleChange} placeholder="MacBook Air 13" /></label>
        <label>Brand *<input aria-label="Brand" name="brand" value={form.brand} onChange={handleChange} placeholder="Apple" /></label>
        <label>Model *<input aria-label="Model" name="model" value={form.model} onChange={handleChange} placeholder="M3" /></label>
        <label>Status *<select aria-label="Status" name="status" value={form.status} onChange={handleChange}>
          <option>Available</option><option>In Use</option><option>Maintenance</option><option>Retired</option>
        </select></label>
        <label>Assigned To<input aria-label="Assigned To" name="assignedTo" value={form.assignedTo || ''} onChange={handleChange} /></label>
        <label>Purchase Date *<input aria-label="Purchase Date" type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} /></label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Asset'}</button>
      </div>
    </form>
  );
}
