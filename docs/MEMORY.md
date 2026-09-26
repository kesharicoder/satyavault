# Satya Vault Project Memory

## Product Overview
Satya Vault is a secure digital document and evidence management prototype built for Smart India Hackathon 2026. It provides a cryptographically anchored, audit-ledger backed workflow layer for law enforcement, forensics, prosecution, judicial officers, and security auditors.

---

## Technical Stack & Architecture
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React icons
- **Backend:** FastAPI (Python 3.11+), Pydantic v2, Pytest suite
- **Database & Auth:** Supabase PostgreSQL with `pgvector`, Supabase Auth
- **Security & Storage:** Private Buckets (`public = false`), PostgreSQL Row-Level Security (RLS), Raw Binary SHA-256 Checksums, Hash-Chained Audit Ledger ($H_i = \text{SHA256}(\text{Event}_i + H_{i-1})$)
- **AI & Processing:** Gemini / Ollama Provider Abstraction, PaddleOCR, ReportLab PDF Bundle Generator

---

## System Navigation & Layout Architecture

### 1. Public Website Experience (No Left Sidebar)
- `/` — Public Landing Page with Hero Sign In & Sign Up CTAs, SIH 2026 Notice, & Core Pillars
- `/about` — System Purpose, Mission & Cryptographic Principles
- `/how-it-works` — 10-Stage Evidence & Case Lifecycle Diagram
- `/security-policy` — Threat Mitigations & DB RLS Model
- `/accessibility` — WCAG 2.1 AA Accessibility Statement
- `/help` — FAQ & User Knowledge Base
- `/contact` — Support & Hackathon Contacts
- `/login` — Identity Portal supporting Dual-Mode Sign In (`/login?tab=signin`) & Sign Up (`/login?tab=signup`)

### 2. Authenticated Secure Portal Experience (With AppSidebar)
- `/dashboard/investigator` — Investigator Workstation & Case Intake
- `/dashboard/custody` — Evidence Custody Vault & Physical Transfer Logs
- `/dashboard/forensic` — Digital Forensics Laboratory & Report Submissions
- `/dashboard/prosecutor` — Prosecution Legal Review & Case Bundle Exports
- `/dashboard/court` — Judicial Bench Workstation & Exhibit Review
- `/dashboard/security-auditor` — Security Operations Center & Radar Alerts
- `/dashboard/admin` — System Administration & RBAC Scoping
- `/unauthorized` — Single-Persona Portal Boundary Protection Page

---

## Single-Persona Authorization Model
- **Standard Required Credentials Sign In**: Sign In requires standard user input fields (`Email / User Code`, `Password`, `Assigned Role`) on `/login?tab=signin`.
- **Strict Role-Based Routing**: Logging in or registering as a specific persona (e.g. Inspector Aarav Mehta -> `investigator`, Rahul Verma -> `custody_officer`, Dr. Neha Sharma -> `forensic_officer`, etc.) routes exclusively to their single persona portal (`/dashboard/investigator`, `/dashboard/custody`, etc.).
- **Role Guard Protection**: `RoleGuard` protects every portal dashboard route. If a user logged into Persona A attempts to access Persona B's portal path in the browser address bar, `RoleGuard` blocks access and redirects to `/unauthorized`.
- **Supabase Auto-Registration Trigger**: Migration `014_user_registration_trigger.sql` automatically inserts a row into `public.profiles` and `public.user_roles` whenever a user registers in Supabase `auth.users`.

---

## Primary Synthetic Demo Dataset
- **Case ID:** `NV-2026-001` (*Digital Evidence Review – Sector 17 Investigation*)
- **Evidence ID:** `EV-2026-0017` (*Digital Device — Seized 2TB External Hard Drive*)
- **Documents:** `Investigation_Report_001.pdf`, `Forensic_Report_017.pdf`, `Evidence_Register_017.pdf`, `Witness_Statement_004.pdf`
- **Synthetic Personas:** Inspector Aarav Mehta (Investigator), Rahul Verma (Custody Officer), Dr. Neha Sharma (Forensic Officer), Adv. Priya Nair (Prosecutor), Justice S. K. Roy (Court Officer), Amitav Ghosh (Security Auditor), Chief Administrator.

---

## Key Operational Rules & Constraints
1. **100% Synthetic Data Only**: No real personal or sensitive information is used.
2. **SIH 2026 Identification**: System is explicitly identified as a "Smart India Hackathon 2026 Prototype".
3. **Server-Enforced Security**: All permissions are validated at FastAPI backend & database RLS levels; UI hiding is treated strictly as UX convenience.
4. **Private Storage Default**: Direct storage bucket object URLs are blocked (`public = false`); access requires short-lived (300s) signed URLs.
5. **Advisory AI Notice**: All AI-generated outputs display compulsory advisory decision-support notices.

---

## Verification & System Status
- **Backend Test Suite**: 7/7 unit and integration tests passed (`100% Success`).
- **Cryptographic Audit Chain**: Verified 100% intact hash continuity.
- **Local Runtime**: Frontend live on `http://localhost:3000`, Backend live on `http://localhost:8000`.
