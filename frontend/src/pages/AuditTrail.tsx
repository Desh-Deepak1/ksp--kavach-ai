import React from 'react';
import { Database, FileSpreadsheet, Key, Terminal } from 'lucide-react';
import { CyberBrackets } from '../components/CyberBrackets';

export const AuditTrail: React.FC = () => {
  const auditRecords = [
    { timestamp: '2026-06-11 00:41:02', action: 'EXECUTE_SEMANTIC_RAG', targetIndex: 'idx_fir_narratives', referencedFir: 'FIR-2026-MYS-084', weights: 'Cosine: 0.941' },
    { timestamp: '2026-06-11 00:39:15', action: 'GRAPH_MULTI_HOP_TRAVERSAL', targetIndex: 'idx_suspect_mesh', referencedFir: 'FIR-2026-BLR-119', weights: 'Adjacency: 1.000' },
    { timestamp: '2026-06-11 00:24:41', action: 'BILINGUAL_AUDIO_TRANSLATION', targetIndex: 'idx_voice_cache', referencedFir: 'FIR-2026-MNG-042', weights: 'Confidence: 98.2%' },
    { timestamp: '2026-06-11 00:11:08', action: 'EXECUTE_SEMANTIC_RAG', targetIndex: 'idx_fir_narratives', referencedFir: 'FIR-2026-HB-931', weights: 'Cosine: 0.887' },
  ];

  return (
    <div className="space-y-6 font-mono">
      <div className="glass-panel rounded-xl p-6 relative bg-[#0d1321]/40">
        <CyberBrackets />
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 mb-6 border-b border-white/5 pb-3">
          <Terminal className="w-4 h-4 text-cyber-cyan" /> EXPLAINABLE AI REASONING & IMMUTABLE DATA AUDIT TRAIL
        </div>

        <div className="w-full overflow-x-auto border border-white/10 rounded-xl bg-slate-950/80">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#0d1321] text-slate-400 font-bold tracking-wider uppercase text-[10px]">
                <th className="p-4">TIMESTAMP LOCK</th>
                <th className="p-4">COGNITIVE ACTION VECTOR</th>
                <th className="p-4">TARGET INDEX REALM</th>
                <th className="p-4">REFERENCED SOURCE SOURCE RECORD (FIR)</th>
                <th className="p-4 text-right">METRIC WEIGHT MATRIX</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {auditRecords.map((record, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-[11px] text-slate-500 font-bold">{record.timestamp}</td>
                  <td className="p-4 text-cyber-cyan font-bold tracking-wide">{record.action}</td>
                  <td className="p-4 text-slate-400 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-cyber-purple" /> {record.targetIndex}
                  </td>
                  <td className="p-4">
                    <span className="bg-[#0d1321] px-2 py-1 rounded border border-white/10 text-slate-200 font-bold flex items-center gap-1.5 w-fit group-hover:border-cyber-cyan/40 transition-colors">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" /> {record.referencedFir}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-100">{record.weights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-purple-950/20 border border-cyber-purple/30 text-cyber-purple rounded-xl flex items-start gap-3 text-[11px] leading-relaxed max-w-3xl">
        <Key className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
        <p>
          IMMUTABLE LEDGER SYSTEM VERIFICATION TRACE // ALL COMPILED KNOWLEDGE REASONING PATHWAYS LOGGED WITH NON-REPUDIATION CHECKS AGAINST REGIONAL DATA CONSTRAINTS. NO PLAINTEXT DISCLOSURE OUTSIDE HIERARCHICAL SECURITY GROUPS.
        </p>
      </div>
    </div>
  );
};