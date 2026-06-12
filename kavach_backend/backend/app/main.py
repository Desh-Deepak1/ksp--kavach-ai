import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.api import auth, query

# 1. Initialize the central FastAPI application instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Secure Hybrid Knowledge Mesh and RAG System for Indian Law Enforcement Operations",
    docs_url=f"{settings.API_V1_STR}/docs",  # Exposed strictly for verified developer access
    redoc_url=None
)

# ---------------------------------------------------------------------------
# 2. CORS SHIELD: Strictly configure origin boundaries to prevent XSS/CSRF
# ---------------------------------------------------------------------------
origins = [
    "http://localhost:5173",  # Vite development local testing loop
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Block administrative methods like DELETE or PUT from public endpoints
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# 3. ROUTE DISPATCHER: Register secure controller namespaces
# ---------------------------------------------------------------------------
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["System Authentication Security"])
app.include_router(query.router, prefix=f"{settings.API_V1_STR}/query", tags=["Conversational Investigation RAG Engine"])

@app.get("/")
async def root_health_ping():
    # Public non-sensitive health check probe for orchestration tracking
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "engine_state": "active"
    }

if __name__ == "__main__":
    # Boot the asynchronous ASGI processing loop locally
    catalyst_port = int(os.environ.get("X_ZOHO_CATALYST_LISTEN_PORT", 8000))
    uvicorn.run(
        "backend.app.main.app", 
        host="127.0.0.1", 
        port=8000, 
        reload=True
    )