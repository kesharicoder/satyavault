"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck, UserCheck, MapPin } from 'lucide-react';

export default function EvidenceDetailPage() {
  const params = useParams();
  const evidenceId = (params?.evidenceId as string) || 'EV-2026-0017';
  const [passport, setPassport] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/v1/evidence/${evidenceId}/passport`)
      .then(res => res.json())
      .then(data => setPassport(data))
      .catch(() => setPassport(null));
  }, [evidenceId]);

  if (!passport) return <div className="p-6 text-muted">Loading evidence record context...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border flex justify-between items-center flex-wrap gap-4">
        <div>
          <span className="font-mono text-xs font-bold bg-navy text-saffron px-2 py-0.5 rounded">
            {passport.passport_header.evidence_id}
          </span>
          <h2 className="text-xl font-bold text-navy mt-1">{passport.item_details.description}</h2>
          <p className="text-xs text-muted mt-0.5">Assigned to Case: {passport.passport_header.case_id}</p>
        </div>
        <StatusBadge status="verified" label={passport.integrity_status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
          <p className="text-xs font-semibold text-muted uppercase">Current Custodian</p>
          <p className="font-bold text-navy text-sm flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-govgreen" /> {passport.item_details.current_custodian}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
          <p className="text-xs font-semibold text-muted uppercase">Vault Location</p>
          <p className="font-bold text-navy text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-govblue" /> {passport.item_details.current_location}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border space-y-2">
          <p className="text-xs font-semibold text-muted uppercase">Reference SHA-256</p>
          <p className="font-mono text-xs text-muted truncate">{passport.passport_header.reference_hash}</p>
        </div>
      </div>
    </div>
  );
}
