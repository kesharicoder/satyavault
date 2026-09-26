"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText, Download, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DocumentDetailPage() {
  const params = useParams();
  const documentId = (params?.documentId as string) || 'DOC-2026-001';

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="font-mono text-xs font-bold bg-navy text-saffron px-2 py-0.5 rounded">
            {documentId}
          </span>
          <h2 className="text-xl font-bold text-navy mt-1">Investigation_Report_001.pdf</h2>
          <p className="text-xs text-muted mt-0.5">Assigned to Case: NV-2026-001 • Primary FIR Copy</p>
        </div>
        <StatusBadge status="verified" label="SHA-256 VERIFIED" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-navy text-sm">Document Metadata & Storage Reference</h3>
          <div className="text-xs space-y-2 text-muted">
            <p><strong>Document ID:</strong> {documentId}</p>
            <p><strong>Current Version:</strong> Version 1 (Original Intake)</p>
            <p><strong>Uploaded By:</strong> Aarav Mehta (Investigator)</p>
            <p><strong>File Size:</strong> 1.05 MB (1,048,576 bytes)</p>
            <p><strong>MIME Type:</strong> application/pdf</p>
            <p><strong>Storage Bucket:</strong> documents-private (Private Bucket)</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-navy text-sm">Cryptographic Reference Hash</h3>
          <div className="p-3 bg-background rounded-lg font-mono text-xs text-navy border border-border break-all">
            2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
          </div>
          <p className="text-xs text-muted">Calculated from raw binary stream at upload time.</p>
        </div>
      </div>
    </div>
  );
}
