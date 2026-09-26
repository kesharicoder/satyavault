from fastapi import APIRouter, Depends
from typing import List
from app.core.security import get_current_user, AuthenticatedUser
from app.services.anomaly_service import scan_security_anomalies
from app.services.audit_service import get_audit_logs

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("")
async def get_security_alerts(current_user: AuthenticatedUser = Depends(get_current_user)):
    raw_logs = [log.model_dump() for log in get_audit_logs()]
    alerts = scan_security_anomalies(raw_logs)
    return alerts
