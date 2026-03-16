from pydantic import BaseModel
from typing import Optional

class BrakeInput(BaseModel):
    pedal_ratio: float
    driver_force: float
    master_cylinder_diameter: float
    caliper_piston_diameter: float
    num_pistons: int
    pad_friction: float
    effective_rotor_radius: float
    vehicle_mass: float
    velocity: float

class BrakeOutput(BaseModel):
    front_brake_torque: float
    rear_brake_torque: float
    brake_bias: float
    deceleration: float
    stopping_distance: float
    stopping_time: float
    heat_power: float
    rotor_temp_rise: float
