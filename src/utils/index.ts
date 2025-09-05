import type { Reactive } from 'vue';
import type { Day, DayKey, Interval, ScheduleValue } from '../types';

export function applyJson(
  value: ScheduleValue,
  days: Day[],
  grid: Reactive<Record<DayKey, boolean[]>>,
): void {
  for (const day of days) {
    grid[day.key].fill(false);
    const intervals = value[day.key] || [];
    intervals.forEach(({ bt, et }) => {
      const start = Math.floor(bt / 60);
      const end = Math.floor(et / 60);
      for (let h = start; h <= end; h++) {
        grid[day.key][h] = true;
      }
    });
  }
}

export function buildJson(days: Day[], grid: Reactive<Record<DayKey, boolean[]>>): ScheduleValue {
  const result = {} as ScheduleValue;
  for (const day of days) {
    const arr: Interval[] = [];
    let start: number | null = null;
    for (let h = 0; h < 24; h++) {
      const selected = grid[day.key][h];
      if (selected && start === null) start = h;
      if ((!selected || h === 23) && start !== null) {
        const endH = selected ? h : h - 1;
        arr.push({ bt: start * 60, et: endH * 60 + 59 });
        start = null;
      }
    }
    result[day.key] = arr;
  }
  return result;
}
