"use client";

import React, { useEffect, useState } from 'react';
import { Users, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/admin/users')
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Users className="w-5 h-5 text-govblue" /> User & Role Management Portal
        </h2>
        <p className="text-xs text-muted mt-1">Assign system roles and department permissions for RBAC enforcement</p>
      </div>

      <div className="bg-surface rounded-xl border border-border p-5">
        <table className="table-gov">
          <thead>
            <tr>
              <th>User Code</th>
              <th>Name</th>
              <th>Assigned Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-mono font-bold text-navy">{u.user_code}</td>
                <td className="font-semibold">{u.name}</td>
                <td className="uppercase text-xs font-bold text-govblue">{u.role}</td>
                <td className="text-muted">{u.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
