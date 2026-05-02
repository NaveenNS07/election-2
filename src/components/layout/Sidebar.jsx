import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { geminiApiKey, user } = useAppContext();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'dashboard' },
    { name: 'Guided Journey', path: '/journey', icon: 'explore' },
    { name: 'Timeline', path: '/timeline', icon: 'timeline' },
    { name: 'Scenario Help', path: '/scenarios', icon: 'psychology' },
    { name: 'Myth Buster', path: '/myths', icon: 'verified_user' },
    { name: 'AI Assistant', path: '/qa', icon: 'chat_bubble' },
    { name: 'Booth Finder', path: '/polling', icon: 'location_on' },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-card border-r border-border flex flex-col z-50 shadow-2xl transition-all duration-500">
      
      {/* Brand Section */}
      <div className="p-8">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30"
            aria-hidden="true"
          >
            <span className="material-symbols-outlined text-3xl">how_to_vote</span>
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-text-primary tracking-tighter leading-none">VoteWise</h1>
            <div className="flex items-center gap-2 mt-1.5" aria-hidden="true">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
              <p className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em]">PRO EDITION</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-hide" aria-label="Main Navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                isActive 
                  ? 'bg-primary/10 text-primary shadow-sm border-l-4 border-primary' 
                  : 'text-text-secondary hover:bg-background hover:text-text-primary'
              }`
            }
            aria-label={`Go to ${item.name}`}
          >
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              {item.icon}
            </span>
            <span className="tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Status Section */}
      <div className="p-6 space-y-4 bg-background/30 mt-auto border-t border-border">
        {/* AI Status Card */}
        <div 
          className={`p-4 rounded-2xl border transition-all duration-500 flex items-center gap-3 ${geminiApiKey ? 'bg-primary/5 border-primary/20' : 'bg-red-50/50 border-red-100 dark:bg-red-900/5 dark:border-red-900/20'}`}
          aria-label={`AI Status: ${geminiApiKey ? 'Active' : 'Disconnected'}`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${geminiApiKey ? 'bg-primary text-white' : 'bg-red-500 text-white'}`} aria-hidden="true">
            <span className="material-symbols-outlined text-sm">{geminiApiKey ? 'bolt' : 'cloud_off'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-text-primary uppercase tracking-wider">AI ENGINE</p>
            <p className="text-[11px] text-text-secondary font-bold truncate">
              {geminiApiKey ? 'Gemini 1.5 Active' : 'Disconnected'}
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-card p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm" aria-label="User Profile">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-black" aria-hidden="true">
            {user?.email?.charAt(0).toUpperCase() || 'V'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-text-primary truncate">{user?.displayName || 'Voter Profile'}</p>
            <p className="text-[10px] text-text-secondary font-medium truncate">{user?.email || 'Guest User'}</p>
          </div>
          <NavLink to="/settings" className="text-text-secondary hover:text-primary transition-colors" aria-label="Settings">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">more_vert</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
