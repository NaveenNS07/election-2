import React, { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBox from '../components/chat/ChatBox';

// STATIC DATA: Moved outside to optimize performance
const SCENARIOS_DATA = [
  {
    id: 1,
    title: 'Lost Voter ID',
    question: 'I lost my voter registration card/ID just before election day. Can I still vote?',
    solution: 'In most jurisdictions, you can still vote by showing alternative government-issued photo IDs (like a passport or driver\'s license). Many polling places also offer "provisional ballots" which are counted once your eligibility is verified.',
    steps: ['Verify your polling location', 'Bring any government ID', 'Ask for a provisional ballot if needed'],
    icon: 'id_card'
  },
  {
    id: 2,
    title: 'Work Schedule Conflict',
    question: 'My shift starts before polls open and ends after they close. What are my rights?',
    solution: 'Many states/countries have laws requiring employers to give workers paid time off to vote. You should notify your supervisor at least 2 days in advance. Alternatively, check if "Early Voting" or "Mail-in Ballots" are available in your area.',
    steps: ['Check local voting leave laws', 'Notify employer in advance', 'Explore early voting options'],
    icon: 'work'
  },
  {
    id: 3,
    title: 'Moved Recently',
    question: 'I moved to a new address last month and didn\'t update my registration.',
    solution: 'Depending on your location, you may still be able to vote at your old polling place for a transition period, or use "Same-Day Registration" if available. Check if your current address is within the same voting district.',
    steps: ['Check same-day registration availability', 'Verify district boundaries', 'Contact local election office'],
    icon: 'home_pin'
  }
];

/**
 * PRODUCTION-GRADE PAGE: Scenario Help
 * Features:
 * - Interactive scenario explorer with ARIA support.
 * - AI Scenario Solver integration.
 * - Optimized via React.memo and static hoisting.
 */
const Scenarios = memo(() => {
  const [selected, setSelected] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="space-y-12 pb-20" role="main">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-text-primary tracking-tight">Scenario Help</h1>
          <p className="text-text-secondary mt-2 text-lg font-medium opacity-80">Expert solutions for real-world voting challenges.</p>
        </div>
        <button 
          onClick={() => setShowAIChat(!showAIChat)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
            showAIChat 
              ? 'bg-background border border-border text-text-primary' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
          aria-label={showAIChat ? "Back to scenario library" : "Ask VoteWise AI a custom scenario"}
          aria-pressed={showAIChat}
        >
          <span className="material-symbols-outlined" aria-hidden="true">{showAIChat ? 'close' : 'psychology'}</span>
          {showAIChat ? 'Back to Library' : 'Ask AI Custom Case'}
        </button>
      </header>

      <AnimatePresence mode="wait">
        {showAIChat ? (
          <motion.div
            key="ai-chat"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-[600px]"
            role="region"
            aria-label="AI Scenario Assistant"
          >
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm" aria-hidden="true">
                <span className="material-symbols-outlined text-3xl animate-pulse">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-primary font-black uppercase text-xs tracking-widest">AI Scenario Solver Active</h3>
                <p className="text-xs text-text-secondary">Describe your unique situation below and VoteWise AI will generate a custom action plan.</p>
              </div>
            </div>
            <ChatBox mode="scenario" placeholder="Describe your situation (e.g., 'I am a student living in a dorm...')" />
          </motion.div>
        ) : (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Common voting scenarios">
              {SCENARIOS_DATA.map((s) => (
                <article
                  key={s.id}
                  onClick={() => setSelected(s)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(s)}
                  tabIndex={0}
                  role="listitem"
                  className={`card p-8 cursor-pointer group relative overflow-hidden transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${selected?.id === s.id ? 'ring-2 ring-primary border-primary bg-primary/[0.02] shadow-premium' : ''}`}
                  aria-label={`${s.title}: ${s.question}`}
                  aria-selected={selected?.id === s.id}
                >
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ${selected?.id === s.id ? 'bg-primary text-white rotate-6 shadow-lg' : 'bg-background text-primary'}`} aria-hidden="true">
                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-6 font-medium opacity-80">
                    {s.question}
                  </p>
                  <div className="flex items-center text-[10px] font-black text-primary tracking-widest uppercase group-hover:translate-x-2 transition-transform" aria-hidden="true">
                    SOLVE CHALLENGE
                    <span className="material-symbols-outlined text-sm ml-2">arrow_right_alt</span>
                  </div>
                </article>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-500"
                  role="region"
                  aria-labelledby={`scenario-title-${selected.id}`}
                >
                  <div className="p-8 md:p-16">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 pb-12 border-b border-border">
                      <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center shadow-inner" aria-hidden="true">
                        <span className="material-symbols-outlined text-5xl">{selected.icon}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block" aria-hidden="true">Case Study 0{selected.id}</span>
                        <h2 id={`scenario-title-${selected.id}`} className="text-3xl font-black text-text-primary leading-tight tracking-tight">{selected.title}</h2>
                        <p className="text-text-secondary mt-3 text-lg font-medium italic opacity-80 leading-relaxed">"{selected.question}"</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                      <div className="lg:col-span-3 space-y-8">
                        <h3 className="text-2xl font-black text-text-primary flex items-center gap-3 tracking-tight">
                          <span className="w-2 h-8 bg-accent rounded-full" aria-hidden="true"></span>
                          The Official Solution
                        </h3>
                        <div className="p-8 bg-accent/5 border border-accent/20 rounded-3xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5" aria-hidden="true">
                            <span className="material-symbols-outlined text-8xl">verified</span>
                          </div>
                          <p className="text-text-primary leading-relaxed text-lg relative z-10 font-medium">
                            {selected.solution}
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-2 space-y-8">
                        <h3 className="text-2xl font-black text-text-primary flex items-center gap-3 tracking-tight">
                          <span className="w-2 h-8 bg-primary rounded-full" aria-hidden="true"></span>
                          Action Plan
                        </h3>
                        <div className="space-y-4" role="list">
                          {selected.steps.map((step, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              role="listitem"
                              className="flex items-center gap-5 p-5 bg-background rounded-2xl border border-border hover:border-primary transition-all group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-sm font-black text-text-secondary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm" aria-hidden="true">
                                0{i + 1}
                              </div>
                              <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-background/50 border-4 border-dashed border-border rounded-3xl p-24 text-center" aria-live="polite">
                  <div className="w-24 h-24 bg-card rounded-[2.5rem] flex items-center justify-center text-border/50 mx-auto mb-8 shadow-inner" aria-hidden="true">
                    <span className="material-symbols-outlined text-5xl">touch_app</span>
                  </div>
                  <h3 className="text-text-secondary text-xl font-black mb-2">Select a scenario above</h3>
                  <p className="text-text-secondary opacity-60 max-w-sm mx-auto font-medium">Click on any challenge to see the official solution and step-by-step action plan.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Scenarios;

export default Scenarios;
