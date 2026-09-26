"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Plus, ArrowRight } from 'lucide-react';

export default function NewCasePage() {
  const router = useRouter();
  const [caseNumber, setCaseNumber] = useState('NV-2026-001');
  const [title, setTitle] = useState('Digital Evidence Review – Sector 17 Investigation');
  const [caseType, setCaseType] = useState('Cyber Crime');
  const [jurisdiction, setJurisdiction] = useState('New Delhi Judicial District');
  const [department, setDepartment] = useState('Cyber Crime Division');
  const [priority, setPriority] = useState('high');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_number: caseNumber,
          title,
          case_type: caseType,
          jurisdiction,
          department,
          priority,
          classification: 'restricted'
        })
      });
      const data = await res.json();
      router.push(`/cases/${data.id || 'NV-2026-001'}`);
    } catch {
      router.push('/cases');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-govblue" /> Register New Case Record
        </h2>
        <p className="text-xs text-muted mt-1">Initiate a cryptographically anchored case lifecycle</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Case ID / Number</label>
            <input
              type="text"
              value={caseNumber}
              onChange={e => setCaseNumber(e.target.value)}
              className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-navy uppercase block mb-1">Case Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Case Type</label>
              <input
                type="text"
                value={caseType}
                onChange={e => setCaseType(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Jurisdiction</label>
              <input
                type="text"
                value={jurisdiction}
                onChange={e => setJurisdiction(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm transition-colors mt-6"
          >
            Create Case Record & Open Workspace <ArrowRight className="w-4 h-4 text-saffron" />
          </button>
        </form>
      </div>
    </div>
  );
}
