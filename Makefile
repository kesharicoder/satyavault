.PHONY: help install dev-backend dev-frontend test verify-chain clean

help:
	@echo "Satya Vault Prototype Development Commands:"
	@echo "  make install      - Install frontend and backend dependencies"
	@echo "  make dev-backend  - Start FastAPI backend server"
	@echo "  make dev-frontend - Start Next.js frontend application"
	@echo "  make test         - Run backend tests"
	@echo "  make verify-chain - Verify integrity of audit event ledger"

install:
	cd frontend && npm install
	cd backend && pip install -r requirements.txt

dev-backend:
	cd backend && uvicorn app.main:app --reload --port 8000

dev-frontend:
	cd frontend && npm run dev

test:
	cd backend && pytest tests/ -v

verify-chain:
	python scripts/verify_audit_chain.py

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	rm -rf frontend/.next
