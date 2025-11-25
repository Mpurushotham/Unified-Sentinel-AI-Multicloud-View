import React, { useEffect, useState } from 'react';
import { SecurityComponent, AIAnalysis, CloudProvider } from '../types';
import { analyzeComponent } from '../services/geminiService';
import { Bot, ShieldCheck, TrendingUp, Cpu, X, Loader2, Sparkles, FileText, Database, Activity } from 'lucide-react';

interface DetailPanelProps {
  component: SecurityComponent | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ component, onClose }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAi, setShowAi] = useState(false);

  // Reset state when component changes
  useEffect(() => {
    setAnalysis(null);
    setShowAi(false);
    setLoading(false);
  }, [component]);

  const handleRunAi = () => {
    if (component && !analysis) {
      setLoading(true);
      setShowAi(true);
      analyzeComponent(component)
        .then((data) => setAnalysis(data))
        .catch(() => setShowAi(false)) // simple error handling
        .finally(() => setLoading(false));
    } else {
      setShowAi(true);
    }
  };

  if (!component) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto font-sans">
      <div className="p-6 min-h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                ${component.provider === 'AWS' ? 'bg-orange-500/20 text-orange-400' : 
                  component.provider === 'AZURE' ? 'bg-blue-500/20 text-blue-400' :
                  component.provider === 'GCP' ? 'bg-green-500/20 text-green-400' :
                  component.provider === 'CORE' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-slate-500/20 text-slate-400'}`}>
                {component.provider}
              </span>
              <span className="text-slate-400 text-xs uppercase tracking-wider">{component.domain}</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">{component.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Basic Description */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-slate-300 leading-relaxed text-sm">{component.description}</p>
        </div>

        {/* Compliance & Mitigation (Production Grade Data) */}
        <div className="space-y-6 mb-8">
          
          {/* Data Captured */}
          {component.dataCaptured && component.dataCaptured.length > 0 && (
             <div className="animate-fade-in-up">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                 <Database size={14} /> Data Ingestion
               </h3>
               <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                 <table className="w-full text-left text-xs">
                   <thead className="bg-slate-800/50 text-slate-400">
                     <tr>
                       <th className="p-2">Source</th>
                       <th className="p-2">Type</th>
                       <th className="p-2">Mechanism</th>
                     </tr>
                   </thead>
                   <tbody className="text-slate-300">
                     {component.dataCaptured.map((d, i) => (
                       <tr key={i} className="border-t border-slate-700/50">
                         <td className="p-2 font-medium text-indigo-300">{d.source}</td>
                         <td className="p-2">{d.type}</td>
                         <td className="p-2 text-slate-400">{d.mechanism}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {/* Compliance Badges */}
          {component.compliance && component.compliance.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText size={14} /> Compliance Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {component.compliance.map(c => (
                  <span key={c} className="px-3 py-1 bg-emerald-900/30 border border-emerald-700/50 text-emerald-400 text-xs rounded-full font-mono">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Threats Mitigated */}
          {component.mitigates && component.mitigates.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck size={14} /> Mitigated Threats
              </h3>
              <div className="flex flex-wrap gap-2">
                {component.mitigates.map(m => (
                  <span key={m} className="px-3 py-1 bg-red-900/20 border border-red-800/50 text-red-300 text-xs rounded-md flex items-center gap-1">
                    <Activity size={10} /> {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Section Divider */}
        <div className="border-t border-slate-800 my-4"></div>

        {/* AI Analysis (On Demand) */}
        <div className="flex-1 flex flex-col">
          {!showAi ? (
            <button 
              onClick={handleRunAi}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all group"
            >
              <Sparkles size={18} className="group-hover:animate-spin-slow" />
              Generate Advanced AI Analysis
            </button>
          ) : (
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4 text-cyan-400">
                <Sparkles size={20} className={loading ? "animate-pulse" : ""} />
                <h3 className="text-lg font-semibold tracking-wide">Gemini Security Insights</h3>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-slate-800 rounded-lg bg-slate-800/20">
                  <Loader2 className="animate-spin text-cyan-500" size={32} />
                  <p className="text-slate-400 text-sm animate-pulse">Consulting knowledge base...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="group">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Bot size={18} className="text-purple-400" />
                      <h4 className="font-medium text-sm">Architectural Role</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pl-6 border-l-2 border-slate-700 group-hover:border-purple-500 transition-colors">
                      {analysis.summary}
                    </p>
                  </div>

                  {/* Business Value */}
                  <div className="group">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <TrendingUp size={18} className="text-blue-400" />
                      <h4 className="font-medium text-sm">Business Value</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed pl-6 border-l-2 border-slate-700 group-hover:border-blue-500 transition-colors">
                      {analysis.businessValue}
                    </p>
                  </div>

                  {/* Tech Specs */}
                  <div className="group">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Cpu size={18} className="text-orange-400" />
                      <h4 className="font-medium text-sm">Deep Technical Specs</h4>
                    </div>
                    <ul className="space-y-2 pl-6 border-l-2 border-slate-700 group-hover:border-orange-500 transition-colors">
                      {analysis.technicalDetails.map((detail, idx) => (
                        <li key={idx} className="text-slate-400 text-xs flex items-start gap-2">
                          <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-400 py-8">
                  Analysis failed.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;