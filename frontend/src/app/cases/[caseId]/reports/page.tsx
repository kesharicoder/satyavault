"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Printer, Download, FileText } from 'lucide-react';

export default function CaseReportsPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';

  const handleDownloadReport = async () => {
    const payload = {
      case_id: caseId,
      case_number: caseId,
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
    a.download = `SatyaVault_CaseBundle_${caseId}.pdf`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Printer className="w-5 h-5 text-govblue" /> Case Report & Bundle Generator — {caseId}
        </h2>
        <p className="text-xs text-muted mt-1">Export official PDF case summaries with embedded cryptographic receipts</p>
      </div>

      <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
        <h3 className="font-bold text-navy flex items-center gap-2">
          <FileText className="w-4 h-4 text-govblue" /> Case Bundle Package (ReportLab Engine)
        </h3>
        <p className="text-xs text-muted">Includes case summary, registered evidence list, SHA-256 integrity logs, and readiness checklist.</p>
        <button
          onClick={handleDownloadReport}
          className="bg-navy hover:bg-navy-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <Download className="w-4 h-4 text-saffron" /> Export Verified PDF Case Bundle
        </button>
      </div>
    </div>
  );
}
