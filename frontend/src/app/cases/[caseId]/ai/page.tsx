"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';

export default function CaseAIPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';
  const [query, setQuery] = useState(`Summarize key findings and evidence references for case ${caseId}.`);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: caseId, query })
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
          <Bot className="w-5 h-5 text-saffron" /> Source-Grounded Case AI — {caseId}
        </h2>
        <p className="text-xs text-muted mt-1">Factual context retrieval grounded strictly in vaulted case documents</p>

        <form onSubmit={handleAsk} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 p-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-navy hover:bg-navy-dark text-white font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-saffron" /> {loading ? 'Thinking...' : 'Ask Assistant'}
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <p className="text-sm text-text whitespace-pre-line leading-relaxed">{response.answer}</p>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-govamber shrink-0 mt-0.5" />
            <span>AI-generated information is decision-support and must be verified by an authorized officer.</span>
          </div>
        </div>
      )}
    </div>
  );
}
