"use client";

import React, { useEffect, useState } from 'react';
import { Radar, AlertCircle, Link, UserCheck, ShieldCheck, ArrowUpRight, Search } from 'lucide-react';

interface EntityMatch {
  id: string;
  entity_type: string;
  entity_value: string;
  primary_case_id: string;
  matched_case_id: string;
  matched_jurisdiction: string;
  matched_fir: string;
  confidence_score: number;
  notes: string;
}

export function CrossJurisdictionRadar() {
  const [matches, setMatches] = useState<EntityMatch[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetch('/api/v1/ai/cross-case-matches')
      .then(res => res.json())
      .then(data => setMatches(Array.isArray(data) ? data : []))
      .catch(() => setMatches([]));
  }, []);

  const filteredMatches = matches.filter(m => filterType === 'all' || m.entity_type === filterType);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <Radar className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              Cross-Jurisdiction Intelligence Radar
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                AI Entity Matcher
              </span>
            </h3>
            <p className="text-xs text-slate-500">Auto-detects overlapping suspects, bank accounts, and vehicles across police jurisdictions</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All Matches
          </button>
          <button
            onClick={() => setFilterType('suspect')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${filterType === 'suspect' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Suspects
          </button>
          <button
            onClick={() => setFilterType('bank_account')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${filterType === 'bank_account' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Mule Accounts
          </button>
          <button
            onClick={() => setFilterType('vehicle')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${filterType === 'vehicle' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Vehicles
          </button>
        </div>
      </div>

      {/* Grid of Matches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMatches.map((m) => (
          <div key={m.id} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50/80 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-600 text-white">
                  {m.entity_type.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {Math.round(m.confidence_score * 100)}% Match
                </span>
              </div>

              <h4 className="font-mono font-bold text-sm text-slate-900 my-1">{m.entity_value}</h4>
              <p className="text-xs text-slate-600 mb-3">{m.notes}</p>
            </div>

            <div className="pt-3 border-t border-indigo-100 text-xs space-y-1 bg-white p-2.5 rounded-lg border border-slate-200/60">
              <div className="flex items-center justify-between text-slate-500">
                <span>Matched FIR:</span>
                <span className="font-bold text-indigo-900">{m.matched_fir}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Jurisdiction:</span>
                <span className="font-medium text-slate-800 text-[11px] truncate max-w-[140px]" title={m.matched_jurisdiction}>
                  {m.matched_jurisdiction}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
