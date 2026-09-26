import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from app.services.audit_service import record_audit_event, verify_audit_chain, _AUDIT_LOG_STORE

def main():
    print("=== NYAYA VAULT AUDIT HASH CHAIN VERIFIER ===")
    print("Simulating event logging and cryptographic hash verification...")

    # Record sample audit events
    e1 = record_audit_event("user-1", "CASE_CREATED", "case", "c-101", "success")
    e2 = record_audit_event("user-1", "DOCUMENT_UPLOADED", "document", "doc-202", "success")
    e3 = record_audit_event("user-2", "CUSTODY_TRANSFERRED", "evidence", "ev-303", "success")

    print(f"Total Audit Events Logged: {len(_AUDIT_LOG_STORE)}")
    for record in _AUDIT_LOG_STORE:
        print(f"  [{record.event_id}] Action: {record.action:<20} Hash: {record.event_hash[:16]}... Parent: {record.previous_event_hash[:16]}...")

    res = verify_audit_chain()
    print("\nVerification Result:")
    print(f"  Valid: {res['valid']}")
    print(f"  Total Events Scanned: {res['total_events']}")
    print(f"  Broken Node ID: {res['broken_at_id']}")

    if res['valid']:
        print("\nSUCCESS: All cryptographic links in the audit hash chain are intact.")
    else:
        print("\nERROR: Tampering or hash chain divergence detected!")
        sys.exit(1)

if __name__ == "__main__":
    main()
