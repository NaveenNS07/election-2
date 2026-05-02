import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';

// PERFORMANCE: Visible Lazy Loading for all routes to optimize bundle size
const Home = React.lazy(() => import('./pages/Home'));
const GuidedJourney = React.lazy(() => import('./pages/GuidedJourney'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Timeline = React.lazy(() => import('./pages/Timeline'));
const MythBuster = React.lazy(() => import('./pages/MythBuster'));
const QAPage = React.lazy(() => import('./pages/QAPage'));
const PollingBooth = React.lazy(() => import('./pages/PollingBooth'));
const Scenarios = React.lazy(() => import('./pages/Scenarios'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-6" role="status" aria-live="polite">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden="true"></div>
      <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-2xl animate-pulse" aria-hidden="true">
        auto_awesome
      </span>
    </div>
    <p className="text-text-secondary font-black text-xs uppercase tracking-[0.3em] animate-pulse">
      Loading Module...
    </p>
  </div>
);

const MainContent = () => {
  const { loading } = useAppContext();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background text-primary gap-6" role="status" aria-live="assertive">
        <div className="relative">
           <span className="material-symbols-outlined text-7xl animate-bounce" aria-hidden="true">how_to_vote</span>
           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-primary/10 rounded-full blur-sm" aria-hidden="true"></div>
        </div>
        <div className="text-center">
          <p className="font-black text-xl tracking-tighter text-text-primary">VoteWise AI</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-text-secondary mt-2">Initializing Enterprise Core</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppLayout>
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journey" element={<GuidedJourney />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/myths" element={<MythBuster />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/polling" element={<PollingBooth />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </React.Suspense>
      </AppLayout>
    </Router>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
