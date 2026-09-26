# Threat Model — Satya Vault

## Identified Threats & Mitigations Matrix

| Threat | Risk Level | Mitigation Strategy |
|---|---|---|
| Unauthorized API Access | High | JWT validation on all protected endpoints in FastAPI |
| Role Escalation | High | Server-side RBAC validation + DB RLS rules |
| Malicious File Upload | High | Strict MIME whitelist, signature check, 50MB size limit |
| Path Traversal in Filename | High | Storage paths generated as UUIDs, sanitized original filenames |
| Stored XSS | Medium | React default escaping, sanitized content rendering |
| Prompt Injection in AI RAG | High | Input framing, source-only retrieval, refusal instructions |
| Data Exfiltration via AI | High | Case-level authorization filtering before vector retrieval |
| Bulk Download Abuse | Medium | Rate limiting (60 req/min), audit alerts on anomaly thresholds |
| Audit Record Tampering | High | SHA-256 hash chaining + database RLS preventing update/delete |
| Direct Storage URL Snooping | High | Private buckets with short-lived (5 min) signed URLs |
