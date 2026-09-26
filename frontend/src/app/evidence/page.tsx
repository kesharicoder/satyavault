"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck, FileCheck, Download, QrCode, CheckCircle2, X } from 'lucide-react';
import { CustodyFlowGraph } from '@/components/CustodyFlowGraph';
import { TwoPersonApprovalCard } from '@/components/TwoPersonApprovalCard';

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [certModal, setCertModal] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/v1/evidence')
      .then(res => res.json())
      .then(data => setEvidence(Array.isArray(data) ? data : []))
      .catch(() => setEvidence([]));
  }, []);

  const handleGenerateCertificate = async (item: any) => {
    setLoadingId(item.id || item.evidence_id);
    try {
      const res = await fetch('/api/v1/reports/bsa-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.evidence_id || item.id,
          title: item.description || "Digital Storage Drive",
          case_id: item.case_id || "NV-2026-001",
          sha256_hash: item.sha256_hash || "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
        })
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BSA_2023_Section65B_Certificate_${item.evidence_id || 'EVD'}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        setCertModal({
          evidence_id: item.evidence_id || item.id,
          description: item.description,
          sha256_hash: item.sha256_hash || "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
          verifyUrl: `http://localhost:3000/integrity-verification?hash=${item.sha256_hash || "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"}`
        });
      }
    } catch (err) {
      console.error("Certificate generation error", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface p-5 rounded-xl border border-border">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-govblue" /> Evidence Passport Directory
          </h2>
          <p className="text-xs text-muted">Append-only physical and digital evidence registry with Section 65B BSA 2023 admissibility</p>
        </div>
      </div>

      {/* Two-Person Rule Custody Transfer Approvals Widget */}
      <TwoPersonApprovalCard />

      {/* Interactive Chain of Custody Flowchart */}
      <CustodyFlowGraph evidenceId="EV-2026-0017" />

      <div className="bg-surface rounded-xl border border-border p-5 overflow-x-auto">
        <table className="table-gov w-full">
          <thead>
            <tr>
              <th>Evidence ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Current Custodian</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-right">Legal Readiness</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((e) => (
              <tr key={e.id || e.evidence_id}>
                <td className="font-mono font-bold text-navy">{e.evidence_id}</td>
                <td className="font-medium">{e.evidence_type}</td>
                <td className="text-muted">{e.description}</td>
                <td className="font-semibold text-text">{e.current_custodian}</td>
                <td className="text-muted">{e.current_location}</td>
                <td><StatusBadge status={e.status} /></td>
                <td className="text-right">
                  <button
                    onClick={() => handleGenerateCertificate(e)}
                    disabled={loadingId === (e.id || e.evidence_id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-navy hover:bg-govblue text-white transition-all shadow-sm disabled:opacity-50"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                    {loadingId === (e.id || e.evidence_id) ? 'Generating...' : 'Issue BSA 65B Certificate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup for BSA 2023 Certificate Verification */}
      {certModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
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
                <p className="text-xs text-slate-500">Official Court-Ready Evidence Certificate</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-700 mb-5">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Evidence ID:</span>
                <span className="font-mono font-bold">{certModal.evidence_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Legal Compliance:</span>
                <span className="font-bold text-emerald-700">BSA 2023 Sec 63 / IEA 65B</span>
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
                <p className="font-bold">Embedded Dynamic Verification QR Code</p>
                <p className="text-[11px] text-blue-700 mt-0.5">Scannable by judges or court clerks for instant non-repudiation check.</p>
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
