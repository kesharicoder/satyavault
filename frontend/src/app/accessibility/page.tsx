import React from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="bg-surface p-6 rounded-xl border border-border space-y-4">
        <h2 className="text-xl font-bold text-navy flex items-center gap-2">
          <Eye className="w-5 h-5 text-govblue" /> Accessibility Statement & Standards
        </h2>
        <p className="text-xs text-muted leading-relaxed">
          Satya Vault adheres to WCAG 2.1 AA accessibility guidelines, ensuring restrained high-contrast government color tokens, screen-reader landmark navigation, skip-to-content links, and full keyboard focus state visibility.
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-background rounded-lg border border-border flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-govgreen shrink-0" />
            <span>High-Contrast Color Palette (Deep Navy #12304A, Muted Saffron #C9822B, Slate Background #F5F7F9)</span>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-govgreen shrink-0" />
            <span>Keyboard Focus Indicators & Skip-to-Main-Content Anchor Navigation</span>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-govgreen shrink-0" />
            <span>Semantic HTML5 Structure (header, nav, main, footer, section, table)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
