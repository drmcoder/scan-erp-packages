# garment-piece-rate

> Piece-rate wage calculator for CMT garment factories. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![npm version](https://img.shields.io/npm/v/garment-piece-rate.svg)](https://www.npmjs.com/package/garment-piece-rate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install garment-piece-rate
```

## Usage

```javascript
const { calculatePieceRate } = require('garment-piece-rate');

const wage = calculatePieceRate({
  pieces: 250,
  ratePerPiece: 2.50,
  skillLevel: 'expert',
  qualityScore: 95,
  efficiencyPercent: 110,
  machineType: 'OVERLOCK_5THREAD',
});

console.log(wage);
// {
//   gross: 906.95,
//   breakdown: { base: 781.25, machineBonus: 39.06, efficiencyBonus: 78.13, ... }
// }
```

## Formula

```
adjustedRate    = ratePerPiece × skillMultiplier
base            = pieces × adjustedRate
machineBonus    = base × machineComplexityBonus[machineType]
efficiencyBonus = base × 0.05 (if 100-109%) OR base × 0.10 (if 110%+)
qualityPenalty  = base × (qualityThreshold − qualityScore) / 100  [if score below threshold]

gross = base + machineBonus + efficiencyBonus − qualityPenalty
```

## Skill Multipliers

| Level | Multiplier |
|-------|-----------|
| Novice | 0.75 |
| Intermediate | 1.0 |
| Expert | 1.25 |

## Machine Complexity Bonuses

Higher-complexity machines get higher bonuses:

| Machine | Bonus |
|---------|-------|
| SINGLE_NEEDLE | 0% |
| OVERLOCK_5THREAD | 5% |
| FLATLOCK_2NEEDLE | 8% |
| DOUBLE_NEEDLE | 10% |
| KANSAI | 12% |
| BUTTONHOLE_MACHINE | 15% |
| BUTTON_ATTACH | 18% |

## Quality Thresholds

Quality penalty applied if score below threshold:

| Machine | Threshold |
|---------|-----------|
| OVERLOCK_5THREAD | 85 |
| SINGLE_NEEDLE | 90 |
| FLATLOCK_2NEEDLE | 88 |
| BUTTONHOLE_MACHINE | 95 |
| Default | 88 |

## Background

Piece-rate calculation is the core wage formula in CMT garment factories. Without automation, supervisor judgment causes 5-15% of wages to be disputed each month. This package implements the formula used by [Scan ERP](https://scanerp.pro/) which has automated piece-rate for 115,370+ pieces in production.

## Related Reading

- [Piece Rate Calculation Software for Garment Factories](https://scanerp.pro/blog/piece-rate-payment-calculation-garment-factory.html)
- [Piece Rate Disputes in Garment Factory](https://scanerp.pro/blog/piece-rate-disputes-garment-factory.html)
- [Incentive Pay for Sewing Operators](https://scanerp.pro/blog/incentive-pay-sewing-operators-automatic-calculation.html)
- [SAM & SMV Formula in Garment Industry](https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html)

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder) of [Scan ERP](https://scanerp.pro/)
