"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PRESET_USERS, loginUser, signUpUser, authenticateUserCredentials, UserProfile } from '@/lib/auth';
import { Shield, Lock, UserPlus, LogIn, ArrowRight, KeyRound, Mail, UserCheck, ShieldCheck, ExternalLink } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    } else if (tabParam === 'signin') {
      setActiveTab('signin');
    }
  }, [searchParams]);

  // Sign In state - Real required input fields
  const [signInIdentifier, setSignInIdentifier] = useState('aarav.mehta@satyavault.local');
  const [signInPassword, setSignInPassword] = useState('••••••••');
  const [signInRole, setSignInRole] = useState<UserProfile['role']>('investigator');

  // Sign Up state
  const [signUpName, setSignUpName] = useState('Inspector Aarav Mehta');
  const [signUpCode, setSignUpCode] = useState('INV-008');
  const [signUpDept, setSignUpDept] = useState('Cyber Crime Division');
  const [signUpRole, setSignUpRole] = useState<UserProfile['role']>('investigator');
  const [signUpEmail, setSignUpEmail] = useState('aarav.mehta@satyavault.local');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authenticateUserCredentials({
      identifier: signInIdentifier,
      role: signInRole,
    });
    router.push(user.portal_path);
  };

  const handleQuickLogin = (presetUser: UserProfile) => {
    loginUser(presetUser);
    router.push(presetUser.portal_path);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = signUpUser({
      name: signUpName,
      user_code: signUpCode,
      department: signUpDept,
      role: signUpRole,
      email: signUpEmail,
    });
    router.push(newUser.portal_path);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div className="bg-surface p-8 rounded-2xl border border-border shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-navy text-saffron rounded-xl mb-2">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy">Satya Vault Identity Portal</h2>
          <p className="text-xs text-muted">
            Enter required authentication credentials or select a role persona to access your single-role portal.
          </p>
        </div>

        {/* Dual Mode Tab Selector */}
        <div className="flex border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'signin'
                ? 'border-saffron text-navy font-bold'
                : 'border-transparent text-muted hover:text-navy'
              }`}
          >
            <LogIn className="w-4 h-4 text-saffron" /> Sign In (Officer Access)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 flex items-center justify-center gap-2 transition-colors ${activeTab === 'signup'
                ? 'border-saffron text-navy font-bold'
                : 'border-transparent text-muted hover:text-navy'
              }`}
          >
            <UserPlus className="w-4 h-4 text-saffron" /> Sign Up / Register Persona
          </button>
        </div>

        {/* Tab 1: Sign In */}
        {activeTab === 'signin' && (
          <div className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-1">
                  Email Address or Badge ID / User Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    placeholder="e.g. aarav.mehta@satyavault.local or INV-001"
                    className="w-full p-2.5 pl-9 text-sm bg-background border border-border rounded-lg focus:outline-none focus:border-saffron"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                    <input
                      type="password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 pl-9 text-sm bg-background border border-border rounded-lg focus:outline-none focus:border-saffron"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy uppercase block mb-1">
                    Assigned Persona Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={signInRole}
                    onChange={(e) => setSignInRole(e.target.value as any)}
                    className="w-full p-2.5 text-sm bg-background border border-border rounded-lg font-semibold text-navy focus:outline-none focus:border-saffron"
                    required
                  >
                    <option value="investigator">Investigator</option>
                    <option value="custody_officer">Custody Officer</option>
                    <option value="forensic_officer">Forensic Officer</option>
                    <option value="prosecutor">Prosecutor / Legal Officer</option>
                    <option value="court_officer">Court Officer</option>
                    <option value="security_auditor">Security Auditor</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-colors"
              >
                Sign In to Secure Portal <ArrowRight className="w-4 h-4 text-saffron" />
              </button>
            </form>

            {/* Localhost Quick Role Access Cards */}
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-navy flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-govblue" /> Demo Portal Quick Access
                </h3>
                <span className="text-[10px] text-muted font-mono">1-Click Portal Authentication</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className="p-3 bg-background hover:bg-white border border-border hover:border-saffron/50 rounded-xl text-left transition-all hover:shadow-sm flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-navy group-hover:text-govblue transition-colors">{user.name}</span>
                        <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded font-mono font-semibold">{user.user_code}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{user.role_label} • {user.department}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-saffron transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sign Up */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Full Name</label>
              <input
                type="text"
                value={signUpName}
                onChange={e => setSignUpName(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-1">User Code</label>
                <input
                  type="text"
                  value={signUpCode}
                  onChange={e => setSignUpCode(e.target.value)}
                  className="w-full p-2.5 text-sm bg-background border border-border rounded-lg font-mono font-bold text-navy"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-navy uppercase block mb-1">Assigned Role</label>
                <select
                  value={signUpRole}
                  onChange={e => setSignUpRole(e.target.value as any)}
                  className="w-full p-2.5 text-sm bg-background border border-border rounded-lg font-semibold text-navy"
                >
                  <option value="investigator">Investigator</option>
                  <option value="custody_officer">Custody Officer</option>
                  <option value="forensic_officer">Forensic Officer</option>
                  <option value="prosecutor">Prosecutor / Legal Officer</option>
                  <option value="court_officer">Court Officer</option>
                  <option value="security_auditor">Security Auditor</option>
                  <option value="administrator">Administrator</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Department</label>
              <input
                type="text"
                value={signUpDept}
                onChange={e => setSignUpDept(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-navy uppercase block mb-1">Email Address</label>
              <input
                type="email"
                value={signUpEmail}
                onChange={e => setSignUpEmail(e.target.value)}
                className="w-full p-2.5 text-sm bg-background border border-border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-colors mt-4"
            >
              <UserPlus className="w-4 h-4 text-saffron" /> Register Persona & Open Role Portal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-muted">Loading Identity Portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
