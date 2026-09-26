import React from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function NotificationsPage() {
  const NOTIFICATIONS = [
    { title: 'Document OCR & AI Indexing Complete', message: 'Investigation_Report_001.pdf has been classified and indexed into pgvector.', time: '10 mins ago', link: '/cases/NV-2026-001' },
    { title: 'Evidence Transfer Request', message: 'Inspector Aarav Mehta requested custody transfer of EV-2026-0017.', time: '1 hour ago', link: '/evidence' },
    { title: 'Case Readiness Checklist Passed', message: 'Case NV-2026-001 satisfies all 3 legal readiness requirements.', time: '2 hours ago', link: '/cases/NV-2026-001' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Bell className="w-5 h-5 text-govblue" /> System Notifications & Alerts
        </h2>
        <p className="text-xs text-muted mt-1">Real-time alerts linked directly to case records, evidence passports, and reports</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5 space-y-3">
        {NOTIFICATIONS.map((n, idx) => (
          <div key={idx} className="p-4 bg-background border border-border rounded-lg flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-navy">{n.title}</span>
                <span className="text-[11px] text-muted">{n.time}</span>
              </div>
              <p className="text-xs text-muted mt-1">{n.message}</p>
            </div>
            <Link href={n.link} className="text-xs font-bold text-govblue hover:underline shrink-0">
              View Record →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
