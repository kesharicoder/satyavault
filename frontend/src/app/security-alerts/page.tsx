"use client";

import React, { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AlertTriangle, Shield } from 'lucide-react';

export default function SecurityAlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/alerts')
      .then(res => res.json())
      .then(data => setAlerts(Array.isArray(data) ? data : []))
      .catch(() => setAlerts([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-saffron" /> Security Radar Alerts & Incident Log
        </h2>
        <p className="text-xs text-muted mt-1">Rule-based and Isolation Forest threat alerts requiring security auditor review</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 space-y-3">
        {alerts.length > 0 ? (
          alerts.map(a => (
            <div key={a.id} className="p-4 bg-background border border-border rounded-lg flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-navy">{a.title}</span>
                  <StatusBadge status="failed" label={a.severity.toUpperCase()} />
                </div>
                <p className="text-xs text-muted mt-1">{a.description}</p>
                <p className="text-xs font-semibold text-govamber mt-2">{a.review_notes}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-6">No open security alerts detected. System is operating normally.</div>
        )}
      </div>
    </div>
  );
}
