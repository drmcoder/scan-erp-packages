# garment-bundle-id

> Standard bundle ID generator and parser for QR-based garment factory production tracking. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![npm version](https://img.shields.io/npm/v/garment-bundle-id.svg)](https://www.npmjs.com/package/garment-bundle-id)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install garment-bundle-id
```

## Usage

```javascript
const { generateBundleId, parseBundleId, generateQRPayload } = require('garment-bundle-id');

// Generate a bundle ID
const id = generateBundleId({
  style: 'S27',
  lot: '8082',
  color: 'BLUE',
  size: 'M',
  bundleNumber: 1,
  component: 'FRT',
});
console.log(id); // → "S27-8082-BLUE-M-001-FRT"

// Parse an existing bundle ID
const parsed = parseBundleId('S27-8082-BLUE-M-001-FRT');
console.log(parsed);
// {
//   style: 'S27', lot: '8082', color: 'BLUE',
//   size: 'M', bundleNumber: 1, component: 'FRT'
// }

// Generate compact QR payload
const qr = generateQRPayload({
  style: 'S27', lot: '8082', color: 'BLUE',
  size: 'M', bundleNumber: 1, component: 'FRT',
  totalPieces: 50, quantity: 1
});
// → '{"a":"S27","l":"8082","b":"S27-8082-BLUE-M-001-FRT",...}'
```

## Bundle ID Format

```
STYLE-LOT-COLOR-SIZE-BUNDLE#-COMPONENT
S27 - 8082 - BLUE - M - 001 - FRT
```

Each segment encodes:

| Segment | Description | Example |
|---------|-------------|---------|
| STYLE | Style number | S27, S31 |
| LOT | Lot/order number | 8082, 9001 |
| COLOR | Color name (max 8 chars) | BLUE, NAVY, RED |
| SIZE | Size code | S, M, L, XL, 32 |
| BUNDLE# | Bundle sequence (zero-padded to 3 digits) | 001, 023, 100 |
| COMPONENT | Component code (FRT, BK, SLV, CLR, etc.) | FRT, BK, SLV-L |

## Component Codes

Standard codes from the garment_library used across CMT factories:

| Code | Component |
|------|-----------|
| FRT | Front |
| BK | Back |
| SLV | Sleeve (single) |
| SLV-L | Sleeve (left) |
| SLV-R | Sleeve (right) |
| CLR | Collar |
| PKT | Pocket |
| CUFF | Cuff |
| YKE | Yoke |

## Why Standardized Bundle IDs Matter

In QR-based production tracking, every bundle scan records: who, what, where, when. A standardized ID format means:

1. **No collisions** across different orders or styles
2. **Marriage tracking** — system knows that `S27-8082-BLUE-M-001-FRT` + `S27-8082-BLUE-M-001-BK` + `S27-8082-BLUE-M-001-SLV-L` + `S27-8082-BLUE-M-001-SLV-R` come together as one finished garment
3. **Easy filtering** by lot, color, size, or component for reporting
4. **Operator-readable** — workers can identify bundle contents at a glance

## Used By

- [Scan ERP](https://scanerp.pro/) — QR-based ERP for CMT garment factories (115,370+ pieces tracked)
- [cmt-factory-toolkit](https://github.com/drmcoder/cmt-factory-toolkit) — Open-source CMT factory utilities

## Related Reading

- [QR Code Production Tracking in Garment Factories](https://scanerp.pro/blog/qr-code-production-tracking-garment-factory.html)
- [Bundle Tracking System for Garment Factory](https://scanerp.pro/blog/bundle-system-garment-production-tracking.html)
- [QR Bundle Tags Garment Production](https://scanerp.pro/blog/qr-bundle-tags-garment-production.html)
- [RFID vs QR Code for Garment Tracking](https://scanerp.pro/blog/rfid-vs-qr-code-garment-tracking.html)
- [Real-Time Garment Production Tracking System: 2026 Guide](https://scanerp.pro/blog/garment-production-tracking-system-2026-guide.html)

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder) of [Scan ERP](https://scanerp.pro/)
