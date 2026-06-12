import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Command } from 'lucide-react'; // Removed Eye
import { useAuth } from '../context/AuthContext';
import { CyberBrackets } from '../components/CyberBrackets';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [officerId, setOfficerId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [role, setRole] = useState('Inspector');
  const [isFocus, setIsFocus] = useState<'id' | 'key' | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (officerId.trim() && passkey.trim()) {
      login("sim_token_2026", role, officerId);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center ambient-gradient-mesh bg-grid-matrix bg-matrix-size px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-panel rounded-xl p-8 relative shadow-2xl transition-all duration-300 hover:border-cyber-cyan/30"
      >
        <CyberBrackets active={isFocus !== null} variant={role === 'Admin' ? 'purple' : 'cyan'} />

        <div className="flex flex-col items-center mb-8">
          <div className="p-3.5 bg-slate-950/60 border border-cyber-cyan/20 text-cyber-cyan rounded-xl mb-3 shadow-neon-cyan">
            <Shield className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-xl font-bold tracking-widest text-slate-100 font-mono">
            KSP-KAVACH SECURE GATEWAY
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1">STATE CRIME RECORDS DIVISION NODE</p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-400 mb-2 uppercase">Hierarchical Rank Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyber-cyan/60"
            >
              <option value="Inspector">Inspector (Standard Cognitive Desk)</option>
              <option value="Constable">Constable (Masked Relational Operations)</option>
              <option value="Admin">Admin (Unrestricted Root Graph Access)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-400 mb-2 uppercase">Officer ID Card Token</label>
            <div className="relative">
              <Command className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={officerId}
                onFocus={() => setIsFocus('id')}
                onBlur={() => setIsFocus(null)}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="Ex: KSP_9482_MYS"
                className="w-full bg-[#030712] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 font-mono text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyber-cyan/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold tracking-wider text-slate-400 mb-2 uppercase">Cryptographic Passkey</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={passkey}
                onFocus={() => setIsFocus('key')}
                onBlur={() => setIsFocus(null)}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-[#030712] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 font-mono text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyber-cyan/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-950 to-slate-900 text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan font-mono font-bold text-xs py-3 rounded-lg shadow-lg hover:shadow-neon-cyan transition-all duration-300"
          >
            VALIDATE WORKSTATION BOUNDARY
          </button>
        </form>
      </motion.div>
    </div>
  );
};