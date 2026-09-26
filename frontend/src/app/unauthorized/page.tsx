"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, UserProfile } from '@/lib/auth';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-6">
      <div className="bg-surface p-8 rounded-2xl border border-border shadow-lg space-y-6 text-center">
        <div className="inline-flex p-4 bg-red-100 text-govred rounded-2xl">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="bg-govred text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Access Denied — Single Persona Scoping
          </span>
          <h2 className="text-2xl font-bold text-navy">Single Persona Portal Boundary Enforced</h2>
          <p className="text-xs text-muted leading-relaxed">
            You do not have permission to view this role portal. Your authenticated persona identity is scoped exclusively to your assigned single-role workspace.
          </p>
        </div>

        {currentUser && (
          <div className="p-4 bg-background rounded-xl border border-border text-xs text-muted text-left space-y-1">
            <p className="font-bold text-navy">Your Active Authenticated Persona:</p>
            <p><strong>Identity:</strong> {currentUser.name} ({currentUser.email})</p>
            <p><strong>Assigned Role:</strong> <span className="font-bold text-govblue">{currentUser.role_label}</span></p>
            <p><strong>Department:</strong> {currentUser.department}</p>
          </div>
        )}

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row justify-center gap-3">
          {currentUser && (
            <Link
              href={currentUser.portal_path}
              className="bg-navy hover:bg-navy-dark text-white font-bold px-6 py-3 rounded-xl shadow-md text-xs flex items-center justify-center gap-2 transition-colors"
            >
              Return to Your Assigned {currentUser.role_label} Portal <ArrowRight className="w-4 h-4 text-saffron" />
            </Link>
          )}
          <Link
            href="/login"
            className="bg-background hover:bg-surface text-navy font-bold px-6 py-3 rounded-xl border border-border text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Lock className="w-4 h-4 text-saffron" /> Switch Persona / Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
