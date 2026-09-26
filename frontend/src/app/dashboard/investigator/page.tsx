"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KPI } from '@/components/ui/KPI';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { getCurrentUser, logoutUser, UserProfile } from '@/lib/auth';
import { Briefcase, FileText, Plus, ShieldCheck, Search, LogOut, User, Mail, Building } from 'lucide-react';

export default function InvestigatorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const activeUser = user || {
    name: 'Inspector Aarav Mehta',
    user_code: 'INV-001',
    role_label: 'Investigator',
    department: 'Cyber Crime Division',
    email: 'aarav.mehta@nyayavault.local'
  };

  return (
    <RoleGuard allowedRole="investigator">
      <div className="space-y-6">
        {/* Portal Header Banner with User Profile & Logout */}
        <div className="bg-gradient-to-r from-navy to-govblue p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] bg-saffron text-navy font-extrabold px-2 py-0.5 rounded uppercase">
                {activeUser.role_label} Workspace
              </span>
              <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded">
                Code: {activeUser.user_code}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{activeUser.name}</h2>
            <p className="text-xs text-slate-200 flex items-center gap-2 mt-0.5">
              <Building className="w-3.5 h-3.5 text-saffron" /> {activeUser.department} • <Mail className="w-3.5 h-3.5 text-saffron" /> {activeUser.email}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <Link 
              href="/cases/new" 
              className="bg-saffron hover:bg-saffron-light text-navy font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Create New Case
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600/90 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* User Specific Details Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-govblue" /> Officer Profile & Station Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block font-semibold">Officer Name:</span>
              <span className="font-bold text-slate-900 text-sm">{activeUser.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Badge Code:</span>
              <span className="font-mono font-bold text-govblue text-sm">{activeUser.user_code}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Official Email:</span>
              <span className="font-mono text-slate-800">{activeUser.email}</span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPI title="Active Assigned Cases" value="3" subtitle="NV-2026-001 active" icon={<Briefcase className="w-5 h-5" />} />
          <KPI title="Documents Uploaded" value="28" subtitle="100% SHA-256 hashed" icon={<FileText className="w-5 h-5" />} />
          <KPI title="Evidence Items Registered" value="12" subtitle="Passports generated" icon={<ShieldCheck className="w-5 h-5" />} />
          <KPI title="Pending Custody Transfers" value="1" subtitle="Awaiting acceptance" icon={<Search className="w-5 h-5" />} />
        </div>

        {/* Assigned Workspace */}
        <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-navy">Assigned Case Workspace — NV-2026-001</h3>
            <Link href="/cases/NV-2026-001" className="text-xs font-bold text-govblue hover:underline">
              Open Full Workspace →
            </Link>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-navy text-sm">Digital Evidence Review – Sector 17 Investigation</p>
              <p className="text-muted">Case ID: NV-2026-001 • Jurisdiction: New Delhi Judicial District</p>
            </div>
            <StatusBadge status="investigation" label="ACTIVE INVESTIGATION" />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
