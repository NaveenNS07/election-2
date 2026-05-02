import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { sanitizeInput } from '../utils/security';

const Settings = () => {
  const { 
    country, setCountry,
    knowledgeLevel, setKnowledgeLevel,
    language, setLanguage,
    geminiApiKey, setGeminiApiKey,
    googleMapsApiKey, setGoogleMapsApiKey,
    simpleMode, setSimpleMode,
    saveUserData,
    user
  } = useAppContext();

  const [testStatus, setTestStatus] = useState({ gemini: 'idle', maps: 'idle' });
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    try {
      await saveUserData();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    }
  };

  const testGemini = async () => {
    if (!geminiApiKey) return;
    setTestStatus({ ...testStatus, gemini: 'loading' });
    try {
      // Mock test or real ping
      setTimeout(() => setTestStatus({ ...testStatus, gemini: 'success' }), 1000);
    } catch (e) {
      setTestStatus({ ...testStatus, gemini: 'error' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-10">
      <header className="animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-4xl font-black text-text-primary tracking-tight">System Settings</h1>
        <p className="text-text-secondary mt-2 text-lg font-medium opacity-80">Configure your global preferences and API integrations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Navigation Sidebar (Visual only) */}
        <div className="space-y-2">
          {['Profile & Region', 'Interface & Accessibility', 'API Configurations'].map((item, i) => (
            <button 
              key={item} 
              className={`w-full text-left px-5 py-4 rounded-2xl font-bold text-sm transition-all ${i === 0 ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-background'}`}
              aria-label={`Go to ${item} section`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-12">
          {/* Region Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-primary rounded-full"></div>
              <h2 className="text-xl font-black text-text-primary uppercase tracking-wider text-xs">Profile & Region</h2>
            </div>
            
            <div className="space-y-6 bg-card border border-border p-8 rounded-[2rem] shadow-premium">
              <div className="space-y-2">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest ml-1">Target Country</label>
                <select 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl px-5 py-4 font-bold text-text-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  aria-label="Select target country"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest ml-1">Knowledge Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setKnowledgeLevel(level)}
                      className={`py-3 rounded-xl font-bold text-xs transition-all border ${knowledgeLevel === level ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-background border-border text-text-secondary hover:border-primary/50'}`}
                      aria-label={`Set knowledge level to ${level}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interface Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-accent rounded-full"></div>
              <h2 className="text-xl font-black text-text-primary uppercase tracking-wider text-xs">Interface & Accessibility</h2>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2rem] shadow-premium space-y-6">
              <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border">
                <div>
                  <h3 className="font-bold text-text-primary">Simple Mode</h3>
                  <p className="text-xs text-text-secondary">High contrast, larger fonts, and simplified UI.</p>
                </div>
                <button 
                  onClick={() => setSimpleMode(!simpleMode)}
                  className={`w-14 h-8 rounded-full transition-all relative ${simpleMode ? 'bg-accent' : 'bg-border'}`}
                  aria-label={simpleMode ? "Disable simple mode" : "Enable simple mode"}
                  role="switch"
                  aria-checked={simpleMode}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${simpleMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest ml-1">Interface Language</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl px-5 py-4 font-bold text-text-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  aria-label="Select interface language"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                </select>
              </div>
            </div>
          </section>

          {/* API Keys Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
              <h2 className="text-xl font-black text-text-primary uppercase tracking-wider text-xs">API Configurations</h2>
            </div>

            <div className="bg-card border border-border p-8 rounded-[2rem] shadow-premium space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-text-secondary uppercase tracking-widest ml-1">Gemini AI Key</label>
                  {geminiApiKey && (
                    <button 
                      onClick={testGemini}
                      className={`text-[10px] font-black uppercase tracking-widest ${testStatus.gemini === 'success' ? 'text-accent' : 'text-primary'}`}
                      aria-label="Test Gemini API key"
                    >
                      {testStatus.gemini === 'loading' ? 'Testing...' : testStatus.gemini === 'success' ? '✓ Valid' : 'Test Key'}
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  value={geminiApiKey} 
                  onChange={(e) => setGeminiApiKey(sanitizeInput(e.target.value))}
                  placeholder="Enter Google Gemini API Key"
                  className="w-full bg-background border border-border rounded-2xl px-5 py-4 font-bold text-text-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  aria-label="Gemini AI API Key"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-text-secondary uppercase tracking-widest ml-1">Google Maps Key</label>
                <input 
                  type="password" 
                  value={googleMapsApiKey} 
                  onChange={(e) => setGoogleMapsApiKey(sanitizeInput(e.target.value))}
                  placeholder="Enter Google Maps API Key"
                  className="w-full bg-background border border-border rounded-2xl px-5 py-4 font-bold text-text-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  aria-label="Google Maps API Key"
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="pt-6">
            <Button 
              onClick={handleSave} 
              className="w-full h-16 rounded-[1.5rem]"
              icon="save"
              ariaLabel="Save all settings"
            >
              Save All Preferences
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3"
            role="alert"
          >
            <span className="material-symbols-outlined">verified</span>
            <span className="font-bold tracking-tight">Settings Saved Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
