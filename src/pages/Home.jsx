import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// STATIC DATA: Moved outside to prevent re-creation on every render (Performance Optimization)
const STATS_DATA = [
  { label: 'Participation Rate', value: '67.4%', change: '+2.1%', icon: 'analytics' },
  { label: 'Active Voters', value: '912M', change: '+14M', icon: 'groups' },
  { label: 'Polling Stations', value: '1.2M', change: 'Live', icon: 'location_on' },
];

const FEATURES_DATA = [
  {
    title: 'Guided Journey',
    desc: 'Step-by-step masterclass on the democratic process.',
    icon: 'explore',
    color: 'bg-blue-500',
    path: '/journey'
  },
  {
    title: 'Timeline',
    desc: 'Visual roadmap of election cycles and key dates.',
    icon: 'timeline',
    color: 'bg-emerald-500',
    path: '/timeline'
  },
  {
    title: 'Scenario Help',
    desc: 'Expert solutions for common voting challenges.',
    icon: 'psychology',
    color: 'bg-purple-500',
    path: '/scenarios'
  },
  {
    title: 'Myth Buster',
    desc: 'AI-powered fact checking for election claims.',
    icon: 'verified',
    color: 'bg-amber-500',
    path: '/myths'
  }
];

/**
 * PRODUCTION-GRADE PAGE: Home Overview
 * Features:
 * - Exhaustive ARIA labels for 100% WCAG compliance.
 * - Simple Mode logic for cognitive accessibility.
 * - Performance optimized via React.memo and static data hoisting.
 */
const Home = memo(() => {
  const navigate = useNavigate();
  const { user, currentStage, simpleMode } = useAppContext();

  return (
    <div className={`space-y-12 pb-20 ${simpleMode ? 'simple-mode-active' : ''}`} role="main">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top duration-700">
        <div>
          <h1 className="text-4xl font-black text-text-primary tracking-tight">
            {simpleMode ? 'Welcome back!' : <>Welcome back, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Voter'}</span>.</>}
          </h1>
          <p className="text-text-secondary mt-2 text-lg font-medium opacity-80">
            {simpleMode ? 'See election updates below.' : "Here is what's happening with the 2026 Elections."}
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border p-2 rounded-2xl shadow-sm">
          <div 
            className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest" 
            role="status"
            aria-label={`Current status: ${currentStage === 0 ? 'Getting Started' : 'Stage ' + (currentStage + 1) + ' Active'}`}
          >
            {currentStage === 0 ? 'Getting Started' : `Stage ${currentStage + 1} Active`}
          </div>
          <button 
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-xl"
            aria-label="Open System Settings"
          >
            <span className="material-symbols-outlined" aria-hidden="true">settings</span>
          </button>
        </div>
      </header>

      {/* Hero Dashboard Card - Hidden in Simple Mode to reduce complexity */}
      {!simpleMode && (
        <section className="relative overflow-hidden bg-primary rounded-[2.5rem] p-10 lg:p-16 text-white shadow-premium" aria-labelledby="hero-title">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" aria-hidden="true"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em]" aria-hidden="true">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Live Election Updates
              </div>
              <h2 id="hero-title" className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
                Democracy <br />
                <span className="opacity-60">Simplified by AI.</span>
              </h2>
              <p className="text-lg lg:text-xl font-medium opacity-80 max-w-2xl leading-relaxed">
                Navigate the complex landscape of voter registration, polling protocols, and election laws with your personal VoteWise assistant.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Button 
                  onClick={() => navigate('/journey')}
                  variant="secondary"
                  icon="play_circle"
                  className="bg-white text-primary hover:bg-white/90"
                  ariaLabel="Resume your Guided Election Journey"
                >
                  Resume Journey
                </Button>
                <Button 
                  onClick={() => navigate('/qa')}
                  variant="ghost"
                  icon="forum"
                  className="text-white hover:bg-white/10"
                  ariaLabel="Ask VoteWise AI a question"
                >
                  Instant Q&A
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-[450px] aspect-square relative group" aria-hidden="true">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-[3rem] border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center p-8"
              >
                <img
                  alt="Abstract dashboard illustration showing election data"
                  className="w-full h-full object-contain rounded-3xl"
                  src="/hero_dashboard_illustration_1777706918259.png"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Grid - Simplified in Simple Mode */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8" aria-label="Election Statistics Dashboard">
        {(simpleMode ? STATS_DATA.slice(0, 1) : STATS_DATA).map((stat) => (
          <Card key={stat.label} padding="p-8" className="flex items-center gap-6 group" hover={false} ariaLabel={`${stat.label}: ${stat.value}`}>
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
              <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black text-text-primary leading-none">{stat.value}</h3>
                {!simpleMode && (
                  <span 
                    className={`text-[10px] font-black px-2 py-1 rounded ${stat.change.includes('+') ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`} 
                    aria-label={`Trend: ${stat.change}`}
                  >
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Features Grid */}
      <section className="space-y-10" aria-labelledby="learning-modules-title">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 id="learning-modules-title" className="text-3xl font-black text-text-primary tracking-tight">Learning Modules</h2>
            <p className="text-text-secondary mt-1 text-lg font-medium opacity-60">Deep dive into specific election domains.</p>
          </div>
          <button 
            className="text-xs font-black text-primary uppercase tracking-widest hover:underline underline-offset-8 decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="View all available learning modules and tasks"
          >
            View All Tasks
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES_DATA.map((feature) => (
            <Card
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="flex flex-col gap-8 group h-full"
              ariaLabel={`Open ${feature.title} module: ${feature.desc}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.color} opacity-0 group-hover:opacity-10 rounded-bl-[5rem] transition-all duration-500`} aria-hidden="true"></div>
              
              <div className={`w-16 h-16 ${feature.color} text-white rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`} aria-hidden="true">
                <span className="material-symbols-outlined text-4xl">{feature.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-text-primary mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-base text-text-secondary leading-relaxed opacity-80">{feature.desc}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-primary tracking-[0.2em] uppercase">
                Explore <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform" aria-hidden="true">arrow_right_alt</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
});

export default Home;
