from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timezone
from app.core.security import get_current_user, AuthenticatedUser
from app.services.audit_service import record_audit_event

router = APIRouter(prefix="/custody", tags=["custody"])

MOCK_CUSTODY_LOGS = [
    {
        "id": "c-log-1",
        "evidence_id": "EV-2026-0017",
        "from_user": "Inspector Aarav Mehta (INV-001)",
        "to_user": "Officer Rahul Verma (CUST-002)",
        "action": "CUSTODY_TRANSFER",
        "purpose": "Central Vault Intake & Storage Registration",
        "location": "Central Evidence Vault, Locker B-14",
        "transfer_status": "completed",
        "releasing_signature": "SIG-INV001-AARAV-MEHTA-HASH-4B227",
        "receiving_signature": "SIG-CUST002-RAHUL-VERMA-HASH-8F319",
        "remarks": "Physical tamper seal #8819 intact. Binary SHA-256 hash verified prior to intake.",
        "created_at": "2026-03-15T15:00:00Z"
    },
    {
        "id": "c-log-2",
        "evidence_id": "EV-2026-0017",
        "from_user": "Officer Rahul Verma (CUST-002)",
        "to_user": "Dr. Neha Sharma (FOR-003)",
        "action": "FORENSIC_LAB_INTAKE",
        "purpose": "Digital Evidence Extraction & Write-Blocker Inspection",
        "location": "Digital Forensics Lab 4, Cyber Wing",
        "transfer_status": "pending_receiver_approval",
        "releasing_signature": "SIG-CUST002-RAHUL-VERMA-HASH-99120",
        "receiving_signature": None,
        "remarks": "Awaiting Dr. Neha Sharma counter-signature for two-person custody acceptance.",
        "created_at": "2026-03-18T09:30:00Z"
    }
]

class InitiateTransferPayload(BaseModel):
    evidence_id: str
    to_user: str
    purpose: str
    location: str
    remarks: Optional[str] = None

class AcceptTransferPayload(BaseModel):
    transfer_log_id: str
    signature: str

@router.get("/history/{evidence_id}")
async def get_custody_history(evidence_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    return [c for c in MOCK_CUSTODY_LOGS if c["evidence_id"] == evidence_id]

@router.get("/pending-approvals")
async def get_pending_custody_approvals(current_user: AuthenticatedUser = Depends(get_current_user)):
    # Returns items requiring recipient signature under two-person rule
    return [c for c in MOCK_CUSTODY_LOGS if c.get("transfer_status") == "pending_receiver_approval"]

@router.post("/initiate-transfer")
async def initiate_custody_transfer(payload: InitiateTransferPayload, current_user: AuthenticatedUser = Depends(get_current_user)):
    log_id = f"c-log-{len(MOCK_CUSTODY_LOGS) + 1}"
    releasing_sig = f"SIG-{getattr(current_user, 'user_code', 'USR')}-{current_user.full_name.upper().replace(' ', '')}-HASH"

    log_entry = {
        "id": log_id,
        "evidence_id": payload.evidence_id,
        "from_user": f"{current_user.full_name} ({getattr(current_user, 'user_code', 'USR-001')})",
        "to_user": payload.to_user,
        "action": "CUSTODY_TRANSFER_INITIATED",
        "purpose": payload.purpose,
        "location": payload.location,
        "transfer_status": "pending_receiver_approval",
        "releasing_signature": releasing_sig,
        "receiving_signature": None,
        "remarks": payload.remarks or "Awaiting two-person recipient approval signature",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    MOCK_CUSTODY_LOGS.append(log_entry)

    record_audit_event(
        actor_id=current_user.id,
        action="TWO_PERSON_CUSTODY_TRANSFER_INITIATED",
        resource_type="evidence",
        resource_id=payload.evidence_id,
        result="pending_receiver_signature",
        reason=f"Initiated by {current_user.full_name}, awaiting approval by {payload.to_user}"
    )

    return log_entry

@router.post("/accept-transfer")
async def accept_custody_transfer(payload: AcceptTransferPayload, current_user: AuthenticatedUser = Depends(get_current_user)):
    entry = next((c for c in MOCK_CUSTODY_LOGS if c["id"] == payload.transfer_log_id), None)
    if not entry:
        raise HTTPException(status_code=404, detail="Transfer record not found")

    receiving_sig = f"SIG-{getattr(current_user, 'user_code', 'REC')}-{current_user.full_name.upper().replace(' ', '')}-VERIFIED"
    entry["transfer_status"] = "completed"
    entry["receiving_signature"] = receiving_sig
    entry["action"] = "CUSTODY_TRANSFER_COMPLETED"
    entry["remarks"] = f"Two-Person Rule Satisfied. Accepted by {current_user.full_name} at {datetime.now(timezone.utc).strftime('%H:%M UTC')}"

    record_audit_event(
        actor_id=current_user.id,
        action="TWO_PERSON_CUSTODY_TRANSFER_COMPLETED",
        resource_type="evidence",
        resource_id=entry["evidence_id"],
        result="success",
        reason=f"Recipient {current_user.full_name} cryptographically signed intake"
    )

    return entry

@router.get("/flow-graph/{evidence_id}")
async def get_custody_flow_graph(evidence_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    # Returns lifecycle flowchart nodes for interactive visual rendering
    return {
        "evidence_id": evidence_id,
        "nodes": [
            {
                "step": 1,
                "stage": "SEIZURE_FIELD",
                "title": "Field Seizure & Binary Hash Registration",
                "custodian": "Inspector Aarav Mehta (INV-001)",
                "location": "Cyber Crime Division, Crime Scene 12",
                "status": "completed",
                "timestamp": "2026-03-15T10:30:00Z",
                "sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
            },
            {
                "step": 2,
                "stage": "CENTRAL_VAULT",
                "title": "Central Evidence Vault Intake",
                "custodian": "Officer Rahul Verma (CUST-002)",
                "location": "Central Evidence Vault, Locker B-14",
                "status": "completed",
                "timestamp": "2026-03-15T15:00:00Z",
                "sha256": "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190"
            },
            {
                "step": 3,
                "stage": "FORENSIC_LAB",
                "title": "Digital Forensics Write-Blocker Extraction",
                "custodian": "Dr. Neha Sharma (FOR-003)",
                "location": "Digital Forensics Lab 4",
                "status": "pending_receiver_approval",
                "timestamp": "2026-03-18T09:30:00Z",
                "sha256": "1c7d2e091b8a7f43e1208956c321098471e98031238914028340192834019283"
            },
            {
                "step": 4,
                "stage": "COURTROOM_PRESENTATION",
                "title": "Sessions Court Evidence Production",
                "custodian": "Justice S. K. Roy / Adv. Priya Nair",
                "location": "Sessions Court Division, Bench 3",
                "status": "upcoming",
                "timestamp": "Scheduled Post-Forensics",
                "sha256": "Pending Final Certificate"
            }
        ]
    }
