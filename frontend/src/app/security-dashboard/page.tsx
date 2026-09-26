"use client";

import React, { useEffect, useState } from 'react';
import { KPI } from '@/components/ui/KPI';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export default function SecurityDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-govgreen" /> System Security Operations Center
        </h2>
        <p className="text-xs text-muted mt-1">Real-time threat monitoring, Isolation Forest anomaly analysis, and permission enforcement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPI title="Failed Logins (24h)" value="0" subtitle="Normal thresholds" icon={<Lock className="w-5 h-5 text-govgreen" />} />
        <KPI title="Unusual Downloads" value="0" subtitle="Rate limit: 60/min" icon={<AlertTriangle className="w-5 h-5" />} />
        <KPI title="Integrity Mismatches" value="0" subtitle="SHA-256 verified" icon={<CheckCircle2 className="w-5 h-5 text-govgreen" />} />
        <KPI title="Security Radar Risk" value="Low" subtitle="Isolation Forest score" icon={<ShieldAlert className="w-5 h-5 text-govgreen" />} />
      </div>
    </div>
  );
}
