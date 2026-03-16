import pandas as pd
import numpy as np

BEARINGS_DATA = [
    {"id": "6204", "d": 20, "D": 47, "B": 14, "C": 12800, "C0": 6600},
    {"id": "6205", "d": 25, "D": 52, "B": 15, "C": 14000, "C0": 7800},
    {"id": "6206", "d": 30, "D": 62, "B": 16, "C": 19500, "C0": 11300},
    {"id": "6304", "d": 20, "D": 52, "B": 15, "C": 15900, "C0": 7900},
    {"id": "6305", "d": 25, "D": 62, "B": 17, "C": 23400, "C0": 13200},
]

df_bearings = pd.DataFrame(BEARINGS_DATA)

def select_bearing(shaft_diameter_mm: float, radial_load_N: float, axial_load_N: float, rpm: float = 1000, life_hours: float = 3000):
    X = 0.56
    Y = 1.5
    P = X * radial_load_N + Y * axial_load_N
    required_C = P * (life_hours * rpm * 60 / 1e6) ** (1/3)

    candidates = df_bearings[np.abs(df_bearings['d'] - shaft_diameter_mm) <= 2].copy()
    if candidates.empty:
        return None

    candidates['L10'] = (candidates['C'] / P) ** 3 * 1e6 / (rpm * 60)
    best = candidates.loc[candidates['L10'].idxmax()]

    return {
        "bearing_id": best['id'],
        "C": best['C'],
        "C0": best['C0'],
        "L10_hours": best['L10'],
        "static_safety": best['C0'] / (radial_load_N + 0.5 * axial_load_N)
    }
