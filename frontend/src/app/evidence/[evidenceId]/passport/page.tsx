"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldCheck, UserCheck, MapPin } from 'lucide-react';

export default function EvidencePassportPage() {
  const params = useParams();
  const evidenceId = (params?.evidenceId as string) || 'EV-2026-0017';
  const [passport, setPassport] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/v1/evidence/${evidenceId}/passport`)
      .then(res => res.json())
      .then(data => setPassport(data))
      .catch(() => setPassport(null));
  }, [evidenceId]);

  if (!passport) return <div className="p-6 text-muted">Loading Evidence Passport...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-surface p-8 rounded-2xl border-2 border-navy shadow-md space-y-6">
        <div className="flex justify-between items-start border-b border-border pb-4">
          <div>
            <span className="text-[10px] bg-saffron text-navy font-bold px-2 py-0.5 rounded uppercase">
              SIH 2026 Official Passport
            </span>
            <h2 className="text-2xl font-bold text-navy mt-1">{passport.passport_header.title}</h2>
            <p className="font-mono text-xs text-muted">Evidence ID: {passport.passport_header.evidence_id} • Case: {passport.passport_header.case_id}</p>
          </div>
          <StatusBadge status="verified" label={passport.integrity_status} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted">Evidence Type</p>
            <p className="font-bold text-navy text-sm">{passport.item_details.evidence_type}</p>
          </div>
          <div>
            <p className="text-muted">Seizure Location / Source</p>
            <p className="font-bold text-navy text-sm">{passport.item_details.source}</p>
          </div>
          <div>
            <p className="text-muted">Current Custodian</p>
            <p className="font-bold text-navy text-sm">{passport.item_details.current_custodian}</p>
          </div>
          <div>
            <p className="text-muted">Vault Facility Location</p>
            <p className="font-bold text-navy text-sm">{passport.item_details.current_location}</p>
          </div>
        </div>

        <div className="p-4 bg-background rounded-xl border border-border space-y-2">
          <p className="text-xs font-bold text-navy uppercase">SHA-256 Reference Checksum</p>
          <p className="font-mono text-xs text-muted break-all">{passport.passport_header.reference_hash}</p>
        </div>
      </div>
    </div>
  );
}
