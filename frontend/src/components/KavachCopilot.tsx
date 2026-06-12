import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Mic, Copy, FileDown, Terminal, Radio } from 'lucide-react';
import { CyberBrackets } from './CyberBrackets';

interface CopilotMessage {
  id: string;
  sender: 'officer' | 'copilot';
  text: string;
  timestamp: string;
  structuredData?: { title: string; keys: Record<string, string> };
}

interface KavachCopilotProps {
  currentActiveTab: string;
}

export const KavachCopilot: React.FC<KavachCopilotProps> = ({ currentActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-01',
      sender: 'copilot',
      text: 'Tactical Copilot online. I am actively tracking your viewport context to streamline database cross-references.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Translate routing IDs into explicit law enforcement vector profiles
  const getReadableContextName = (tabId: string): string => {
    const contextMap: Record<string, string> = {
      dashboard: 'National Crime Intelligence Matrix',
      investigate: 'Cognitive NLP Reasoning Desk',
      advanced_analytics: 'Predictive Modus Operandi Core',
      vehicle_dossier: 'Vahan Central Registry Ledger',
      tactical_map: 'Geospatial WebGL Intercept Plane',
      surveillance: 'Live ANPR WebSocket Receiver',
      automation_hub: 'Legal Warrant Assembly Pipeline',
      field_pwa: 'Mobile Tactical Command Node',
      audit: 'Explainable AI Blockchain Vault'
    };
    return contextMap[tabId] || 'General System Grid';
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userIntent = inputMessage;
    const msgTimestamp = new Date().toLocaleTimeString();
    
    // Captured Page Context tracking parameters logged securely
    const contextSnapshot = getReadableContextName(currentActiveTab);

    setMessages(prev => [...prev, {
      id: `usr-${Date.now()}`,
      sender: 'officer',
      text: userIntent,
      timestamp: msgTimestamp
    }]);

    setInputMessage('');
    setIsTyping(true);

    // Simulate context-aware tactical inference pipeline processing
    setTimeout(() => {
      let aiResponseText = `Processing intent over active parameters. Viewport scope detected: [${contextSnapshot}]. No immediate threat anomalies logged for current filter strings.`;
      let embeddedDataCard: any = undefined;

      // Real-time context adaptive prompt mutation injection logic
      if (currentActiveTab === 'vehicle_dossier') {
        aiResponseText = `Vahan cross-reference link activated for query. Tracing suspicious vehicle network indicators:`;
        embeddedDataCard = {
          title: "NEO4J RECONSTRUCTED ADJACENCY MATRIX",
          keys: {
            "TARGET_PLATE": "KA-01-AB-1234",
            "OWNER_IDENT": "Rajesh Kumar N",
            "PROBABILITY": "94.2% SYNDICATE CORRELATION",
            "BOUND_FIR_ID": "FIR-2026-BLR-041"
          }
        };
      } else if (currentActiveTab === 'tactical_map') {
        aiResponseText = `Geospatial coordinate layer processed. Highest density of forced-entry operations is currently localized in Sector Southern Grid.`;
        embeddedDataCard = {
          title: "SPATIAL INTERCEPT LAYER MATRIX",
          keys: {
            "SECTOR_GRID": "MYSORE_SOUTH_G4",
            "COORDINATES": "12.295 N, 76.639 E",
            "CLUSTER_MASS": "84.7 DENSITY RATING"
          }
        };
      }

      setMessages(prev => [...prev, {
        id: `cpl-${Date.now()}`,
        sender: 'copilot',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString(),
        structuredData: embeddedDataCard
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const copyPayloadToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      <AnimatePresence>
        
        {/* EXPANDED SYSTEM CHAT CONTAINER INTERFACE */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 50, y: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 50, y: 50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="w-80 sm:w-96 h-[500px] glass-panel bg-[#0d1321]/95 rounded-2xl mb-4 shadow-[0_20px_50px_rgba(0,255,204,0.15)] flex flex-col overflow-hidden relative border-white/10"
            style={{ transformOrigin: 'bottom right' }}
          >
            <CyberBrackets variant="cyan" active={true} />

            {/* Tactical Copilot Header Layer */}
            <div className="bg-[#080d1a] px-4 py-3 border-b border-white/10 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 tracking-widest block">KAVACH COPILOT</span>
                  <span className="text-[8px] text-cyber-cyan block uppercase tracking-tight max-w-[200px] truncate">
                    Scope: {getReadableContextName(currentActiveTab)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-500 hover:text-rose-400 border border-transparent hover:border-white/5 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversational Scroll View Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#030712]/40 scroll-smooth">
              {messages.map((msg) => {
                const isCopilot = msg.sender === 'copilot';
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col relative group max-w-[85%] ${isCopilot ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                    onMouseEnter={() => setHoveredMsgId(msg.id)}
                    onMouseLeave={() => setHoveredMsgId(null)}
                  >
                    <div className={`p-3 rounded-xl text-xs leading-relaxed border transition-all relative ${
                      isCopilot 
                        ? 'bg-[#0d1321] border-white/10 text-slate-300' 
                        : 'bg-cyan-950/20 border-cyber-cyan/30 text-cyan-100 font-medium'
                    }`}>
                      {isCopilot && <CyberBrackets variant="purple" active={hoveredMsgId === msg.id} />}
                      <p className={isCopilot ? 'font-sans' : 'font-sans'}>{msg.text}</p>

                      {/* DATA RENDERING FOR HIGH PRIVILEGE DATABASE HIT MATCHES */}
                      {isCopilot && msg.structuredData && (
                        <div className="mt-2.5 border border-white/10 rounded-lg overflow-hidden w-full font-mono text-[9px] bg-slate-950/90 shadow-inner">
                          <div className="bg-[#0d1321] px-2 py-1 text-cyber-purple font-bold border-b border-white/10 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-cyber-cyan" /> {msg.structuredData.title}
                          </div>
                          <div className="p-2 space-y-1">
                            {Object.entries(msg.structuredData.keys).map(([k, v]) => (
                              <div key={k} className="flex justify-between border-b border-white/5 pb-0.5 last:border-0">
                                <span className="text-slate-500 font-bold">{k}:</span>
                                <span className="text-slate-200 text-right">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MICRO-INTERACTION FLOATING INTERCEPT CONTROL TARGETS */}
                      {isCopilot && hoveredMsgId === msg.id && (
                        <div className="absolute right-2 top-[-14px] bg-slate-950 border border-white/10 rounded flex items-center gap-1 p-0.5 shadow-xl font-mono text-[8px]">
                          <button 
                            onClick={() => copyPayloadToClipboard(msg.text)}
                            className="p-1 hover:text-cyber-cyan rounded flex items-center gap-0.5 transition-colors cursor-pointer"
                            title="Copy String to Clipboard"
                          >
                            <Copy className="w-2.5 h-2.5" />
                          </button>
                          <button 
                            onClick={() => alert("Streaming vector context export compilation...")}
                            className="p-1 hover:text-cyber-purple rounded flex items-center gap-0.5 transition-colors cursor-pointer"
                            title="Export Section Data Artifact"
                          >
                            <FileDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[8px] font-mono text-slate-600 mt-1 px-1 tracking-tight">{msg.timestamp}</span>
                  </div>
                );
              })}

              {/* CYBERNETIC THREE-DOT KINETIC TYPING PULSE INDICATOR */}
              {isTyping && (
                <div className="bg-[#0d1321] border border-white/10 p-2.5 rounded-xl text-slate-500 font-mono text-[10px] w-fit flex items-center gap-2">
                  <Radio className="w-3 h-3 animate-spin text-cyber-purple" />
                  <span>Synthesizing structural context overlays</span>
                  <div className="flex gap-1">
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0 }} className="w-1 h-1 bg-cyber-cyan rounded-full" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.15 }} className="w-1 h-1 bg-cyber-cyan rounded-full" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.3 }} className="w-1 h-1 bg-cyber-cyan rounded-full" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form Controls Section */}
            <form onSubmit={handleCopilotSubmit} className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
              <div className="flex-1 bg-[#0d1321] border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 focus-within:border-cyber-cyan/40 transition-colors">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Query copilot mapping matrices..."
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-700 focus:outline-none"
                />
                <button 
                  type="button" 
                  onClick={() => alert("Initializing vocal stream capture loop connection...")}
                  className="text-slate-500 hover:text-cyber-cyan transition-colors cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 bg-cyan-950/40 border border-cyber-cyan text-cyber-cyan rounded-xl hover:bg-cyber-cyan hover:text-slate-950 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}

        {/* KINETIC FLOATING ACTION BUTTON (FAB CORE) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ y: -4, scale: 1.05 }}
          className={`w-14 h-14 rounded-full bg-[#0d1321]/90 border text-cyber-cyan flex items-center justify-center cursor-pointer transition-shadow z-[100] ${
            isOpen 
              ? 'border-cyber-purple shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
              : 'border-cyber-cyan/40 hover:border-cyber-cyan shadow-[0_10px_30px_rgba(0,255,204,0.15)]'
          }`}
        >
          <Sparkles className={`w-6 h-6 ${isOpen ? 'text-cyber-purple transform rotate-45' : 'text-cyber-cyan animate-pulse'}`} />
        </motion.button>

      </AnimatePresence>
    </div>
  );
};