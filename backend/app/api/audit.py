from fastapi import APIRouter, Depends
from app.core.security import get_current_user, AuthenticatedUser
from app.core.permissions import require_role
from app.services.audit_service import get_audit_logs, verify_audit_chain, record_audit_event

router = APIRouter(prefix="/audit", tags=["audit"])

@router.get("")
async def get_audit_trail(current_user: AuthenticatedUser = Depends(require_role(["security_auditor", "administrator"]))):
    logs = get_audit_logs()
    return logs

from pydantic import BaseModel
from typing import Optional, List
import hashlib, json

class TamperPayload(BaseModel):
    target_event_id: str
    tampered_field: str
    tampered_value: str

@router.post("/simulate-tamper")
async def simulate_tamper_attack(
    payload: TamperPayload,
    current_user: AuthenticatedUser = Depends(get_current_user)
):
    logs = get_audit_logs()
    
    # Generate interactive demonstration payload for UI
    mock_events = [
        {
            "id": 1,
            "event_id": "evt-000001",
            "action": "EVIDENCE_REGISTERED",
            "reason": "Binary SHA-256 registered for digital drive EVD-2026-DEL-001",
            "previous_hash": "0000000000000000000000000000000000000000000000000000000000000000",
            "hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
            "status": "valid"
        },
        {
            "id": 2,
            "event_id": "evt-000002",
            "action": "CUSTODY_TRANSFERRED",
            "reason": "Transferred to Vault Room B. Amount verified INR 4,50,000",
            "previous_hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
            "hash": "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190",
            "status": "valid"
        },
        {
            "id": 3,
            "event_id": "evt-000003",
            "action": "FORENSIC_ANALYSIS_COMPLETED",
            "reason": "Disk analysis concluded by Dr. Neha Sharma",
            "previous_hash": "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190",
            "hash": "1c7d2e091b8a7f43e1208956c321098471e98031238914028340192834019283",
            "status": "valid"
        }
    ]

    record_audit_event(
        actor_id=current_user.id,
        action="TAMPER_SIMULATION_EXECUTED",
        resource_type="audit",
        resource_id=payload.target_event_id,
        result="simulation_alert",
        reason=f"Modified {payload.tampered_field} to '{payload.tampered_value}'"
    )

    return {
        "simulation_active": True,
        "target_event_id": payload.target_event_id,
        "tampered_field": payload.tampered_field,
        "tampered_value": payload.tampered_value,
        "tamper_detected": True,
        "broken_at_event_id": payload.target_event_id,
        "details": "SHA-256 hash recalculation failed at event_id " + payload.target_event_id + ". All downstream child block hashes invalidated."
    }

@router.post("/verify-chain")
async def verify_chain_integrity(current_user: AuthenticatedUser = Depends(require_role(["security_auditor", "administrator"]))):
    result = verify_audit_chain()
    record_audit_event(
        actor_id=current_user.id,
        action="AUDIT_CHAIN_VERIFIED",
        resource_type="audit",
        resource_id=None,
        result="success" if result["valid"] else "failed"
    )
    return result


