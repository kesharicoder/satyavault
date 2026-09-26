from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from typing import List, Optional
from app.core.security import get_current_user, AuthenticatedUser
from app.services.hash_service import calculate_sha256_from_bytes, verify_sha256
from app.services.audit_service import record_audit_event

router = APIRouter(prefix="/documents", tags=["documents"])

MOCK_DOCUMENTS = [
    {
        "id": "doc-101",
        "case_id": "NV-2026-001",
        "document_number": "DOC-2026-001",
        "title": "Investigation_Report_001.pdf",
        "document_type": "Investigation Report",
        "classification": "restricted",
        "status": "active",
        "current_version": {
            "version_number": 1,
            "original_filename": "Investigation_Report_001.pdf",
            "mime_type": "application/pdf",
            "file_size_bytes": 1048576,
            "sha256_hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            "storage_bucket": "documents-private",
            "storage_path": "case/NV-2026-001/doc/doc-101/v1/original.pdf",
            "created_at": "2026-03-15T11:00:00Z"
        }
    },
    {
        "id": "doc-102",
        "case_id": "NV-2026-001",
        "document_number": "DOC-2026-002",
        "title": "Forensic_Report_017.pdf",
        "document_type": "Forensic Report",
        "classification": "restricted",
        "status": "active",
        "current_version": {
            "version_number": 1,
            "original_filename": "Forensic_Report_017.pdf",
            "mime_type": "application/pdf",
            "file_size_bytes": 2097152,
            "sha256_hash": "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
            "storage_bucket": "documents-private",
            "storage_path": "case/NV-2026-001/doc/doc-102/v1/original.pdf",
            "created_at": "2026-03-18T16:20:00Z"
        }
    },
    {
        "id": "doc-103",
        "case_id": "NV-2026-001",
        "document_number": "DOC-2026-003",
        "title": "Evidence_Register_017.pdf",
        "document_type": "Evidence Register",
        "classification": "restricted",
        "status": "active",
        "current_version": {
            "version_number": 1,
            "original_filename": "Evidence_Register_017.pdf",
            "mime_type": "application/pdf",
            "file_size_bytes": 524288,
            "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "storage_bucket": "documents-private",
            "storage_path": "case/NV-2026-001/doc/doc-103/v1/original.pdf",
            "created_at": "2026-03-15T14:35:00Z"
        }
    },
    {
        "id": "doc-104",
        "case_id": "NV-2026-001",
        "document_number": "DOC-2026-004",
        "title": "Witness_Statement_004.pdf",
        "document_type": "Witness Statement",
        "classification": "restricted",
        "status": "active",
        "current_version": {
            "version_number": 1,
            "original_filename": "Witness_Statement_004.pdf",
            "mime_type": "application/pdf",
            "file_size_bytes": 786432,
            "sha256_hash": "a83f92bc1788241512bc90011883719a77618990145a5509bca78216631189ab",
            "storage_bucket": "documents-private",
            "storage_path": "case/NV-2026-001/doc/doc-104/v1/original.pdf",
            "created_at": "2026-03-16T09:45:00Z"
        }
    }
]

@router.get("")
async def list_documents(case_id: Optional[str] = None, current_user: AuthenticatedUser = Depends(get_current_user)):
    if case_id:
        filtered = [d for d in MOCK_DOCUMENTS if d["case_id"] == case_id]
        return filtered
    return MOCK_DOCUMENTS

@router.post("/upload")
async def upload_document(
    case_id: str = Form(...),
    title: str = Form(...),
    document_type: str = Form(...),
    file: UploadFile = File(...),
    current_user: AuthenticatedUser = Depends(get_current_user)
):
    content = await file.read()
    if len(content) > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds maximum allowed limit of 50MB")

    sha256_checksum = calculate_sha256_from_bytes(content)
    new_doc_id = f"doc-{len(MOCK_DOCUMENTS) + 101}"

    doc_record = {
        "id": new_doc_id,
        "case_id": case_id,
        "document_number": f"DOC-2026-{len(MOCK_DOCUMENTS)+1:03d}",
        "title": title,
        "document_type": document_type,
        "classification": "restricted",
        "status": "active",
        "current_version": {
            "version_number": 1,
            "original_filename": file.filename,
            "mime_type": file.content_type or "application/pdf",
            "file_size_bytes": len(content),
            "sha256_hash": sha256_checksum,
            "storage_bucket": "documents-private",
            "storage_path": f"case/{case_id}/doc/{new_doc_id}/v1/{file.filename}",
            "created_at": "2026-09-23T10:00:00Z"
        }
    }
    MOCK_DOCUMENTS.append(doc_record)

    record_audit_event(
        actor_id=current_user.id,
        action="DOCUMENT_UPLOADED",
        resource_type="document",
        resource_id=new_doc_id,
        result="success",
        reason=f"Uploaded {file.filename} with SHA-256 {sha256_checksum[:16]}..."
    )

    return doc_record

@router.post("/{document_id}/verify")
async def verify_document_hash(
    document_id: str,
    provided_hash: str,
    current_user: AuthenticatedUser = Depends(get_current_user)
):
    doc = next((d for d in MOCK_DOCUMENTS if d["id"] == document_id or d["document_number"] == document_id), None)
    if not doc:
        # Fallback for doc-101
        expected = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    else:
        expected = doc["current_version"]["sha256_hash"]

    matches = expected.lower() == provided_hash.lower()

    action_name = "DOCUMENT_INTEGRITY_VERIFIED" if matches else "INTEGRITY_CHECK_FAILED"
    record_audit_event(
        actor_id=current_user.id,
        action=action_name,
        resource_type="document",
        resource_id=document_id,
        result="success" if matches else "mismatch"
    )

from fastapi.responses import Response
from app.services.watermark_service import generate_watermarked_document_pdf

@router.get("/{document_id}/download-watermarked")
async def download_watermarked_document(
    document_id: str,
    current_user: AuthenticatedUser = Depends(get_current_user)
):
    doc = next((d for d in MOCK_DOCUMENTS if d["id"] == document_id or d["document_number"] == document_id), MOCK_DOCUMENTS[0])
    
    pdf_bytes = generate_watermarked_document_pdf(
        document_title=doc["title"],
        document_number=doc["document_number"],
        case_id=doc["case_id"],
        sha256_hash=doc["current_version"]["sha256_hash"],
        user_name=current_user.full_name,
        user_code=getattr(current_user, "user_code", "INV-001"),
        user_ip="127.0.0.1"
    )

    record_audit_event(
        actor_id=current_user.id,
        action="DOCUMENT_WATERMARKED_DOWNLOAD",
        resource_type="document",
        resource_id=document_id,
        result="success",
        reason=f"Watermarked download for {doc['title']}"
    )

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=Watermarked_{doc['title']}"
        }
    )

