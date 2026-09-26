"use client";

import React from 'react';
import { Clock } from 'lucide-react';

export default function CaseTimelinePage() {
  const EVENTS = [
    { title: 'Case NV-2026-001 Created', description: 'Investigator Aarav Mehta initiated Digital Evidence Review – Sector 17 Investigation', date: '2026-03-15 10:30 UTC', user: 'Aarav Mehta' },
    { title: 'Investigation Report Uploaded', description: 'Investigation_Report_001.pdf vaulted with SHA-256 reference 2cf24dba...', date: '2026-03-15 11:00 UTC', user: 'Aarav Mehta' },
    { title: 'Evidence EV-2026-0017 Registered', description: 'Seized Digital Storage Device registered with Evidence Passport', date: '2026-03-15 14:30 UTC', user: 'Aarav Mehta' },
    { title: 'Custody Transferred to Custody Vault', description: 'Officer Rahul Verma acknowledged receipt in Vault Room B', date: '2026-03-15 15:00 UTC', user: 'Rahul Verma' },
    { title: 'Forensic Lab Examination Completed', description: 'Dr. Neha Sharma uploaded Forensic_Report_017.pdf & verified SHA-256 match', date: '2026-03-18 16:20 UTC', user: 'Neha Sharma' },
    { title: 'Case Legal Readiness Verified', description: 'Prosecutor Priya Nair ran Case Readiness Engine (Score: 100%)', date: '2026-03-20 09:15 UTC', user: 'Priya Nair' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Clock className="w-5 h-5 text-govblue" /> Case Operational Timeline — NV-2026-001
        </h2>
        <p className="text-xs text-muted mt-1">Integrated chronological record of documents, custody events, and readiness checks</p>
      </div>

      <div className="bg-surface p-6 rounded-xl border border-border">
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border">
          {EVENTS.map((evt, idx) => (
            <div key={idx} className="relative flex items-start space-x-4 pl-8">
              <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full border-2 border-navy bg-saffron"></div>
              <div className="bg-background p-4 rounded-lg border border-border w-full">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-navy text-sm">{evt.title}</h4>
                  <span className="text-[11px] font-mono text-muted">{evt.date}</span>
                </div>
                <p className="text-xs text-muted mt-1">{evt.description}</p>
                <p className="text-[11px] font-semibold text-govblue mt-2">Recorded By: {evt.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
