"use client";

import React, { useState } from 'react';
import { Search, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { AIEngineToggleBanner } from '@/components/AIEngineToggleBanner';
import { CrossJurisdictionRadar } from '@/components/CrossJurisdictionRadar';

export default function AISearchPage() {
  const [query, setQuery] = useState('Find forensic reports related to Evidence EV-2026-0017.');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: 'NV-2026-001', query })
      });
      const data = await res.json();
      setResponse(data);
    } catch {
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Air-Gapped Offline Ollama vs Cloud Gemini Toggle Header */}
      <AIEngineToggleBanner />

      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Search className="w-5 h-5 text-govblue" /> Natural Language AI Semantic Search
        </h2>
        <p className="text-xs text-muted mt-1">
          Permission-scoped search retrieving authorized case records using pgvector embeddings & dynamic AI provider switching.
        </p>

        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 p-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="Search authorized case records..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-navy text-white font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-saffron" /> {loading ? 'Searching...' : 'Search Context'}
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy">
              <Bot className="w-4 h-4 text-govblue" /> Ranked Search Results
            </div>
            {response.active_provider && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                Engine: {response.active_provider}
              </span>
            )}
          </div>
          <p className="text-sm text-text whitespace-pre-line leading-relaxed">{response.answer}</p>
        </div>
      )}

      {/* Cross-Jurisdiction Entity Extraction Radar */}
      <CrossJurisdictionRadar />
    </div>
  );
}
