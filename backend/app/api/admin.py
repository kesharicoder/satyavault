from fastapi import APIRouter, Depends
from app.core.security import get_current_user, AuthenticatedUser
from app.core.permissions import require_role

router = APIRouter(prefix="/admin", tags=["admin"])

MOCK_USERS = [
    {"id": "11111111-1111-1111-1111-111111111111", "user_code": "INV-001", "name": "Inspector Rajesh Kumar", "role": "investigator", "department": "Cyber Crime Cell"},
    {"id": "22222222-2222-2222-2222-222222222222", "user_code": "CUST-002", "name": "Officer Sunita Sharma", "role": "custody_officer", "department": "Central Evidence Vault"},
    {"id": "33333333-3333-3333-3333-333333333333", "user_code": "FOR-003", "name": "Dr. Ananya Roy", "role": "forensic_officer", "department": "Digital Forensics Lab"},
    {"id": "44444444-4444-4444-4444-444444444444", "user_code": "PROS-004", "name": "Adv. Vikram Sethi", "role": "prosecutor", "department": "Directorate of Prosecution"},
    {"id": "55555555-5555-5555-5555-555555555555", "user_code": "AUD-005", "name": "Amitav Ghosh", "role": "security_auditor", "department": "Internal Security Audit"},
    {"id": "66666666-6666-6666-6666-666666666666", "user_code": "ADM-006", "name": "System Administrator", "role": "administrator", "department": "IT Operations"}
]

@router.get("/users")
async def list_users(current_user: AuthenticatedUser = Depends(require_role(["administrator"]))):
    return MOCK_USERS
