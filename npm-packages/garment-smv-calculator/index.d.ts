export interface SMVInput {
  observedTimeSeconds: number;
  performanceRating: number;
  allowancePercent: number;
}
export function calculateSMV(input: SMVInput): number;
export function calculateHourlyCapacity(input: { smvMinutes: number; efficiencyPercent?: number }): number;
export function calculateSMVFromTarget(input: { targetPiecesPerHour: number; efficiencyPercent?: number }): number;
export function performanceRatingFromWestinghouse(input: { skill: string | number; effort: string | number; conditions?: number; consistency?: number }): number;
export const WESTINGHOUSE_SKILL: Record<string, number>;
export const WESTINGHOUSE_EFFORT: Record<string, number>;
