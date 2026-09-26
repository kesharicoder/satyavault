from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.security import get_current_user, AuthenticatedUser
from app.core.permissions import require_role
from app.services.audit_service import record_audit_event
from app.services.readiness_service import calculate_case_readiness
from app.schemas.cases import CaseCreate, CaseResponse

router = APIRouter(prefix="/cases", tags=["cases"])

# Demo Scenario Dataset
MOCK_CASES = [
    {
        "id": "NV-2026-001",
        "case_number": "NV-2026-001",
        "title": "Digital Evidence Review – Sector 17 Investigation",
        "case_type": "Cyber Crime",
        "jurisdiction": "New Delhi Judicial District",
        "department": "Cyber Crime Division",
        "priority": "high",
        "status": "investigation",
        "classification": "restricted",
        "created_at": "2026-03-15T10:30:00Z"
    },
    {
        "id": "NV-2026-002",
        "case_number": "NV-2026-002",
        "title": "State vs. Financial Network Intrusion",
        "case_type": "Forensic Intrusion",
        "jurisdiction": "Mumbai Sessions Court",
        "department": "Digital Forensics Division",
        "priority": "normal",
        "status": "forensic_review",
        "classification": "restricted",
        "created_at": "2026-03-18T14:15:00Z"
    }
]

@router.get("", response_model=List[CaseResponse])
async def list_cases(current_user: AuthenticatedUser = Depends(get_current_user)):
    record_audit_event(
        actor_id=current_user.id,
        action="CASE_LIST_VIEWED",
        resource_type="case",
        resource_id=None,
        result="success"
    )
    return MOCK_CASES

@router.post("", response_model=CaseResponse)
async def create_case(
    payload: CaseCreate,
    current_user: AuthenticatedUser = Depends(require_role(["investigator", "administrator"]))
):
    new_case = {
        "id": payload.case_number,
        "case_number": payload.case_number,
        "title": payload.title,
        "case_type": payload.case_type,
        "jurisdiction": payload.jurisdiction,
        "department": payload.department,
        "priority": payload.priority,
        "status": "draft",
        "classification": payload.classification,
        "created_at": "2026-09-23T10:00:00Z"
    }
    MOCK_CASES.append(new_case)
    record_audit_event(
        actor_id=current_user.id,
        action="CASE_CREATED",
        resource_type="case",
        resource_id=new_case["id"],
        result="success"
    )
    return new_case

@router.get("/{case_id}")
async def get_case_detail(case_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    case = next((c for c in MOCK_CASES if c["id"] == case_id or c["case_number"] == case_id), None)
    if not case:
        record_audit_event(current_user.id, "CASE_VIEW_FAILED", "case", case_id, "denied", "Case not found")
        raise HTTPException(status_code=404, detail="Case not found")

    record_audit_event(current_user.id, "CASE_VIEWED", "case", case_id, "success")
    return case

@router.get("/{case_id}/readiness")
async def check_readiness(case_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    case = next((c for c in MOCK_CASES if c["id"] == case_id or c["case_number"] == case_id), None)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    docs = [
        {"document_type": "Investigation Report", "sha256_hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"},
        {"document_type": "Forensic Report", "sha256_hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"}
    ]
    evidence = [{"id": "EV-2026-0017"}]
    custody = [{"id": "c-log-1"}]

    return calculate_case_readiness(case_id, case, docs, evidence, custody)

@router.get("/{case_id}/timeline")
async def get_case_timeline(case_id: str, current_user: AuthenticatedUser = Depends(get_current_user)):
    # Aggregated chronological timeline of case events
    timeline_events = [
        {
            "id": "tl-1",
            "timestamp": "2026-03-15T10:30:00Z",
            "category": "FIR_REGISTRATION",
            "title": "FIR Registered — Primary Complaint Filed",
            "description": "FIR 0482/2026 registered at Cyber Crime Division regarding INR 4,50,000 electronic transfer fraud.",
            "officer": "Inspector Aarav Mehta",
            "status": "verified",
            "sha256": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
        },
        {
            "id": "tl-2",
            "timestamp": "2026-03-15T11:45:00Z",
            "category": "EVIDENCE_SEIZURE",
            "title": "Digital Drive Seized & Vaulted",
            "description": "Seized server drive EVD-2026-DEL-001. Raw binary SHA-256 computed on field workstation.",
            "officer": "Inspector Aarav Mehta",
            "status": "verified",
            "sha256": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        },
        {
            "id": "tl-3",
            "timestamp": "2026-03-15T15:00:00Z",
            "category": "CUSTODY_TRANSFER",
            "title": "Custody Intake at Central Evidence Vault",
            "description": "Transferred physical custody to Officer Rahul Verma. Tamper-evident seal verified intact.",
            "officer": "Officer Rahul Verma",
            "status": "verified",
            "sha256": "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190"
        },
        {
            "id": "tl-4",
            "timestamp": "2026-03-18T16:20:00Z",
            "category": "FORENSIC_LAB",
            "title": "Forensic Image Extraction Concluded",
            "description": "Digital Forensics Lab analysis report submitted by Dr. Neha Sharma. No physical sector degradation detected.",
            "officer": "Dr. Neha Sharma",
            "status": "verified",
            "sha256": "1c7d2e091b8a7f43e1208956c321098471e98031238914028340192834019283"
        },
        {
            "id": "tl-5",
            "timestamp": "2026-03-20T09:15:00Z",
            "category": "LEGAL_READINESS",
            "title": "Section 65B BSA 2023 Certificate Issued",
            "description": "Legal Readiness Certificate generated for prosecution filing before Sessions Court.",
            "officer": "Adv. Priya Nair",
            "status": "verified",
            "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        }
    ]

    record_audit_event(
        actor_id=current_user.id,
        action="CASE_TIMELINE_RECONSTRUCTED",
        resource_type="case",
        resource_id=case_id,
        result="success"
    )

    return {
        "case_id": case_id,
        "total_events": len(timeline_events),
        "timeline": timeline_events
    }

