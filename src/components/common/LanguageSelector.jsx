import React from 'react';
import { useAppContext } from '../../context/AppContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useAppContext();

  return (
    <div className="flex items-center gap-2 group">
      <div className="relative">
        <span className="material-symbols-outlined text-text-secondary text-sm group-hover:text-primary transition-colors" aria-hidden="true">translate</span>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse border border-card"></div>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-bold text-text-primary focus:ring-2 focus:ring-primary outline-none cursor-pointer hover:border-primary transition-all"
        aria-label="Select Language (Google Translate Enabled)"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
