"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function EvidenceIntegrityPage() {
  const params = useParams();
  const evidenceId = (params?.evidenceId as string) || 'EV-2026-0017';
  const [hash, setHash] = useState('4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a');
  const [verified, setVerified] = useState<boolean | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(hash.toLowerCase() === '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a');
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-govgreen" /> Physical Evidence SHA-256 Checksum Verifier — {evidenceId}
        </h2>
        <p className="text-xs text-muted mt-1">Verify bit-stream image hash against registered Evidence Passport reference</p>

        <form onSubmit={handleVerify} className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Target Evidence Checksum</label>
            <input
              type="text"
              value={hash}
              onChange={e => setHash(e.target.value)}
              className="w-full p-2.5 text-xs bg-background border border-border rounded font-mono"
            />
          </div>
          <button type="submit" className="bg-navy text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4 text-saffron" /> Execute Evidence Hash Verification
          </button>
        </form>
      </div>

      {verified !== null && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Evidence Integrity Result</h3>
            <StatusBadge status={verified ? 'verified' : 'failed'} label={verified ? 'PASSPORT VERIFIED MATCH' : 'HASH MISMATCH DETECTED'} />
          </div>
          <p className="text-xs text-muted font-mono">Reference Hash: 4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a</p>
        </div>
      )}
    </div>
  );
}
