"""
Piece-Rate Wage Calculator for CMT Garment Factories.

Formula: pieces x rate x skill multiplier + machine bonus + efficiency bonus - quality penalty

Reference: https://scanerp.pro/blog/piece-rate-payment-calculation-garment-factory.html

Example:
    >>> from garment_piece_rate import calculate_piece_rate
    >>> result = calculate_piece_rate(pieces=250, rate_per_piece=2.5, skill_level="expert",
    ...                                quality_score=95, efficiency_percent=110,
    ...                                machine_type="OVERLOCK_5THREAD")
    >>> result['gross']
    906.95
"""
__version__ = "1.0.0"

SKILL_MULTIPLIERS = {
    "novice": 0.75,
    "intermediate": 1.0,
    "expert": 1.25,
}

MACHINE_COMPLEXITY_BONUS = {
    "SINGLE_NEEDLE": 0.0,
    "OVERLOCK_5THREAD": 0.05,
    "FLATLOCK_2NEEDLE": 0.08,
    "KANSAI": 0.12,
    "BUTTONHOLE_MACHINE": 0.15,
    "BUTTON_ATTACH": 0.18,
    "DOUBLE_NEEDLE": 0.10,
}

QUALITY_THRESHOLD = {
    "OVERLOCK_5THREAD": 85,
    "SINGLE_NEEDLE": 90,
    "BUTTONHOLE_MACHINE": 95,
    "FLATLOCK_2NEEDLE": 88,
    "default": 88,
}


def calculate_piece_rate(
    pieces: float,
    rate_per_piece: float,
    skill_level: str = "intermediate",
    quality_score: float = 100,
    efficiency_percent: float = 100,
    machine_type: str = "SINGLE_NEEDLE",
) -> dict:
    """Calculate piece-rate wage for a garment operator."""
    if pieces < 0:
        raise ValueError("pieces must be >= 0")
    if rate_per_piece <= 0:
        raise ValueError("rate_per_piece must be > 0")

    skill_multiplier = SKILL_MULTIPLIERS.get(skill_level, 1.0)
    adjusted_rate = rate_per_piece * skill_multiplier
    base = pieces * adjusted_rate
    machine_bonus = base * MACHINE_COMPLEXITY_BONUS.get(machine_type, 0)

    efficiency_bonus = 0
    if efficiency_percent >= 110:
        efficiency_bonus = base * 0.10
    elif efficiency_percent >= 100:
        efficiency_bonus = base * 0.05

    threshold = QUALITY_THRESHOLD.get(machine_type, QUALITY_THRESHOLD["default"])
    quality_penalty = 0
    if quality_score < threshold:
        quality_penalty = base * ((threshold - quality_score) / 100)

    gross = base + machine_bonus + efficiency_bonus - quality_penalty

    return {
        "gross": round(gross, 2),
        "breakdown": {
            "base": round(base, 2),
            "machine_bonus": round(machine_bonus, 2),
            "efficiency_bonus": round(efficiency_bonus, 2),
            "quality_penalty": round(quality_penalty, 2),
            "skill_multiplier": skill_multiplier,
            "adjusted_rate": round(adjusted_rate, 2),
        },
    }


def calculate_overtime_pay(
    regular_hours: float,
    overtime_hours: float,
    hourly_rate: float,
    overtime_multiplier: float = 1.5,
) -> dict:
    """Calculate overtime pay with regular hours + OT multiplier."""
    regular_pay = regular_hours * hourly_rate
    overtime_pay = overtime_hours * hourly_rate * overtime_multiplier
    return {
        "regular_pay": round(regular_pay, 2),
        "overtime_pay": round(overtime_pay, 2),
        "total": round(regular_pay + overtime_pay, 2),
    }
