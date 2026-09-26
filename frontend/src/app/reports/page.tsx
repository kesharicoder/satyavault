"use client";

import React from 'react';
import { Printer, Download, FileText } from 'lucide-react';

export default function ReportsPage() {
  const handleDownloadCaseBundle = async () => {
    const payload = {
      case_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      case_number: "FIR-2026-DEL-0482",
      title: "Operation Cyber Shield — Financial Fraud Probe",
      department: "Cyber Crime Cell",
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
    a.download = `SatyaVault_CaseBundle_${payload.case_number}.pdf`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Printer className="w-5 h-5 text-govblue" /> Judicial & Executive Report Generator
        </h2>
        <p className="text-xs text-muted mt-1">Export official ReportLab PDF case bundles with embedded synthetic data disclaimers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy flex items-center gap-2">
              <FileText className="w-4 h-4 text-govblue" /> Official Case Bundle PDF
            </h3>
            <p className="text-xs text-muted mt-1">Includes case summary, registered document list, and readiness status.</p>
          </div>
          <button
            onClick={handleDownloadCaseBundle}
            className="mt-4 bg-navy hover:bg-navy-dark text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 text-saffron" /> Generate & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
