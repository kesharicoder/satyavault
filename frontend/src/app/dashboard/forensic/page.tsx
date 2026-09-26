"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KPI } from '@/components/ui/KPI';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { getCurrentUser, logoutUser, UserProfile } from '@/lib/auth';
import { Cpu, FileText, Upload, ShieldCheck, LogOut, User, Mail, Building } from 'lucide-react';

export default function ForensicDashboard() {
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
    name: 'Dr. Neha Sharma',
    user_code: 'FOR-003',
    role_label: 'Forensic Officer',
    department: 'Digital Forensics Lab',
    email: 'neha.sharma@nyayavault.local'
  };

  return (
    <RoleGuard allowedRole="forensic_officer">
      <div className="space-y-6">
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
              href="/documents" 
              className="bg-saffron hover:bg-saffron-light text-navy font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Upload className="w-4 h-4" /> Upload Lab Report
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600/90 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-govblue" /> Forensic Examiner Credentials & Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block font-semibold">Examiner Name:</span>
              <span className="font-bold text-slate-900 text-sm">{activeUser.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">User Code:</span>
              <span className="font-mono font-bold text-govblue text-sm">{activeUser.user_code}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Lab Email:</span>
              <span className="font-mono text-slate-800">{activeUser.email}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPI title="Assigned Evidence Drives" value="4" subtitle="EV-2026-0017 active" icon={<Cpu className="w-5 h-5" />} />
          <KPI title="Forensic Lab Reports" value="14" subtitle="OCR & AI processed" icon={<FileText className="w-5 h-5" />} />
          <KPI title="Checksum Verifications" value="100%" subtitle="0 hash mismatches" icon={<ShieldCheck className="w-5 h-5" />} />
          <KPI title="AI Document Intelligence" value="Active" subtitle="Entity extraction enabled" icon={<Cpu className="w-5 h-5 text-govgreen" />} />
        </div>
      </div>
    </RoleGuard>
  );
}
