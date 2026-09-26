# Role-Based Access Control (RBAC) Matrix — Satya Vault

## System Roles
- `investigator`: Creates cases, uploads documents, registers evidence items.
- `custody_officer`: Manages physical/digital custody transfers and evidence verification.
- `forensic_officer`: Conducts technical review and uploads forensic reports.
- `prosecutor`: Inspects assigned cases, checks readiness scores, exports legal bundles.
- `court_officer`: Verifies court submission packages and audit event chains.
- `security_auditor`: Views security audit logs and investigates security radar alerts.
- `administrator`: Manages user profiles, role assignments, and system config.

## Matrix of Capabilities

| Capability | Investigator | Custody Off. | Forensic Off. | Prosecutor | Court Off. | Security Aud. | Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Create Case | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| View Assigned Case | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Upload Document | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Register Evidence | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Initiate Custody Transfer | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Complete Custody Transfer | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| View Audit Logs | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Users / Roles | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Run Readiness Check | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export Case Bundle | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
