"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileSpreadsheet } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/audit')
      .then(res => res.json())
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-govblue" /> System Audit Ledger
          </h2>
          <p className="text-xs text-muted mt-1">Append-only non-repudiable audit event stream</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Result</th>
              <th>SHA-256 Hash</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="font-mono text-xs font-bold text-navy">{l.event_id}</td>
                <td className="font-semibold">{l.action}</td>
                <td className="text-muted">{l.resource_type}</td>
                <td><StatusBadge status={l.result} /></td>
                <td className="font-mono text-[11px] text-muted">{l.event_hash?.substring(0, 20)}...</td>
                <td className="text-xs text-muted">{l.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
