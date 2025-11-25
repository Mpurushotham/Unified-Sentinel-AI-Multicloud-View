import React, { useState } from 'react';
import { Shield, Activity, Zap, LayoutGrid, Eye, AlertTriangle, BookOpen, CheckCircle2, Heart, Code2, Github, Linkedin } from 'lucide-react';
import ArchitectureMap from './components/ArchitectureMap';
import DetailPanel from './components/DetailPanel';
import LandingPage from './components/LandingPage';
import { SECURITY_COMPONENTS, THREAT_VECTORS, IMPLEMENTATION_PLAN } from './constants';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>('default'); // default, dataflow, threat-ddos, threat-sqli
  const [sidebarMode, setSidebarMode] = useState<'simulation' | 'plan'>('simulation');
  const [hoveredPhaseId, setHoveredPhaseId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedComponentId(id);
  };

  const handleTabChange = (mode: 'simulation' | 'plan') => {
    setSidebarMode(mode);
    if (mode === 'plan') {
      setActiveView('default'); // Reset view to clear threats when planning
      setHoveredPhaseId(null);
    }
  };

  const selectedComponent = SECURITY_COMPONENTS.find(c => c.id === selectedComponentId) || null;

  // Derive highlighted IDs from the hovered phase
  const planHighlightedIds = hoveredPhaseId 
    ? IMPLEMENTATION_PLAN.find(p => p.id === hoveredPhaseId)?.relatedComponents || []
    : [];

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-white overflow-hidden flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-20 shrink-0 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowLanding(true)}>
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/20 ring-1 ring-white/10">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Sentinel AI <span className="text-slate-500 font-normal hidden sm:inline">| Enterprise Security Architecture</span></h1>
            <p className="text-xs text-slate-400">Multi-Cloud Threat Defense & Compliance Visualization</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-emerald-400 text-xs font-medium">System Operational</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-xs">AI Model: Gemini 2.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex min-h-0 overflow-hidden">
        
        {/* Left Sidebar - Tabbed Controls */}
        <div className="w-96 bg-slate-900/90 border-r border-slate-800 flex flex-col z-10 backdrop-blur-md shadow-2xl shrink-0 h-full">
          
          {/* Sidebar Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/50 shrink-0">
            <button 
              onClick={() => handleTabChange('simulation')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-b-2 relative overflow-hidden group
                ${sidebarMode === 'simulation' ? 'text-indigo-400 border-indigo-500 bg-slate-800/50' : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30'}`}
            >
              <div className={`absolute inset-0 bg-indigo-500/5 transition-transform duration-500 ${sidebarMode === 'simulation' ? 'translate-y-0' : 'translate-y-full'}`}></div>
              <Activity size={16} /> Interactive Sim
            </button>
            <button 
              onClick={() => handleTabChange('plan')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-b-2 relative overflow-hidden group
                ${sidebarMode === 'plan' ? 'text-emerald-400 border-emerald-500 bg-slate-800/50' : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30'}`}
            >
              <div className={`absolute inset-0 bg-emerald-500/5 transition-transform duration-500 ${sidebarMode === 'plan' ? 'translate-y-0' : 'translate-y-full'}`}></div>
              <BookOpen size={16} /> Execution Plan
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent p-6">
            
            {sidebarMode === 'simulation' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                {/* View Modes */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Eye size={14} /> Visibility Layers
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => setActiveView('default')}
                      className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all border group relative overflow-hidden
                        ${activeView === 'default' ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-slate-800 hover:bg-slate-800 hover:border-slate-600 text-slate-400'}`}
                    >
                      <div className={`p-2 rounded-lg ${activeView === 'default' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                        <LayoutGrid size={18} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold block group-hover:text-white transition-colors">Architecture Map</span>
                        <span className="text-[10px] opacity-70">Full topology view</span>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setActiveView('dataflow')}
                      className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all border group relative overflow-hidden
                        ${activeView === 'dataflow' ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-slate-800 hover:bg-slate-800 hover:border-slate-600 text-slate-400'}`}
                    >
                      {/* Animated Background for Traffic Simulator */}
                      {activeView === 'dataflow' && (
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-flow opacity-30 pointer-events-none"></div>
                      )}
                      
                      <div className={`p-2 rounded-lg ${activeView === 'dataflow' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'}`}>
                        <Activity size={18} />
                      </div>
                      <div>
                         <span className="text-sm font-semibold block group-hover:text-white transition-colors">Traffic Simulator</span>
                         <span className="text-[10px] opacity-70">Visualize Logs & Traffic Signals</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Threat Scenarios */}
                <div>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} /> Threat Simulation
                  </h3>
                  <div className="space-y-3">
                    {THREAT_VECTORS.map(threat => (
                      <button 
                        key={threat.id}
                        onClick={() => setActiveView(threat.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border flex items-center gap-3 transition-all group relative overflow-hidden
                          ${activeView === threat.id 
                            ? 'bg-red-500/10 border-red-500/50 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                            : 'border-slate-800 hover:border-red-900/50 text-slate-400 hover:text-red-200 bg-slate-900/50'}`}
                      >
                         {/* Animated Danger Stripe for active threats */}
                         {activeView === threat.id && (
                           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(220,38,38,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-flow opacity-30 pointer-events-none"></div>
                         )}

                        <div className={`p-2 rounded-lg transition-colors ${activeView === threat.id ? 'bg-red-500 text-white' : 'bg-slate-800 group-hover:bg-red-900/50 text-slate-500 group-hover:text-red-400'}`}>
                          <Zap size={16} />
                        </div>
                        <div className="flex-1 z-10">
                          <span className="text-sm font-bold block">{threat.name}</span>
                          <span className="text-[10px] opacity-70 block">{threat.severity} Risk Level</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                 {/* Context Legend */}
                <div className="pt-6 border-t border-slate-800/50">
                   <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Provider Legend</h3>
                   <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider">
                     <div className="px-2 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">AWS</div>
                     <div className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Azure</div>
                     <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">GCP</div>
                     <div className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Core</div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-10">
                <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900 border border-emerald-500/20 p-4 rounded-xl mb-6">
                  <h3 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-2">
                    <BookOpen size={16} /> Strategic Rollout
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Hover over steps to highlight the architecture.
                  </p>
                </div>

                <div className="space-y-0 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-800/50"></div>

                  {IMPLEMENTATION_PLAN.map((phase, idx) => {
                    const isHovered = hoveredPhaseId === phase.id;
                    return (
                    <div 
                      key={phase.id} 
                      className="relative pl-10 pb-8 last:pb-0 group cursor-default"
                      onMouseEnter={() => setHoveredPhaseId(phase.id)}
                      onMouseLeave={() => setHoveredPhaseId(null)}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-[12px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 box-content
                        ${isHovered ? 'bg-emerald-500 border-emerald-900 scale-125 shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-slate-900 border-slate-700 group-hover:border-emerald-500/50'}`}>
                      </div>
                      
                      {/* Card */}
                      <div className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden
                        ${isHovered 
                          ? 'bg-slate-800 border-emerald-500/50 shadow-xl translate-x-1' 
                          : 'bg-slate-900/30 border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-700'}`}>
                        
                        {isHovered && <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>}

                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider
                             ${isHovered ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {phase.phase}
                          </span>
                        </div>

                        <h4 className={`text-sm font-bold mb-3 ${isHovered ? 'text-white' : 'text-slate-300'}`}>
                          {phase.title}
                        </h4>

                        <ul className="space-y-3">
                          {phase.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3">
                              <CheckCircle2 size={12} className={`mt-0.5 shrink-0 transition-colors ${isHovered ? 'text-emerald-400' : 'text-slate-700'}`} />
                              <div>
                                <span className={`text-xs font-medium block mb-0.5 ${isHovered ? 'text-slate-200' : 'text-slate-400'}`}>{step.title}</span>
                                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{step.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer with Credits */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                 <Code2 size={14} className="text-indigo-400" />
                 <span>By Purushotham Muktha</span>
               </div>
               
               {/* Social Links Small */}
               <div className="flex gap-2 mb-1">
                 <a href="https://github.com/purushothammuktha" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-slate-800 rounded hover:bg-white hover:text-slate-900 transition-colors text-slate-500"><Github size={14}/></a>
                 <a href="https://www.linkedin.com/in/purushotham-muktha" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-slate-800 rounded hover:bg-[#0077b5] hover:text-white transition-colors text-slate-500"><Linkedin size={14}/></a>
               </div>

               <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                 <span>Built with</span>
                 <Heart size={10} className="text-red-500 fill-red-500" />
                 <span>using AI</span>
               </div>
            </div>
          </div>
        </div>

        {/* Center - Visualization */}
        <div className="flex-1 relative bg-slate-950 flex flex-col min-w-0 h-full">
          {/* Top Bar Status for Plan Mode */}
          {sidebarMode === 'plan' && hoveredPhaseId && (
             <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
               <div className="bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                 <div className="bg-emerald-500/20 p-1.5 rounded-full">
                    <BookOpen size={14} className="text-emerald-400" />
                 </div>
                 <span className="text-sm font-semibold text-emerald-100 tracking-wide">
                   Visualizing: <span className="text-emerald-400">{IMPLEMENTATION_PLAN.find(p => p.id === hoveredPhaseId)?.title}</span>
                 </span>
               </div>
             </div>
          )}

          <div className="flex-1 overflow-hidden relative">
            <ArchitectureMap 
              components={SECURITY_COMPONENTS} 
              onSelect={handleSelect} 
              selectedId={selectedComponentId}
              activeView={activeView}
              highlightedIds={planHighlightedIds}
            />
          </div>
        </div>

        {/* Right - Detail Panel (Slide over) */}
        <DetailPanel 
          component={selectedComponent} 
          onClose={() => setSelectedComponentId(null)} 
        />

      </main>
    </div>
  );
};

export default App;