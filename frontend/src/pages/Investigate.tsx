import React, { useState } from 'react'; // Removed useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Download, Languages, Network, Cpu, Link2 } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const Investigate: React.FC = () => {
  const [isKannada, setIsKannada] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; entities?: string[] }>>([
    { sender: 'ai', text: 'Cognitive workspace synchronized. Awaiting input targeting active network indices.' }
  ]);

  const mockNetworkNodes = [
    { id: 'SUSPECT: Anand Kumar', type: 'suspect', matches: 'entity-anand' },
    { id: 'VEHICLE: KA-01-M-9482', type: 'vehicle', matches: 'entity-vehicle' },
    { id: 'LOCATION: Mysore Central', type: 'location', matches: 'entity-location' },
  ];

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    
    const userMsg = queryText;
    setQueryText('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: 'Analyzed connection array. Linked suspect Anand Kumar running active modus operandi using vehicle KA-01-M-9482 near Mysore Central.',
        entities: ['entity-anand', 'entity-vehicle', 'entity-location']
      }]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch min-h-[calc(100vh-140px)]">
      
      {/* Left Panel: Conversational AI Platform */}
      <div className="glass-panel rounded-xl flex flex-col relative overflow-hidden bg-[#0d1321]/40">
        <CyberBrackets />
        
        <div className="bg-[#0d1321]/90 border-b border-white/10 px-4 py-3 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-300 tracking-wider">
            <Cpu className="w-4 h-4 text-cyber-cyan" /> COGNITIVE BOT CORE ENGINE
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsKannada(!isKannada)}
              className="flex items-center gap-1.5 bg-[#030712] border border-white/10 text-cyber-cyan px-2.5 py-1 rounded hover:border-cyber-cyan/50 transition-all font-bold text-[10px]"
            >
              <Languages className="w-3 h-3" /> {isKannada ? 'KANNADA MODAL' : 'ENGLISH MODAL'}
            </button>
          </div>
        </div>

        {/* Chat Log Window */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[460px]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-xl text-xs max-w-[85%] border leading-relaxed font-mono ${
                msg.sender === 'user'
                  ? 'bg-cyan-950/30 border-cyber-cyan/20 text-cyan-100'
                  : 'bg-slate-950/80 border-white/5 text-slate-300'
              }`}>
                {msg.entities ? (
                  <span>
                    Analyzed connection array. Linked{' '}
                    <span 
                      onMouseEnter={() => setHoveredEntity('entity-anand')}
                      onMouseLeave={() => setHoveredEntity(null)}
                      className="text-cyber-cyan font-bold underline decoration-dotted cursor-help bg-cyber-cyan/10 px-1 rounded"
                    >
                      Anand Kumar
                    </span>{' '}
                    running active modus operandi using vehicle{' '}
                    <span 
                      onMouseEnter={() => setHoveredEntity('entity-vehicle')}
                      onMouseLeave={() => setHoveredEntity(null)}
                      className="text-cyber-cyan font-bold underline decoration-dotted cursor-help bg-cyber-cyan/10 px-1 rounded"
                    >
                      KA-01-M-9482
                    </span>{' '}
                    near{' '}
                    <span 
                      onMouseEnter={() => setHoveredEntity('entity-location')}
                      onMouseLeave={() => setHoveredEntity(null)}
                      className="text-cyber-cyan font-bold underline decoration-dotted cursor-help bg-cyber-cyan/10 px-1 rounded"
                    >
                      Mysore Central
                    </span>.
                  </span>
                ) : msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Control Input & Waveform Visualizer Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-white/10 space-y-4">
          <AnimatePresence>
            {isRecording && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 24 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-1.5 h-6 overflow-hidden"
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.6 + i * 0.05, ease: 'easeInOut' }}
                    className="w-1 bg-cyber-cyan origin-center rounded-full"
                    style={{ height: '100%' }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleTextSubmit} className="flex items-center gap-3">
            <div className="relative flex-1 bg-[#030712] border border-white/10 rounded-xl overflow-hidden focus-within:border-cyber-cyan/40 transition-colors">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder={isKannada ? "ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ನಮೂದಿಸಿ..." : "Submit investigative payload query..."}
                className="w-full bg-transparent text-xs px-4 py-3.5 focus:outline-none font-mono text-slate-200 placeholder-slate-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isRecording 
                    ? 'bg-rose-950/40 border-rose-500 text-rose-400 shadow-lg' 
                    : 'bg-[#030712] border-white/10 text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                className="p-3 bg-gradient-to-b from-cyan-950 to-slate-900 text-cyber-cyan border border-cyber-cyan/30 rounded-xl hover:border-cyber-cyan cursor-pointer shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex justify-end pt-2">
            <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-mono font-bold text-[10px] px-4 py-2 rounded-lg shadow-neon-cyan hover:scale-105 transition-all cursor-pointer">
              <Download className="w-3.5 h-3.5" /> EXPORT SECURE DOSSIER
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Dynamic Network Visualization & Context Overlays */}
      <div className="glass-panel rounded-xl p-6 relative flex flex-col bg-[#0d1321]/20">
        <CyberBrackets />
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 mb-6 border-b border-white/5 pb-3">
          <Network className="w-4 h-4 text-cyber-purple" /> CRIMINAL NODE GRAPH VISUALIZER
        </div>

        <div className="flex-1 bg-[#030712]/80 border border-white/5 border-dashed rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-6">
          <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-10 pointer-events-none" />
          
          <div className="space-y-6 w-full max-w-sm relative z-10 font-mono">
            {mockNetworkNodes.map((node) => {
              const isTargeted = hoveredEntity === node.matches;
              return (
                <div
                  key={node.id}
                  className={`p-4 rounded-xl border transition-all duration-300 relative flex items-center justify-between ${
                    isTargeted
                      ? 'bg-cyan-950/40 border-cyber-cyan scale-105 shadow-neon-cyan'
                      : 'bg-[#0d1321]/60 border-white/10 opacity-70'
                  }`}
                >
                  <CyberBrackets active={isTargeted} variant="cyan" />
                  <div className="flex items-center gap-3">
                    <Link2 className={`w-4 h-4 ${isTargeted ? 'text-cyber-cyan animate-spin' : 'text-slate-500'}`} />
                    <span className={`text-xs ${isTargeted ? 'text-slate-100 font-bold' : 'text-slate-400'}`}>
                      {node.id}
                    </span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-slate-950 border border-white/5 rounded text-slate-500 uppercase font-bold">
                    {node.type}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-[10px] font-mono text-slate-600 leading-relaxed uppercase">
              Hover entity targets inside the cognitive chatbot log layout view matrix to project real-time holographic graph boundary sync updates.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};