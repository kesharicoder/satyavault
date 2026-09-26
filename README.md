# Satya Vault — Secure Prototype Implementation

> **SIH 2026 Prototype Notice**: Satya Vault is a production-oriented digital document and evidence management prototype. It integrates Role-Based Access Control (RBAC), PostgreSQL Row-Level Security (RLS), SHA-256 binary file hashing, tamper-evident hash-chained audit ledgers, source-grounded AI semantic search, and automated legal readiness checks.

---

## 🏛️ System Architecture

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** FastAPI, Python 3.11+, Pydantic v2
- **Database & Storage:** Supabase PostgreSQL with `pgvector`, Supabase Auth, Private Storage Buckets
- **Integrity & Security:** Binary SHA-256 Checksums, SHA-256 Hash-chained Append-only Audit Ledger
- **AI & Analytics:** Gemini / Ollama Provider Abstraction, PaddleOCR, pgvector RAG, ReportLab PDF Generator

---

## 📁 Repository Directory Structure

```text
satyavault/
├── docs/                 # System specification, threat models, RBAC matrix, governance
├── frontend/             # Next.js web application
├── backend/              # FastAPI core services & REST APIs
├── supabase/             # SQL migrations, RLS policies, seed scripts
└── scripts/              # Seed scripts, chain verification & utility tooling
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ & npm
- Python 3.11+
- Docker & Docker Compose (optional for local DB/Ollama setup)

### 1. Backend Setup
```bash
cd backend
python -m venv .venv

# On Windows
.venv\Scripts\activate

# On Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation available at: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Web app available at: `http://localhost:3000`

### 3. Verify System Tests
```bash
cd backend
pytest tests/ -v
```

---

## 🔒 Security & Compliance Disclaimer
This repository contains synthetic data only. It is an SIH 2026 prototype demonstrating security-by-design concepts for legal and investigative workflow management.
