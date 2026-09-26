import React from 'react';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Mail className="w-5 h-5 text-govblue" /> Contact & SIH Support Desk
        </h2>
        <p className="text-xs text-muted">
          Smart India Hackathon 2026 Prototype Evaluation Team
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-border">
          <div className="p-4 bg-background rounded-lg border border-border space-y-1">
            <p className="font-bold text-navy">Prototype Enquiries</p>
            <p className="text-muted">Email: sih2026@satyavault.local</p>
            <p className="text-muted">Phone: +91 11 2345 6789</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border space-y-1">
            <p className="font-bold text-navy">Technical Operational Lead</p>
            <p className="text-muted">Cyber Operations Lab</p>
            <p className="text-muted">New Delhi 110001</p>
          </div>
        </div>
      </div>
    </div>
  );
}
