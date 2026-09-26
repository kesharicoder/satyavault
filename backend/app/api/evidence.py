from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from app.core.security import get_current_user, AuthenticatedUser
from app.services.audit_service import record_audit_event

router = APIRouter(prefix="/evidence", tags=["evidence"])

MOCK_EVIDENCE = [
    {
        "id": "EV-2026-0017",
        "evidence_id": "EV-2026-0017",
        "case_id": "NV-2026-001",
        "evidence_type": "Digital Device",
        "description": "Seized 2TB External Hard Drive containing server log archives",
        "source": "Sector 17 Suspect Premises",
        "collected_at": "2026-03-15T14:30:00Z",
        "current_custodian": "Dr. Neha Sharma (Forensic Officer)",
        "current_location": "Digital Forensics Lab Vault",
        "status": "in_custody",
        "reference_hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
    }
]

@router.get("")
async def list_evidence(case_id: Optional[str] = None, current_user: AuthenticatedUser = Depends(get_current_user)):
    if case_id:
        return [e for e in MOCK_EVIDENCE if e["case_id"] == case_id]
    return MOCK_EVIDENCE

@router.get("/{evidence_id}/passport")
async def get_evidence_passport(evidence_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    item = next((e for e in MOCK_EVIDENCE if e["id"] == evidence_id or e["evidence_id"] == evidence_id), MOCK_EVIDENCE[0])

    record_audit_event(current_user.id, "EVIDENCE_PASSPORT_VIEWED", "evidence", item["id"], "success")

    return {
        "passport_header": {
            "title": "OFFICIAL DIGITAL EVIDENCE PASSPORT",
            "evidence_id": item["evidence_id"],
            "case_id": item["case_id"],
            "reference_hash": item["reference_hash"]
        },
        "item_details": item,
        "integrity_status": "VERIFIED",
        "custody_chain_length": 2,
        "verification_history": [
            {
                "timestamp": "2026-03-15T15:00:00Z",
                "verifier": "Rahul Verma (Custody Officer)",
                "result": "VERIFIED_MATCH"
            },
            {
                "timestamp": "2026-03-18T16:20:00Z",
                "verifier": "Dr. Neha Sharma (Forensic Officer)",
                "result": "VERIFIED_MATCH"
            }
        ]
    }
