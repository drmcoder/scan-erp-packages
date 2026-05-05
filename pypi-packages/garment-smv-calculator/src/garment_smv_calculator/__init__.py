"""
SMV (Standard Minute Value) Calculator for the Garment Industry.

Formula: SMV = Basic Time x (1 + Allowance%)
         Basic Time = Observed Time x Performance Rating

Reference: https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html

Example:
    >>> from garment_smv_calculator import calculate_smv
    >>> smv = calculate_smv(observed_time_seconds=18, performance_rating=1.05, allowance_percent=0.30)
    >>> round(smv, 2)
    0.41
"""
__version__ = "1.0.0"

WESTINGHOUSE_SKILL = {
    "superskill": 0.15, "excellent": 0.11, "good": 0.06,
    "average": 0.03, "fair": 0.0, "poor": -0.05,
    "very_poor": -0.16, "unsatisfactory": -0.22,
}
WESTINGHOUSE_EFFORT = {
    "excessive": 0.13, "excellent": 0.08, "good": 0.05,
    "average": 0.0, "fair": -0.04, "poor": -0.08,
    "very_poor": -0.12, "unsatisfactory": -0.17,
}


def calculate_smv(observed_time_seconds: float, performance_rating: float, allowance_percent: float) -> float:
    """Calculate SMV (Standard Minute Value) in minutes per piece."""
    if observed_time_seconds <= 0:
        raise ValueError("observed_time_seconds must be > 0")
    if performance_rating <= 0:
        raise ValueError("performance_rating must be > 0")
    if not (0 <= allowance_percent <= 1):
        raise ValueError("allowance_percent must be between 0 and 1 (e.g., 0.30 for 30%)")
    basic_time_minutes = (observed_time_seconds / 60) * performance_rating
    return basic_time_minutes * (1 + allowance_percent)


def calculate_hourly_capacity(smv_minutes: float, efficiency_percent: float = 100) -> int:
    """Calculate expected hourly piece output from SMV and operator efficiency."""
    if smv_minutes <= 0:
        raise ValueError("smv_minutes must be > 0")
    return int((60 / smv_minutes) * (efficiency_percent / 100))


def calculate_smv_from_target(target_pieces_per_hour: float, efficiency_percent: float = 100) -> float:
    """Reverse calculation: given target hourly output, what SMV is required?"""
    if target_pieces_per_hour <= 0:
        raise ValueError("target_pieces_per_hour must be > 0")
    return (60 / target_pieces_per_hour) * (efficiency_percent / 100)


def performance_rating_from_westinghouse(skill, effort, conditions: float = 0, consistency: float = 0) -> float:
    """Calculate performance rating using Westinghouse 4-factor system."""
    s = WESTINGHOUSE_SKILL[skill] if isinstance(skill, str) else skill
    e = WESTINGHOUSE_EFFORT[effort] if isinstance(effort, str) else effort
    return 1.0 + s + e + conditions + consistency
