import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { sanitizeInput, checkRateLimit } from '../../utils/security';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const handleSend = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Rate limiting check
      if (!checkRateLimit('chat_query', 5, 60000)) {
        alert("Rate limit exceeded. Please wait a minute before asking again.");
        return;
      }
      
      const sanitized = sanitizeInput(query.trim());
      navigate(`/qa?q=${encodeURIComponent(sanitized)}`);
      setQuery('');
    }
  };

  return (
    <div className="flex w-full h-screen bg-background overflow-hidden selection:bg-primary/20">
      <a 
        href="#main-content" 
        className="absolute top-0 left-0 p-4 bg-primary text-white -translate-y-full focus:translate-y-0 z-[100] transition-transform font-bold"
      >
        Skip to Content
      </a>
      <Sidebar />
      <div className="flex-1 ml-72 flex flex-col h-full overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />

        <Header />
        <main id="main-content" className="flex-1 overflow-y-auto pt-10 px-10 pb-36">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        
        {/* Premium Persistent Chat Input Fixed at Bottom */}
        <div className="fixed bottom-0 right-0 left-72 bg-gradient-to-t from-background via-background/95 to-transparent px-10 pb-10 pt-6 z-40">
          <div className="max-w-5xl mx-auto relative group">
            <form 
              onSubmit={handleSend}
              className="bg-card/80 backdrop-blur-xl border border-border rounded-[2rem] shadow-premium group-focus-within:border-primary group-focus-within:ring-8 group-focus-within:ring-primary/5 transition-all flex items-center p-3"
            >
              <div className="w-12 h-12 flex items-center justify-center text-primary/40 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[28px] animate-float" aria-hidden="true">psychology</span>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-secondary px-4 font-bold text-lg"
                placeholder="Ask VoteWise AI anything..."
                type="text"
                aria-label="Secure search and AI assistant input"
              />
              <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest mr-2 border border-emerald-500/20">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Secure
              </div>
              <button 
                type="submit"
                disabled={!query.trim()}
                className="bg-primary text-white w-14 h-14 rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center group/btn active:scale-95 disabled:opacity-30"
                aria-label="Send query securely"
              >
                <span className="material-symbols-outlined text-[24px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" aria-hidden="true">send</span>
              </button>
            </form>
            <p className="text-[10px] text-text-secondary text-center mt-3 font-bold opacity-40 uppercase tracking-[0.25em]">
              Encrypted & Sanitized AI Processing • VoteWise Enterprise Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
