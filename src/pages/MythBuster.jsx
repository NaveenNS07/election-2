import React from 'react';
import ChatBox from '../components/chat/ChatBox';
import { motion } from 'framer-motion';

const MythBuster = () => {
  const commonMyths = [
    "You can vote by text message.",
    "Non-citizens are allowed to vote in federal elections.",
    "The results are determined before the election ends.",
    "Voting machines are connected to the internet."
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl font-black text-text-primary flex items-center gap-4 tracking-tight">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">gavel</span>
          </div>
          Myth Buster
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl font-medium">
          Don't be misled by misinformation. Our AI fact-checker uses official data to debunk common election rumors instantly.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Common Election Myths">
        {commonMyths.map((myth, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-card border border-border rounded-3xl hover:border-primary transition-all cursor-pointer group shadow-soft hover:shadow-premium relative overflow-hidden"
            role="button"
            tabIndex={0}
            aria-label={`Check reality for: ${myth}`}
            onKeyDown={(e) => e.key === 'Enter' && console.log('Checking myth:', myth)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <span className="material-symbols-outlined text-6xl" aria-hidden="true">format_quote</span>
            </div>
            <p className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-relaxed relative z-10">
              "{myth}"
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-red-600 mt-6 tracking-widest uppercase group-hover:gap-4 transition-all">
              <span>CHECK REALITY</span>
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="relative group" aria-label="AI Myth Buster Assistant">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-primary rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-card border border-border rounded-[2rem] overflow-hidden min-h-[500px] shadow-2xl">
          <div className="bg-red-50 dark:bg-red-900/10 px-8 py-4 border-b border-red-100 dark:border-red-900/20 flex items-center gap-3">
            <span className="material-symbols-outlined text-red-600 animate-pulse" aria-hidden="true">fact_check</span>
            <span className="text-xs font-black text-red-600 uppercase tracking-widest">Live Misinformation Scanner</span>
          </div>
          <ChatBox mode="myth" placeholder="Enter a claim or news headline to fact-check..." />
        </div>
      </section>

      <footer className="bg-background border border-border rounded-2xl p-6 flex items-start gap-4 opacity-70">
        <span className="material-symbols-outlined text-primary" aria-hidden="true">info</span>
        <p className="text-xs text-text-secondary leading-relaxed">
          <strong>Disclaimer:</strong> While VoteWise AI is trained on official election data, always cross-reference critical information with your local government's official election commission website.
        </p>
      </footer>
    </div>
  );
};

export default MythBuster;
