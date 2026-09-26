"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Briefcase, Plus, Search } from 'lucide-react';
import { CaseTimelineVisualizer } from '@/components/CaseTimelineVisualizer';

export default function CasesPage() {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/cases')
      .then(res => res.json())
      .then(data => setCases(Array.isArray(data) ? data : []))
      .catch(() => setCases([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface p-5 rounded-xl border border-border">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-govblue" /> Case Directory
          </h2>
          <p className="text-xs text-muted">All active investigation cases under your jurisdiction</p>
        </div>
        <button className="bg-navy hover:bg-navy-dark text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4 text-saffron" /> Register Case
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov w-full">
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Title</th>
              <th>Case Type</th>
              <th>Jurisdiction</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td className="font-mono font-bold text-navy">{c.case_number}</td>
                <td className="font-medium">{c.title}</td>
                <td className="text-muted">{c.case_type}</td>
                <td className="text-muted">{c.jurisdiction}</td>
                <td><StatusBadge status={c.status} /></td>
                <td>
                  <Link href={`/cases/${c.id}`} className="text-xs font-bold text-govblue hover:underline">
                    View Case Workspace
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Case Timeline Visualizer */}
      <CaseTimelineVisualizer caseId="NV-2026-001" />
    </div>
  );
}
