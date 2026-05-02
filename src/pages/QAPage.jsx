import React from 'react';
import ChatBox from '../components/chat/ChatBox';
import { motion } from 'framer-motion';

const QAPage = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-700">
        <div>
          <h1 className="text-4xl font-black text-text-primary tracking-tight">AI Assistant</h1>
          <p className="text-text-secondary mt-1 text-lg font-medium opacity-80">Ask anything about election laws, procedures, or your rights.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-[10px] font-black uppercase tracking-widest border border-accent/20">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          Direct Law Access Active
        </div>
      </header>

      <div className="flex-1 min-h-0 bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-premium">
        <ChatBox mode="auto" placeholder="Ask your election question (e.g., 'What is the minimum age to vote in India?')" />
      </div>

      <footer className="flex items-center justify-center gap-6 py-2">
        <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-40">
          <span className="material-symbols-outlined text-sm">shield</span>
          Privacy Shield Active
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-40">
          <span className="material-symbols-outlined text-sm">verified</span>
          Factual Source Priority
        </div>
      </footer>
    </div>
  );
};

export default QAPage;
