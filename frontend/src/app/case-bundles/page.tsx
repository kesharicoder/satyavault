"use client";

import React from 'react';
import { FolderArchive, Download, CheckCircle2 } from 'lucide-react';

export default function CaseBundlesPage() {
  const handleExportBundle = async () => {
    const payload = {
      case_id: "NV-2026-001",
      case_number: "NV-2026-001",
      title: "Digital Evidence Review – Sector 17 Investigation",
      department: "Cyber Crime Division",
      priority: "high",
      status: "investigation",
      jurisdiction: "New Delhi Judicial District"
    };

    const res = await fetch('/api/v1/reports/case-bundle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SatyaVault_CaseBundle_NV-2026-001.pdf`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-govblue" /> Verified Legal Case Bundle Exporter
          </h2>
          <p className="text-xs text-muted mt-1">Generate complete case packages with embedded SHA-256 evidence passports and audit logs</p>
        </div>
        <button
          onClick={handleExportBundle}
          className="bg-navy hover:bg-navy-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <Download className="w-4 h-4 text-saffron" /> Export Case Bundle PDF
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
        <h3 className="font-bold text-navy text-sm">Case Bundle Selectable Contents (NV-2026-001)</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[
            'Case Summary & Classification',
            'Investigation & Charge Documents',
            'Physical & Digital Evidence Register',
            'Digital Evidence Passports (EV-2026-0017)',
            'Append-Only Chain of Custody History',
            'Forensic Lab Examination Reports',
            'SHA-256 Binary Integrity Certificates',
            'Cryptographic Audit Hash Chain Ledger',
            'Case Legal Readiness Engine Score (100%)',
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-background rounded-lg border border-border flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-govgreen shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
