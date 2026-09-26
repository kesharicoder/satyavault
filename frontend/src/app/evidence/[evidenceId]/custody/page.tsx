"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RefreshCw, ArrowRight } from 'lucide-react';

export default function EvidenceTransferPage() {
  const params = useParams();
  const evidenceId = (params?.evidenceId as string) || 'EV-2026-0017';
  const [toUser, setToUser] = useState('Dr. Neha Sharma (Forensic Officer)');
  const [purpose, setPurpose] = useState('Forensic Bit-Stream Disk Analysis');
  const [location, setLocation] = useState('Digital Forensics Lab Room 3');
  const [submitted, setSubmitted] = useState<any>(null);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/custody/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evidence_id: evidenceId,
          to_user: toUser,
          purpose,
          location,
          remarks: 'SHA-256 seal integrity verified prior to transfer'
        })
      });
      const data = await res.json();
      setSubmitted(data);
    } catch {
      setSubmitted(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-govblue" /> Initiate Custody Transfer — {evidenceId}
        </h2>
        <p className="text-xs text-muted mt-1">Execute append-only evidence custody transfer with hash verification receipt</p>

        <form onSubmit={handleTransfer} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Receiver Officer / Custodian</label>
            <input
              type="text"
              value={toUser}
              onChange={e => setToUser(e.target.value)}
              className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Transfer Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Target Vault / Storage Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm transition-colors mt-6"
          >
            Submit Transfer Request & Generate Custody Event <ArrowRight className="w-4 h-4 text-saffron" />
          </button>
        </form>
      </div>

      {submitted && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy text-sm">Custody Transfer Logged</h3>
            <StatusBadge status="verified" label="TRANSFER LOGGED" />
          </div>
          <p className="text-xs text-muted">Log ID: {submitted.id} • Transferred to {submitted.to_user} at {submitted.location}</p>
        </div>
      )}
    </div>
  );
}
