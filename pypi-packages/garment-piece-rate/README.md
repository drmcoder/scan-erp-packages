# garment-piece-rate

> Piece-rate wage calculator for CMT garment factories. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![PyPI version](https://img.shields.io/pypi/v/garment-piece-rate.svg)](https://pypi.org/project/garment-piece-rate/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
pip install garment-piece-rate
```

## Usage

```python
from garment_piece_rate import calculate_piece_rate

result = calculate_piece_rate(
    pieces=250,
    rate_per_piece=2.50,
    skill_level="expert",
    quality_score=95,
    efficiency_percent=110,
    machine_type="OVERLOCK_5THREAD",
)
print(result)
# {
#   'gross': 906.95,
#   'breakdown': { 'base': 781.25, 'machine_bonus': 39.06, 'efficiency_bonus': 78.13, ... }
# }
```

## Formula

```
adjusted_rate    = rate_per_piece × skill_multiplier
base             = pieces × adjusted_rate
machine_bonus    = base × machine_complexity_bonus[machine_type]
efficiency_bonus = base × 0.05 (if 100-109%) OR base × 0.10 (if 110%+)
quality_penalty  = base × (quality_threshold − quality_score) / 100  [if score below threshold]

gross = base + machine_bonus + efficiency_bonus − quality_penalty
```

## Background

Piece-rate calculation is the core wage formula in CMT garment factories. Without automation, supervisor judgment causes 5-15% of wages to be disputed each month. This package implements the formula used by [Scan ERP](https://scanerp.pro/) which has automated piece-rate for 115,370+ pieces in production.

## Related Reading

- [Piece Rate Calculation Software for Garment Factories](https://scanerp.pro/blog/piece-rate-payment-calculation-garment-factory.html)
- [Piece Rate Disputes in Garment Factory](https://scanerp.pro/blog/piece-rate-disputes-garment-factory.html)
- [SAM & SMV Formula in Garment Industry](https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html)

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder) of [Scan ERP](https://scanerp.pro/)
