import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetForm from '../components/AssetForm.jsx';
import { useAssets } from '../context/AssetContext.jsx';

export default function EditAssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, getAsset, updateAsset } = useAssets();
  const asset = getAsset(id);

  if (!asset) {
    return (
      <main className="page narrow">
        <section className="about-card">
          <p className="eyebrow">Not found</p>
          <h1 className="small-title">Asset not found</h1>
          <p>No asset exists with ID <strong>{id}</strong>.</p>
          <Link className="btn primary link-btn" to="/assets">Back to Assets</Link>
        </section>
      </main>
    );
  }

  function handleSave(updatedAsset) {
    updateAsset(updatedAsset);
    navigate('/assets', { state: { notice: 'Asset updated successfully.' } });
  }

  return (
    <main className="page narrow">
      <AssetForm
        assets={assets}
        initialAsset={asset}
        onSave={handleSave}
        onCancel={() => navigate('/assets')}
      />
    </main>
  );
}
