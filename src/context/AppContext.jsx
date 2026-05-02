import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, getUserData, saveUserData } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [country, setCountry] = useState('Global');
  const [knowledgeLevel, setKnowledgeLevel] = useState('Beginner');
  const [language, setLanguage] = useState('en');
  const [currentStage, setCurrentStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    accessibility: false,
    notifications: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [simpleMode, setSimpleMode] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');

  // 1. Auth & Firebase Initialization
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      if (auth) {
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setUser(user);
            try {
              const data = await getUserData(user.uid);
              if (data) {
                if (data.country) setCountry(data.country);
                if (data.knowledgeLevel) setKnowledgeLevel(data.knowledgeLevel);
                if (data.language) setLanguage(data.language);
                if (data.currentStage !== undefined) setCurrentStage(data.currentStage);
                if (data.preferences) setPreferences(data.preferences);
              }
            } catch (err) {
              console.error("Error fetching user data:", err);
            }
          } else {
            setUser(null);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
    return () => unsubscribe();
  }, []);

  // 2. Load Local Preferences
  useEffect(() => {
    const savedCountry = localStorage.getItem('vw_country');
    const savedLevel = localStorage.getItem('vw_level');
    const savedLang = localStorage.getItem('vw_lang');
    const savedApiKey = localStorage.getItem('vw_gemini_api_key');
    const savedMapsKey = localStorage.getItem('vw_maps_api_key');
    const savedDarkMode = localStorage.getItem('vw_dark_mode') === 'true';
    const savedSimpleMode = localStorage.getItem('vw_simple_mode') === 'true';
    
    if (savedCountry) setCountry(savedCountry);
    if (savedLevel) setKnowledgeLevel(savedLevel);
    if (savedLang) setLanguage(savedLang);
    if (savedApiKey) setGeminiApiKey(savedApiKey);
    if (savedMapsKey) setGoogleMapsApiKey(savedMapsKey);
    if (savedDarkMode) setDarkMode(true);
    if (savedSimpleMode) setSimpleMode(true);
  }, []);

  // 3. State Update Helpers
  const updateCountry = (newCountry) => {
    setCountry(newCountry);
    localStorage.setItem('vw_country', newCountry);
    if (user) saveUserData(user.uid, { country: newCountry });
  };

  const updateKnowledgeLevel = (level) => {
    setKnowledgeLevel(level);
    localStorage.setItem('vw_level', level);
    if (user) saveUserData(user.uid, { knowledgeLevel: level });
  };

  const updateLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('vw_lang', lang);
    if (user) saveUserData(user.uid, { language: lang });
  };

  const updateCurrentStage = (stage) => {
    setCurrentStage(stage);
    if (user) saveUserData(user.uid, { currentStage: stage });
  };

  const updateDarkMode = (enabled) => {
    setDarkMode(enabled);
    localStorage.setItem('vw_dark_mode', enabled);
    if (enabled) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const updateSimpleMode = (enabled) => {
    setSimpleMode(enabled);
    localStorage.setItem('vw_simple_mode', enabled);
    if (enabled) document.documentElement.classList.add('simple-mode');
    else document.documentElement.classList.remove('simple-mode');
  };

  const updateGeminiApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('vw_gemini_api_key', key);
  };

  const updateGoogleMapsApiKey = (key) => {
    setGoogleMapsApiKey(key);
    localStorage.setItem('vw_maps_api_key', key);
  };

  // Initial Class Application
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (simpleMode) document.documentElement.classList.add('simple-mode');
    else document.documentElement.classList.remove('simple-mode');
  }, [simpleMode]);

  const value = {
    user,
    setUser,
    country,
    setCountry: updateCountry,
    knowledgeLevel,
    setKnowledgeLevel: updateKnowledgeLevel,
    language,
    setLanguage: updateLanguage,
    currentStage,
    setCurrentStage: updateCurrentStage,
    loading,
    setLoading,
    preferences,
    setPreferences,
    darkMode,
    updateDarkMode,
    geminiApiKey,
    setGeminiApiKey: updateGeminiApiKey,
    googleMapsApiKey,
    setGoogleMapsApiKey: updateGoogleMapsApiKey,
    simpleMode,
    setSimpleMode: updateSimpleMode,
    saveUserData: (data) => user ? saveUserData(user.uid, data) : Promise.resolve(),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
