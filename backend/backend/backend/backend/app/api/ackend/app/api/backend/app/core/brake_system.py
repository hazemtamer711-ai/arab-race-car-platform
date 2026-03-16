import math

def calculate_brake_system(params):
    pedal_ratio = params['pedal_ratio']
    driver_force = params['driver_force']
    master_cylinder_diameter = params['master_cylinder_diameter']
    caliper_piston_diameter = params['caliper_piston_diameter']
    num_pistons = params['num_pistons']
    pad_friction = params['pad_friction']
    effective_rotor_radius = params['effective_rotor_radius']
    vehicle_mass = params['vehicle_mass']
    velocity = params['velocity']

    pedal_force = driver_force * pedal_ratio
    master_area = math.pi * (master_cylinder_diameter/2)**2
    pressure = pedal_force / master_area
    piston_area = math.pi * (caliper_piston_diameter/2)**2
    total_piston_area = piston_area * num_pistons
    clamp_force = pressure * total_piston_area
    brake_torque_per_wheel = clamp_force * pad_friction * effective_rotor_radius

    front_torque = brake_torque_per_wheel
    rear_torque = brake_torque_per_wheel

    total_brake_force = (front_torque*2 + rear_torque*2) / effective_rotor_radius
    decel = total_brake_force / vehicle_mass
    stopping_time = velocity / decel
    stopping_distance = 0.5 * decel * stopping_time**2

    ke = 0.5 * vehicle_mass * velocity**2
    heat_power = ke / stopping_time
    rotor_mass = 8.0
    specific_heat = 450
    temp_rise = ke / (rotor_mass * specific_heat * 2)

    brake_bias = front_torque / (front_torque + rear_torque) if (front_torque+rear_torque)!=0 else 0.5

    return {
        "front_brake_torque": front_torque,
        "rear_brake_torque": rear_torque,
        "brake_bias": brake_bias,
        "deceleration": decel,
        "stopping_distance": stopping_distance,
        "stopping_time": stopping_time,
        "heat_power": heat_power,
        "rotor_temp_rise": temp_rise
    }
