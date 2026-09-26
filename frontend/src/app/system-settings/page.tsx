import React from 'react';
import { Settings, Shield, Lock, Bell, Database } from 'lucide-react';

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Settings className="w-5 h-5 text-govblue" /> Platform Configuration & System Settings
        </h2>
        <p className="text-xs text-muted mt-1">Configure security controls, upload limits, AI models, and audit settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-navy text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-saffron" /> Storage & Integrity Policy
          </h3>
          <div className="text-xs space-y-2 text-muted">
            <p><strong>Max File Size:</strong> 50 MB per attachment</p>
            <p><strong>Allowed MIME Types:</strong> PDF, JPEG, PNG, TXT, OCTET-STREAM</p>
            <p><strong>Signed URL Expiry:</strong> 300 seconds (5 minutes)</p>
            <p><strong>Bucket Privacy:</strong> 100% Private (No public endpoints)</p>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-xl border border-border space-y-3">
          <h3 className="font-bold text-navy text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-govblue" /> AI Provider & Vector Settings
          </h3>
          <div className="text-xs space-y-2 text-muted">
            <p><strong>Active AI Provider:</strong> Gemini 1.5 Pro / Ollama Local</p>
            <p><strong>Vector Dimensions:</strong> 768d Cosine Distance (ivfflat)</p>
            <p><strong>OCR Engine:</strong> PaddleOCR Engine v2.4</p>
            <p><strong>Audit Ledger:</strong> SHA-256 Hash Chain Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
