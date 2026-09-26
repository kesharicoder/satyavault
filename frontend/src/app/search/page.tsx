"use client";

import React, { useState } from 'react';
import { Search, Bot, Sparkles, AlertCircle } from 'lucide-react';

export default function IntelligenceSearchPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', query })
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
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Bot className="w-5 h-5 text-saffron" /> AI Intelligence & Source-Grounded Search
        </h2>
        <p className="text-xs text-muted mt-1">
          Query case documents using permission-scoped RAG. Access is restricted to assigned cases only.
        </p>

        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question (e.g. What evidence drives were seized in FIR 0482?)..."
            className="flex-1 p-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-navy hover:bg-navy-dark text-white font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-saffron" /> {loading ? 'Searching...' : 'Search Context'}
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy border-b border-border pb-2">
            <Bot className="w-4 h-4 text-govblue" /> Factual Answer (Grounded in Authorized Records)
          </div>
          <p className="text-sm text-text whitespace-pre-line leading-relaxed">{response.answer}</p>
          
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-govamber shrink-0 mt-0.5" />
            <span>{response.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
}
