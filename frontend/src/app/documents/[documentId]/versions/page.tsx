"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText, Layers } from 'lucide-react';

export default function DocumentVersionsPage() {
  const params = useParams();
  const documentId = (params?.documentId as string) || 'DOC-2026-001';

  const VERSIONS = [
    { version: 1, filename: 'Investigation_Report_001.pdf', uploader: 'Aarav Mehta', date: '2026-03-15 11:00 UTC', hash: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', reason: 'Initial FIR registration' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Layers className="w-5 h-5 text-govblue" /> Immutable Document Version History — {documentId}
        </h2>
        <p className="text-xs text-muted mt-1">Previous versions are never overwritten or deleted</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Version</th>
              <th>Filename</th>
              <th>Uploaded By</th>
              <th>Date</th>
              <th>SHA-256 Checksum</th>
              <th>Change Reason</th>
            </tr>
          </thead>
          <tbody>
            {VERSIONS.map((v) => (
              <tr key={v.version}>
                <td className="font-bold text-navy">v{v.version}</td>
                <td className="font-semibold">{v.filename}</td>
                <td className="text-muted">{v.uploader}</td>
                <td className="text-xs text-muted">{v.date}</td>
                <td className="font-mono text-[11px] text-muted">{v.hash.substring(0, 20)}...</td>
                <td className="text-xs text-muted">{v.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
