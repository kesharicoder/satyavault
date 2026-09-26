import React from 'react';
import { Building2, Plus } from 'lucide-react';

export default function DepartmentsPage() {
  const DEPTS = [
    { name: 'Cyber Crime Division', code: 'DEPT-CYBER', users: 14, cases: 28 },
    { name: 'Central Evidence Vault', code: 'DEPT-VAULT', users: 8, cases: 148 },
    { name: 'Digital Forensics Lab', code: 'DEPT-FOR', users: 12, cases: 36 },
    { name: 'Directorate of Prosecution', code: 'DEPT-PROS', users: 6, cases: 18 },
    { name: 'Sessions Court Division', code: 'DEPT-COURT', users: 10, cases: 42 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface p-5 rounded-xl border border-border">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <Building2 className="w-5 h-5 text-govblue" /> Organizational Departments
          </h2>
          <p className="text-xs text-muted">Manage multi-tenant operational departments and unit boundaries</p>
        </div>
        <button className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4 text-saffron" /> Add Department
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov">
          <thead>
            <tr>
              <th>Dept Code</th>
              <th>Department Name</th>
              <th>Active Users</th>
              <th>Active Cases</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DEPTS.map((d, idx) => (
              <tr key={idx}>
                <td className="font-mono font-bold text-navy">{d.code}</td>
                <td className="font-semibold">{d.name}</td>
                <td className="text-muted">{d.users} Officers</td>
                <td className="text-muted">{d.cases} Cases</td>
                <td><span className="text-xs font-bold text-govgreen">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
