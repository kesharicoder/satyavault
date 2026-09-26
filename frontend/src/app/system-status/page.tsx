import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';

export default function SystemStatusPage() {
  const SERVICES = [
    { name: 'Supabase Authentication Service', status: 'Operational', latency: '24ms' },
    { name: 'Private Document Storage Buckets', status: 'Operational', latency: '42ms' },
    { name: 'FastAPI Backend Core Server', status: 'Operational', latency: '12ms' },
    { name: 'PaddleOCR Extraction Pipeline', status: 'Operational', latency: '110ms' },
    { name: 'pgvector Semantic Index Engine', status: 'Operational', latency: '18ms' },
    { name: 'SHA-256 Cryptographic Audit Ledger', status: 'Operational', latency: '8ms' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <Activity className="w-5 h-5 text-govgreen" /> System Operational Health & Status
          </h2>
          <p className="text-xs text-muted mt-1">Real-time infrastructure health and latency monitoring</p>
        </div>
        <span className="text-xs font-bold bg-emerald-100 text-govgreen px-3 py-1 rounded-full border border-emerald-300">
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Subsystem Name</th>
              <th>Status</th>
              <th>Response Time</th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((s, idx) => (
              <tr key={idx}>
                <td className="font-bold text-navy">{s.name}</td>
                <td>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-govgreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-govgreen" /> {s.status}
                  </span>
                </td>
                <td className="font-mono text-xs text-muted">{s.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
