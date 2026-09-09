import type { Period, YearMonth } from "@/data/resume.types";

/** `"2024-04"` → `"2024.04"` */
export function formatYearMonth(ym: YearMonth): string {
  return ym.replace("-", ".");
}

function parse(ym: YearMonth): { year: number; month: number } {
  const [year, month] = ym.split("-");
  return { year: Number(year), month: Number(month) };
}

/**
 * `"2024.04 – 현재"` · `"2026.02 – 2026.06"` · `"2026.07"`
 *
 * 시작과 끝이 같은 달이면 한 번만 쓴다. `end`가 없으면 진행 중이다.
 */
export function formatPeriod(period: Period, ongoingLabel = "현재"): string {
  const start = formatYearMonth(period.start);
  if (!period.end) return `${start} – ${ongoingLabel}`;
  if (period.end === period.start) return start;
  return `${start} – ${formatYearMonth(period.end)}`;
}

/**
 * `"2년 10개월"` — 시작한 달과 끝난 달을 모두 포함해 센다.
 *
 * 진행 중인 기간은 `now` 기준으로 계산하므로 값이 시간에 따라 바뀐다.
 * **서버 컴포넌트에서만 쓴다.** 클라이언트에서 부르면 달이 바뀌는 순간
 * 서버 HTML과 값이 어긋나 하이드레이션 불일치가 난다.
 */
export function formatDuration(period: Period, now = new Date()): string {
  const from = parse(period.start);
  const to = period.end
    ? parse(period.end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };

  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  if (months <= 0) return "";

  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years && rest) return `${years}년 ${rest}개월`;
  if (years) return `${years}년`;
  return `${rest}개월`;
}

/** 진행 중인지. `formatPeriod`의 "현재" 표기와 같은 판정을 쓴다. */
export function isOngoing(period: Period): boolean {
  return period.end === undefined;
}
