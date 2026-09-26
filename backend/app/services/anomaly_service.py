from typing import List, Dict, Any

def scan_security_anomalies(audit_events: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    alerts = []

    # Rule 1: High frequency access / bulk access attempts
    unauthorized_attempts = [e for e in audit_events if e.get("result") == "denied"]
    if len(unauthorized_attempts) >= 3:
        alerts.append({
            "id": f"alt-rule-001",
            "title": "Repeated Unauthorized Resource Access",
            "severity": "high",
            "category": "access_control",
            "description": f"Detected {len(unauthorized_attempts)} denied access attempts.",
            "status": "open",
            "affected_user_id": unauthorized_attempts[0].get("actor_id"),
            "review_notes": "Review Required: Verify if user role permissions need adjustment."
        })

    # Rule 2: Integrity Mismatch
    mismatch_events = [e for e in audit_events if e.get("action") == "INTEGRITY_CHECK_FAILED"]
    if mismatch_events:
        alerts.append({
            "id": f"alt-rule-002",
            "title": "Binary SHA-256 Checksum Mismatch Alert",
            "severity": "critical",
            "category": "integrity",
            "description": "A file download or verification call detected a checksum divergence from reference hash.",
            "status": "open",
            "affected_user_id": mismatch_events[0].get("actor_id"),
            "review_notes": "Review Required: Inspect file storage object and verify hash chain."
        })

    return alerts
