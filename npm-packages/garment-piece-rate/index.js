/**
 * Piece-Rate Wage Calculator for CMT Garment Factories
 *
 * Formula:
 *   pieces × rate × skill multiplier + machine bonus + efficiency bonus − quality penalty
 *
 * Reference: https://scanerp.pro/blog/piece-rate-payment-calculation-garment-factory.html
 *
 * @example
 *   const { calculatePieceRate } = require('garment-piece-rate');
 *   const wage = calculatePieceRate({
 *     pieces: 250,
 *     ratePerPiece: 2.50,
 *     skillLevel: 'expert',
 *     qualityScore: 95,
 *     efficiencyPercent: 110,
 *     machineType: 'OVERLOCK_5THREAD'
 *   });
 *   // → { gross: 762.50, breakdown: {...} }
 */

const SKILL_MULTIPLIERS = {
  novice: 0.75,
  intermediate: 1.0,
  expert: 1.25,
};

const MACHINE_COMPLEXITY_BONUS = {
  SINGLE_NEEDLE: 0.0,
  OVERLOCK_5THREAD: 0.05,
  FLATLOCK_2NEEDLE: 0.08,
  KANSAI: 0.12,
  BUTTONHOLE_MACHINE: 0.15,
  BUTTON_ATTACH: 0.18,
  DOUBLE_NEEDLE: 0.10,
};

const QUALITY_THRESHOLD = {
  OVERLOCK_5THREAD: 85,
  SINGLE_NEEDLE: 90,
  BUTTONHOLE_MACHINE: 95,
  FLATLOCK_2NEEDLE: 88,
  default: 88,
};

function calculatePieceRate({
  pieces,
  ratePerPiece,
  skillLevel = 'intermediate',
  qualityScore = 100,
  efficiencyPercent = 100,
  machineType = 'SINGLE_NEEDLE',
}) {
  if (pieces < 0) throw new Error('pieces must be ≥ 0');
  if (ratePerPiece <= 0) throw new Error('ratePerPiece must be > 0');

  const skillMultiplier = SKILL_MULTIPLIERS[skillLevel] ?? 1.0;
  const adjustedRate = ratePerPiece * skillMultiplier;
  const base = pieces * adjustedRate;
  const machineBonus = base * (MACHINE_COMPLEXITY_BONUS[machineType] ?? 0);

  let efficiencyBonus = 0;
  if (efficiencyPercent >= 110) efficiencyBonus = base * 0.10;
  else if (efficiencyPercent >= 100) efficiencyBonus = base * 0.05;

  const threshold = QUALITY_THRESHOLD[machineType] ?? QUALITY_THRESHOLD.default;
  let qualityPenalty = 0;
  if (qualityScore < threshold) {
    qualityPenalty = base * ((threshold - qualityScore) / 100);
  }

  const gross = base + machineBonus + efficiencyBonus - qualityPenalty;
  return {
    gross: Math.round(gross * 100) / 100,
    breakdown: {
      base: Math.round(base * 100) / 100,
      machineBonus: Math.round(machineBonus * 100) / 100,
      efficiencyBonus: Math.round(efficiencyBonus * 100) / 100,
      qualityPenalty: Math.round(qualityPenalty * 100) / 100,
      skillMultiplier,
      adjustedRate: Math.round(adjustedRate * 100) / 100,
    },
  };
}

function calculateOvertimePay({ regularHours, overtimeHours, hourlyRate, overtimeMultiplier = 1.5 }) {
  return {
    regularPay: regularHours * hourlyRate,
    overtimePay: overtimeHours * hourlyRate * overtimeMultiplier,
    total: regularHours * hourlyRate + overtimeHours * hourlyRate * overtimeMultiplier,
  };
}

module.exports = { calculatePieceRate, calculateOvertimePay, SKILL_MULTIPLIERS, MACHINE_COMPLEXITY_BONUS, QUALITY_THRESHOLD };
