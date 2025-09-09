import { computed, ref } from 'vue';
import type { DayKey, Grid } from '@/types';

export function useCellsFilling(grid: Grid) {
  const isMouseDown = ref(false);
  const dragDay = ref<string | null>(null);
  const lastHover = ref<number | null>(null);

  const isAllCellsEmpty = computed(() => Object.values(grid).every((arr) => arr.every((i) => !i)));

  function onCellDown(day: DayKey, hour: number) {
    if (!grid[day][hour]) {
      isMouseDown.value = true;
      dragDay.value = day;
      lastHover.value = hour;
    }
  }

  function onCellOver(day: DayKey, hour: number) {
    if (!isMouseDown.value || dragDay.value !== day || lastHover.value === null) return;

    if (hour > lastHover.value) {
      for (let h = lastHover.value; h <= hour; h++) {
        grid[day][h] = true;
      }
    } else if (hour < lastHover.value) {
      for (let h = hour; h <= lastHover.value; h++) {
        grid[day][h] = true;
      }
    }

    lastHover.value = hour;
  }

  function onTrackLeave(day: DayKey) {
    if (isMouseDown.value && dragDay.value === day) {
      onMouseUp();
    }
  }

  function onCellClick(day: DayKey, hour: number): void {
    grid[day][hour] = !grid[day][hour];
  }
  function toggleAllDay(day: DayKey): void {
    const all = grid[day].every(Boolean);
    grid[day] = Array(24).fill(!all);
  }

  function onMouseUp() {
    isMouseDown.value = false;
    dragDay.value = null;
    lastHover.value = null;
  }
  return {
    onCellDown,
    onCellOver,
    onMouseUp,
    onTrackLeave,
    onCellClick,
    toggleAllDay,
    isAllCellsEmpty,
  };
}
