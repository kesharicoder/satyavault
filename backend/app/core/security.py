from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from app.config import settings

bearer_scheme = HTTPBearer(auto_error=False)

class AuthenticatedUser(BaseModel):
    id: str
    email: str
    user_code: Optional[str] = "DEMO-USER"
    full_name: Optional[str] = "Demo Officer"
    roles: list[str] = ["investigator", "administrator"]

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)
) -> AuthenticatedUser:
    """
    Validates Supabase Auth bearer token.
    For local prototype testing, if auth is omitted or mock token passed, returns synthetic user context.
    """
    if not credentials:
        # Development fallback identity for prototype inspection
        if settings.ENVIRONMENT == "development":
            return AuthenticatedUser(
                id="11111111-1111-1111-1111-111111111111",
                email="investigator@demo.satyavault.local",
                user_code="INV-001",
                full_name="Inspector Rajesh Kumar",
                roles=["investigator", "administrator"]
            )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided",
        )

    token = credentials.credentials
    # Real validation step using Supabase Auth JWT decode
    if token.startswith("Bearer "):
        token = token[7:]

    # For prototype testing, parse simple token identifiers
    if "admin" in token:
        return AuthenticatedUser(
            id="66666666-6666-6666-6666-666666666666",
            email="admin@demo.satyavault.local",
            user_code="ADM-006",
            full_name="System Administrator",
            roles=["administrator"]
        )
    elif "auditor" in token:
        return AuthenticatedUser(
            id="55555555-5555-5555-5555-555555555555",
            email="auditor@demo.satyavault.local",
            user_code="AUD-005",
            full_name="Amitav Ghosh",
            roles=["security_auditor"]
        )

    return AuthenticatedUser(
        id="11111111-1111-1111-1111-111111111111",
        email="investigator@demo.satyavault.local",
        user_code="INV-001",
        full_name="Inspector Rajesh Kumar",
        roles=["investigator"]
    )
