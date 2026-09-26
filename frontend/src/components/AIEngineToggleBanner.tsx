"use client";

import React, { useEffect, useState } from 'react';
import { Cpu, ShieldCheck, WifiOff, Cloud } from 'lucide-react';

export function AIEngineToggleBanner() {
  const [activeProvider, setActiveProvider] = useState<string>('gemini');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/v1/ai/provider')
      .then(res => res.json())
      .then(data => {
        if (data.active_provider) setActiveProvider(data.active_provider);
      })
      .catch(() => {});
  }, []);

  const toggleProvider = async (newProvider: string) => {
    if (newProvider === activeProvider || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: newProvider })
      });
      if (res.ok) {
        const data = await res.json();
        setActiveProvider(data.active_provider);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${activeProvider === 'ollama' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
          {activeProvider === 'ollama' ? <WifiOff className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-white">AI Assistant Engine Mode:</h4>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
              activeProvider === 'ollama' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}>
              {activeProvider === 'ollama' ? '🔒 AIR-GAPPED OFFLINE (OLLAMA Llama 3)' : '🌐 CLOUD AI (GEMINI RAG)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {activeProvider === 'ollama'
              ? 'Executing on local workstation with ZERO outbound network connections.'
              : 'Grounded retrieval with pgvector semantic document chunking.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg border border-slate-700 self-stretch sm:self-auto justify-center">
        <button
          onClick={() => toggleProvider('gemini')}
          disabled={loading}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeProvider === 'gemini'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Cloud className="w-3.5 h-3.5" /> Gemini Cloud
        </button>

        <button
          onClick={() => toggleProvider('ollama')}
          disabled={loading}
          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeProvider === 'ollama'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <WifiOff className="w-3.5 h-3.5" /> Offline Ollama
        </button>
      </div>
    </div>
  );
}
