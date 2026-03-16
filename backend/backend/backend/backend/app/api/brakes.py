from fastapi import APIRouter, HTTPException
from app.models.schemas import BrakeInput, BrakeOutput
from app.core.brake_system import calculate_brake_system

router = APIRouter()

@router.post("/calculate", response_model=BrakeOutput)
async def calculate_brakes(data: BrakeInput):
    try:
        result = calculate_brake_system(data.dict())
        return BrakeOutput(**result)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
