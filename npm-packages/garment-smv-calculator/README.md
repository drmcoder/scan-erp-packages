# garment-smv-calculator

> SMV (Standard Minute Value) calculator for the garment industry. Formula: **SMV = Basic Time × (1 + Allowance%)**. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![npm version](https://img.shields.io/npm/v/garment-smv-calculator.svg)](https://www.npmjs.com/package/garment-smv-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install garment-smv-calculator
```

## Usage

```javascript
const { calculateSMV } = require('garment-smv-calculator');

// Calculate SMV for a sewing operation
const smv = calculateSMV({
  observedTimeSeconds: 18,        // From stopwatch observation
  performanceRating: 1.05,        // Westinghouse rating (skilled at 105%)
  allowancePercent: 0.30,         // 30% (personal + fatigue + delay)
});

console.log(`SMV: ${smv.toFixed(2)} minutes per piece`);
// → SMV: 0.41 minutes per piece
```

## API

### `calculateSMV({ observedTimeSeconds, performanceRating, allowancePercent })`
Returns SMV in minutes per piece.

### `calculateHourlyCapacity({ smvMinutes, efficiencyPercent })`
Returns expected hourly piece output based on SMV and operator efficiency.

### `calculateSMVFromTarget({ targetPiecesPerHour, efficiencyPercent })`
Reverse calculation — given a target hourly output, what SMV is required?

### `performanceRatingFromWestinghouse({ skill, effort, conditions, consistency })`
Calculate performance rating using the Westinghouse 4-factor system.

## Background

SMV is the foundation metric for piece-rate wage calculation in CMT garment factories. Without accurate SMV, every downstream calculation (operator wages, line capacity, CMT pricing) produces wrong numbers.

Read the complete guide: [SAM & SMV Formula in Garment Industry](https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html)

## Related Reading

- [How to Calculate SMV: Stopwatch Method](https://scanerp.pro/blog/how-to-calculate-smv-stopwatch-method-garment-industry.html)
- [SMV Calculation Software Comparison](https://scanerp.pro/blog/smv-calculation-software-garment-industry.html)
- [SAM Values Reference Table](https://scanerp.pro/blog/sam-values-basic-garments-reference-table.html)
- [SMV Costing for CMT Pricing](https://scanerp.pro/blog/smv-costing-cmt-pricing-garment-factory.html)

## Used By

- [Scan ERP](https://scanerp.pro/) — QR-based ERP for CMT garment factories
- [cmt-factory-toolkit](https://github.com/drmcoder/cmt-factory-toolkit) — Open-source CMT factory utilities

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder)
