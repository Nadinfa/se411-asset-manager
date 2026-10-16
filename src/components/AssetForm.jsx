import { useEffect, useState } from 'react';
import { validateAsset } from '../utils/assetUtils.js';

const blankAsset = {
  id: '',
  name: '',
  brand: '',
  model: '',
  status: 'Available',
  assignedTo: '',
  purchaseDate: ''
};

export default function AssetForm({ assets, initialAsset, onSave, onCancel }) {
  const [form, setForm] = useState(initialAsset || blankAsset);
  const [error, setError] = useState('');
  const editing = Boolean(initialAsset);

  useEffect(() => {
    setForm(initialAsset || blankAsset);
    setError('');
  }, [initialAsset]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = { ...form, id: form.id.trim().toUpperCase() };
    const message = validateAsset(normalized, assets, initialAsset?.id || null);
    if (message) {
      setError(message);
      return;
    }
    onSave(normalized);
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{editing ? 'Update record' : 'New record'}</p>
          <h2>{editing ? 'Edit Asset' : 'Add Asset'}</h2>
        </div>
        <p>{editing ? 'Update the information below.' : 'Enter the details of the new computer asset.'}</p>
      </div>

      {error && <div className="error-message" role="alert">{error}</div>}

      <div className="form-grid">
        <label>Asset ID *
          <input aria-label="Asset ID" name="id" value={form.id} onChange={handleChange} disabled={editing} placeholder="C004" />
        </label>
        <label>Computer Name *
          <input aria-label="Computer Name" name="name" value={form.name} onChange={handleChange} placeholder="MacBook Air 13" />
        </label>
        <label>Brand *
          <input aria-label="Brand" name="brand" value={form.brand} onChange={handleChange} placeholder="Apple" />
        </label>
        <label>Model *
          <input aria-label="Model" name="model" value={form.model} onChange={handleChange} placeholder="M3" />
        </label>
        <label>Status *
          <select aria-label="Status" name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>In Use</option>
            <option>Maintenance</option>
            <option>Retired</option>
          </select>
        </label>
        <label>Assigned To
          <input aria-label="Assigned To" name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Employee or department" />
        </label>
        <label>Purchase Date *
          <input aria-label="Purchase Date" type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} />
        </label>
      </div>

      <div className="form-actions">
        {onCancel && <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="btn primary">{editing ? 'Save Changes' : 'Add Asset'}</button>
      </div>
    </form>
  );
}
