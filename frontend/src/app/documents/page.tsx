"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FileText, Upload, ShieldAlert, Download, FileCheck, CheckCircle2, X, QrCode } from 'lucide-react';

export default function DocumentsPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loadingDocId, setLoadingDocId] = useState<string | null>(null);
  const [certModal, setCertModal] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/v1/documents')
      .then(res => res.json())
      .then(data => setDocs(Array.isArray(data) ? data : []))
      .catch(() => setDocs([]));
  }, []);

  const handleDownloadWatermarked = async (docItem: any) => {
    setLoadingDocId(docItem.id);
    try {
      const res = await fetch(`/api/v1/documents/${docItem.id}/download-watermarked`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Watermarked_${docItem.title || 'Document.pdf'}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error("Watermarked download error", err);
    } finally {
      setLoadingDocId(null);
    }
  };

  const handleGenerateCertificate = async (docItem: any) => {
    setLoadingDocId(`cert-${docItem.id}`);
    try {
      const res = await fetch('/api/v1/reports/bsa-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: docItem.document_number || docItem.id,
          title: docItem.title,
          case_id: docItem.case_id || "NV-2026-001",
          sha256_hash: docItem.current_version?.sha256_hash || "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        })
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BSA_2023_Certificate_${docItem.document_number}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        setCertModal({
          document_number: docItem.document_number,
          title: docItem.title,
          sha256_hash: docItem.current_version?.sha256_hash || "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        });
      }
    } catch (err) {
      console.error("Certificate error", err);
    } finally {
      setLoadingDocId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface p-5 rounded-xl border border-border">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <FileText className="w-5 h-5 text-govblue" /> Vaulted Document Repository
          </h2>
          <p className="text-xs text-muted">Original documents with binary SHA-256 reference hashes & forensic watermarking</p>
        </div>
        <button className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Upload className="w-4 h-4 text-saffron" /> Upload New Document
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov w-full">
          <thead>
            <tr>
              <th>Doc Number</th>
              <th>Title</th>
              <th>Type</th>
              <th>SHA-256 Checksum</th>
              <th>Status</th>
              <th className="text-right">Actions & Legal Export</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td className="font-mono font-bold text-navy">{d.document_number}</td>
                <td className="font-medium">{d.title}</td>
                <td className="text-muted">{d.document_type}</td>
                <td className="font-mono text-[11px] text-muted">{d.current_version?.sha256_hash?.substring(0, 20)}...</td>
                <td><StatusBadge status={d.status} /></td>
                <td className="text-right space-x-2">
                  <button
                    onClick={() => handleDownloadWatermarked(d)}
                    disabled={loadingDocId === d.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all"
                    title="Download dynamic watermarked PDF with user tracking metadata"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    {loadingDocId === d.id ? 'Watermarking...' : 'Watermarked PDF'}
                  </button>

                  <button
                    onClick={() => handleGenerateCertificate(d)}
                    disabled={loadingDocId === `cert-${d.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-navy hover:bg-govblue text-white shadow-sm transition-all"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                    {loadingDocId === `cert-${d.id}` ? 'Issuing...' : 'BSA Certificate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Certificate Modal */}
      {certModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in duration-200">
            <button
              onClick={() => setCertModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  BSA 2023 Section 65B Certificate Issued
                </h3>
                <p className="text-xs text-slate-500">Official Admissibility Certificate Generated</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700 mb-5">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Doc Number:</span>
                <span className="font-mono font-bold">{certModal.document_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Title:</span>
                <span className="font-medium">{certModal.title}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500 block mb-1">SHA-256 Checksum:</span>
                <span className="font-mono text-[11px] bg-slate-200 px-2 py-1 rounded block text-emerald-900 break-all">
                  {certModal.sha256_hash}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3 mb-5">
              <QrCode className="w-10 h-10 text-blue-700 shrink-0" />
              <div className="text-xs text-blue-900">
                <p className="font-bold">Scannable Verification QR Code Included</p>
                <p className="text-[11px] text-blue-700 mt-0.5">The PDF contains a unique QR code linked directly to Satya Vault's audit chain.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCertModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
