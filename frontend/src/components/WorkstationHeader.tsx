import React from 'react';
import { Shield, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const WorkstationHeader: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const { logout, rankRole, username } = useAuth();

  const mainNavigationTabs = [
    { id: 'dashboard', label: 'CRIME INTEL' },
    { id: 'investigate', label: 'AI COGNITIVE DESK' },
    { id: 'advanced_analytics', label: 'ADVANCED METRICS' }, // Aligned to state parameters
    { id: 'audit', label: 'EXPLAINABLE HUB' }
  ];

  return (
    <header className="w-full border-b border-white/10 bg-[#0d1321]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-cyan-950/40 border border-cyber-cyan/30 text-cyber-cyan rounded-md shadow-inner">
          <Shield className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-sm font-bold font-mono tracking-widest text-slate-100 flex items-center gap-2">
            KSP-KAVACH <span className="text-[10px] bg-cyber-purple/20 text-cyber-purple px-2 py-0.5 rounded border border-cyber-purple/30 font-mono">TACTICAL MAIN</span>
          </div>
          <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">MATRIX STATUS: ACTIVE POOL</p>
        </div>
      </div>

      <nav className="flex items-center gap-2 bg-[#030712] p-1 border border-white/5 rounded-lg">
        {mainNavigationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-mono tracking-wider font-bold rounded-md transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#00FFCC] text-slate-950 shadow-[0_0_15px_rgba(0,255,204,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="text-right font-mono hidden sm:block">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 justify-end">
            <Activity className="w-3 h-3 text-emerald-400" /> {username}
          </span>
          <span className="text-[9px] text-cyber-purple uppercase tracking-widest">{rankRole} SECURE LOG</span>
        </div>
        <button
          onClick={logout}
          className="px-3 py-1.5 font-mono text-[11px] font-bold bg-rose-950/30 border border-rose-500/20 text-rose-400 hover:border-rose-500/50 rounded transition-all cursor-pointer"
        >
          DISCONNECT
        </button>
      </div>
    </header>
  );
};