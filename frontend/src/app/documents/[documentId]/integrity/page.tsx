"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function DocumentIntegrityPage() {
  const params = useParams();
  const documentId = (params?.documentId as string) || 'DOC-2026-001';
  const [providedHash, setProvidedHash] = useState('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/v1/documents/${documentId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provided_hash: providedHash })
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
          <CheckCircle2 className="w-5 h-5 text-govgreen" /> Document Integrity Verification — {documentId}
        </h2>
        <p className="text-xs text-muted mt-1">Verify document raw byte hash against stored reference checksum</p>

        <form onSubmit={handleCheck} className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Target Checksum Hash</label>
            <input
              type="text"
              value={providedHash}
              onChange={e => setProvidedHash(e.target.value)}
              className="w-full p-2.5 text-xs bg-background border border-border rounded font-mono"
            />
          </div>
          <button type="submit" className="bg-navy text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm">
            <RefreshCw className="w-4 h-4 text-saffron" /> Execute Verification
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Verification Output</h3>
            <StatusBadge status={result.verified ? 'verified' : 'failed'} label={result.verified ? 'VERIFIED MATCH' : 'MISMATCH DETECTED'} />
          </div>
          <div className="p-3 bg-background rounded-lg text-xs font-mono space-y-1 text-muted border border-border">
            <p><strong>Stored Reference Hash:</strong> {result.expected_sha256}</p>
            <p><strong>Provided Checksum Hash:</strong> {result.provided_sha256}</p>
          </div>
        </div>
      )}
    </div>
  );
}
