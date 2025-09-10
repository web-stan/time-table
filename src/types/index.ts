export type DayKey = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su';
export interface Interval {
  bt: number;
  et: number;
}
export type ScheduleValue = Record<DayKey, Interval[]>;
export interface Day {
  key: DayKey;
  label: string;
}
export interface TimeZone {
  label: string;
}
export type Grid = Record<DayKey, boolean[]>;

export interface EmitDaysActions {
  (e: 'toggle-all-day', dayKey: DayKey): void;
  (e: 'cell-down', dayKey: DayKey, hour: number): void;
  (e: 'cell-over', dayKey: DayKey, hour: number): void;
  (e: 'cell-click', dayKey: DayKey, hour: number): void;
}
