"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RefreshCw } from 'lucide-react';

export default function CaseCustodyPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/custody/history/EV-2026-0017`)
      .then(res => res.json())
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]));
  }, [caseId]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-govblue" /> Chain of Custody Event History — {caseId}
        </h2>
        <p className="text-xs text-muted mt-1">Append-only transfer receipts and physical custody logs</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Action</th>
              <th>From Custodian</th>
              <th>To Custodian</th>
              <th>Location</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((c) => (
              <tr key={c.id}>
                <td className="font-mono text-xs font-bold text-navy">{c.id}</td>
                <td className="font-semibold">{c.action}</td>
                <td className="text-muted">{c.from_user}</td>
                <td className="font-medium text-text">{c.to_user}</td>
                <td className="text-muted">{c.location}</td>
                <td><StatusBadge status={c.verification_result} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
