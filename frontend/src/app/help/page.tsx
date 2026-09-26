import React from 'react';
import { HelpCircle, FileText, Shield, Bot, Search } from 'lucide-react';

export default function HelpPage() {
  const FAQS = [
    { q: 'How does Satya Vault guarantee file integrity?', a: 'Every file uploaded generates a raw binary SHA-256 reference hash stored in immutable version records. File verification checks compare stored and current byte digests.' },
    { q: 'What is an Evidence Passport?', a: 'An Evidence Passport is an official digital identity record generated for registered physical/digital evidence, tracking current custodian, storage vault location, reference SHA-256, and append-only custody transfers.' },
    { q: 'Is AI assistance source-grounded?', a: 'Yes. AI queries use permission-scoped RAG via pgvector, retrieving authorized case documents only and returning explicit source citations.' },
    { q: 'What is the SIH 2026 Prototype Notice?', a: 'Satya Vault is developed as a production-oriented hackathon prototype for Smart India Hackathon 2026. It uses 100% synthetic demonstration data.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-govblue" /> Help Desk & Platform Knowledge Base
        </h2>
        <p className="text-xs text-muted mt-1">Frequently Asked Questions and User Operational Guides</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-border space-y-2">
            <h3 className="font-bold text-navy text-sm">{faq.q}</h3>
            <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
