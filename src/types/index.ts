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
