from fastapi import APIRouter, Depends
from app.core.security import get_current_user, AuthenticatedUser

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me")
async def get_me(current_user: AuthenticatedUser = Depends(get_current_user)):
    return {
        "user": current_user,
        "status": "authenticated"
    }

@router.post("/validate")
async def validate_token(current_user: AuthenticatedUser = Depends(get_current_user)):
    return {"valid": True, "user_id": current_user.id, "roles": current_user.roles}
