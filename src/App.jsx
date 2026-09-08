import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SkipLink from './components/SkipLink.jsx';

const OrbitPage = lazy(() => import('./pages/OrbitPage.jsx'));
const ConstellationPage = lazy(() => import('./pages/ConstellationPage.jsx'));
const ResonancePage = lazy(() => import('./pages/ResonancePage.jsx'));
const TrailPage = lazy(() => import('./pages/TrailPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-signal" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-full">
      <SkipLink />
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<OrbitPage />} />
            <Route path="/constellation/:id" element={<ConstellationPage />} />
            <Route path="/resonance" element={<ResonancePage />} />
            <Route path="/trail" element={<TrailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
