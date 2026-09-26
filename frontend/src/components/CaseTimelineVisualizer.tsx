"use client";

import React, { useEffect, useState } from 'react';
import { Clock, ShieldCheck, FileText, User, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  id: string;
  timestamp: string;
  category: string;
  title: string;
  description: string;
  officer: string;
  status: string;
  sha256: string;
}

export function CaseTimelineVisualizer({ caseId = "NV-2026-001" }: { caseId?: string }) {
  const [events, setEvents] = useState<TimelineItem[]>([]);

  useEffect(() => {
    fetch(`/api/v1/cases/${caseId}/timeline`)
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data.timeline) ? data.timeline : []))
      .catch(() => setEvents([]));
  }, [caseId]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 my-6">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-govblue" /> Interactive Case Timeline Auto-Reconstruction
          </h3>
          <p className="text-xs text-slate-500">Chronological synthesis of FIR filings, evidence seizures, lab analysis, and BSA 2023 legal certifications</p>
        </div>
        <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          {events.length} Verified Events
        </span>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
        {events.map((evt, idx) => (
          <div key={evt.id} className="relative group">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-[31px] top-0 p-1.5 rounded-full bg-navy text-white shadow-sm ring-4 ring-white">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            </div>

            {/* Event Card */}
            <div className="bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-200 transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 text-white">
                    {evt.category.replace('_', ' ')}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{evt.title}</h4>
                </div>
                <span className="text-xs font-mono text-slate-500">{evt.timestamp}</span>
              </div>

              <p className="text-xs text-slate-700 mb-3">{evt.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700">{evt.officer}</span>
                </div>

                <div className="flex items-center gap-1 font-mono text-emerald-700">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>SHA-256: {evt.sha256.substring(0, 16)}...</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
