import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetForm from '../components/AssetForm.jsx';
import { useAssets } from '../context/AssetContext.jsx';
export default function EditAssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAsset, updateAsset } = useAssets();
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getAsset(id).then(data => { if (active) setAsset(data); })
      .catch(err => { if (active) setError(`Asset not found or backend unavailable: ${err.message}`); });
    return () => { active = false; };
  }, [id]);
  if (error) return <main className="page narrow"><section className="about-card"><h2>Cannot load asset</h2><p>{error}</p><Link to="/assets">Back to assets</Link></section></main>;
  if (!asset) return <main className="page narrow">Loading asset...</main>;
  async function handleSave(value) {
    await updateAsset(value);
    navigate('/assets', { state: { notice: 'Asset updated successfully.' } });
  }
  return <main className="page narrow"><AssetForm initialAsset={asset} onSave={handleSave} onCancel={() => navigate('/assets')} /></main>;
}
