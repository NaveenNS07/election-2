import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { callGeminiAI } from '../../services/aiService';
import DOMPurify from 'dompurify';

const ChatBox = ({ mode = 'auto', placeholder = "Ask anything about elections..." }) => {
  const { country, knowledgeLevel, language, geminiApiKey } = useAppContext();
  const location = useLocation();
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: mode === 'myth' 
        ? "Paste a claim or news you heard, and I'll fact-check it for you." 
        : mode === 'scenario'
          ? "Describe a voting challenge you're facing, and I'll provide a step-by-step solution."
          : "Hello! I'm VoteWise AI. How can I help you understand elections today?", 
      type: 'text' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q && messages.length === 1) {
      handleSend(q);
    }
  }, [location.search]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customMessage = null) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend) return;

    if (!customMessage) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
    setIsTyping(true);

    if (!geminiApiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: "I need a Google Gemini API Key to provide real-time AI answers. Please go to Settings to add your key.",
          type: 'error' 
        }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // Use cached response if available (simple implementation)
      const cacheKey = `vw_cache_${messageToSend}_${mode}_${knowledgeLevel}`;
      const cached = sessionStorage.getItem(cacheKey);
      
      let response;
      let fromCache = false;
      if (cached) {
        response = cached;
        fromCache = true;
        // Small delay for natural feel
        await new Promise(r => setTimeout(r, 500));
      } else {
        response = await callGeminiAI(messageToSend, geminiApiKey, { country, knowledgeLevel, language, mode });
        sessionStorage.setItem(cacheKey, response);
      }

      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: DOMPurify.sanitize(response), 
        type: mode,
        isCached: fromCache 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Error: ${error.message}. Please check your API key in Settings.`, 
        type: 'error' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-card rounded-2xl shadow-hover border border-border overflow-hidden transition-all duration-500">
      
      {/* Header Info */}
      <div className="px-6 py-4 bg-background/50 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs font-black uppercase tracking-widest text-text-secondary">
            {mode === 'auto' ? 'AI Assistant' : `${mode} mode`}
          </span>
        </div>
        <div className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded">
          {knowledgeLevel.toUpperCase()} LEVEL
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        style={{ maxHeight: 'calc(100vh - 350px)' }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              aria-live={index === messages.length - 1 ? "polite" : "off"}
            >
              <div 
                className={`max-w-[85%] p-5 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : msg.type === 'error'
                      ? 'bg-red-50 text-red-600 border border-red-100 rounded-tl-none'
                      : 'bg-background text-text-primary border border-border rounded-tl-none'
                }`}
              >
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-3 border-b border-border/10 pb-2">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      {msg.type === 'myth' ? 'gavel' : msg.type === 'scenario' ? 'psychology' : 'smart_toy'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                      VoteWise Response • Secure {msg.isCached && '• Cached'}
                    </span>
                  </div>
                )}
                <div 
                  className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-start"
              aria-label="AI is typing"
            >
              <div className="bg-background p-4 rounded-2xl rounded-tl-none border border-border flex gap-1.5 items-center">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-[10px] font-bold text-text-secondary ml-2">AI is processing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-card border-t border-border">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder={placeholder}
              className="w-full bg-background border border-border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-primary transition-all pr-12"
              aria-label="Message to VoteWise AI"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary opacity-0 group-focus-within:opacity-100 transition-opacity">
              ↵
            </div>
          </div>

          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 ${
              !input.trim() || isTyping 
                ? 'bg-gray-100 text-gray-400 dark:bg-white/5 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg'
            }`}
            aria-label="Send message to AI"
          >
            <span className="material-symbols-outlined" aria-hidden="true">{isTyping ? 'hourglass_empty' : 'send'}</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-text-secondary mt-3 opacity-50">
          VoteWise AI can make mistakes. Always verify critical election dates with official sources.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
