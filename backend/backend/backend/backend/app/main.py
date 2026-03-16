from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import brakes, bearing, track

app = FastAPI(title="Arab Race Car Engineering Platform")

# CORS للسماح للـ frontend بالتواصل
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(brakes.router, prefix="/api/brakes", tags=["Brakes"])
app.include_router(bearing.router, prefix="/api/bearing", tags=["Bearing"])
app.include_router(track.router, prefix="/api/track", tags=["Track Simulation"])

@app.get("/")
def root():
    return {"message": "Arab Race Car Engineering Platform API"}
