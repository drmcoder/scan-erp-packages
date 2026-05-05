export interface PieceRateInput {
  pieces: number;
  ratePerPiece: number;
  skillLevel?: 'novice' | 'intermediate' | 'expert';
  qualityScore?: number;
  efficiencyPercent?: number;
  machineType?: string;
}
export interface PieceRateResult {
  gross: number;
  breakdown: {
    base: number;
    machineBonus: number;
    efficiencyBonus: number;
    qualityPenalty: number;
    skillMultiplier: number;
    adjustedRate: number;
  };
}
export function calculatePieceRate(input: PieceRateInput): PieceRateResult;
export function calculateOvertimePay(input: { regularHours: number; overtimeHours: number; hourlyRate: number; overtimeMultiplier?: number }): { regularPay: number; overtimePay: number; total: number };
export const SKILL_MULTIPLIERS: Record<string, number>;
export const MACHINE_COMPLEXITY_BONUS: Record<string, number>;
export const QUALITY_THRESHOLD: Record<string, number>;
