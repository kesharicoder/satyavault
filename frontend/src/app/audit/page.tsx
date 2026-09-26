"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { TamperSimulatorCard } from '@/components/TamperSimulatorCard';

export default function AuditPage() {
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
            <FileSpreadsheet className="w-5 h-5 text-govblue" /> Tamper-Evident Audit Hash Chain
          </h2>
          <p className="text-xs text-muted mt-1">Append-only log where every event is cryptographically linked via SHA-256</p>
        </div>
      </div>

      {/* Interactive Tamper Simulator Widget */}
      <TamperSimulatorCard />

      <div className="bg-surface rounded-xl border border-border p-5">
        <h3 className="font-bold text-sm text-navy mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Active System Audit Logs
        </h3>
        <table className="table-gov">
          <thead>
            <tr>
              <th>ID</th>
              <th>Action</th>
              <th>Resource Type</th>
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
                <td className="font-mono text-[11px] text-muted">{l.event_hash?.substring(0, 24)}...</td>
                <td className="text-xs text-muted">{l.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
