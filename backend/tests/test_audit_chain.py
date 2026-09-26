import pytest
from app.services.audit_service import record_audit_event, verify_audit_chain, _AUDIT_LOG_STORE

def test_audit_hash_chain_validity():
    _AUDIT_LOG_STORE.clear()

    e1 = record_audit_event("usr-1", "CASE_CREATED", "case", "c-1")
    e2 = record_audit_event("usr-1", "DOCUMENT_UPLOADED", "document", "d-1")

    assert e1.previous_event_hash == "0" * 64
    assert e2.previous_event_hash == e1.event_hash

    res = verify_audit_chain()
    assert res["valid"] is True
    assert res["total_events"] == 2

def test_audit_hash_chain_tamper_detection():
    _AUDIT_LOG_STORE.clear()

    record_audit_event("usr-1", "CASE_CREATED", "case", "c-1")
    record_audit_event("usr-1", "DOCUMENT_UPLOADED", "document", "d-1")

    # Simulate illegal direct modification of audit event content
    _AUDIT_LOG_STORE[0].action = "ILLEGAL_MODIFIED_ACTION"

    res = verify_audit_chain()
    assert res["valid"] is False
    assert res["broken_at_id"] == 1
