import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const STEPS = [
    { title: '1. Case Creation', desc: 'Investigator registers case NV-2026-001 with jurisdiction & assigned officers.' },
    { title: '2. Document Intake & SHA-256', desc: 'Original FIR & reports uploaded; raw binary SHA-256 checksum generated immediately.' },
    { title: '3. Asynchronous OCR & AI Processing', desc: 'PaddleOCR extracts text, chunks document content, generates 768d embeddings into pgvector.' },
    { title: '4. Evidence Registration & Passport', desc: 'Physical/digital evidence registered with unique Evidence ID & Evidence Passport.' },
    { title: '5. Append-Only Chain of Custody', desc: 'Transfer requests between officers require verified digital acceptance receipts.' },
    { title: '6. Forensic Examination', desc: 'Forensic examiner analyzes item, uploads lab report, verifies SHA-256 matching.' },
    { title: '7. Permission-Filtered AI RAG Search', desc: 'Natural language search queries case context grounded strictly in authorized records.' },
    { title: '8. Case Trust Center & Readiness Review', desc: 'Readiness checklist verifies 100% evidentiary completeness before prosecutor export.' },
    { title: '9. ReportLab Case Bundle Generation', desc: 'Export official legal case packages with hash ledger receipts.' },
    { title: '10. Authorized Closure & Secure Archival', desc: 'Case closed and transitioned to read-only searchable archive state.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy">End-to-End Evidence & Case Lifecycle</h2>
        <p className="text-xs text-muted mt-1">10-Stage Cryptographically Verified Digital Evidence Workflow</p>
      </div>

      <div className="space-y-3">
        {STEPS.map((s, idx) => (
          <div key={idx} className="bg-surface p-4 rounded-xl border border-border flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-navy text-saffron flex items-center justify-center font-bold text-xs shrink-0">
              {idx + 1}
            </div>
            <div>
              <h3 className="font-bold text-navy text-sm">{s.title}</h3>
              <p className="text-xs text-muted mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
