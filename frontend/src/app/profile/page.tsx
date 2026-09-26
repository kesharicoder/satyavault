"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, UserProfile } from '@/lib/auth';
import { UserCheck, Shield, KeyRound, Mail, Building2, BadgeCheck, ExternalLink, ShieldAlert } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center text-muted font-medium">
        Loading officer credentials...
      </div>
    );
  }

  // Generate initials from name (handling titles like Dr., Inspector, Adv., Justice)
  const cleanName = user.name.replace(/^(Dr\.|Inspector|Officer|Adv\.|Justice)\s+/i, '');
  const nameParts = cleanName.trim().split(' ');
  const initials = nameParts.length >= 2
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : user.name.slice(0, 2).toUpperCase();

  const getClearanceLevel = (role: UserProfile['role']) => {
    switch (role) {
      case 'administrator':
        return 'Level 5 — Chief Administrator System Clearance';
      case 'security_auditor':
        return 'Level 5 — Internal Security Audit Clearance';
      case 'court_officer':
        return 'Level 5 — Judicial Bench & Exhibit Clearance';
      case 'prosecutor':
        return 'Level 4 — Prosecutorial Review & Bundle Clearance';
      case 'forensic_officer':
        return 'Level 4 — Digital Forensics Examiner Clearance';
      case 'custody_officer':
        return 'Level 4 — Vault Custody & Transfer Clearance';
      case 'investigator':
      default:
        return 'Level 4 — Restricted Case Investigation Clearance';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* Officer Header Card */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-navy text-saffron flex items-center justify-center font-bold text-2xl shadow-inner border-2 border-saffron/40">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-navy">{user.name}</h2>
                <span className="text-[11px] bg-govblue/10 text-govblue border border-govblue/30 px-2 py-0.5 rounded font-mono font-bold">
                  {user.user_code}
                </span>
              </div>
              <p className="text-xs text-muted flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-govblue" /> {user.department}
              </p>
            </div>
          </div>

          <Link
            href={user.portal_path}
            className="px-4 py-2 bg-navy hover:bg-navy-light text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors self-stretch sm:self-auto justify-center"
          >
            Access Portal Dashboard <ExternalLink className="w-3.5 h-3.5 text-saffron" />
          </Link>
        </div>

        {/* Detailed Credential Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-border">
          <div className="bg-background p-3.5 rounded-lg border border-border space-y-1">
            <p className="text-muted text-[11px] font-semibold flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-govblue" /> Assigned System Role
            </p>
            <p className="font-bold text-navy uppercase text-sm">{user.role_label}</p>
          </div>

          <div className="bg-background p-3.5 rounded-lg border border-border space-y-1">
            <p className="text-muted text-[11px] font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-govgreen" /> Account Authentication Status
            </p>
            <p className="font-bold text-govgreen uppercase text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-govgreen animate-pulse"></span> Active & Authenticated
            </p>
          </div>

          <div className="bg-background p-3.5 rounded-lg border border-border space-y-1">
            <p className="text-muted text-[11px] font-semibold flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-govblue" /> Official Portal Email
            </p>
            <p className="font-mono font-semibold text-navy text-xs">{user.email}</p>
          </div>

          <div className="bg-background p-3.5 rounded-lg border border-border space-y-1">
            <p className="text-muted text-[11px] font-semibold flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-saffron" /> Security Clearance Level
            </p>
            <p className="font-bold text-navy uppercase text-xs">{getClearanceLevel(user.role)}</p>
          </div>
        </div>
      </div>

      {/* Role Security Clearance Disclaimer Card */}
      <div className="bg-background p-4 rounded-xl border border-border flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-navy">Single-Persona Single-Role Isolation Policy Active</h4>
          <p className="text-[11px] text-muted leading-relaxed">
            Your logged-in session profile <span className="font-bold text-navy">({user.name})</span> is strictly scoped to the <span className="font-bold text-navy">{user.role_label}</span> workspace at <code className="bg-slate-200 px-1 py-0.5 rounded text-navy">{user.portal_path}</code>. Access to unauthorized role dashboards is blocked by client-side RoleGuard and server-side PostgreSQL Row-Level Security (RLS).
          </p>
        </div>
      </div>
    </div>
  );
}
