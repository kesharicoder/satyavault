from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class CaseCreate(BaseModel):
    case_number: str
    title: str
    case_type: str
    jurisdiction: Optional[str] = "New Delhi Judicial District"
    department: Optional[str] = "Cyber Crime Cell"
    priority: Optional[str] = "normal"
    classification: Optional[str] = "restricted"

class CaseResponse(BaseModel):
    id: str
    case_number: str
    title: str
    case_type: str
    jurisdiction: Optional[str]
    department: Optional[str]
    priority: str
    status: str
    classification: str
    created_at: str
