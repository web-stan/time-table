<template>
  <section
    class="time-table"
    @mouseup="onMouseUp">
    <h3 class="time-table__title">Select Time</h3>

    <TimeLine :time-zones />

    <div class="time-table__body">
      <TimeRowDays
        v-for="day in days"
        :key="day.key"
        :day="day"
        :grid="grid[day.key]"
        @leave-track="onTrackLeave"
        @cell-down="onCellDown"
        @cell-over="onCellOver"
        @cell-click="onCellClick"
        @toggle-all-day="toggleAllDay" />
    </div>

    <TimeActions
      :disabled="isAllCellsEmpty"
      @clear="clearAll"
      @save="save" />
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';

import TimeLine from '@/components/TimeLine.vue';
import TimeRowDays from '@/components/TimeDaysRow.vue';
import TimeActions from '@/components/TimeActions.vue';

import type { Day, Grid, ScheduleValue, TimeZone } from '@/types';
import { applyJson, buildJson } from '@/utils';
import { useCellsFilling } from '@/composable/useCellsFilling';

const props = defineProps<{ value: ScheduleValue }>();
const emit = defineEmits<{ (e: 'save', payload: ScheduleValue): void }>();

const data = ref<ScheduleValue>(props.value);

const days: Day[] = [
  { key: 'mo', label: 'MO' },
  { key: 'tu', label: 'TU' },
  { key: 'we', label: 'WE' },
  { key: 'th', label: 'TH' },
  { key: 'fr', label: 'FR' },
  { key: 'sa', label: 'SA' },
  { key: 'su', label: 'SU' },
];

const timeZones: TimeZone[] = [
  { label: '00:00' },
  { label: '03:00' },
  { label: '06:00' },
  { label: '09:00' },
  { label: '12:00' },
  { label: '15:00' },
  { label: '18:00' },
  { label: '21:00' },
];

const grid = reactive<Grid>(
  Object.fromEntries(days.map((d) => [d.key, Array(24).fill(false)])) as Grid,
);

const {
  onCellDown,
  onCellOver,
  onMouseUp,
  onTrackLeave,
  onCellClick,
  toggleAllDay,
  isAllCellsEmpty,
} = useCellsFilling(grid);

watch(
  () => data.value,
  (updatedData) => applyJson(updatedData, days, grid),

  { immediate: true, deep: true },
);

function save(): void {
  const json = buildJson(days, grid);
  emit('save', json);
}
function clearAll(): void {
  for (const d of days) grid[d.key] = Array(24).fill(false);
  const json = buildJson(days, grid);
  emit('save', json);
}
</script>

<style scoped lang="scss">
.time-table {
  background: #fff;
  padding: 14px 0 16px;
  user-select: none;
  width: calc(var(--label-width) + var(--allday-width) + (24 * 18px));

  &__title {
    margin: 0 0 8px 6px;
    font-size: 13px;
    letter-spacing: 0.02em;
    color: var(--title);
    font-weight: 600;
    text-transform: uppercase;
  }

  &__body {
    border-left: 1px solid var(--grid);
    border-right: 1px solid var(--grid);
  }
}
</style>
