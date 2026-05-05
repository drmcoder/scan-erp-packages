export interface BundleIdInput {
  style: string;
  lot: string;
  color?: string;
  size?: string;
  bundleNumber?: number;
  component?: string;
}
export interface ParsedBundleId {
  style: string;
  lot: string;
  color: string;
  size: string;
  bundleNumber: number;
  component: string;
}
export function generateBundleId(input: BundleIdInput): string;
export function parseBundleId(bundleId: string): ParsedBundleId | null;
export function generateQRPayload(bundleData: BundleIdInput & { article?: string; quantity?: number; totalPieces?: number; bundleId?: string }, opts?: object): string;
export function isValidBundleId(bundleId: string): boolean;
export const COMPONENT_CODES: Record<string, string>;
