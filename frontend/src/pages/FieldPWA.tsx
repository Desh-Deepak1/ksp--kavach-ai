import React, { useState } from 'react';
import { Mic, MicOff, ShieldAlert, Wifi, Battery, Radio, CheckCircle2 } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const FieldPWA: React.FC = () => {
  const [isFieldRecording, setIsFieldRecording] = useState(false);
  const [transcribedNotes, setTranscribedNotes] = useState<string[]>([]);

  const toggleFieldVoiceNotes = () => {
    if (isFieldRecording) {
      setIsFieldRecording(false);
      // Simulate real-time vocal data transcription processing appending
      setTranscribedNotes(prev => [
        `[01:38 IST] Field Unit 04 reports suspect vehicle signature matching Scorpio deconstruction profiles tracking toward southern bypass grids.`,
        ...prev
      ]);
    } else {
      setIsFieldRecording(true);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-160px)] bg-[#030712] border border-white/10 rounded-2xl flex flex-col font-mono text-xs overflow-hidden relative shadow-2xl">
      <CyberBrackets variant="cyan" />
      
      {/* Tactical Mobile Top Diagnostics Infrastructure Bar */}
      <div className="bg-[#0d1321] px-4 py-2 border-b border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-bold">
        <div className="flex items-center gap-2 text-cyber-cyan"><Radio className="w-3.5 h-3.5 animate-pulse" /> KSP-FIELD-LINK V1.0</div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-emerald-400" /> 5G</span>
          <span className="flex items-center gap-1"><Battery className="w-3 h-3" /> 88%</span>
        </div>
      </div>

      {/* Main Mission Workspace Content Body View */}
      <div className="flex-1 p-4 space-y-4 flex flex-col justify-between">
        
        <div className="space-y-4">
          <div className="bg-rose-950/20 border border-rose-500/30 p-3.5 rounded-xl flex items-start gap-2.5 text-rose-300 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block uppercase tracking-wider">TACTICAL ALERT COMMAND RANGE</span>
              Perimeter monitoring locked on Mysore Southern grids. Report visual contacts via the fast-touch vocal telemetry core down interface.
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Transcribed Incidents Log Case Stream</span>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {transcribedNotes.map((note, index) => (
                <div key={index} className="bg-[#0d1321]/80 border border-white/10 p-3 rounded-lg text-[11px] text-slate-300 leading-relaxed font-mono relative">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan absolute top-2 right-2" />
                  {note}
                </div>
              ))}
              {transcribedNotes.length === 0 && (
                <div className="text-center text-slate-700 py-12 text-[11px]">
                  No active vocal field notes captured yet inside the local cache buffer matrix storage.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* High-Contrast Large Touch Target Vocal Recording Array Floating Interface Anchor */}
        <div className="flex flex-col items-center justify-center pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={toggleFieldVoiceNotes}
            className={`w-20 h-20 rounded-full border flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer ${
              isFieldRecording 
                ? 'bg-rose-600/20 border-rose-500 text-rose-400 animate-pulse shadow-[0_0_25px_rgba(244,63,94,0.4)]' 
                : 'bg-gradient-to-b from-cyan-950 to-slate-900 border-cyber-cyan text-cyber-cyan shadow-neon-cyan hover:scale-105'
            }`}
          >
            {isFieldRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          <span className="text-[10px] font-bold tracking-widest mt-3 uppercase text-center block text-slate-400">
            {isFieldRecording ? "» TRANSMITTING VOICE-TO-FIR LIVE PACKETS «" : "TAP TO RECONSTRUCT VOICE-TO-FIR TRANSLATIONS"}
          </span>
        </div>

      </div>
    </div>
  );
};