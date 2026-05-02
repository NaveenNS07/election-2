import React, { useState, useCallback, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { journeyStages } from '../utils/journeyData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StageCard = React.memo(({ stage, index, currentStage, expandedStage, onToggle, onEnter }) => {
  const isExpanded = expandedStage === index;
  const isCompleted = index < currentStage;
  const isActive = index === currentStage;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex items-center md:justify-between group"
    >
      <div className="hidden md:block w-[45%]" />

      <div 
        className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-2xl border-8 border-background shadow-premium z-20 transition-all duration-700 ${
          index <= currentStage 
            ? 'bg-primary text-white scale-110 rotate-0' 
            : 'bg-card text-text-secondary scale-90 -rotate-12 group-hover:rotate-0 group-hover:scale-100'
        }`}
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-2xl">{stage.icon}</span>
      </div>
      
      <div className={`ml-16 md:ml-0 w-[calc(100%-5rem)] md:w-[45%] group py-4 transition-all duration-500 ${
        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
      }`}>
        <div 
          onClick={() => onToggle(index)}
          className={`card p-8 cursor-pointer transition-all duration-500 relative overflow-hidden group-hover:shadow-2xl ${
            isActive ? 'ring-2 ring-primary border-primary shadow-premium' : 
            isCompleted ? 'border-primary/20' : ''
          }`}
          role="button"
          aria-expanded={isExpanded}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToggle(index)}
          aria-label={`${stage.title} details`}
        >
          <div className={`absolute top-0 bottom-0 w-1.5 ${index <= currentStage ? 'bg-primary' : 'bg-border'} ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} left-0 md:left-auto`} />
          
          <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
              index <= currentStage ? 'bg-primary text-white' : 'bg-background text-text-secondary border border-border'
            }`}>
              Phase 0{index + 1}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] text-accent font-black uppercase">
                <span className="material-symbols-outlined text-sm">verified</span>
                COMPLETE
              </span>
            )}
            {isActive && (
              <span className="flex items-center gap-1 text-[10px] text-primary font-black uppercase animate-pulse">
                <span className="material-symbols-outlined text-sm">radio_button_checked</span>
                ACTIVE
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-black text-text-primary mb-3 leading-tight tracking-tight">{stage.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium opacity-80">
            {stage.description}
          </p>

          <div className={`flex flex-wrap gap-6 pt-6 border-t border-border/50 items-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEnter(index);
              }}
              className="text-[10px] font-black text-primary hover:tracking-widest transition-all flex items-center gap-2 uppercase tracking-[0.15em] group/btn"
              aria-label={`Enter module for ${stage.title}`}
            >
              ENTER MODULE
              <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
            </button>
            
            <div className="flex -space-x-2 opacity-30 group-hover:opacity-100 transition-opacity">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-border border-2 border-card" />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-8 border-t border-dashed border-border/50 space-y-6">
                  {stage.content.map((item, i) => (
                    <div key={i} className={`flex gap-4 items-start ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : 'text-left'}`}>
                      <div className="w-8 h-8 shrink-0 bg-primary/5 rounded-lg flex items-center justify-center text-primary font-black text-[10px]">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-text-primary text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="md:hidden absolute left-6 top-14 bottom-0 w-1 bg-border -translate-x-1/2 -z-10 group-last:hidden" />
    </motion.div>
  );
});

const Timeline = () => {
  const { currentStage, setCurrentStage } = useAppContext();
  const [expandedStage, setExpandedStage] = useState(currentStage);
  const navigate = useNavigate();

  const handleGoToModule = useCallback((index) => {
    setCurrentStage(index);
    navigate('/journey');
  }, [setCurrentStage, navigate]);

  const handleToggle = useCallback((index) => {
    setExpandedStage(prev => (prev === index ? -1 : index));
  }, []);

  const stagesList = useMemo(() => journeyStages, []);

  return (
    <div className="space-y-20 pb-20">
      <header className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-5xl font-black text-text-primary tracking-tighter">Election Roadmap</h1>
        <p className="text-text-secondary text-xl font-medium leading-relaxed opacity-80">
          A step-by-step visual guide to your democratic participation. Follow the journey from initial registration to the final vote count.
        </p>
      </header>

      <section className="relative max-w-5xl mx-auto" aria-label="Interactive Election Timeline">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-border/50 md:-translate-x-1/2 rounded-full" aria-hidden="true" />
        
        <div className="space-y-4">
          {stagesList.map((stage, index) => (
            <StageCard 
              key={stage.id}
              stage={stage}
              index={index}
              currentStage={currentStage}
              expandedStage={expandedStage}
              onToggle={handleToggle}
              onEnter={handleGoToModule}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Timeline;
