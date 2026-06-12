import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, Fingerprint, Mail, Cpu } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const SurveillanceTicker: React.FC = () => {
  const [tickerLogs, setTickerLogs] = useState<any[]>([]);
  const [activeAlert, setActiveAlert] = useState<any | null>(null);
  const [osintInput, setOsintInput] = useState('');
  const [osintGraph, setOsintGraph] = useState<any | null>(null);

  useEffect(() => {
    // FIXED: Strict use of global capital JSON utility to prevent client-side runtime thread crash
    const socket = new WebSocket('ws://127.0.0.1:8000/api/v1/ws/anpr-surveillance');

    socket.onmessage = (event) => {
      try {
        const logData = JSON.parse(event.data);
        setTickerLogs(prev => [logData, ...prev.slice(0, 14)]);
        
        if (logData.status === 'WANTED' || logData.status === 'INTERCEPT') {
          setActiveAlert(logData);
        }
      } catch (err) {
        console.error("Inbound telemetry frame parse exception: ", err);
      }
    };

    return () => socket.close();
  }, []);

  const buildOsintFootprint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!osintInput.trim()) return;

    setOsintGraph({
      target: osintInput,
      breaches: ["Breach Pool #1 - Compro_2024", "Breach Pool #4 - FinData_2025"],
      handles: ["@rajesh_k_ops (X Platform)", "rajesh_kumar_scorpio (Telegram)"],
      score: "87% CORRELATION VECTOR INDEX"
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch font-mono text-xs">
      
      {/* ANPR Live Feed Panel */}
      <div className="glass-panel p-5 rounded-xl relative flex flex-col h-[540px] bg-[#0d1321]/40 xl:col-span-1">
        <CyberBrackets variant="cyan" />
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" /> Live Smart City ANPR Stream
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {tickerLogs.map((log, index) => (
            <div key={index} className={`p-2.5 rounded border font-mono text-[11px] flex justify-between items-center ${log.status === 'WANTED' ? 'bg-rose-950/20 border-rose-500/40 text-rose-300' : 'bg-slate-950 border-white/5 text-slate-400'}`}>
              <div>
                <span className="font-bold tracking-widest text-slate-200 block text-xs">{log.plate}</span>
                <span className="text-[9px] text-slate-500">{log.camera}</span>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-bold uppercase ${log.status === 'WANTED' ? 'text-rose-400' : 'text-slate-500'}`}>{log.status}</span>
                <span className="text-[9px] block text-slate-600 mt-0.5">{log.timestamp}</span>
              </div>
            </div>
          ))}
          {tickerLogs.length === 0 && <div className="text-center text-slate-600 py-12">Synchronizing intercept websocket connection socket loop...</div>}
        </div>
      </div>

      {/* OSINT Aggregator Dashboard */}
      <div className="glass-panel p-5 rounded-xl relative flex flex-col h-[540px] bg-[#0d1321]/40 xl:col-span-2 space-y-4">
        <CyberBrackets variant="purple" />
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border-b border-white/5 pb-2 uppercase tracking-wider">
          <Fingerprint className="w-4 h-4 text-cyber-purple" /> OSINT Footprint Profiler Engine
        </div>

        <form onSubmit={buildOsintFootprint} className="flex gap-3 max-w-lg">
          <div className="relative flex-1 bg-[#030712] border border-white/10 rounded-lg overflow-hidden">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
            <input
              type="text"
              value={osintInput}
              onChange={(e) => setOsintInput(e.target.value)}
              placeholder="ENTER PHONE / EMAIL FOR CORRELATION SEARCH"
              className="w-full bg-transparent pl-9 pr-4 py-2.5 text-xs text-cyber-purple font-mono focus:outline-none"
            />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-purple-950/40 border border-cyber-purple text-cyber-purple rounded-lg hover:bg-cyber-purple hover:text-slate-100 font-bold tracking-wider cursor-pointer transition-all">
            BUILD OSINT MATRIX
          </button>
        </form>

        {osintGraph ? (
          <div className="flex-1 bg-slate-950 border border-white/5 rounded-xl p-4 space-y-3 overflow-y-auto">
            <div><span className="text-slate-500 block text-[10px]">TARGET IDENTITY</span><span className="text-slate-200 font-bold text-sm">{osintGraph.target}</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0d1321]/60 border border-white/5 p-3 rounded-lg">
                <span className="text-cyber-purple font-bold block text-[10px] mb-1.5 uppercase">Exposed Breach Vectors</span>
                {osintGraph.breaches.map((b: string, i: number) => (
                  <div key={i} className="text-[11px] text-slate-400 font-mono mt-0.5">• {b}</div>
                ))}
              </div>
              <div className="bg-[#0d1321]/60 border border-white/5 p-3 rounded-lg">
                <span className="text-cyber-cyan font-bold block text-[10px] mb-1.5 uppercase">Linked Social Handle Nodes</span>
                {osintGraph.handles.map((h: string, i: number) => (
                  <div key={i} className="text-[11px] text-slate-400 font-mono mt-0.5">• {h}</div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 border border-white/5 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 text-slate-600">
            <Cpu className="w-8 h-8 text-slate-700 mb-2 animate-pulse" />
            Awaiting entry footprint configuration metrics parameters.
          </div>
        )}
      </div>

      {/* EMERGENCY INTRUSION OVERLAY ALERT MODAL */}
      {activeAlert && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#0d1321] border border-rose-500 rounded-xl p-6 relative shadow-[0_0_50px_rgba(244,63,94,0.3)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rose-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rose-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rose-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rose-500" />
            
            <div className="flex items-center gap-3 text-rose-400 font-bold text-sm mb-4 border-b border-rose-500/20 pb-2">
              <AlertTriangle className="w-5 h-5 animate-bounce" /> NATIONAL THREAT DATABASE HIT
            </div>
            <div className="space-y-3 text-[11px] font-mono text-slate-300">
              <div><span className="text-slate-500 block uppercase">Plate Identification</span><span className="text-slate-100 text-lg font-bold tracking-widest">{activeAlert.plate}</span></div>
              <div><span className="text-slate-500 block uppercase">Threat Alert Classification</span><span className="text-rose-400 font-bold">{activeAlert.reason}</span></div>
              <div><span className="text-slate-500 block uppercase">Source Camera</span><span className="text-slate-300 font-bold">{activeAlert.camera}</span></div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveAlert(null)}
                className="px-4 py-2 bg-rose-950/40 border border-rose-500 text-rose-400 font-bold rounded-lg cursor-pointer hover:bg-rose-500 hover:text-slate-950 transition-colors"
              >
                ACKNOWLEDGE INTERCEPT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};