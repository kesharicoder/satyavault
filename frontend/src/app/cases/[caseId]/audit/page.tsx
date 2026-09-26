"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileSpreadsheet } from 'lucide-react';

export default function CaseAuditPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/audit')
      .then(res => res.json())
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]));
  }, [caseId]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-govblue" /> Cryptographic Audit Ledger — {caseId}
        </h2>
        <p className="text-xs text-muted mt-1">Sequential SHA-256 hash-chained event records for this case</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Result</th>
              <th>SHA-256 Event Hash</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="font-mono text-xs font-bold text-navy">{l.event_id}</td>
                <td className="font-semibold">{l.action}</td>
                <td className="text-muted">{l.resource_type}</td>
                <td><StatusBadge status={l.result} /></td>
                <td className="font-mono text-[11px] text-muted">{l.event_hash?.substring(0, 24)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
