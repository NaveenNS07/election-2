import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { signInWithGoogle, logout } from '../../services/firebase';
import { useLocation } from 'react-router-dom';
import LanguageSelector from '../common/LanguageSelector';

const Header = () => {
  const { country, user, simpleMode, updateSimpleMode } = useAppContext();
  const location = useLocation();

  const getPageTitle = (path) => {
    const titles = {
      '/': 'Overview',
      '/journey': 'Guided Journey',
      '/timeline': 'Election Roadmap',
      '/scenarios': 'Scenario Help',
      '/myths': 'Myth Buster',
      '/qa': 'AI Assistant',
      '/polling': 'Booth Finder',
      '/settings': 'Settings'
    };
    return titles[path] || 'VoteWise AI';
  };

  const handleRestart = () => {
    if (window.confirm("This will clear all your preferences, progress, and API keys. Are you sure?")) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <header className="sticky top-0 h-24 bg-background/50 backdrop-blur-xl px-10 flex items-center justify-between z-40 transition-all">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Navigation</span>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {/* Language Selector */}
        <div className="hidden md:block">
          <LanguageSelector />
        </div>

        {/* Region Badge */}
        <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-2xl shadow-sm" aria-hidden="true">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-black text-text-primary uppercase tracking-widest">{country}</span>
          <span className="w-px h-4 bg-border"></span>
          <span className="text-[10px] font-bold text-text-secondary">ELECTION 2026</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Simple Mode Toggle */}
          <button 
            onClick={() => updateSimpleMode(!simpleMode)}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all group ${
              simpleMode ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-card'
            }`}
            title="Toggle Simple Mode"
            aria-label="Toggle Simple Mode"
            aria-pressed={simpleMode}
          >
            <span className="material-symbols-outlined" aria-hidden="true">{simpleMode ? 'visibility' : 'visibility_off'}</span>
          </button>

          <button 
            onClick={handleRestart}
            className="w-12 h-12 flex items-center justify-center text-text-secondary hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all group"
            title="Clear & Restart"
            aria-label="Clear and Restart"
          >
            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-700" aria-hidden="true">refresh</span>
          </button>

          <button 
            onClick={async () => user ? await logout() : await signInWithGoogle()}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              user 
                ? 'bg-card border border-border text-text-primary hover:bg-background' 
                : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark'
            }`}
            aria-label={user ? 'Sign Out' : 'Sign In with Google'}
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">{user ? 'logout' : 'login'}</span>
            <span className="hidden lg:inline">{user ? 'Sign Out' : 'Cloud Sync'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
