import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_cases_endpoint_access():
    response = client.get("/api/v1/cases")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_audit_chain_verification_endpoint():
    response = client.post("/api/v1/audit/verify-chain")
    assert response.status_code == 200
    assert "valid" in response.json()
