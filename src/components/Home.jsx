import { Link } from 'react-router-dom';
import { useAssets } from '../context/AssetContext.jsx';

export default function Home() {
  const { assets } = useAssets();
  const available = assets.filter((a) => a.status === 'Available').length;
  const inUse = assets.filter((a) => a.status === 'In Use').length;
  const maintenance = assets.filter((a) => a.status === 'Maintenance').length;

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">SE411 • PART 1</p>
          <h1>Computer Asset Management made simple.</h1>
          <p className="hero-copy">
            Track company computers, update their status, assign devices, and keep asset records organized in one place.
          </p>
          <div className="hero-actions">
            <Link className="btn primary link-btn" to="/assets">View Assets</Link>
            <Link className="btn secondary link-btn" to="/assets/add">Add New Asset</Link>
          </div>
        </div>
        <div className="hero-panel">
          <span className="panel-label">Asset overview</span>
          <strong>{assets.length}</strong>
          <span>Total computers</span>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card"><span>Total Assets</span><strong>{assets.length}</strong></article>
        <article className="stat-card"><span>Available</span><strong>{available}</strong></article>
        <article className="stat-card"><span>In Use</span><strong>{inUse}</strong></article>
        <article className="stat-card"><span>Maintenance</span><strong>{maintenance}</strong></article>
      </section>

      <section className="info-card">
        <div>
          <p className="eyebrow">What you can do</p>
          <h2>Manage the complete asset lifecycle</h2>
        </div>
        <div className="feature-grid">
          <div><b>01</b><h3>Add</h3><p>Register new computer assets.</p></div>
          <div><b>02</b><h3>View</h3><p>See all assets in one organized table.</p></div>
          <div><b>03</b><h3>Update</h3><p>Edit details and assignment status.</p></div>
          <div><b>04</b><h3>Delete</h3><p>Remove assets that are no longer needed.</p></div>
        </div>
      </section>
    </main>
  );
}
