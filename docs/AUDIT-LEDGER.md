# Hash-Chained Audit Ledger Specification — Satya Vault

## 1. Mathematical Design
The audit ledger uses a SHA-256 cryptographic chain to guarantee tamper-evidence.

For event $i$:
$$\text{EventHash}_i = \text{SHA256}(\text{CanonicalJSON}(\text{Event}_i) + \text{EventHash}_{i-1})$$

Where $\text{EventHash}_0 = \text{"0" * 64}$ (genesis state).

## 2. Event Payload Structure
Each event record contains:
- `event_id`: UUID
- `actor_id`: UUID (Profile ID)
- `action`: String enum (`CASE_CREATED`, `DOCUMENT_UPLOADED`, `CUSTODY_TRANSFERRED`, `SECURITY_ALERT_TRIGGERED`)
- `resource_type`: String (`case`, `document`, `evidence`, `audit`)
- `resource_id`: String
- `result`: String (`success`, `denied`, `failed`)
- `reason`: Optional String
- `correlation_id`: String
- `previous_event_hash`: Hex string of parent node
- `event_hash`: Calculated hex string
- `created_at`: ISO timestamp

## 3. Immutability Enforcement
PostgreSQL RLS explicitly revokes UPDATE and DELETE capabilities on the `audit_events` table for all roles.
Verification is achieved by re-running the cryptographic hash chain sequentially across all rows.
