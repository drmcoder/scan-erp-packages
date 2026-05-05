# garment-smv-calculator

> SMV (Standard Minute Value) calculator for the garment industry. Formula: **SMV = Basic Time × (1 + Allowance%)**. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![PyPI version](https://img.shields.io/pypi/v/garment-smv-calculator.svg)](https://pypi.org/project/garment-smv-calculator/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
pip install garment-smv-calculator
```

## Usage

```python
from garment_smv_calculator import calculate_smv, calculate_hourly_capacity

# Calculate SMV for a sewing operation
smv = calculate_smv(
    observed_time_seconds=18,        # From stopwatch observation
    performance_rating=1.05,          # Westinghouse: skilled at 105%
    allowance_percent=0.30,           # 30% (personal + fatigue + delay)
)
print(f"SMV: {smv:.2f} minutes per piece")
# → SMV: 0.41 minutes per piece

# Calculate operator hourly capacity
capacity = calculate_hourly_capacity(smv_minutes=smv, efficiency_percent=85)
print(f"Hourly capacity at 85% efficiency: {capacity} pieces")
```

## Background

SMV is the foundation metric for piece-rate wage calculation in CMT garment factories. Without accurate SMV, every downstream calculation produces wrong numbers.

Read the complete guide: [SAM & SMV Formula in Garment Industry](https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html)

## Related Reading

- [How to Calculate SMV: Stopwatch Method](https://scanerp.pro/blog/how-to-calculate-smv-stopwatch-method-garment-industry.html)
- [SMV Calculation Software Comparison](https://scanerp.pro/blog/smv-calculation-software-garment-industry.html)
- [SAM Values Reference Table](https://scanerp.pro/blog/sam-values-basic-garments-reference-table.html)

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder) of [Scan ERP](https://scanerp.pro/)
