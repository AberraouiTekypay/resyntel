from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Resource Intelligence — Hospitality Resource-Efficiency Platform localized for Morocco (Currency: MAD). An EM300.co Company."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "product": "Resyntel",
        "descriptor": "Resource Intelligence for Hospitality",
        "tagline": "Measure resource consumption. Detect inefficiencies. Quantify savings. Act.",
        "brand": "An EM300.co Company",
        "currency": "MAD",
        "property": "Zephyr Marrakech",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Resource Intelligence API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
