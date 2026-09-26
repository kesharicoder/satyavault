import React from 'react';
import { KeyRound, Check, X } from 'lucide-react';

export default function RolesPermissionsPage() {
  const MATRIX = [
    { cap: 'Create Case', inv: true, cust: false, for: false, pros: false, court: false, aud: false, adm: true },
    { cap: 'Upload Document', inv: true, cust: true, for: true, pros: true, court: false, aud: false, adm: true },
    { cap: 'Register Evidence', inv: true, cust: true, for: true, pros: false, court: false, aud: false, adm: true },
    { cap: 'Custody Transfer', inv: true, cust: true, for: true, pros: false, court: false, aud: false, adm: true },
    { cap: 'View Audit Logs', inv: false, cust: false, for: false, pros: false, court: false, aud: true, adm: true },
    { cap: 'Manage Users', inv: false, cust: false, for: false, pros: false, court: false, aud: false, adm: true },
    { cap: 'Export Case Bundle', inv: true, cust: true, for: true, pros: true, court: true, aud: true, adm: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-govblue" /> RBAC Permission Matrix & Control Policies
        </h2>
        <p className="text-xs text-muted mt-1">Server-enforced role permissions mapped directly to FastAPI dependencies and PostgreSQL RLS</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov text-center">
          <thead>
            <tr>
              <th className="text-left">Capability</th>
              <th>Investigator</th>
              <th>Custody</th>
              <th>Forensic</th>
              <th>Prosecutor</th>
              <th>Court</th>
              <th>Auditor</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((m, idx) => (
              <tr key={idx}>
                <td className="text-left font-bold text-navy">{m.cap}</td>
                <td>{m.inv ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.cust ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.for ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.pros ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.court ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.aud ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                <td>{m.adm ? <Check className="w-4 h-4 text-govgreen mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
