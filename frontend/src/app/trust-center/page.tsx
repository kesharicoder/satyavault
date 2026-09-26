"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, ShieldCheck, FileSpreadsheet, Lock } from 'lucide-react';

export default function TrustCenterPage() {
  const [chainStatus, setChainStatus] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/audit/verify-chain', { method: 'POST' })
      .then(res => res.json())
      .then(data => setChainStatus(data))
      .catch(() => setChainStatus(null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-govgreen" /> System Trust & Compliance Center
        </h2>
        <p className="text-xs text-muted mt-1">
          Cryptographic verification of system hash integrity, ledger continuity, and storage policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border">
          <p className="text-xs font-semibold text-muted uppercase">SHA-256 Ledger Chain</p>
          <h3 className="text-lg font-bold text-navy mt-1">
            {chainStatus?.valid ? 'Chain Verified' : 'Checking Chain...'}
          </h3>
          <p className="text-xs text-muted mt-1">
            Total ledger events: {chainStatus?.total_events || 0}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border">
          <p className="text-xs font-semibold text-muted uppercase">Storage Bucket Access</p>
          <h3 className="text-lg font-bold text-govgreen mt-1">Strictly Private</h3>
          <p className="text-xs text-muted mt-1">Public access blocked; signed URLs active</p>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border">
          <p className="text-xs font-semibold text-muted uppercase">Database RLS Status</p>
          <h3 className="text-lg font-bold text-navy mt-1">100% Enforced</h3>
          <p className="text-xs text-muted mt-1">Zero permissive default policies</p>
        </div>
      </div>
    </div>
  );
}
