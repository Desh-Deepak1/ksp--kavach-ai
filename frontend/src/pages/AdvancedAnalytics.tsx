import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Network, Map, 
  MapPin, Brain, TrendingUp, Zap
} from 'lucide-react'; // Swapped Timeline for History, removed unused elements
import { CyberBrackets } from '../components/CyberBrackets';

export const AdvancedAnalytics: React.FC = () => {
  // Navigation for Sub-Tabs inside the Advanced Module
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'graph' | 'map'>('all');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedMapAlert, setSelectedMapAlert] = useState<any | null>(null);
  const [hoveredPattern, setHoveredPattern] = useState<number | null>(null);

  // 1. DATA MATRIX FOR CRIM PATTERN DISCOVERY (TIMELINE MATRIX)
  const chronologicalPatterns = [
    { id: 'PAT-001', time: '02:00 - 04:30 IST', event: 'Night-time Forced Entry Clustering', sector: 'Mysore Southern Grid', density: 'High Hotspot Density (92%)', coordinates: 'LOC [12.295, 76.639]' },
    { id: 'PAT-002', time: '09:00 - 11:15 IST', event: 'Asymmetric API Spoofing Iteration', sector: 'Bangalore Cyber Range', density: 'Evolving Vector Pattern (78%)', coordinates: 'LOC [12.971, 77.594]' },
    { id: 'PAT-003', time: '18:30 - 21:00 IST', event: 'Coordinated Transit Cargo Intercept', sector: 'Hubli Rail Infrastructure Cluster', density: 'Localized Repeat Signature (64%)', coordinates: 'LOC [15.364, 75.124]' },
  ];

  // 2. DATA MATRIX FOR COMMAND MAP PREDICTIVE NODES
  const predictiveAlerts = [
    { id: 'PRED-901', target: 'Zone Alpha: Mysore Palace Sector', probability: '94.2%', deployment: 'Deploy 4 Tactical Patrol Vectors + Drone Perimeter Feed', type: 'High Risk' },
    { id: 'PRED-902', target: 'Zone Delta: Hebbal Cyber Spine', probability: '81.7%', deployment: 'Initialize Token Authentication Interceptor Shields', type: 'Medium Risk' },
  ];

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* Module Title Matrix Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-lg font-bold font-mono text-slate-100 tracking-widest flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyber-cyan animate-pulse" /> ADVANCED INTELLIGENCE ANALYTICS CORE
          </h2>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">
            Predictive Synthesis Engine // Real-Time Graph Traversal Matrix
          </p>
        </div>
        
        {/* Sub-Tab Control Matrix */}
        <div className="flex items-center gap-2 bg-[#030712] p-1 border border-white/5 rounded-lg font-mono text-xs">
          {(['all', 'graph', 'map'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveSubTab(mode)}
              className={`px-3 py-1.5 rounded uppercase font-bold tracking-wider transition-all cursor-pointer ${
                activeSubTab === mode ? 'bg-cyber-purple text-slate-100 shadow-neon-purple' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'all' ? 'Full Deck View' : mode === 'graph' ? 'Node Graph' : 'Tactical Map'}
            </button>
          ))}
        </div>
      </div>

      {/* RENDER VIEW CONTROLLER MATRIX BASED ON SUBTAB STATE */}
      {activeSubTab === 'all' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* INTERFACE 1: CRIME PATTERN DISCOVERY (THE TIMELINE MATRIX) */}
          <div className="xl:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
              <History className="w-4 h-4 text-cyber-cyan" /> 1. Crime Pattern Discovery (Timeline Matrix Stacking Physics)
            </h3>
            <div className="space-y-0 relative pb-16">
              {chronologicalPatterns.map((pattern, idx) => (
                <div
                  key={pattern.id}
                  onMouseEnter={() => setHoveredPattern(idx)}
                  onMouseLeave={() => setHoveredPattern(null)}
                  className="sticky bg-[#0d1321] border border-white/10 rounded-xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  style={{
                    top: `${100 + idx * 35}px`,
                    zIndex: 10 + idx,
                    boxShadow: hoveredPattern === idx ? '0px 20px 40px rgba(0, 255, 204, 0.1)' : 'none',
                    borderColor: hoveredPattern === idx ? '#00FFCC' : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <CyberBrackets active={hoveredPattern === idx} variant="cyan" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-950 text-cyber-cyan px-2 py-0.5 rounded border border-white/5 font-bold">{pattern.id}</span>
                        <span className="text-slate-400 font-bold tracking-wide">{pattern.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 mt-2 group-hover:text-cyber-cyan transition-colors">{pattern.event}</h4>
                      <p className="text-slate-500 text-[11px] mt-1">{pattern.sector} • <span className="text-cyber-purple">{pattern.coordinates}</span></p>
                    </div>

                    {/* Heatmap Graphic Trigger */}
                    <div className="w-24 h-12 bg-slate-950 rounded border border-white/5 relative overflow-hidden flex items-center justify-center shrink-0">
                      <div className="absolute w-6 h-6 bg-rose-500/30 rounded-full blur-md animate-pulse left-1/3" />
                      <div className="absolute w-4 h-4 bg-cyber-cyan/20 rounded-full blur-sm animate-ping right-1/4" />
                      <span className="text-[9px] text-slate-600 font-mono font-bold relative z-10">HEATMAP DATA</span>
                    </div>
                  </div>

                  {/* Micro-reveal layout box container */}
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>SIGNATURE CLUSTER METRIC: <span className="text-slate-200">{pattern.density}</span></span>
                    <span className="opacity-0 group-hover:opacity-100 text-cyber-cyan transition-opacity tracking-widest">RAW RECORD VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INTERFACE 3: SOCIO-DEMOGRAPHIC INSIGHTS (THE HOLOGRAPHIC RADAR) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="glass-panel p-5 rounded-xl relative h-[440px] flex flex-col bg-[#0d1321]/40"
          >
            <CyberBrackets variant="purple" />
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 mb-4 border-b border-white/5 pb-2">
              <TrendingUp className="w-4 h-4 text-cyber-purple" /> 3. Socio-Demographic Insights (Holographic Chart Core)
            </div>
            
            {/* Simulated Radar Chart Graphic Vector */}
            <div className="flex-1 bg-slate-950 rounded-xl relative flex items-center justify-center overflow-hidden border border-white/5 p-4">
              <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-5" />
              
              {/* Concentric Circle Radar Lines */}
              <div className="absolute w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-white/5 rounded-full" />
                </div>
              </div>
              
              {/* Axis Crosshairs */}
              <div className="absolute w-52 h-[1px] bg-white/10" />
              <div className="absolute h-52 w-[1px] bg-white/10" />

              {/* Polygon Path Overlay Visuals using Framer Motion out-scale */}
              <motion.svg 
                viewBox="0 0 100 100" 
                className="absolute w-40 h-40 overflow-visible drop-shadow-[0_0_8px_rgba(0,255,204,0.3)]"
              >
                <motion.polygon
                  initial={{ points: "50,50 50,50 50,50 50,50" }}
                  animate={{ points: "50,15 85,45 65,80 20,55" }}
                  transition={{ type: 'spring', damping: 15, stiffness: 60 }}
                  fill="rgba(0, 255, 204, 0.15)"
                  stroke="#00FFCC"
                  strokeWidth="1.5"
                />
                <motion.polygon
                  initial={{ points: "50,50 50,50 50,50 50,50" }}
                  animate={{ points: "50,30 70,55 45,75 35,45" }}
                  transition={{ type: 'spring', damping: 18, stiffness: 50, delay: 0.1 }}
                  fill="rgba(139, 92, 246, 0.12)"
                  stroke="#8B5CF6"
                  strokeWidth="1"
                />
              </motion.svg>

              <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-500">PARAM A: ECONOMIC INERTIA</div>
              <div className="absolute top-2 right-2 text-[8px] font-mono text-slate-500">PARAM B: RECIDIVISM RANGE</div>
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-slate-500">PARAM C: TRANSIT FLUIDITY</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500">PARAM D: POPULATION VOLUME</div>
            </div>

            <div className="mt-4 space-y-2 font-mono text-[10px]">
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-white/5">
                <span className="text-cyber-cyan font-bold">CYBER CYAN LAYER:</span>
                <span className="text-slate-300">Target Range Vector Distribution A (Active Sector)</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-white/5">
                <span className="text-cyber-purple font-bold">CYBER VIOLET LAYER:</span>
                <span className="text-slate-300">Historical Demographic Benchmark Profile B</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* INTERFACE 2: CRIMINAL NETWORK ANALYSIS (THE KINETIC NODE GRAPH VIEW) */}
      {activeSubTab === 'graph' && (
        <div className="glass-panel rounded-xl p-6 relative bg-[#0d1321]/40 w-full">
          <CyberBrackets active={selectedNode !== null} variant="purple" />
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-4 border-b border-white/5 pb-3">
            <span className="tracking-widest uppercase flex items-center gap-2">
              <Network className="w-4 h-4 text-cyber-purple" /> 2. Criminal Network Analysis (Kinetic Force Node Canvas)
            </span>
            <span className="text-[10px] text-slate-500">CLICK NODE TO SNAP BRACKETS LOCK ON TARGET DATA</span>
          </div>

          {/* Interactive Multi-Node Workspace Area */}
          <div className="w-full h-[480px] bg-slate-950 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-[0.03] pointer-events-none" />

            {/* SVG Interactive Edge Connector Links Rendering Vector Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="30%" x2="50%" y2="50%" stroke={hoveredNode === 'node-1' || hoveredNode === 'node-master' ? '#00FFCC' : 'rgba(255,255,255,0.08)'} strokeWidth={hoveredNode === 'node-1' || hoveredNode === 'node-master' ? '2' : '1'} className={hoveredNode === 'node-1' || hoveredNode === 'node-master' ? 'animate-pulse' : ''} />
              <line x1="75%" y1="35%" x2="50%" y2="50%" stroke={hoveredNode === 'node-2' || hoveredNode === 'node-master' ? '#00FFCC' : 'rgba(255,255,255,0.08)'} strokeWidth={hoveredNode === 'node-2' || hoveredNode === 'node-master' ? '2' : '1'} />
              <line x1="50%" y1="80%" x2="50%" y2="50%" stroke={hoveredNode === 'node-3' || hoveredNode === 'node-master' ? '#00FFCC' : 'rgba(255,255,255,0.08)'} strokeWidth={hoveredNode === 'node-3' || hoveredNode === 'node-master' ? '2' : '1'} />
            </svg>

            {/* NODE 1: CENTRAL PRIMARY LINK SUSPECT TARGET */}
            <div 
              onMouseEnter={() => setHoveredNode('node-master')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode('MASTER_SUSPECT_ANAND')}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 glass-panel rounded-xl cursor-pointer transition-all duration-300 font-mono z-20 ${
                selectedNode === 'MASTER_SUSPECT_ANAND' ? 'border-cyber-purple ring-2 ring-cyber-purple/30 shadow-neon-purple' : 'hover:border-cyber-cyan/60'
              }`}
              style={{ boxShadow: hoveredNode === 'node-master' ? '0px 0px 30px rgba(139, 92, 246, 0.4)' : '' }}
            >
              <CyberBrackets active={selectedNode === 'MASTER_SUSPECT_ANAND'} variant="purple" />
              <p className="text-xs font-bold text-slate-100">Anand Kumar (Primary Link)</p>
              <span className="text-[9px] text-cyber-purple uppercase block font-bold mt-0.5">CORE TARGET NODE</span>
            </div>

            {/* NODE 2: ADJACENT SUBSIDIARY VEHICLE MATRIX */}
            <div 
              onMouseEnter={() => setHoveredNode('node-1')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode('VEHICLE_LOG_KA01')}
              className={`absolute left-[25%] top-[30%] p-3 bg-slate-900 border border-white/10 rounded-lg cursor-pointer transition-all font-mono text-[11px] ${
                selectedNode === 'VEHICLE_LOG_KA01' ? 'border-cyber-cyan ring-1 ring-cyber-cyan/40' : ''
              }`}
            >
              <p className="text-slate-300">Vehicle: KA-01-M-9482</p>
              <span className="text-[8px] text-slate-500 uppercase block mt-0.5">LOGISTICS LINKED</span>
            </div>

            {/* NODE 3: ADJACENT SUBSIDIARY FINANCIAL FLOW MATRIX */}
            <div 
              onMouseEnter={() => setHoveredNode('node-2')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode('FINANCIAL_LOG_MOCK')}
              className={`absolute right-[20%] top-[35%] p-3 bg-slate-900 border border-white/10 rounded-lg cursor-pointer transition-all font-mono text-[11px] ${
                selectedNode === 'FINANCIAL_LOG_MOCK' ? 'border-cyber-cyan ring-1 ring-cyber-cyan/40' : ''
              }`}
            >
              <p className="text-slate-300">Escrow Flow Hash: #9421</p>
              <span className="text-[8px] text-slate-500 uppercase block mt-0.5">FINANCIAL CONTEXT</span>
            </div>

            {/* NODE 4: ADJACENT SUBSIDIARY LOCATION ANCHOR CHANNELS */}
            <div 
              onMouseEnter={() => setHoveredNode('node-3')}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode('LOCATION_MYS_CENTRAL')}
              className={`absolute left-[45%] bottom-[20%] p-3 bg-slate-900 border border-white/10 rounded-lg cursor-pointer transition-all font-mono text-[11px] ${
                selectedNode === 'LOCATION_MYS_CENTRAL' ? 'border-cyber-cyan ring-1 ring-cyber-cyan/40' : ''
              }`}
            >
              <p className="text-slate-300">Anchor: Mysore South Grid</p>
              <span className="text-[8px] text-slate-500 uppercase block mt-0.5">SPATIAL COORDINATE</span>
            </div>

            {/* Active Anchor Log View Data Block */}
            <div className="absolute bottom-4 left-4 p-3 bg-[#030712]/90 border border-white/10 rounded-lg font-mono text-[10px] text-slate-400 max-w-sm">
              <span className="text-cyber-cyan font-bold block uppercase mb-1">» ACTIVE SELECTED SECTOR ANALYSIS:</span>
              {selectedNode ? (
                <span className="text-slate-200 font-bold">Lock verification trace established on signature token: {selectedNode}. Multi-hop connection flow confirmed active.</span>
              ) : (
                <span>No selection token active. Intercept edge maps by registering clicks on canvas element layouts.</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INTERFACE 5: PROACTIVE CRIME PREVENTION INTELLIGENCE (THE COMMAND MAP VIEW) */}
      {activeSubTab === 'map' && (
        <div className="glass-panel rounded-xl p-6 relative bg-[#0d1321]/40">
          <CyberBrackets variant="cyan" />
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-4 border-b border-white/5 pb-3">
            <span className="tracking-widest uppercase flex items-center gap-2">
              <Map className="w-4 h-4 text-cyber-cyan" /> 5. Proactive Crime Prevention Intelligence (Tactical Geographic Overlay)
            </span>
          </div>

          {/* Stylized Dark-Mode Map Canvas Containment Framework Box */}
          <div className="w-full h-[440px] bg-[#030712] border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
            
            {/* Geometric Vector Layout Grid Mimicking Real Maps */}
            <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-15 pointer-events-none" />
            <div className="absolute w-[1px] h-full bg-cyber-cyan/10 left-1/3 border-dashed" />
            <div className="absolute w-[1px] h-full bg-cyber-purple/10 left-2/3 border-dashed" />
            <div className="absolute h-[1px] w-full bg-cyber-cyan/10 top-1/2 border-dashed" />

            {/* GLOWING PREDICTIVE ALERT NODE 1 */}
            <div 
              onClick={() => setSelectedMapAlert(predictiveAlerts[0])}
              className="absolute left-1/4 top-1/3 flex flex-col items-center cursor-pointer group z-20"
            >
              <div className="relative">
                <div className="absolute w-8 h-8 bg-rose-500/30 rounded-full -left-2 -top-2 animate-ping" />
                <div className="absolute w-4 h-4 bg-rose-600 rounded-full blur-xs" />
                <MapPin className="w-4 h-4 text-rose-400 relative z-10 group-hover:scale-125 transition-transform" />
              </div>
              <span className="bg-slate-950 text-rose-400 border border-rose-500/40 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded mt-1 shadow-md">
                PAT-CRITICAL (94%)
              </span>
            </div>

            {/* GLOWING PREDICTIVE ALERT NODE 2 */}
            <div 
              onClick={() => setSelectedMapAlert(predictiveAlerts[1])}
              className="absolute right-1/3 bottom-1/4 flex flex-col items-center cursor-pointer group z-20"
            >
              <div className="relative">
                <div className="absolute w-8 h-8 bg-cyber-purple/20 rounded-full -left-2 -top-2 animate-ping" />
                <div className="absolute w-4 h-4 bg-cyber-purple rounded-full blur-xs" />
                <MapPin className="w-4 h-4 text-cyber-purple relative z-10 group-hover:scale-125 transition-transform" />
              </div>
              <span className="bg-slate-950 text-cyber-purple border border-cyber-purple/40 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded mt-1 shadow-md">
                PAT-ELEVATED (81%)
              </span>
            </div>

            <div className="absolute top-4 right-4 bg-slate-900/90 border border-white/10 p-3 rounded-lg font-mono text-[9px] text-slate-500 max-w-xs leading-relaxed uppercase">
              <span className="text-slate-300 font-bold block mb-1">» RADIAL SIGNAL PULSE OVERLAY</span>
              Real-time threat alerts drop onto the geospatial plane context automatically. Register click to pop tactical instructions modal.
            </div>
          </div>

          {/* GLASSMORPHIC MODAL INTERACTION DRAWER FOR ALERT HIGHLIGHTS */}
          <AnimatePresence>
            {selectedMapAlert && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="mt-4 p-5 glass-panel rounded-xl relative bg-slate-950/90 border border-cyber-cyan/40"
              >
                <CyberBrackets variant="cyan" />
                <div className="flex items-start justify-between font-mono text-xs gap-4">
                  <div>
                    <span className="text-rose-400 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20 uppercase text-[9px]">
                      {selectedMapAlert.type} Target Signature Log
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-2 font-mono">{selectedMapAlert.target}</h4>
                    <p className="text-slate-400 mt-2 text-[11px]">
                      Recommended Deployment: <span className="text-cyber-cyan font-bold">{selectedMapAlert.deployment}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] text-slate-500 block">PROBABILITY SCORE</span>
                    <span className="text-xl font-bold text-cyber-cyan font-mono">{selectedMapAlert.probability}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                  <button 
                    onClick={() => setSelectedMapAlert(null)}
                    className="px-3 py-1 font-mono text-[10px] font-bold bg-slate-900 border border-white/10 text-slate-400 hover:text-slate-200 rounded cursor-pointer"
                  >
                    DISMISS DETAILS
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* INTERFACE 4: BEHAVIORAL PROFILING (THE DOSSIER VIEW) */}
      <div className="glass-panel rounded-xl p-6 relative bg-[#0d1321]/30">
        <CyberBrackets variant="cyan" />
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-400 mb-6 border-b border-white/5 pb-3">
          <Brain className="w-4 h-4 text-cyber-cyan" /> 4. Behavioral Profiling & Cognitive Risk Index Matrix (Dossier View Layout)
        </div>

        {/* Responsive Split-Pane Component Interface */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Left Pane: Wireframe Avatar Graphic Frame Block */}
          <div className="bg-slate-950/80 border border-white/10 rounded-xl min-h-[220px] relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-matrix bg-matrix-size opacity-10 pointer-events-none" />
            
            {/* Synthetic Silhouette Blueprint Canvas Shape Vector */}
            <div className="w-24 h-24 bg-gradient-to-b from-cyber-purple/20 to-transparent border border-cyber-purple/30 rounded-full relative flex items-center justify-center">
              <div className="w-12 h-12 bg-[#030712] border border-cyber-cyan/30 rounded-full relative z-10 flex items-center justify-center animate-pulse">
                <Brain className="w-5 h-5 text-cyber-cyan" />
              </div>
              <div className="absolute bottom-[-10px] w-20 h-10 bg-cyber-purple/10 border-t border-cyber-purple/40 rounded-t-xl" />
            </div>

            <div className="absolute top-2 left-3 text-[8px] font-mono text-slate-600">3D BLUEPRINT WIREFRAME ACTIVE</div>
          </div>

          {/* Right Pane: Psychological Traits & Modus Operandi Matrix Description */}
          <div className="md:col-span-2 space-y-4 font-mono text-xs flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-3 rounded-lg border border-white/5">
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Modus Operandi Footprint</span>
                <p className="text-slate-200 font-bold mt-1">High-Speed Mechanical Window-Grill Deconstruction</p>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-white/5">
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Psychological Vector Classification</span>
                <p className="text-slate-200 font-bold mt-1">Calculated Hedonistic Recidivist // Pre-Plotted Escape Channels</p>
              </div>
            </div>

            {/* Risk Indicator Pulsating Badges Section */}
            <div className="bg-slate-950/40 p-4 border border-white/10 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-tight">System Risk Threat Level Assignment:</span>
                <span className="text-slate-500 text-[9px] block mt-0.5">Calculated via OpenSearch Narrative Vector Distance Models</span>
              </div>
              
              {/* Dynamic Badges Array */}
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="bg-slate-900 border border-white/5 text-slate-500 px-2.5 py-1 rounded">LOW</span>
                <span className="bg-slate-900 border border-white/5 text-slate-500 px-2.5 py-1 rounded">MED</span>
                
                {/* HIGH RISK PULSATING BADGE CONTEXT */}
                <span className="bg-rose-950/60 text-rose-400 border border-rose-500 font-bold px-3 py-1 rounded animate-pulse shadow-[0px_0px_15px_rgba(244,63,94,0.4)] tracking-wider">
                  HIGH RISK STATUS
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};