# Security Architecture & Controls — Satya Vault

## 1. Core Security Guarantees
1. **Zero Frontend-Only Security**: All permissions are validated at the FastAPI backend layer and enforced in PostgreSQL via RLS policies.
2. **Immutability of Reference Hashes**: Original SHA-256 hashes generated at upload time cannot be updated or overwritten.
3. **Tamper-Evident Audit Ledger**: Every write, read denial, and file view is recorded in a hash-chained audit table.
4. **Private Storage Default**: No storage bucket allows public access (`public = false`). All access requires short-lived signed URLs (max 300s expiry).
5. **Least Privilege Data Access**: Users can only view cases explicitly assigned to them or created by them.

## 2. Authentication & Session Management
- **Supabase Auth**: Standardized JWT issuance with RS256 algorithm.
- **Backend Validation**: FastAPI inspects signature and expiry on every request via `get_current_user`.
- **Service Role Key Scoping**: The Supabase Service Role Key exists strictly on backend servers and is NEVER exposed to Next.js public environment variables.

## 3. Storage Security & File Upload Pipeline
```text
File Upload Request
  └── MIME & File Extension Check (.pdf, .jpg, .png, .txt)
  └── File Size Validation (<= 50MB)
  └── Binary SHA-256 Calculation
  └── Write to Private Bucket under safe path: case/{case_id}/doc/{doc_id}/v1/original.bin
  └── Record document_version with immutable sha256_hash
  └── Emit AUDIT_EVENT with SHA-256 link
```

## 4. Input Sanitization & Prompt Injection Defenses
- All document content passed to AI models is wrapped in structural delimiters.
- System prompts instruct models to treat document content strictly as data, never as system instructions.
