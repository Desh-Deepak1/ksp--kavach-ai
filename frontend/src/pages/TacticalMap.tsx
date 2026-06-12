import React, { useState } from 'react';
import { Map, Navigation, Layers, Compass } from 'lucide-react'; 
import { CyberBrackets } from '../components/CyberBrackets';

export const TacticalMap: React.FC = () => {
  const [geofenceActive, setGeofenceActive] = useState(false);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="glass-panel p-6 rounded-xl relative flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <CyberBrackets variant="cyan" />
        <div>
          <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase flex items-center gap-2">
            <Map className="w-4 h-4 text-cyber-cyan" /> Tactical Geospatial Command Engine (WebGL Heatmaps)
          </h2>
          <p className="text-[10px] text-slate-500 uppercase mt-0.5">Geofence Boundary Controllers & Multi-Node Coordinate Intercept Tracking</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setGeofenceActive(!geofenceActive)}
            className={`px-4 py-2 border rounded-lg font-bold text-[11px] cursor-pointer transition-all ${geofenceActive ? 'bg-purple-950/40 border-cyber-purple text-cyber-purple shadow-neon-purple' : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20'}`}
          >
            {geofenceActive ? "» GEOFENCE MATRIX ACTIVE LOCK" : "DRAW SECTOR GEOFENCE"}
          </button>
        </div>
      </div>

      <div className="w-full h-[520px] bg-[#030712] border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/10 via-transparent to-purple-950/10 opacity-30 z-0" />
        <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-15 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path 
            d="M 150 400 L 320 280 L 580 340 L 800 180" 
            fill="none" 
            stroke="#00FFCC" 
            strokeWidth="2" 
            strokeDasharray="6, 4"
            className="animate-pulse"
          />
        </svg>

        <div className="absolute left-[150px] top-[400px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="w-2.5 h-2.5 bg-cyber-cyan rounded-full shadow-[0_0_8px_#00FFCC]" />
          <span className="bg-slate-950 border border-white/10 text-[9px] px-1.5 py-0.5 rounded mt-1 text-slate-400">POS-A: 02:11</span>
        </div>

        <div className="absolute left-[320px] top-[280px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="w-2.5 h-2.5 bg-cyber-cyan rounded-full shadow-[0_0_8px_#00FFCC]" />
          <span className="bg-slate-950 border border-white/10 text-[9px] px-1.5 py-0.5 rounded mt-1 text-slate-400">POS-B: 02:45</span>
        </div>

        <div className="absolute left-[580px] top-[340px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="w-3.5 h-3.5 bg-cyber-cyan rounded-full animate-ping absolute" />
          <div className="w-3.5 h-3.5 bg-cyber-cyan rounded-full shadow-[0_0_12px_#00FFCC] relative flex items-center justify-center">
            <Navigation className="w-2 h-2 text-slate-950 transform rotate-45" />
          </div>
          <span className="bg-slate-950 border border-cyber-cyan text-cyber-cyan font-bold text-[9px] px-1.5 py-0.5 rounded mt-1 shadow-lg">LAST INTERCEPT REVELATION</span>
        </div>

        {geofenceActive && (
          <div className="absolute right-1/4 top-1/4 w-48 h-48 border border-cyber-purple/60 bg-cyber-purple/5 rounded-xl z-10 animate-pulse border-dashed flex items-center justify-center">
            <span className="text-[10px] bg-slate-950 border border-cyber-purple/40 text-cyber-purple font-bold px-2 py-0.5 rounded tracking-widest font-mono">GEOFENCE ACTIVE_ZONE_04</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-[#0d1321]/95 border border-white/10 rounded-lg p-3.5 max-w-xs space-y-2 z-30 shadow-2xl">
          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyber-cyan" /> Layer Telemetry Overlays
          </span>
          <div className="space-y-1 text-[9px] text-slate-400">
            <div className="flex items-center justify-between"><span className="text-slate-300">WebGL Cosine Density Heatmap</span><span className="text-rose-400 font-bold">ACTIVE (30D)</span></div>
            <div className="flex items-center justify-between"><span className="text-slate-300">Vector Suspect Directional Mesh</span><span className="text-cyber-cyan font-bold">TRACKING</span></div>
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-slate-900/80 border border-white/10 p-2 rounded flex items-center gap-1.5 text-[10px] text-slate-400 z-30 font-mono">
          <Compass className="w-3.5 h-3.5 text-cyber-cyan animate-spin" style={{ animationDuration: '20s' }} /> GRID SECTOR EPSG:3857
        </div>
      </div>
    </div>
  );
};