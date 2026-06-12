import React from 'react';
// Removed motion import because standard physics layout uses Tailwind's transition properties perfectly
import { AlertOctagon, TrendingUp, Zap, BarChart3, Radio } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const Dashboard: React.FC = () => {
  const activeAlerts = [
    { id: 'ALT-102', mo: 'Window-Grill Breach Matrix', location: 'Mysore District Sub-02', threat: 'CRITICAL', probability: '94%' },
    { id: 'ALT-105', mo: 'Bilingual Social Phishing Dev', location: 'Bangalore Cyber Hub', threat: 'ELEVATED', probability: '82%' },
    { id: 'ALT-109', mo: 'High-Volume Financial Spoofing', location: 'Mangalore Coastal Range', threat: 'MODERATE', probability: '61%' },
    { id: 'ALT-112', mo: 'Infrastructure Transit Intercept', location: 'Hubli Rail Network Cluster', threat: 'CRITICAL', probability: '89%' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-xl relative flex items-center gap-4 font-mono">
          <CyberBrackets />
          <div className="p-3 bg-cyan-950/40 border border-cyber-cyan/20 text-cyber-cyan rounded-lg">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 tracking-wider">LIVE NODE COMPILATION</p>
            <h3 className="text-xl font-bold text-slate-200">1,492 / SEC</h3>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl relative flex items-center gap-4 font-mono">
          <CyberBrackets />
          <div className="p-3 bg-purple-950/40 border border-cyber-purple/20 text-cyber-purple rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 tracking-wider">ACTIVE INTEL COGNITION</p>
            <h3 className="text-xl font-bold text-slate-200">98.42% REACH</h3>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl relative flex items-center gap-4 font-mono">
          <CyberBrackets />
          <div className="p-3 bg-rose-950/40 border border-rose-500/20 text-rose-400 rounded-lg">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 tracking-wider">THREAT THRESHOLD STATE</p>
            <h3 className="text-xl font-bold text-rose-400">04 HIGH MARKS</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Side: Stacking Scroll Interceptor Engine for Threat Assessments */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-cyber-cyan" /> TACTILE PREDICTIVE ACCELERATION STACK (SCROLL STACK)
          </h2>
          <div className="space-y-0 relative pb-20">
            {activeAlerts.map((alert, idx) => (
              <div 
                key={alert.id}
                className="sticky bg-[#0d1321] border border-white/10 rounded-xl p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyber-cyan/40 hover:shadow-neon-cyan group"
                style={{
                  top: `${80 + idx * 30}px`,
                  zIndex: 10 + idx,
                }}
              >
                <CyberBrackets variant={alert.threat === 'CRITICAL' ? 'purple' : 'cyan'} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-white/5 font-bold text-cyber-cyan">{alert.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        alert.threat === 'CRITICAL' ? 'bg-rose-950/40 text-rose-400 border border-rose-500/30' : 'bg-amber-950/40 text-amber-400 border border-amber-500/30'
                      }`}>{alert.threat} THREAT LAYER</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-200 tracking-wide mt-3 group-hover:text-cyber-cyan transition-colors">{alert.mo}</h3>
                    <p className="text-xs text-slate-500 mt-1">{alert.location}</p>
                  </div>
                  <div className="text-left sm:text-right border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <span className="text-[10px] text-slate-400 block tracking-widest">COGNITIVE MATCH</span>
                    <span className="text-xl font-bold text-slate-100 font-mono tracking-tighter">{alert.probability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Regional Hotspot Detection Visualizer */}
        <div className="glass-panel p-6 rounded-xl relative flex flex-col h-[400px]">
          <CyberBrackets />
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 mb-6 border-b border-white/5 pb-3">
            <TrendingUp className="w-4 h-4 text-cyber-purple" /> REGIONAL CRIME SPIKE HOTSPOTS
          </div>
          <div className="flex-1 flex flex-col justify-between font-mono text-xs">
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {[
                { zone: 'Mysore Core Sector', spike: '+42%', count: '18 Incidents' },
                { zone: 'Bangalore East Grid', spike: '+29%', count: '91 Incidents' },
                { zone: 'Belagavi Sector Border', spike: '+14%', count: '06 Incidents' },
                { zone: 'Shimoga Central Range', spike: '+08%', count: '11 Incidents' },
              ].map((item, index) => (
                <div key={index} className="bg-slate-950/60 border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-200">{item.zone}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.count}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-cyber-purple flex items-center gap-1 justify-end">
                      <BarChart3 className="w-3 h-3" /> {item.spike}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};