/**
 * SMV (Standard Minute Value) Calculator for Garment Industry
 *
 * SMV is the standard time required to complete a sewing operation,
 * including allowances for personal needs, fatigue, and unavoidable delays.
 *
 * Formula:
 *   SMV = Basic Time × (1 + Allowance%)
 *   Basic Time = Observed Time × Performance Rating
 *
 * Used across the garment industry as the baseline for piece-rate calculation,
 * production capacity planning, line balancing, and CMT pricing.
 *
 * Reference: https://scanerp.pro/blog/sam-smv-calculation-garment-industry.html
 *
 * @example
 *   const { calculateSMV } = require('garment-smv-calculator');
 *   const smv = calculateSMV({
 *     observedTimeSeconds: 18,
 *     performanceRating: 1.05,
 *     allowancePercent: 0.30
 *   });
 *   // → 0.4095 minutes per piece
 */
function calculateSMV({ observedTimeSeconds, performanceRating, allowancePercent }) {
  if (observedTimeSeconds <= 0) throw new Error('observedTimeSeconds must be > 0');
  if (performanceRating <= 0) throw new Error('performanceRating must be > 0');
  if (allowancePercent < 0 || allowancePercent > 1) {
    throw new Error('allowancePercent must be between 0 and 1 (e.g., 0.30 for 30%)');
  }
  const basicTimeMinutes = (observedTimeSeconds / 60) * performanceRating;
  return basicTimeMinutes * (1 + allowancePercent);
}

function calculateHourlyCapacity({ smvMinutes, efficiencyPercent = 100 }) {
  if (smvMinutes <= 0) throw new Error('smvMinutes must be > 0');
  return Math.floor((60 / smvMinutes) * (efficiencyPercent / 100));
}

function calculateSMVFromTarget({ targetPiecesPerHour, efficiencyPercent = 100 }) {
  if (targetPiecesPerHour <= 0) throw new Error('targetPiecesPerHour must be > 0');
  return (60 / targetPiecesPerHour) * (efficiencyPercent / 100);
}

const WESTINGHOUSE_SKILL = {
  superskill: 0.15, excellent: 0.11, good: 0.06, average: 0.03, fair: 0.0, poor: -0.05, very_poor: -0.16, unsatisfactory: -0.22
};
const WESTINGHOUSE_EFFORT = {
  excessive: 0.13, excellent: 0.08, good: 0.05, average: 0.0, fair: -0.04, poor: -0.08, very_poor: -0.12, unsatisfactory: -0.17
};

function performanceRatingFromWestinghouse({ skill, effort, conditions = 0, consistency = 0 }) {
  const s = typeof skill === 'string' ? WESTINGHOUSE_SKILL[skill] : skill;
  const e = typeof effort === 'string' ? WESTINGHOUSE_EFFORT[effort] : effort;
  if (s === undefined) throw new Error(`unknown skill: ${skill}`);
  if (e === undefined) throw new Error(`unknown effort: ${effort}`);
  return 1.0 + s + e + conditions + consistency;
}

module.exports = { calculateSMV, calculateHourlyCapacity, calculateSMVFromTarget, performanceRatingFromWestinghouse, WESTINGHOUSE_SKILL, WESTINGHOUSE_EFFORT };
