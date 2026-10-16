import { NavLink, Link } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/assets', 'Assets'],
  ['/assets/add', 'Add Asset'],
  ['/about', 'About']
];

export default function Navbar() {
  return (
    <header className="topbar">
      <Link className="brand" to="/" aria-label="AssetTrack home">
        <span className="brand-mark">AT</span>
        <span>AssetTrack</span>
      </Link>

      <nav className="nav" aria-label="Main navigation">
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
