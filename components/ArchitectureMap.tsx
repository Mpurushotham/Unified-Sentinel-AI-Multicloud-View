import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SecurityComponent, CloudProvider, ArchitectureFlow } from '../types';
import { ARCHITECTURE_FLOWS } from '../constants';
import { Lock, Shield, Globe, Server, Database, Eye, Activity, Zap, FileCheck, Layers, ZoomIn, ZoomOut, Maximize, MousePointer2, Key, Fingerprint, GitBranch, Box, FileKey } from 'lucide-react';

interface ArchitectureMapProps {
  components: SecurityComponent[];
  onSelect: (id: string) => void;
  selectedId: string | null;
  activeView: string; 
  highlightedIds?: string[]; 
}

// Icon mapping helper
const getIcon = (iconName: string, size = 16, className = "") => {
  const props = { size, className };
  switch(iconName) {
    case 'Shield': return <Shield {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Server': return <Server {...props} />;
    case 'Database': return <Database {...props} />;
    case 'Eye': return <Eye {...props} />;
    case 'Activity': return <Activity {...props} />;
    case 'Zap': return <Zap {...props} />;
    case 'FileCheck': return <FileCheck {...props} />;
    case 'Layers': return <Layers {...props} />;
    case 'Key': return <Key {...props} />;
    case 'Vault': return <FileKey {...props} />; // Using FileKey for Vault for now, or could use Lock
    case 'Fingerprint': return <Fingerprint {...props} />;
    case 'GitBranch': return <GitBranch {...props} />;
    case 'Container': return <Box {...props} />;
    default: return <Activity {...props} />;
  }
};

const ArchitectureMap: React.FC<ArchitectureMapProps> = ({ 
  components, 
  onSelect, 
  selectedId, 
  activeView,
  highlightedIds = []
}) => {
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);
  
  // Pan & Zoom State
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus Logic
  const focusId = hoveredComponentId || selectedId;
  const isPlanMode = highlightedIds.length > 0;
  const isDataFlow = activeView === 'dataflow';

  // Layout Constants
  const positions: Record<string, {x: number, y: number}> = {
    // Core (Middle/Top)
    'internet': { x: 600, y: 50 },
    'idp-core': { x: 450, y: 150 }, // Identity Provider
    'attacker': { x: 900, y: 100 },
    
    // Core Ops (Left/Middle)
    'cicd-core': { x: 100, y: 350 }, // Pipeline
    'siem-core': { x: 600, y: 350 }, // Central SIEM
    'cspm-core': { x: 600, y: 450 },

    // AWS (Left Side)
    'aws-waf': { x: 300, y: 250 },
    'aws-kms': { x: 200, y: 250 }, // Encryption
    'aws-workload': { x: 300, y: 350 },
    'aws-guardduty': { x: 200, y: 450 },

    // Azure (Right Side)
    'azure-fw': { x: 900, y: 250 },
    'azure-kv': { x: 1000, y: 250 }, // Key Vault
    'azure-db': { x: 900, y: 350 },
    'azure-defender': { x: 1000, y: 450 },

    // GCP (Bottom)
    'gcp-armor': { x: 500, y: 600 },
    'gcp-repo': { x: 400, y: 700 }, // Artifact Registry
    'gcp-kms': { x: 800, y: 700 }, // Cloud KMS
    'gcp-scc': { x: 700, y: 600 },
  };
  
  const getPos = (id: string) => positions[id] || { x: 600, y: 350 }; // Default to center if unknown

  // --- Pan / Zoom Handlers ---

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom centered on cursor could be implemented, keeping it simple centered zoom for now
    const scaleAdjustment = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(0.4, transform.scale + scaleAdjustment), 3);
    setTransform(prev => ({ ...prev, scale: newScale }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Center the view initially or on reset
  useEffect(() => {
    // Optional: Auto-center logic could go here
    if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Center around 600, 350
        setTransform({
            x: clientWidth / 2 - 600,
            y: clientHeight / 2 - 350,
            scale: 0.8 // Zoom out slightly to fit new components
        });
    }
  }, []);

  const handleResetView = () => {
    if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setTransform({
            x: clientWidth / 2 - 600,
            y: clientHeight / 2 - 350,
            scale: 0.8
        });
    }
  };


  // --- Connectivity Logic ---

  const { relatedComponentIds, relatedFlowIds } = useMemo(() => {
    const rComps = new Set<string>();
    const rFlows = new Set<string>();

    if (focusId && !isPlanMode) {
      rComps.add(focusId);
      ARCHITECTURE_FLOWS.forEach(flow => {
        const isVisible = flow.activeInModes.includes(activeView) || 
                          (activeView.startsWith('threat-') && flow.activeInModes.includes(activeView));
        if (isVisible) {
          if (flow.from === focusId) { rComps.add(flow.to); rFlows.add(flow.id); }
          if (flow.to === focusId) { rComps.add(flow.from); rFlows.add(flow.id); }
        }
      });
    }
    return { relatedComponentIds: rComps, relatedFlowIds: rFlows };
  }, [focusId, activeView, isPlanMode]);


  // --- Renderers ---

  const renderFlows = () => {
    return ARCHITECTURE_FLOWS.map((flow) => {
      const isVisible = flow.activeInModes.includes(activeView) || 
                        (activeView.startsWith('threat-') && flow.activeInModes.includes(activeView));
      if (!isVisible) return null;

      const start = getPos(flow.from);
      const end = getPos(flow.to);
      const isHovered = hoveredFlow === flow.id;
      const isThreat = flow.type === 'ATTACK';
      
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2 - (Math.abs(start.x - end.x) * 0.1); // Dynamic curvature

      const color = isThreat ? '#ef4444' : flow.type === 'LOGGING' ? '#a855f7' : '#3b82f6';
      
      let isFlowDimmed = false;
      let opacity = 1;

      if (isPlanMode) {
         const isRelevantToPlan = highlightedIds.includes(flow.from) && highlightedIds.includes(flow.to);
         isFlowDimmed = !isRelevantToPlan;
         opacity = isRelevantToPlan ? 1 : 0.05;
      } else {
         isFlowDimmed = focusId ? !relatedFlowIds.has(flow.id) : false;
         opacity = isFlowDimmed ? 0.05 : (isHovered ? 1 : 0.6);
      }

      // Dynamic stroke width
      const strokeWidth = isHovered ? 3 : (isThreat ? 2 : 1.5);
      
      // Dynamic dashed effect for DataFlow mode
      // "10 10" works well with the 100 offset animation in index.html (multiple of 20)
      const strokeDasharray = isDataFlow ? "10 10" : (flow.type === 'LOGGING' ? "4 4" : "none");

      // Select Actor Shape
      let actorHref = "#actor-traffic";
      if (flow.type === 'ATTACK') actorHref = "#actor-threat";
      if (flow.type === 'LOGGING') actorHref = "#actor-log";

      return (
        <g 
          key={flow.id} 
          onMouseEnter={() => setHoveredFlow(flow.id)}
          onMouseLeave={() => setHoveredFlow(null)}
          className="transition-all duration-300"
          style={{ opacity }}
        >
          {/* Pulse Underlay (Only in DataFlow mode) */}
          {isDataFlow && !isFlowDimmed && (
             <path 
               d={`M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`} 
               stroke={color} 
               strokeWidth={strokeWidth + 4}
               fill="none"
               strokeLinecap="round"
               className="animate-pulse-glow"
             />
          )}

          {/* Main Path */}
          <path 
            id={`path-${flow.id}`}
            d={`M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`} 
            stroke={color} 
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            className={`transition-all duration-300 ${isDataFlow ? 'animate-flow' : ''}`}
            filter={isHovered || isThreat ? `url(#glow-${isThreat ? 'threat' : 'blue'})` : undefined}
          />

          {/* Hit Area */}
          <path 
             d={`M${start.x},${start.y} Q${midX},${midY} ${end.x},${end.y}`} 
             stroke="transparent" 
             strokeWidth="24" 
             fill="none" 
             className="cursor-pointer"
          />

          {/* Animation Actor (Particle) */}
          {!isFlowDimmed && (
            <g>
              <animateMotion 
                dur={isThreat ? "0.8s" : (isDataFlow ? "1s" : (flow.type === 'LOGGING' ? "3s" : "1.5s"))} 
                repeatCount="indefinite" 
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#path-${flow.id}`} />
              </animateMotion>
              <use href={actorHref} fill={isThreat ? '#fecaca' : '#bfdbfe'} />
            </g>
          )}
        </g>
      );
    });
  };

  const renderComponent = (comp: SecurityComponent) => {
    const pos = getPos(comp.id);
    const isSelected = selectedId === comp.id;
    const isHovered = hoveredComponentId === comp.id;
    const isThreatView = activeView.startsWith('threat-');
    
    let isDimmed = false;
    if (isPlanMode) {
      isDimmed = !highlightedIds.includes(comp.id);
    } else {
      const isThreatDimmed = isThreatView && comp.provider !== CloudProvider.EXTERNAL && 
        !ARCHITECTURE_FLOWS.find(f => f.activeInModes.includes(activeView) && (f.to === comp.id || f.from === comp.id));
      const isFocusDimmed = focusId ? !relatedComponentIds.has(comp.id) : false;
      isDimmed = isFocusDimmed || (!focusId && isThreatDimmed);
    }

    const colorMap: Record<string, string> = {
      [CloudProvider.AWS]: '#f97316',
      [CloudProvider.AZURE]: '#3b82f6',
      [CloudProvider.GCP]: '#22c55e',
      [CloudProvider.CORE]: '#a855f7',
      [CloudProvider.EXTERNAL]: '#94a3b8'
    };

    const color = colorMap[comp.provider];
    
    // Scale animation
    const scale = isHovered || isSelected ? 1.2 : 1;

    return (
      <g 
        key={comp.id} 
        transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
        onClick={(e) => { e.stopPropagation(); onSelect(comp.id); }}
        onMouseEnter={() => setHoveredComponentId(comp.id)}
        onMouseLeave={() => setHoveredComponentId(null)}
        className="cursor-pointer transition-transform duration-300 ease-out"
        style={{ 
          opacity: isDimmed ? 0.15 : 1, 
          filter: isDimmed ? 'grayscale(100%) blur(1px)' : undefined
        }}
      >
        {/* Glow Layer */}
        {(isHovered || isSelected || (!isDimmed && (isPlanMode || isDataFlow))) && (
           <circle r="35" fill={color} opacity="0.2" filter="url(#glow-soft)" className="animate-pulse" />
        )}
        
        {/* Outer Ring */}
        <circle 
          r="26" 
          fill="#0f172a" 
          stroke={color} 
          strokeWidth={isSelected ? 3 : 2}
          strokeOpacity={isHovered ? 1 : 0.8}
        />

        {/* Inner Circle background */}
        <circle r="22" fill="#1e293b" />

        {/* Icon */}
        <foreignObject x="-12" y="-12" width="24" height="24" className="pointer-events-none text-white overflow-visible">
          <div className="flex items-center justify-center h-full w-full">
             {getIcon(comp.icon, 20, isHovered ? "text-white" : "text-slate-300")}
          </div>
        </foreignObject>

        {/* Threat Alert Badge */}
        {activeView.startsWith('threat-') && !isDimmed && comp.provider !== CloudProvider.EXTERNAL && (
           <g transform="translate(18, -18)">
             <circle r="8" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" className="animate-bounce" />
             <text y="3" x="0" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">!</text>
           </g>
        )}
      </g>
    );
  };

  // --- HTML Tooltip ---
  const renderTooltip = () => {
    if (!hoveredComponentId) return null;
    const comp = components.find(c => c.id === hoveredComponentId);
    if (!comp) return null;

    const pos = getPos(comp.id);
    
    // Calculate screen position based on transform
    // We add an offset to not cover the node
    const screenX = transform.x + (pos.x * transform.scale);
    const screenY = transform.y + (pos.y * transform.scale) - (40 * transform.scale); 

    const colorMap: Record<string, string> = {
      [CloudProvider.AWS]: 'border-orange-500 text-orange-400',
      [CloudProvider.AZURE]: 'border-blue-500 text-blue-400',
      [CloudProvider.GCP]: 'border-green-500 text-green-400',
      [CloudProvider.CORE]: 'border-purple-500 text-purple-400',
      [CloudProvider.EXTERNAL]: 'border-slate-500 text-slate-400'
    };

    return (
      <div 
        className="absolute z-50 pointer-events-none"
        style={{ 
          left: screenX, 
          top: screenY,
          transform: 'translate(-50%, -100%)' 
        }}
      >
        <div className={`
          bg-slate-900/90 backdrop-blur-xl border p-4 rounded-xl shadow-2xl mb-3 w-64
          animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200
          ${colorMap[comp.provider]}
        `}>
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
             {getIcon(comp.icon, 16)}
             <span className="font-bold text-sm text-white">{comp.name}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">{comp.description}</p>
          <div className="flex gap-2">
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase tracking-wide font-bold">
               {comp.provider}
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase tracking-wide font-bold">
               {comp.domain}
            </span>
          </div>
        </div>
        
        {/* Connector Triangle */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-800 absolute left-1/2 -translate-x-1/2 bottom-1"></div>
      </div>
    );
  };

  return (
    <div 
        ref={containerRef}
        className="w-full h-full bg-slate-950 relative overflow-hidden cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform-origin:center_top] [transform:perspective(500px)_rotateX(60deg)_translateY(0)] animate-[flow-vertical_20s_linear_infinite]"></div>
      </div>

      <svg width="100%" height="100%" className="absolute inset-0 select-none">
        <defs>
          <radialGradient id="gradCore" cx="0.5" cy="0.5" r="0.5">
             <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
             <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-threat">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feFlood floodColor="#ef4444" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow_colored" />
            <feMerge>
              <feMergeNode in="softGlow_colored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feFlood floodColor="#3b82f6" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow_colored" />
            <feMerge>
              <feMergeNode in="softGlow_colored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Actor: Traffic (Arrow) */}
          <g id="actor-traffic">
             <path d="M-4 0 L4 0 M2 -3 L5 0 L2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
             <circle r="3" fill="white" opacity="0.8" />
          </g>

          {/* Actor: Threat (Spiky) */}
          <g id="actor-threat">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="currentColor" />
          </g>

          {/* Actor: Log (Block) */}
          <g id="actor-log">
             <rect x="-3" y="-3" width="6" height="6" rx="1" fill="currentColor" stroke="white" strokeWidth="1" />
          </g>
        </defs>
        
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
            
            {/* Context Labels - Fixed positions in world space */}
            <circle cx={600} cy={400} r="350" fill="url(#gradCore)" pointerEvents="none" />
            
            <text x="300" y="200" fill="#f97316" textAnchor="middle" opacity="0.3" fontSize="16" fontWeight="bold" letterSpacing="0.2em">AWS VPC</text>
            <text x="900" y="200" fill="#3b82f6" textAnchor="middle" opacity="0.3" fontSize="16" fontWeight="bold" letterSpacing="0.2em">AZURE VNET</text>
            <text x="600" y="680" fill="#22c55e" textAnchor="middle" opacity="0.3" fontSize="16" fontWeight="bold" letterSpacing="0.2em">GCP VPC</text>

            {renderFlows()}
            
            {/* Draw Components last to be on top */}
            {components.map(renderComponent)}
        </g>
      </svg>
      
      {/* HTML Tooltips Layer */}
      {renderTooltip()}

      {/* Navigation Controls Dock */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-50">
        <button onClick={() => setTransform(t => ({...t, scale: t.scale + 0.1}))} className="bg-slate-800/90 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors shadow-lg border border-slate-700">
           <ZoomIn size={20} />
        </button>
        <button onClick={() => setTransform(t => ({...t, scale: Math.max(0.4, t.scale - 0.1)}))} className="bg-slate-800/90 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors shadow-lg border border-slate-700">
           <ZoomOut size={20} />
        </button>
        <button onClick={handleResetView} className="bg-slate-800/90 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors shadow-lg border border-slate-700" title="Reset View">
           <Maximize size={20} />
        </button>
      </div>

      {/* Helper Text */}
      <div className="absolute bottom-6 left-6 pointer-events-none opacity-50 flex items-center gap-2 text-xs text-slate-400">
         <MousePointer2 size={12} />
         <span>Drag to Pan • Scroll to Zoom</span>
      </div>

    </div>
  );
};

export default ArchitectureMap;