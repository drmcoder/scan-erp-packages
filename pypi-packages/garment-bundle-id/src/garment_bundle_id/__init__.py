"""
Bundle ID Generator/Parser for QR-Based Garment Factory Production Tracking.

Standard format: STYLE-LOT-COLOR-SIZE-BUNDLE#-COMPONENT
Example: S27-8082-BLUE-M-001-FRT

Reference: https://scanerp.pro/blog/qr-code-production-tracking-garment-factory.html

Example:
    >>> from garment_bundle_id import generate_bundle_id, parse_bundle_id
    >>> bid = generate_bundle_id(style="S27", lot="8082", color="BLUE",
    ...                           size="M", bundle_number=1, component="FRT")
    >>> bid
    'S27-8082-BLUE-M-001-FRT'
    >>> parse_bundle_id(bid)["bundle_number"]
    1
"""
__version__ = "1.0.0"
import json
import re

COMPONENT_CODES = {
    "FRONT": "FRT", "front": "FRT",
    "BACK": "BK", "back": "BK",
    "SLEEVE": "SLV", "sleeve": "SLV",
    "SLEEVE_LEFT": "SLV-L", "SLEEVE_RIGHT": "SLV-R",
    "COLLAR": "CLR", "collar": "CLR",
    "POCKET": "PKT", "pocket": "PKT",
    "CUFF": "CUFF", "cuff": "CUFF",
    "YOKE": "YKE", "yoke": "YKE",
}


def _safe(value, default="", maxlen=None):
    if value is None:
        return default
    s = re.sub(r"[^A-Z0-9]", "", str(value).upper())
    return s[:maxlen] if maxlen else s


def generate_bundle_id(
    style: str,
    lot: str,
    color: str = "COL",
    size: str = "M",
    bundle_number: int = 1,
    component: str = "FRT",
) -> str:
    """Generate a standard bundle ID for QR-based garment factory production tracking."""
    if not style:
        raise ValueError("style is required")
    if not lot:
        raise ValueError("lot is required")

    style_safe = _safe(style)
    lot_safe = _safe(lot)
    color_safe = _safe(color, default="COL", maxlen=8) or "COL"
    size_safe = str(size).upper()
    bundle_num_str = str(bundle_number).zfill(3)
    component_code = COMPONENT_CODES.get(component, str(component).upper()[:6])
    return f"{style_safe}-{lot_safe}-{color_safe}-{size_safe}-{bundle_num_str}-{component_code}"


def parse_bundle_id(bundle_id: str):
    """Parse a bundle ID string into its component parts."""
    if not bundle_id or not isinstance(bundle_id, str):
        return None
    parts = bundle_id.split("-")
    if len(parts) < 6:
        return None
    if len(parts) > 6:
        component = "-".join(parts[5:])
        parts = parts[:5] + [component]
    try:
        bundle_num = int(parts[4])
    except (ValueError, TypeError):
        return None
    return {
        "style": parts[0],
        "lot": parts[1],
        "color": parts[2],
        "size": parts[3],
        "bundle_number": bundle_num,
        "component": parts[5],
    }


def is_valid_bundle_id(bundle_id: str) -> bool:
    """Check if a bundle ID has valid format."""
    return parse_bundle_id(bundle_id) is not None


def generate_qr_payload(bundle_data: dict) -> str:
    """Generate compact JSON QR payload used in Scan ERP scanners."""
    return json.dumps({
        "a": bundle_data.get("article") or bundle_data.get("style"),
        "l": bundle_data.get("lot"),
        "b": bundle_data.get("bundle_id") or generate_bundle_id(
            style=bundle_data.get("style", ""),
            lot=bundle_data.get("lot", ""),
            color=bundle_data.get("color", "COL"),
            size=bundle_data.get("size", "M"),
            bundle_number=bundle_data.get("bundle_number", 1),
            component=bundle_data.get("component", "FRT"),
        ),
        "s": bundle_data.get("size"),
        "c": bundle_data.get("color"),
        "p": bundle_data.get("component"),
        "q": bundle_data.get("quantity", 1),
        "n": bundle_data.get("total_pieces", 0),
    })
