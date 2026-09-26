# Product Requirement Document (PRD) — Satya Vault

## 1. System Context & Overview
Satya Vault is an evidence-centric digital document and evidence management prototype. It provides a secure, audit-anchored workflow layer for legal, law enforcement, forensic, and judicial teams.

## 2. Core Operational Pillars
1. **Security & Access Control**: Multi-tenant isolation, Role-Based Access Control (RBAC), and PostgreSQL Row-Level Security (RLS).
2. **File Integrity Verification**: SHA-256 binary hash validation calculated from raw bytes upon upload, creating immutable reference records.
3. **Chain of Custody Tracking**: Append-only transaction log detailing physical and digital evidence custody transfers with digital receipts.
4. **Tamper-Evident Audit Ledger**: Continuous SHA-256 hash-chained event ledger guaranteeing non-repudiation of all read/write/transfer events.
5. **Source-Grounded AI Assistance**: RAG pipeline utilizing pgvector and Google Gemini / Ollama to deliver factual document insights restricted by user permissions.
6. **Case Legal Readiness Engine**: Automated checklist calculating evidentiary completeness before court submission.

## 3. Supported User Personas
- **Investigator**: Creates cases, uploads original documents, registers physical evidence items.
- **Custody Officer**: Controls evidence movement, logs transfers, verifies physical/digital storage locations.
- **Forensic Officer**: Analyzes technical evidence, uploads lab reports, verifies hash matching.
- **Prosecutor**: Reviews compiled case packages, checks readiness score, exports legal bundles.
- **Court Officer**: Validates judicial submissions, verifies audit hash chains.
- **Security Auditor**: Inspects system audit logs, monitors Security Radar anomaly alerts.
- **Administrator**: Configures department roles, oversees user assignments.

## 4. Key Functional Requirements
- **FR-1**: User authentication via Supabase Auth with JWT backend validation.
- **FR-2**: Case management with strict case assignment scoping.
- **FR-3**: Document upload to private storage buckets with automatic SHA-256 computation.
- **FR-4**: Chain of custody transfer workflow requiring two-party receipt confirmation.
- **FR-5**: SHA-256 hash-chained audit logging for every security-relevant action.
- **FR-6**: Asynchronous OCR (PaddleOCR) and semantic search chunking.
- **FR-7**: PDF export of official Case Bundles and Evidence Passports via ReportLab.
