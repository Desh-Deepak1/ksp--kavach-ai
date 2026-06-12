import React, { useState } from 'react';
import { Search, Car, FileText, Share2, Clipboard } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const VehicleDossier: React.FC = () => {
  const [plateQuery, setPlateQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dossier, setDossier] = useState<any | null>(null);

  const executeCrossReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/vehicle/cross-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_plate: plateQuery })
      });
      if (response.ok) {
        const data = await response.json();
        setDossier(data);
      }
    } catch (err) {
      console.error("Data gather compilation error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="glass-panel p-6 rounded-xl relative">
        <CyberBrackets variant="cyan" />
        <h2 className="text-sm font-bold tracking-widest text-slate-200 uppercase mb-4 flex items-center gap-2">
          <Car className="w-4 h-4 text-cyber-cyan" /> Automated Vehicle Intelligence Portal (Vahan + Graph DB Cross-Link)
        </h2>

        <form onSubmit={executeCrossReference} className="flex gap-3 max-w-xl">
          <input
            type="text"
            value={plateQuery}
            onChange={(e) => setPlateQuery(e.target.value)}
            placeholder="ENTER VEHICLE REGISTRATION (e.g., KA-01-AB-1234)"
            className="flex-1 bg-[#030712] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-mono text-cyber-cyan tracking-widest uppercase focus:outline-none focus:border-cyber-cyan"
          />
          <button type="submit" className="px-5 py-2.5 bg-cyan-950/40 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-slate-950 font-bold transition-all cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="text-center text-slate-500 animate-pulse py-12">
          Querying national registries and tracing connection adjacencies...
        </div>
      )}

      {dossier && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <div className="glass-panel rounded-xl p-5 bg-[#030712]/60 min-h-[280px] flex flex-col items-center justify-center relative border-dashed">
            <CyberBrackets variant="cyan" />
            <div className="w-32 h-32 border border-cyber-cyan/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
              <Car className="w-12 h-12 text-cyber-cyan opacity-40 transform -rotate-45" />
            </div>
            <div className="absolute bottom-4 text-center">
              <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-widest">3D GEO-TACTICAL CAD ACTIVE</span>
              <span className="text-cyber-cyan text-[9px] font-bold tracking-tight">{dossier.rto_dossier.model}</span>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5 relative bg-[#0d1321]/90">
            <CyberBrackets variant="cyan" />
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Clipboard className="w-3.5 h-3.5 text-cyber-cyan" /> Vahan National Registry Dataset
            </h3>
            <div className="space-y-2.5 text-[11px]">
              <div><span className="text-slate-500 block">REGISTERED OWNER</span><span className="text-slate-200 font-bold">{dossier.rto_dossier.owner}</span></div>
              <div><span className="text-slate-500 block">CHASSIS SERIAL IDENTIFIER</span><span className="text-slate-300 font-bold">{dossier.rto_dossier.chassis_number}</span></div>
              <div><span className="text-slate-500 block">ENGINE NUMBER VALUE</span><span className="text-slate-300">{dossier.rto_dossier.engine_number}</span></div>
              <div><span className="text-slate-500 block">REGULATORY ACCOUNT RTO LOCATION</span><span className="text-slate-300">{dossier.rto_dossier.rto_location}</span></div>
              <div><span className="text-slate-500 block">INSURANCE THRESHOLD MATRIX</span><span className="text-emerald-400 font-bold">VALID UNTIL {dossier.rto_dossier.insurance_expiry}</span></div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-5 relative bg-[#0d1321]/90">
            <CyberBrackets variant="purple" />
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3 border-b border-white/5 pb-2 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyber-purple" /> Neo4j Connected Network Proximity Traces
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-slate-500 block mb-1">COGNITIVE RISK ASSESSMENT INDEX</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dossier.intelligence_graph_nodes.risk_index === 'HIGH THREAT' ? 'bg-rose-950/60 text-rose-400 border border-rose-500/40 animate-pulse' : 'bg-emerald-950/40 text-emerald-400'}`}>
                  {dossier.intelligence_graph_nodes.risk_index}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">ASSOCIATED CRIMINAL CASE RECORDS</span>
                <div className="flex flex-wrap gap-1.5">
                  {dossier.intelligence_graph_nodes.associated_firs.map((fir: string) => (
                    <span key={fir} className="bg-slate-950 px-2 py-0.5 rounded border border-white/5 text-slate-300 text-[10px] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-amber-500" /> {fir}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">FIRST-DEGREE ASSOCIATES (GRAPH ADJACENCY)</span>
                <div className="space-y-1">
                  {dossier.intelligence_graph_nodes.associates.map((associate: string, i: number) => (
                    <div key={i} className="bg-slate-950/60 p-1.5 border border-white/5 rounded text-slate-400 text-[10px]">
                      {associate}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};