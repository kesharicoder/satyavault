from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from typing import Optional
from app.core.security import get_current_user, AuthenticatedUser
from app.services.report_service import generate_case_summary_pdf, generate_bsa_65b_certificate_pdf
from app.services.audit_service import record_audit_event

router = APIRouter(prefix="/reports", tags=["reports"])

class ReportRequestPayload(BaseModel):
    case_id: str
    case_number: str
    title: str
    department: str
    priority: str
    status: str
    jurisdiction: str

class BSACertificatePayload(BaseModel):
    id: str
    title: str
    case_id: str
    sha256_hash: Optional[str] = "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"

@router.post("/case-bundle")
async def generate_case_bundle(payload: ReportRequestPayload, current_user: AuthenticatedUser = Depends(get_current_user)):
    pdf_bytes = generate_case_summary_pdf(payload.model_dump())

    record_audit_event(
        actor_id=current_user.id,
        action="REPORT_CASE_BUNDLE_GENERATED",
        resource_type="case",
        resource_id=payload.case_id,
        result="success"
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=SatyaVault_CaseBundle_{payload.case_number}.pdf"
        }
    )

@router.post("/bsa-certificate")
async def generate_bsa_certificate(payload: BSACertificatePayload, current_user: AuthenticatedUser = Depends(get_current_user)):
    officer_info = {
        "name": current_user.full_name,
        "user_code": getattr(current_user, "user_code", "INV-001"),
        "department": getattr(current_user, "department", "Cyber Crime Division"),
        "role_label": getattr(current_user, "role", "Investigator").title()
    }
    pdf_bytes = generate_bsa_65b_certificate_pdf(payload.model_dump(), officer_info)

    record_audit_event(
        actor_id=current_user.id,
        action="BSA_65B_CERTIFICATE_ISSUED",
        resource_type="evidence",
        resource_id=payload.id,
        result="success",
        reason=f"Section 65B BSA 2023 Digital Certificate issued for {payload.id}"
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=BSA_2023_Section65B_Certificate_{payload.id}.pdf"
        }
    )
