import hashlib
import json
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class AuditEventRecord(BaseModel):
    id: int
    event_id: str
    actor_id: Optional[str]
    action: str
    resource_type: str
    resource_id: Optional[str]
    result: str
    reason: Optional[str] = None
    previous_event_hash: Optional[str]
    event_hash: str
    created_at: str

def canonical_payload(event: Dict[str, Any]) -> str:
    """Serializes dictionary to deterministic JSON string."""
    return json.dumps(
        event,
        sort_keys=True,
        separators=(",", ":"),
        default=str
    )

def calculate_event_hash(event_data: Dict[str, Any], previous_hash: Optional[str]) -> str:
    """Computes SHA-256 hash of canonical event data concatenated with parent event hash."""
    payload = {
        "event": event_data,
        "previous_hash": previous_hash or "0" * 64,
    }
    return hashlib.sha256(canonical_payload(payload).encode("utf-8")).hexdigest()

# In-memory prototype audit log store with cryptographic integrity verification
_AUDIT_LOG_STORE: List[AuditEventRecord] = []

def record_audit_event(
    actor_id: Optional[str],
    action: str,
    resource_type: str,
    resource_id: Optional[str],
    result: str = "success",
    reason: Optional[str] = None
) -> AuditEventRecord:
    global _AUDIT_LOG_STORE

    previous_hash = _AUDIT_LOG_STORE[-1].event_hash if _AUDIT_LOG_STORE else "0" * 64
    created_at = datetime.now(timezone.utc).isoformat()
    event_id = f"evt-{len(_AUDIT_LOG_STORE) + 1:06d}"

    raw_event = {
        "event_id": event_id,
        "actor_id": actor_id,
        "action": action,
        "resource_type": resource_type,
        "resource_id": resource_id,
        "result": result,
        "reason": reason,
        "created_at": created_at
    }

    event_hash = calculate_event_hash(raw_event, previous_hash)

    record = AuditEventRecord(
        id=len(_AUDIT_LOG_STORE) + 1,
        event_id=event_id,
        actor_id=actor_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        result=result,
        reason=reason,
        previous_event_hash=previous_hash,
        event_hash=event_hash,
        created_at=created_at
    )
    _AUDIT_LOG_STORE.append(record)
    return record

def verify_audit_chain() -> Dict[str, Any]:
    """Scans all audit ledger records sequentially to verify SHA-256 hash chaining."""
    global _AUDIT_LOG_STORE
    if not _AUDIT_LOG_STORE:
        return {"valid": True, "total_events": 0, "broken_at_id": None}

    prev_hash = "0" * 64
    for record in _AUDIT_LOG_STORE:
        raw_event = {
            "event_id": record.event_id,
            "actor_id": record.actor_id,
            "action": record.action,
            "resource_type": record.resource_type,
            "resource_id": record.resource_id,
            "result": record.result,
            "reason": record.reason,
            "created_at": record.created_at
        }
        expected_hash = calculate_event_hash(raw_event, prev_hash)
        if record.event_hash != expected_hash:
            return {
                "valid": False,
                "total_events": len(_AUDIT_LOG_STORE),
                "broken_at_id": record.id,
                "expected": expected_hash,
                "actual": record.event_hash
            }
        prev_hash = record.event_hash

    return {"valid": True, "total_events": len(_AUDIT_LOG_STORE), "broken_at_id": None}

def get_audit_logs() -> List[AuditEventRecord]:
    return _AUDIT_LOG_STORE
