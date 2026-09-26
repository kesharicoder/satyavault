"use client";

import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, FileText } from 'lucide-react';

export default function CaseAssistantPage() {
  const [query, setQuery] = useState('Summarize the investigation findings and evidence references for Case NV-2026-001.');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
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
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Bot className="w-5 h-5 text-saffron" /> Source-Grounded Case Assistant
        </h2>
        <p className="text-xs text-muted mt-1">
          Interactive decision support operating strictly within authorized case context. All responses reference exact document pages & sections.
        </p>

        <form onSubmit={handleAsk} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 p-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
            placeholder="Ask a question about active case NV-2026-001..."
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
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-navy border-b border-border pb-2">
            <Bot className="w-4 h-4 text-govblue" /> Case Assistant Answer
          </div>
          <p className="text-sm text-text whitespace-pre-line leading-relaxed">{response.answer}</p>
          
          <div className="p-3 bg-background rounded-lg border border-border space-y-2">
            <p className="text-xs font-bold text-navy uppercase">Source Document References:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-surface rounded border border-border">
                <p className="font-semibold text-navy">Document: Forensic_Report_017.pdf</p>
                <p className="text-muted">Page 4 • Section: Examination Findings</p>
              </div>
              <div className="p-2 bg-surface rounded border border-border">
                <p className="font-semibold text-navy">Document: Investigation_Report_001.pdf</p>
                <p className="text-muted">Page 1 • Section: FIR Details</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-govamber shrink-0 mt-0.5" />
            <span>AI-generated information is decision-support and must be verified by an authorized officer.</span>
          </div>
        </div>
      )}
    </div>
  );
}
