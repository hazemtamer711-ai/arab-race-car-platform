from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.bearing_selector import select_bearing

router = APIRouter()

class BearingInput(BaseModel):
    shaft_diameter_mm: float
    radial_load_N: float
    axial_load_N: float
    rpm: float = 1000
    life_hours: float = 3000

class BearingOutput(BaseModel):
    bearing_id: str
    C: float
    C0: float
    L10_hours: float
    static_safety: float

@router.post("/select", response_model=BearingOutput)
async def bearing_select(data: BearingInput):
    result = select_bearing(data.shaft_diameter_mm, data.radial_load_N, data.axial_load_N, data.rpm, data.life_hours)
    if result is None:
        raise HTTPException(status_code=404, detail="No suitable bearing found")
    return BearingOutput(**result)
