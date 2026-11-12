export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getDayOfWeekShort(year, month, day, lang = 'en') {
  const langMap = { en: 'en-US', de: 'de-DE' };
  return new Date(year, month, day).toLocaleDateString(langMap[lang] || 'en-US', { weekday: 'short' });
}

export function pad(n) {
  return n.toString().padStart(2, '0');
}

export function getDateKey(year, month, day) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function getRandomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
}

export function formatDateDDMMYYYY(dateInput) {
  if (!dateInput) return '';
  if (typeof dateInput === 'string' && dateInput.includes('-')) {
    const parts = dateInput.split('-');
    if (parts.length >= 3) return `${pad(parts[2].substring(0, 2))}.${pad(parts[1])}.${parts[0]}`;
  }
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/**
 * Calculates net shift hours accounting for Swiss ArG break rules.
 */
export function calculateShiftDuration(timeStr) {
  if (!timeStr) return 0;
  const parts = timeStr.split(' - ');
  if (parts.length < 2) return 0;

  const [startH, startM] = parts[0].split(':').map(Number);
  const [endH, endM] = parts[1].split(':').map(Number);

  if ([startH, startM, endH, endM].some(isNaN)) return 0;

  const startTotal = startH + startM / 60;
  let endTotal = endH + endM / 60;
  if (endTotal <= startTotal) endTotal += 24;
  const rawDuration = endTotal - startTotal;

  let breakTime = 0;
  if (rawDuration > 9) breakTime = 1;
  else if (rawDuration > 7) breakTime = 0.75;
  else if (rawDuration > 5.5) breakTime = 0.25;

  return Math.max(0, rawDuration - breakTime);
}

/**
 * Normalize a dated employment-contract timeline, including legacy records.
 */
export function normalizeEmploymentHistory(history, fallbackPercentage = 100) {
  const fallbackNumber = Number(fallbackPercentage);
  const fallback = Number.isFinite(fallbackNumber) ? Math.min(100, Math.max(1, Math.round(fallbackNumber))) : 100;
  const byDate = new Map();
  (Array.isArray(history) ? history : []).forEach((entry) => {
    const effectiveFrom = String(entry?.effectiveFrom || '').trim();
    const percentage = Number(entry?.percentage);
    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(effectiveFrom)) return;
    const [year, month, day] = effectiveFrom.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (
      Number.isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) return;
    if (!Number.isFinite(percentage) || percentage < 1 || percentage > 100) return;
    byDate.set(effectiveFrom, { effectiveFrom, percentage: Math.round(percentage) });
  });
  const normalized = [...byDate.values()].sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));
  return normalized.length ? normalized : [{ effectiveFrom: '2000-01-01', percentage: fallback }];
}

/** Return the contract percentage in effect on a given YYYY-MM-DD date. */
export function getEmploymentPercentageForDate(member, dateInput) {
  const rawHistory = Array.isArray(member?.employmentHistory) ? member.employmentHistory : [];
  const history = normalizeEmploymentHistory(rawHistory, member?.employmentPercentage ?? 100);
  const dateKey = typeof dateInput === 'string'
    ? dateInput.slice(0, 10)
    : dateInput instanceof Date && !Number.isNaN(dateInput.getTime())
      ? getDateKey(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate())
      : '9999-12-31';

  // A dated contract must not apply before its effective date. Use 100% as the
  // neutral baseline before the first recorded change; legacy records are
  // normalized to a 2000-01-01 entry and therefore keep their saved percentage.
  if (rawHistory.length > 0 && dateKey < history[0].effectiveFrom) return 100;

  let percentage = history[0].percentage;
  for (const entry of history) {
    if (entry.effectiveFrom > dateKey) break;
    percentage = entry.percentage;
  }
  return percentage;
}

/** Average contract fraction in a month, weighted by calendar days. */
export function getMonthlyEmploymentFraction(member, year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  if (!daysInMonth) return 1;
  let totalFraction = 0;
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = String(year) + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    totalFraction += getEmploymentPercentageForDate(member, dateKey) / 100;
  }
  return totalFraction / daysInMonth;
}
export function check11HourRest(timeYesterday, timeToday) {
  if (!timeYesterday || !timeToday) return true;

  const yParts = timeYesterday.split(' - ');
  const tParts = timeToday.split(' - ');
  if (yParts.length < 2 || tParts.length < 2) return true;

  const [yStartStr, yEndStr] = yParts;
  const [tStartStr] = tParts;

  let yEndH = parseInt(yEndStr.split(':')[0]) + parseInt(yEndStr.split(':')[1]) / 60;
  let yStartH = parseInt(yStartStr.split(':')[0]) + parseInt(yStartStr.split(':')[1]) / 60;

  if ([yEndH, yStartH].some(isNaN)) return true;

  if (yEndH <= yStartH) yEndH += 24;

  let tStartH = parseInt(tStartStr.split(':')[0]) + parseInt(tStartStr.split(':')[1]) / 60;
  if (isNaN(tStartH)) return true;

  let restTime = (tStartH + 24) - yEndH;
  return restTime >= 11;
}

export const EVENT_COLORS = [
  { bg: '#f0fdfa', text: '#0f766e', name: 'Teal' },
  { bg: '#eff6ff', text: '#1d4ed8', name: 'Blue' },
  { bg: '#faf5ff', text: '#7e22ce', name: 'Purple' },
  { bg: '#fff7ed', text: '#c2410c', name: 'Orange' },
  { bg: '#fdf2f8', text: '#be185d', name: 'Pink' },
  { bg: '#f0fdf4', text: '#15803d', name: 'Green' },
  { bg: '#fefce8', text: '#a16207', name: 'Yellow' },
  { bg: '#fef2f2', text: '#b91c1c', name: 'Red' },
  { bg: '#f1f5f9', text: '#475569', name: 'Slate' },
  { bg: '#eef2ff', text: '#4338ca', name: 'Indigo' },
];

export const MEMBER_COLORS = [
  'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800', 'bg-teal-100 text-teal-800',
  'bg-indigo-100 text-indigo-800', 'bg-rose-100 text-rose-800'
];

export const DAY_NUMBERS = [1, 2, 3, 4, 5, 6, 0];
