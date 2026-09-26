import React from 'react';
import { Lock, ShieldCheck, Database, KeyRound } from 'lucide-react';

export default function SecurityPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Lock className="w-5 h-5 text-saffron" /> Cryptographic & Data Security Policy
        </h2>
        <p className="text-xs text-muted leading-relaxed">
          Satya Vault operates under a Security-by-Design philosophy where all permissions are validated at the FastAPI backend and enforced in PostgreSQL via Row-Level Security (RLS).
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-4 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-navy text-sm">1. Zero Frontend-Only Security</h3>
            <p className="text-muted mt-1">UI element hiding is treated as UX convenience. Authorization checks evaluate JWT signature, role capabilities, case assignment, and document classification server-side.</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-navy text-sm">2. Private Storage Buckets</h3>
            <p className="text-muted mt-1">Storage buckets (documents-private, evidence-private, reports-private) block public URL access (`public = false`). Direct object references require 300-second signed URLs.</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-navy text-sm">3. Hash-Chained Non-Repudiation</h3>
            <p className="text-muted mt-1">Audit log records compute sequential SHA-256 hashes (H_i = SHA256(Event_i + H_(i-1))) preventing retroactive log modification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
