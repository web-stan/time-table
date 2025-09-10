import { computed, ref } from 'vue';
import type { DayKey, Grid } from '@/types';

export function useCellsFilling(grid: Grid) {
  const isMouseDown = ref(false);
  const isTouched = ref(false);

  const isAllCellsEmpty = computed(() => Object.values(grid).every((arr) => arr.every((i) => !i)));

  function onCellDown(day: DayKey, hour: number) {
    if (grid[day][hour]) return;

    if (!grid[day][hour]) {
      isMouseDown.value = true;
      grid[day][hour] = true;
      isTouched.value = true;
    }
  }

  function onCellOver(day: DayKey, hour: number) {
    if (!isMouseDown.value) return;
    grid[day][hour] = true;
    isTouched.value = false;
  }

  function onCellClick(day: DayKey, hour: number): void {
    if (isTouched.value) {
      isTouched.value = false;
      return;
    }

    grid[day][hour] = !grid[day][hour];
  }

  function toggleAllDay(day: DayKey): void {
    const all = grid[day].every(Boolean);
    grid[day] = Array(24).fill(!all);
  }

  function onTrackLeave() {
    if (isMouseDown.value) {
      onMouseUp();
    }
  }

  function onMouseUp() {
    isMouseDown.value = false;
  }

  return {
    onCellDown,
    onCellOver,
    onMouseUp,
    onCellClick,
    onTrackLeave,
    toggleAllDay,
    isAllCellsEmpty,
  };
}
