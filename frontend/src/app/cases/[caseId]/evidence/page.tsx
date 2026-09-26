"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck } from 'lucide-react';

export default function CaseEvidencePage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';
  const [evidence, setEvidence] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/evidence?case_id=${caseId}`)
      .then(res => res.json())
      .then(data => setEvidence(Array.isArray(data) ? data : []))
      .catch(() => setEvidence([]));
  }, [caseId]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-govblue" /> Evidence Register — {caseId}
        </h2>
        <p className="text-xs text-muted mt-1">Physical and digital evidence registered with Evidence Passports</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Current Custodian</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((e) => (
              <tr key={e.id}>
                <td className="font-mono font-bold text-navy">{e.evidence_id}</td>
                <td className="font-semibold">{e.evidence_type}</td>
                <td className="text-muted">{e.description}</td>
                <td className="font-medium text-text">{e.current_custodian}</td>
                <td className="text-muted">{e.current_location}</td>
                <td><StatusBadge status={e.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
