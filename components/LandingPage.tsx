import React from 'react';
import { Shield, ArrowRight, Activity, Lock, Share2, Heart, Code2, Github, Linkedin } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="h-screen w-full bg-[#0f172a] relative overflow-hidden flex flex-col items-center justify-center text-white selection:bg-indigo-500/30 font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)] origin-top opacity-30"></div>
      </div>

      <div className="z-10 text-center max-w-5xl px-6 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl relative transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <Shield size={64} className="text-indigo-400" />
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-indigo-200 animate-gradient-x leading-tight">
          Sentinel AI
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-400 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
          Enterprise-Grade <span className="text-indigo-400 font-medium">Multi-Cloud Security Architecture</span> Simulator.
          <br className="hidden md:block"/>
          <span className="text-base text-slate-500 mt-2 block">Visualize • Simulate • Secure</span>
        </p>

        {/* CTA Button */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={onStart}
            className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] flex items-center gap-3 overflow-hidden ring-1 ring-white/20"
          >
            <span className="relative z-10">Initialize Architecture Map</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-4xl mx-auto mb-20">
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
            <Activity className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform origin-left" size={28} />
            <h3 className="font-semibold text-lg mb-2 text-white">Traffic Simulator</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Visualize real-time data flows, identity authentication paths, and attack vectors across AWS, Azure, and GCP.</p>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
            <Lock className="text-orange-400 mb-4 group-hover:scale-110 transition-transform origin-left" size={28} />
            <h3 className="font-semibold text-lg mb-2 text-white">Zero Trust Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Deep dive into enterprise encryption (KMS), Identity Providers (IdP), and secure CI/CD supply chains.</p>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/60 backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
             <Share2 className="text-blue-400 mb-4 group-hover:scale-110 transition-transform origin-left" size={28} />
             <h3 className="font-semibold text-lg mb-2 text-white">For Aspirants</h3>
             <p className="text-slate-400 text-sm leading-relaxed">Created to help cybersecurity aspirants understand complex production-grade cloud patterns.</p>
          </div>
        </div>

        {/* Footer / Credits */}
        <div className="border-t border-slate-800/50 pt-8 w-full max-w-2xl flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
               <Code2 size={16} className="text-indigo-400" />
               <span>Created by <span className="text-white font-semibold">Purushotham Muktha</span></span>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/purushothammuktha" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-full hover:bg-white hover:text-slate-900 transition-colors text-slate-400 border border-slate-700"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/purushotham-muktha" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors text-slate-400 border border-slate-700"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-800">
               <span>Built with</span>
               <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
               <span>using AI</span>
               <span className="mx-1">•</span>
               <span>Shared with the Cybersecurity Community</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;