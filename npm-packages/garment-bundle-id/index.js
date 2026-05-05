/**
 * Bundle ID Generator/Parser for QR-Based Garment Factory Production Tracking
 *
 * Standard format: STYLE-LOT-COLOR-SIZE-BUNDLE#-COMPONENT
 * Example: S27-8082-BLUE-M-001-FRT
 *
 * Used in QR-based bundle tracking systems where each bundle of cut pieces
 * has a unique scannable ID that travels with it through every sewing
 * operation. Each scan records: who, what, where, when.
 *
 * Reference: https://scanerp.pro/blog/qr-code-production-tracking-garment-factory.html
 *
 * @example
 *   const { generateBundleId, parseBundleId } = require('garment-bundle-id');
 *
 *   const id = generateBundleId({
 *     style: 'S27', lot: '8082', color: 'BLUE',
 *     size: 'M', bundleNumber: 1, component: 'FRT'
 *   });
 *   // → "S27-8082-BLUE-M-001-FRT"
 *
 *   parseBundleId(id);
 *   // → { style: 'S27', lot: '8082', color: 'BLUE', size: 'M', bundleNumber: 1, component: 'FRT' }
 */

const COMPONENT_CODES = {
  FRONT: 'FRT', front: 'FRT',
  BACK: 'BK', back: 'BK',
  SLEEVE: 'SLV', sleeve: 'SLV',
  SLEEVE_LEFT: 'SLV-L', SLEEVE_RIGHT: 'SLV-R',
  COLLAR: 'CLR', collar: 'CLR',
  POCKET: 'PKT', pocket: 'PKT',
  CUFF: 'CUFF', cuff: 'CUFF',
  YOKE: 'YKE', yoke: 'YKE',
};

function generateBundleId({ style, lot, color, size, bundleNumber, component }) {
  if (!style) throw new Error('style is required');
  if (!lot) throw new Error('lot is required');
  const styleSafe = String(style).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const lotSafe = String(lot).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const colorSafe = String(color || 'COL').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  const sizeSafe = String(size || 'M').toUpperCase();
  const bundleNumStr = String(bundleNumber || 1).padStart(3, '0');
  const componentCode = COMPONENT_CODES[component] || String(component || '').toUpperCase().slice(0, 6);
  return `${styleSafe}-${lotSafe}-${colorSafe}-${sizeSafe}-${bundleNumStr}-${componentCode}`;
}

function parseBundleId(bundleId) {
  if (!bundleId || typeof bundleId !== 'string') return null;
  const parts = bundleId.split('-');
  if (parts.length < 6) return null;
  // Handle SLEEVE-L / SLEEVE-R which have extra dash
  let component;
  if (parts.length > 6) {
    component = parts.slice(5).join('-');
    parts.length = 6;
  } else {
    component = parts[5];
  }
  return {
    style: parts[0],
    lot: parts[1],
    color: parts[2],
    size: parts[3],
    bundleNumber: parseInt(parts[4], 10),
    component,
  };
}

function generateQRPayload(bundleData, opts = {}) {
  // Compact JSON format used in scan-erp QR codes
  return JSON.stringify({
    a: bundleData.article || bundleData.style,
    l: bundleData.lot,
    b: bundleData.bundleId || generateBundleId(bundleData),
    s: bundleData.size,
    c: bundleData.color,
    p: bundleData.component,
    q: bundleData.quantity || 1,
    n: bundleData.totalPieces || 0,
  });
}

function isValidBundleId(bundleId) {
  return parseBundleId(bundleId) !== null;
}

module.exports = { generateBundleId, parseBundleId, generateQRPayload, isValidBundleId, COMPONENT_CODES };
