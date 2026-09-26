"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Briefcase, FileText, ShieldCheck, CheckCircle2, FileSpreadsheet, Lock } from 'lucide-react';

export default function CaseWorkspacePage() {
  const params = useParams();
  const caseId = params?.caseId as string;
  const [caseDetail, setCaseDetail] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'evidence' | 'readiness'>('overview');

  useEffect(() => {
    fetch(`/api/v1/cases/${caseId}`)
      .then(res => res.json())
      .then(data => setCaseDetail(data))
      .catch(() => setCaseDetail(null));

    fetch(`/api/v1/cases/${caseId}/readiness`)
      .then(res => res.json())
      .then(data => setReadiness(data))
      .catch(() => setReadiness(null));
  }, [caseId]);

  if (!caseDetail) {
    return <div className="p-6 text-muted">Loading case workspace context...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-navy text-saffron px-2 py-0.5 rounded">
              {caseDetail.case_number}
            </span>
            <StatusBadge status={caseDetail.status} />
          </div>
          <h2 className="text-xl font-bold text-navy mt-1">{caseDetail.title}</h2>
          <p className="text-xs text-muted mt-0.5">{caseDetail.jurisdiction} • {caseDetail.department}</p>
        </div>
        
        {readiness && (
          <div className="bg-background px-4 py-2 rounded-lg border border-border flex items-center gap-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted">Legal Readiness</p>
              <p className="font-bold text-sm text-navy">{readiness.status}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-navy text-saffron flex items-center justify-center font-bold text-xs">
              {readiness.score_percentage}%
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border space-x-4">
        {['overview', 'documents', 'evidence', 'readiness'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-2 text-sm font-semibold capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-saffron text-navy font-bold'
                : 'border-transparent text-muted hover:text-navy'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <h3 className="font-bold text-navy">Case Summary & Security Metadata</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted">Case Classification</p>
              <p className="font-bold text-navy uppercase">{caseDetail.classification}</p>
            </div>
            <div>
              <p className="text-muted">Created Timestamp</p>
              <p className="font-medium text-text">{caseDetail.created_at}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'readiness' && readiness && (
        <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
          <h3 className="font-bold text-navy">Case Legal Readiness Engine</h3>
          <div className="space-y-3">
            {readiness.checks.map((c: any, idx: number) => (
              <div key={idx} className="p-3 bg-background rounded-lg border border-border flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-navy">{c.rule_name}</p>
                  <p className="text-xs text-muted mt-0.5">{c.reason}</p>
                </div>
                <StatusBadge status={c.passed ? 'verified' : 'failed'} label={c.passed ? 'PASSED' : 'ACTION REQUIRED'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
