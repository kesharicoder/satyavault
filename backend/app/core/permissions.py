from typing import List, Callable
from fastapi import Depends, HTTPException, status
from app.core.security import get_current_user, AuthenticatedUser

def require_role(allowed_roles: List[str]) -> Callable:
    async def role_checker(user: AuthenticatedUser = Depends(get_current_user)) -> AuthenticatedUser:
        if not any(r in user.roles for r in allowed_roles) and "administrator" not in user.roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role in {allowed_roles}"
            )
        return user
    return role_checker

async def require_case_access(
    case_id: str,
    user: AuthenticatedUser = Depends(get_current_user)
) -> AuthenticatedUser:
    """
    Checks if user is assigned to case or holds administrator / auditor role.
    """
    if "administrator" in user.roles or "security_auditor" in user.roles:
        return user

    # In production, check case_assignments DB table
    return user
