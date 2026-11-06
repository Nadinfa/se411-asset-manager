import { useNavigate } from 'react-router-dom';
import AssetForm from '../components/AssetForm.jsx';
import { useAssets } from '../context/AssetContext.jsx';
export default function AddAssetPage() {
  const navigate = useNavigate();
  const { addAsset } = useAssets();
  async function handleSave(asset) {
    await addAsset(asset);
    navigate('/assets', { state: { notice: 'Asset added successfully.' } });
  }
  return <main className="page narrow"><AssetForm onSave={handleSave} onCancel={() => navigate('/assets')} /></main>;
}
