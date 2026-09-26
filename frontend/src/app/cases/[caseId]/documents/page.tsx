"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText, Upload } from 'lucide-react';

export default function CaseDocumentsPage() {
  const params = useParams();
  const caseId = (params?.caseId as string) || 'NV-2026-001';
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/documents?case_id=${caseId}`)
      .then(res => res.json())
      .then(data => setDocs(Array.isArray(data) ? data : []))
      .catch(() => setDocs([]));
  }, [caseId]);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FileText className="w-5 h-5 text-govblue" /> Case Vaulted Documents — {caseId}
          </h2>
          <p className="text-xs text-muted mt-1">Binary SHA-256 hashed documents assigned to this case</p>
        </div>
        <button className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Upload className="w-4 h-4 text-saffron" /> Add Document to Case
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Doc Number</th>
              <th>Title</th>
              <th>Type</th>
              <th>SHA-256 Checksum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td className="font-mono font-bold text-navy">{d.document_number}</td>
                <td className="font-semibold">{d.title}</td>
                <td className="text-muted">{d.document_type}</td>
                <td className="font-mono text-[11px] text-muted">{d.current_version?.sha256_hash?.substring(0, 24)}...</td>
                <td><StatusBadge status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
