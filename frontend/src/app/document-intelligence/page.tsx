"use client";

import React, { useState } from 'react';
import { BrainCircuit, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DocumentIntelligencePage() {
  const [selectedDoc, setSelectedDoc] = useState('Forensic_Report_017.pdf');

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-saffron" /> AI Document Intelligence & OCR Pipeline
        </h2>
        <p className="text-xs text-muted mt-1">
          Automated classification, entity extraction (dates, organizations, locations, persons), and key event detection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-navy text-sm">Target Vault Document</h3>
          <select
            value={selectedDoc}
            onChange={e => setSelectedDoc(e.target.value)}
            className="w-full p-2 text-xs bg-background border border-border rounded-lg font-mono"
          >
            <option value="Forensic_Report_017.pdf">Forensic_Report_017.pdf</option>
            <option value="Investigation_Report_001.pdf">Investigation_Report_001.pdf</option>
            <option value="Evidence_Register_017.pdf">Evidence_Register_017.pdf</option>
            <option value="Witness_Statement_004.pdf">Witness_Statement_004.pdf</option>
          </select>

          <div className="p-3 bg-background rounded-lg text-xs space-y-1 text-muted border border-border">
            <p><strong>Document ID:</strong> DOC-2026-002</p>
            <p><strong>Case ID:</strong> NV-2026-001</p>
            <p><strong>OCR Status:</strong> Completed (PaddleOCR)</p>
            <p><strong>AI Status:</strong> Search Indexed</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-surface p-6 rounded-xl border border-border space-y-4">
          <h3 className="font-bold text-navy text-sm">Extracted Entities & Factual Summary</h3>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-background rounded-lg border border-border">
              <p className="font-bold text-navy">Detected Persons</p>
              <p className="text-muted mt-1">Dr. Neha Sharma (Examiner), Inspector Aarav Mehta</p>
            </div>
            <div className="p-3 bg-background rounded-lg border border-border">
              <p className="font-bold text-navy">Organizations & Locations</p>
              <p className="text-muted mt-1">Digital Forensics Lab, Sector 17 Vault Facility</p>
            </div>
          </div>

          <div className="p-3 bg-background rounded-lg text-xs border border-border space-y-1">
            <p className="font-bold text-navy">AI Executive Summary:</p>
            <p className="text-muted leading-relaxed">
              Examination of 2TB External Hard Drive EV-2026-0017 confirms bit-stream disk image matching reference hash 4b227777... Log archives confirm server intrusion timestamped 2026-03-14 22:15 UTC.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-govamber shrink-0 mt-0.5" />
            <span>AI-generated information is provided as decision-support and must be verified by an authorized officer.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
