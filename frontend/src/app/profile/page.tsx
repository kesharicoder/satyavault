import React from 'react';
import { UserCheck, Shield, KeyRound } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-navy text-saffron flex items-center justify-center font-bold text-xl">
            AM
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy">Inspector Aarav Mehta</h2>
            <p className="text-xs text-muted">User ID: INV-001 • Cyber Crime Division</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-border">
          <div>
            <p className="text-muted">Assigned System Role</p>
            <p className="font-bold text-navy uppercase">Investigator / Lead</p>
          </div>
          <div>
            <p className="text-muted">Account Status</p>
            <p className="font-bold text-govgreen uppercase">Active & Authenticated</p>
          </div>
          <div>
            <p className="text-muted">Last Active Session</p>
            <p className="font-medium text-text">2026-09-23 10:30:00 UTC</p>
          </div>
          <div>
            <p className="text-muted">Security Clearance</p>
            <p className="font-bold text-navy uppercase">Level 4 Restricted Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
