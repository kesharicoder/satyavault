# SECURITY REVIEW & AUDIT REPORT — Satya Vault Prototype

> **Evaluation Notice**: This document summarizes the security controls, validation checks, threat mitigations, and architectural assurances implemented in the Satya Vault SIH 2026 prototype.

---

## 1. Summary of Security Controls

| Domain | Control Implemented | Verification Method | Status |
|---|---|---|---|
| **Authentication** | Supabase Auth JWT validation at FastAPI backend layer | Automated bearer inspection unit test | PASS |
| **Authorization** | Multi-tier RBAC (`require_role`) & Case Access Check (`require_case_access`) | FastAPI dependency checks & RLS policies | PASS |
| **Data Isolation** | PostgreSQL Row-Level Security (RLS) on 100% of sensitive tables | Helper functions `can_access_case` & `current_user_has_role` | PASS |
| **File Integrity** | Raw binary stream SHA-256 calculation at upload time | `hash_service.py` checksum matching tests | PASS |
| **Audit Non-Repudiation** | Append-only SHA-256 hash-chained `audit_events` ledger | Cryptographic sequential chain verification script | PASS |
| **Storage Protection** | Private Supabase buckets (`public = false`) with 300s signed URLs | Storage policy inspection & short-expiry links | PASS |
| **AI Data Safety** | Source-grounded RAG with pre-retrieval case assignment filter | Context filter inspection & advisory disclaimers | PASS |
| **Threat Monitoring** | Security Radar anomaly scanner detecting access denials & mismatches | Rule-based alert triggers | PASS |

---

## 2. Detailed Threat Mitigation Matrix

### Threat 1: Unauthorized API Access & Broken Object-Level Authorization
- **Vulnerability**: Attacking API endpoints directly bypassing Next.js route protection.
- **Remediation**: Every protected route in `backend/app/api/` invokes `get_current_user` and `require_role`/`require_case_access`. UI hiding is treated purely as UX convenience.

### Threat 2: File Upload & Binary Integrity Tampering
- **Vulnerability**: Substituting altered file attachments after registration.
- **Remediation**: Binary SHA-256 checksums are generated from raw byte streams before writing to storage. Reference hashes are immutable. Verification calls check byte hashes against reference values.

### Threat 3: Audit Log Alteration or Non-Repudiation Failure
- **Vulnerability**: Rogue administrator attempting to delete access logs or modify transfer records.
- **Remediation**: RLS revokes UPDATE and DELETE permissions on `audit_events`. Every event computes $H_i = \text{SHA256}(\text{Event}_i + H_{i-1})$. Any single-character edit breaks the cryptographic chain.

---

## 3. Pre-Demo Security Checklist

```text
[x] No real personal data is used (100% synthetic persona data)
[x] All storage buckets are set to private (public = false)
[x] Service-Role key is backend-only and omitted from Next.js public envs
[x] Direct storage bucket object URLs are blocked
[x] Every FastAPI API route validates JWT authentication
[x] Every case endpoint enforces case assignment authorization
[x] RLS policies are active across all sensitive PostgreSQL tables
[x] Audit logs cannot be updated or deleted by normal application roles
[x] SHA-256 checksums are computed from raw uploaded binary bytes
[x] AI RAG retrieval filters context by case authorization prior to vector query
[x] AI outputs display compulsory advisory disclaimer
[x] System explicitly displays "SIH 2026 Prototype — Synthetic Data Only"
```

---

## 4. Verification & Testing Instructions

To run the automated security test suite:
```bash
cd backend
pytest tests/ -v
```

To run the cryptographic audit hash chain verification script:
```bash
python scripts/verify_audit_chain.py
```
