import type { DayKey, EmitDaysActions } from '@/types';

export const useDaysActions = (emit: EmitDaysActions) => {
  function getCellData(e: Event): { day: DayKey; hour: number } | null {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>('.days-row__track-cell');
    if (!target) return null;

    const day = target.dataset.day as DayKey;
    const hour = +target.dataset.hour! as number;

    return { day, hour };
  }

  function onRowMouseDown(e: MouseEvent) {
    const cell = getCellData(e);
    if (!cell) return;
    cellDown(cell.day, cell.hour);
  }

  function onRowMouseOver(e: MouseEvent) {
    const cell = getCellData(e);
    if (!cell) return;
    cellOver(cell.day, cell.hour);
  }

  function onRowClick(e: MouseEvent) {
    const cell = getCellData(e);
    if (!cell) return;
    cellClick(cell.day, cell.hour);
  }

  function toggleAllDay(dayKey: DayKey) {
    emit('toggle-all-day', dayKey);
  }

  function cellDown(dayKey: DayKey, hour: number) {
    emit('cell-down', dayKey, hour);
  }

  function cellOver(dayKey: DayKey, hour: number) {
    emit('cell-over', dayKey, hour);
  }

  function cellClick(dayKey: DayKey, hour: number) {
    emit('cell-click', dayKey, hour);
  }

  return {
    onRowMouseDown,
    onRowMouseOver,
    onRowClick,
    toggleAllDay,
  };
};
