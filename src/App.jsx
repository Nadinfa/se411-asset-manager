import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import AssetsPage from './pages/AssetsPage.jsx';
import AddAssetPage from './pages/AddAssetPage.jsx';
import EditAssetPage from './pages/EditAssetPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function RouteNotice() {
  const location = useLocation();
  const notice = location.state?.notice;
  return notice ? <div className="toast" role="status">{notice}</div> : null;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <RouteNotice />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/assets/add" element={<AddAssetPage />} />
        <Route path="/assets/edit/:id" element={<EditAssetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer>SE411 • Computer Asset Management • Fall 2026–27</footer>
    </div>
  );
}
