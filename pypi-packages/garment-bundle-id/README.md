# garment-bundle-id

> Standard bundle ID generator and parser for QR-based garment factory production tracking. Built and used in production by [Scan ERP](https://scanerp.pro/).

[![PyPI version](https://img.shields.io/pypi/v/garment-bundle-id.svg)](https://pypi.org/project/garment-bundle-id/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
pip install garment-bundle-id
```

## Usage

```python
from garment_bundle_id import generate_bundle_id, parse_bundle_id

# Generate a bundle ID
bid = generate_bundle_id(
    style="S27",
    lot="8082",
    color="BLUE",
    size="M",
    bundle_number=1,
    component="FRT",
)
print(bid)
# → "S27-8082-BLUE-M-001-FRT"

# Parse an existing bundle ID
parsed = parse_bundle_id("S27-8082-BLUE-M-001-FRT")
print(parsed)
# {
#   'style': 'S27', 'lot': '8082', 'color': 'BLUE',
#   'size': 'M', 'bundle_number': 1, 'component': 'FRT'
# }
```

## Bundle ID Format

```
STYLE-LOT-COLOR-SIZE-BUNDLE#-COMPONENT
S27 - 8082 - BLUE - M - 001 - FRT
```

| Segment | Description |
|---------|-------------|
| STYLE | Style number (S27, S31) |
| LOT | Lot/order number |
| COLOR | Color name (max 8 chars) |
| SIZE | Size code (S, M, L, XL, 32) |
| BUNDLE# | Bundle sequence (zero-padded to 3 digits) |
| COMPONENT | Component code (FRT, BK, SLV, CLR, etc.) |

## Component Codes

Standard codes used across CMT factories:

| Code | Component |
|------|-----------|
| FRT | Front |
| BK | Back |
| SLV | Sleeve |
| SLV-L | Sleeve (left) |
| SLV-R | Sleeve (right) |
| CLR | Collar |
| PKT | Pocket |
| CUFF | Cuff |
| YKE | Yoke |

## Used By

- [Scan ERP](https://scanerp.pro/) — QR-based ERP for CMT garment factories (115,370+ pieces tracked)

## Related Reading

- [QR Code Production Tracking in Garment Factories](https://scanerp.pro/blog/qr-code-production-tracking-garment-factory.html)
- [Bundle Tracking System for Garment Factory](https://scanerp.pro/blog/bundle-system-garment-production-tracking.html)
- [RFID vs QR Code for Garment Tracking](https://scanerp.pro/blog/rfid-vs-qr-code-garment-tracking.html)
- [Real-Time Garment Production Tracking System: 2026 Guide](https://scanerp.pro/blog/garment-production-tracking-system-2026-guide.html)

## License

MIT — Built by [Santosh Rijal](https://github.com/drmcoder) of [Scan ERP](https://scanerp.pro/)
