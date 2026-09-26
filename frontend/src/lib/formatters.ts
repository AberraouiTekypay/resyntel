/**
 * Centralized Currency and Metrics Formatter for Resource Intelligence
 * STRICT REQUIREMENT: Localized exclusively for Morocco.
 * All monetary outputs must use MAD. Never EUR, USD, GBP, or symbols.
 */

export interface FormatMADOptions {
  compact?: boolean;
  perYear?: boolean;
  decimals?: number;
  suffix?: string;
}

export function formatMAD(value: number | null | undefined, options: FormatMADOptions = {}): string {
  if (value === null || value === undefined || isNaN(value)) {
    return `0 MAD`;
  }

  const { compact = false, perYear = false, decimals = 0, suffix } = options;

  let formattedNumber: string;

  if (compact && Math.abs(value) >= 1_000_000) {
    formattedNumber = `${(value / 1_000_000).toFixed(decimals > 0 ? decimals : 2)}M`;
  } else if (compact && Math.abs(value) >= 100_000) {
    formattedNumber = `${(value / 1_000).toFixed(decimals > 0 ? decimals : 0)}k`;
  } else {
    formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  let result = `${formattedNumber} MAD`;

  if (perYear) {
    result += ` / year`;
  } else if (suffix) {
    result += ` ${suffix}`;
  }

  return result;
}

export function formatNumber(value: number | null | undefined, decimals = 0): string {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number | null | undefined, includeSign = true): string {
  if (value === null || value === undefined || isNaN(value)) return '0.0%';
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatPayback(months: number | null | undefined): string {
  if (months === null || months === undefined || isNaN(months)) return 'Immediate';
  if (months < 1) return `${(months * 30).toFixed(0)} days`;
  return `${months.toFixed(1)} months`;
}
