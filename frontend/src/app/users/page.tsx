"use client";

import React, { useEffect, useState } from 'react';
import { Users, UserPlus } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/admin/users')
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-surface p-5 rounded-xl border border-border">
        <div>
          <h2 className="text-xl font-bold text-navy flex items-center gap-2">
            <Users className="w-5 h-5 text-govblue" /> User & Identity Management
          </h2>
          <p className="text-xs text-muted">Manage system users, active sessions, and assigned identity profiles</p>
        </div>
        <button className="bg-navy text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm">
          <UserPlus className="w-4 h-4 text-saffron" /> Add Synthetic Persona
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov">
          <thead>
            <tr>
              <th>User Code</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="font-mono font-bold text-navy">{u.user_code}</td>
                <td className="font-semibold">{u.name}</td>
                <td className="uppercase text-xs font-bold text-govblue">{u.role}</td>
                <td className="text-muted">{u.department}</td>
                <td><span className="text-xs font-bold text-govgreen">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
