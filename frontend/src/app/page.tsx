"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, FileText, Bot, ArrowRight, CheckCircle2, ShieldAlert, FileSpreadsheet, LogIn, UserPlus, UserCheck } from 'lucide-react';

export default function PublicLandingPage() {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-navy via-navy-light to-govblue p-8 md:p-12 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-saffron text-navy font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Smart India Hackathon 2026 Prototype
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            SATYA VAULT
          </h1>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed">
            Secure Digital Document & Evidence Management Platform for Legal, Forensic, and Judicial Workflows.
            Ensuring cryptographic non-repudiation, tamper-evident hash chaining, and source-grounded AI decision support.
          </p>

          {/* Primary Landing Page Sign In / Sign Up CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/login?tab=signin"
              className="bg-saffron hover:bg-saffron-light text-navy font-extrabold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In to Portal
            </Link>
            <Link
              href="/login?tab=signup"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/30 flex items-center gap-2 text-sm transition-all"
            >
              <UserPlus className="w-4 h-4 text-saffron" /> Sign Up / Register Persona
            </Link>
            <Link
              href="/how-it-works"
              className="text-xs text-slate-300 hover:text-saffron font-semibold underline flex items-center gap-1 ml-auto"
            >
              Explore User Flow <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Notice Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-govamber shrink-0" />
          <span>
            <strong>SIH 2026 Prototype Notice:</strong> Satya Vault uses 100% synthetic demonstration data. It does not represent an officially deployed Government of India system or live police network.
          </span>
        </div>
        <Link href="/security-policy" className="font-bold underline shrink-0 hover:text-navy">
          Read Security Policy
        </Link>
      </div>



      {/* Core Operational Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-3">
          <div className="p-3 bg-navy/10 rounded-lg text-navy w-fit">
            <Lock className="w-6 h-6 text-saffron" />
          </div>
          <h3 className="text-lg font-bold text-navy">SHA-256 Binary Integrity</h3>
          <p className="text-xs text-muted leading-relaxed">
            Every document and digital evidence file computes an immutable raw binary SHA-256 checksum at intake, preventing undetected file substitution.
          </p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-3">
          <div className="p-3 bg-navy/10 rounded-lg text-navy w-fit">
            <FileSpreadsheet className="w-6 h-6 text-govblue" />
          </div>
          <h3 className="text-lg font-bold text-navy">Hash-Chained Audit Ledger</h3>
          <p className="text-xs text-muted leading-relaxed">
            Append-only PostgreSQL ledger where every user action is cryptographically chained (H_i = SHA256(Event_i + H_(i-1))) to guarantee non-repudiation.
          </p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-3">
          <div className="p-3 bg-navy/10 rounded-lg text-navy w-fit">
            <Bot className="w-6 h-6 text-govgreen" />
          </div>
          <h3 className="text-lg font-bold text-navy">Source-Grounded AI</h3>
          <p className="text-xs text-muted leading-relaxed">
            Permission-filtered RAG assistant retrieving authorized case context only, providing source document citations with mandatory advisory disclaimers.
          </p>
        </div>
      </section>
    </div>
  );
}


