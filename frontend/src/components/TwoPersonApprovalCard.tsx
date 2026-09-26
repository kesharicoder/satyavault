"use client";

import React, { useEffect, useState } from 'react';
import { UserCheck, ShieldAlert, CheckCircle2, FileSignature, ArrowRight, Lock } from 'lucide-react';

interface PendingTransfer {
  id: string;
  evidence_id: string;
  from_user: string;
  to_user: string;
  action: string;
  purpose: string;
  location: string;
  transfer_status: string;
  releasing_signature: string;
  remarks: string;
  created_at: string;
}

export function TwoPersonApprovalCard() {
  const [pending, setPending] = useState<PendingTransfer[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPending = () => {
    fetch('/api/v1/custody/pending-approvals')
      .then(res => res.json())
      .then(data => setPending(Array.isArray(data) ? data : []))
      .catch(() => setPending([]));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAcceptTransfer = async (logId: string) => {
    setLoadingId(logId);
    try {
      const res = await fetch('/api/v1/custody/accept-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transfer_log_id: logId,
          signature: "SIG-RECEIVER-DIGITAL-KEY-VERIFIED"
        })
      });

      if (res.ok) {
        setSuccessMessage("Two-Person Custody Transfer Counter-Signed & Completed!");
        fetchPending();
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-amber-200 shadow-sm p-5 my-6">
      <div className="flex items-center justify-between border-b border-amber-100 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              Multi-Officer Transfer Approvals
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Two-Person Rule Enforced
              </span>
            </h3>
            <p className="text-xs text-slate-500">Requires recipient digital counter-signature before custody status transitions to Deposited</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          {pending.length} Pending Approval{pending.length === 1 ? '' : 's'}
        </span>
      </div>

      {successMessage && (
        <div className="bg-emerald-600 text-white p-3 rounded-lg text-xs font-bold flex items-center gap-2 mb-4 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {pending.length === 0 ? (
        <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
          <p className="font-bold text-slate-700">All Custody Transfers Fully Counter-Signed</p>
          <p className="text-slate-500 mt-0.5">No pending recipient approvals under the Two-Person Custody Rule.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 bg-white border px-2 py-0.5 rounded">
                    {item.evidence_id}
                  </span>
                  <span className="font-bold text-slate-800">{item.purpose}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 pt-1">
                  <span className="font-semibold text-slate-700">{item.from_user}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-bold text-amber-900">{item.to_user}</span>
                </div>

                <p className="text-[11px] text-slate-500">{item.remarks}</p>

                <div className="font-mono text-[10px] text-emerald-700 pt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Releasing Signature: {item.releasing_signature}</span>
                </div>
              </div>

              <button
                onClick={() => handleAcceptTransfer(item.id)}
                disabled={loadingId === item.id}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-all shrink-0 self-end md:self-center"
              >
                <FileSignature className="w-4 h-4" />
                {loadingId === item.id ? 'Counter-Signing...' : 'Counter-Sign & Complete Intake'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
