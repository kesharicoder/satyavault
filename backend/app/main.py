from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api import auth, cases, documents, evidence, custody, ai, audit, alerts, reports, admin

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Satya Vault — Secure Prototype Implementation API",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api/v1
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(cases.router, prefix=settings.API_PREFIX)
app.include_router(documents.router, prefix=settings.API_PREFIX)
app.include_router(evidence.router, prefix=settings.API_PREFIX)
app.include_router(custody.router, prefix=settings.API_PREFIX)
app.include_router(ai.router, prefix=settings.API_PREFIX)
app.include_router(audit.router, prefix=settings.API_PREFIX)
app.include_router(alerts.router, prefix=settings.API_PREFIX)
app.include_router(reports.router, prefix=settings.API_PREFIX)
app.include_router(admin.router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    return {
        "status": "online",
        "app": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
