import React, { useState } from 'react';
import { useAuth, AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { WorkstationHeader } from './components/WorkstationHeader';
import { Dashboard } from './pages/Dashboard';
import { Investigate } from './pages/Investigate';
import { AuditTrail } from './pages/AuditTrail';
import { GlobalCanvasWrapper } from './components/GlobalCanvasWrapper';

// Advanced operational module components injection
import { VehicleDossier } from './pages/VehicleDossier';
import { TacticalMap } from './pages/TacticalMap';
import { SurveillanceTicker } from './pages/SurveillanceTicker';
import { AutomationHub } from './pages/AutomationHub';
import { FieldPWA } from './pages/FieldPWA';
import { AdvancedAnalytics } from './pages/AdvancedAnalytics';

// Copilot
import { KavachCopilot } from './components/KavachCopilot';

const WorkstationCoreAssembler: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleTabTransition = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col relative z-10 bg-transparent">
      <WorkstationHeader
        activeTab={
          activeTab === 'advanced_analytics' ||
          activeTab === 'vehicle_dossier' ||
          activeTab === 'tactical_map' ||
          activeTab === 'surveillance' ||
          activeTab === 'automation_hub' ||
          activeTab === 'field_pwa'
            ? 'advanced_analytics'
            : activeTab
        }
        setActiveTab={handleTabTransition}
      />

      <div className="bg-[#080d1a] border-b border-white/5 py-3 px-6 flex flex-wrap items-center gap-2 overflow-x-auto relative z-20">
        <span className="text-[10px] font-mono font-bold text-slate-500 mr-2 uppercase tracking-widest">
          Active Desks:
        </span>

        {[
          { id: 'dashboard', label: 'Dashboard View' },
          { id: 'investigate', label: 'Cognitive Bot Console' },
          { id: 'advanced_analytics', label: 'Advanced Metrics Matrix' },
          { id: 'vehicle_dossier', label: 'Vahan Dossier Hub' },
          { id: 'tactical_map', label: 'Command Geospatial Map' },
          { id: 'surveillance', label: 'ANPR Stream Feed' },
          { id: 'automation_hub', label: 'Legal Process Automation' },
          { id: 'field_pwa', label: 'Field Mobile Intercept' },
          { id: 'audit', label: 'Explainable Logs' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleTabTransition(btn.id)}
            className={`px-3 py-1.5 font-mono text-[10px] font-bold rounded border transition-all cursor-pointer ${
              activeTab === btn.id
                ? 'bg-cyan-950/40 text-[#00FFCC] border-[#00FFCC]/40 shadow-[0_0_15px_rgba(0,255,204,0.15)]'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 w-full max-w-7xl mx-auto relative z-10 bg-transparent">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'investigate' && <Investigate />}
        {activeTab === 'advanced_analytics' && <AdvancedAnalytics />}
        {activeTab === 'vehicle_dossier' && <VehicleDossier />}
        {activeTab === 'tactical_map' && <TacticalMap />}
        {activeTab === 'surveillance' && <SurveillanceTicker />}
        {activeTab === 'automation_hub' && <AutomationHub />}
        {activeTab === 'field_pwa' && <FieldPWA />}
        {activeTab === 'audit' && <AuditTrail />}
      </main>

      <KavachCopilot currentActiveTab={activeTab} />
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen w-full text-slate-200 bg-transparent">
      <AuthProvider>
        <GlobalCanvasWrapper>
          <WorkstationCoreAssembler />
        </GlobalCanvasWrapper>
      </AuthProvider>
    </div>
  );
}