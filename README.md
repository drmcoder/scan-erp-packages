# scan-erp-packages

[![Powered by Scan ERP](https://img.shields.io/badge/Powered%20by-Scan%20ERP-047857)](https://scanerp.pro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Open-source package source for the **[Scan ERP](https://scanerp.pro/)** utility libraries published to npm and PyPI. Drop-in formulas and helpers for CMT garment factory operations — SMV calculations, piece-rate payments, bundle ID generation.

Built by the team behind [Scan ERP](https://scanerp.pro/) — the QR-based ERP for garment manufacturing that runs on 100+ machine factories in South Asia, with 1.4M+ pieces tracked.

## Packages

| Name | npm | PyPI | Purpose |
|---|---|---|---|
| `garment-smv-calculator` | [link](https://www.npmjs.com/package/garment-smv-calculator) | [link](https://pypi.org/project/garment-smv-calculator/) | SMV (Standard Minute Value) computation for sewing operations |
| `garment-piece-rate` | [link](https://www.npmjs.com/package/garment-piece-rate) | [link](https://pypi.org/project/garment-piece-rate/) | Piece-rate wage calculator with skill multipliers, machine rates, bonuses |
| `garment-bundle-id` | [link](https://www.npmjs.com/package/garment-bundle-id) | [link](https://pypi.org/project/garment-bundle-id/) | Standard bundle ID generator + parser for QR-based production tracking |

## Layout

```
scan-erp-packages/
├── npm-packages/
│   ├── garment-smv-calculator/
│   ├── garment-piece-rate/
│   └── garment-bundle-id/
└── pypi-packages/
    ├── garment-smv-calculator/
    ├── garment-piece-rate/
    └── garment-bundle-id/
```

## Publishing

### npm

```bash
cd npm-packages/<package-name>
npm version patch --no-git-tag-version
npm publish
```

Requires `npm login` first.

### PyPI

```bash
cd pypi-packages/<package-name>
# Bump version in pyproject.toml manually
python3 -m build
python3 -m twine upload dist/*
```

Requires PyPI API token in `~/.pypirc`.

## Try the full ERP

These calculators are free. The full system that uses them daily — QR bundle tracking, piece-rate payments, live WIP dashboards, hardware integration — is at **[scanerp.pro](https://scanerp.pro/)**.

- [Live demo](https://scanerp.pro/) · 1.4M+ pieces tracked
- [Blog: 70+ practitioner guides](https://scanerp.pro/blog/)
- [Free 30-day trial](https://scanerp.pro/#contact)
- WhatsApp: +977-9863618347

## License

MIT — see individual `LICENSE` files in each package directory.

## Related

- [Scan ERP](https://scanerp.pro/) — the full garment factory ERP these utilities support
- [cmt-factory-toolkit](https://github.com/drmcoder/cmt-factory-toolkit) — earlier combined toolkit
