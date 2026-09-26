import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-8 rounded-xl border border-border space-y-4">
        <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Shield className="w-6 h-6 text-govblue" /> About Satya Vault
        </h2>
        <p className="text-sm text-text leading-relaxed">
          Satya Vault is a production-oriented digital document and evidence management prototype designed for legal, law enforcement, digital forensics, and judicial teams.
        </p>
        <p className="text-xs text-muted leading-relaxed">
          Created for Smart India Hackathon 2026, it addresses the core challenge of evidence integrity, chain-of-custody non-repudiation, tamper-evident logging, and access-restricted AI assistance across criminal and civil litigation lifecycles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface p-6 rounded-xl border border-border space-y-2">
          <h3 className="font-bold text-navy flex items-center gap-2">
            <Lock className="w-4 h-4 text-saffron" /> Cryptographic Integrity
          </h3>
          <p className="text-xs text-muted">
            All files uploaded generate immediate raw binary SHA-256 reference hashes stored in immutable version records.
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border space-y-2">
          <h3 className="font-bold text-navy flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-govgreen" /> Source-Grounded RAG
          </h3>
          <p className="text-xs text-muted">
            AI queries retrieve authorized document chunks only, enforcing case permissions prior to embedding matching.
          </p>
        </div>
      </div>
    </div>
  );
}
