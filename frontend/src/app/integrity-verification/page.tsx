"use client";

import React, { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';

export default function IntegrityVerificationPage() {
  const [docHash, setDocHash] = useState('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  const [result, setResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/documents/doc-101/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provided_hash: docHash })
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-govgreen" /> SHA-256 Binary Integrity Verifier
        </h2>
        <p className="text-xs text-muted mt-1">
          Compares stored SHA-256 reference hash against current raw file bytes to detect unauthorized alterations.
        </p>

        <form onSubmit={handleVerify} className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Target Document ID</label>
            <input type="text" value="DOC-2026-001 (Investigation_Report_001.pdf)" readOnly className="w-full p-2 text-xs bg-background border border-border rounded font-mono font-bold text-navy" />
          </div>

          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Provided Checksum Hash</label>
            <input
              type="text"
              value={docHash}
              onChange={e => setDocHash(e.target.value)}
              className="w-full p-2 text-xs bg-background border border-border rounded font-mono"
            />
          </div>

          <button type="submit" className="bg-navy hover:bg-navy-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4 text-saffron" /> Execute Binary Hash Comparison
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy text-sm">Integrity Verification Output</h3>
            <StatusBadge status={result.verified ? 'verified' : 'failed'} label={result.verified ? 'INTEGRITY VERIFIED' : 'INTEGRITY MISMATCH'} />
          </div>
          <div className="p-3 bg-background rounded-lg text-xs space-y-1 font-mono text-muted border border-border">
            <p><strong>Stored Reference Hash:</strong> {result.expected_sha256}</p>
            <p><strong>Provided Target Hash:</strong>  {result.provided_sha256}</p>
          </div>
          {!result.verified && (
            <p className="text-xs text-govred font-bold">
              The current document hash does not match the stored integrity record. Further authorized review is required.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
