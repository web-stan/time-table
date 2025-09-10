<template>
  <div class="days-row time-table__days-row">
    <div
      class="days-row__label"
      :class="{ checked: checked }">
      {{ day.label }}
    </div>
    <button
      type="button"
      class="days-row__allday"
      :class="{ checked: checked }"
      @click="toggleAllDay(day.key)">
      <svg
        class="days-row__allday-check"
        viewBox="0 0 20 20"
        aria-hidden="true">
        <circle
          cx="10"
          cy="10"
          r="9" />
        <polyline points="5.5,10.5 8.7,13.8 14.7,6.8" />
      </svg>
    </button>

    <div class="days-row__track">
      <div
        class="days-row__track-interactive"
        @mousedown.left="onRowMouseDown"
        @mouseover="onRowMouseOver"
        @click.prevent="onRowClick">
        <div
          v-for="h in 24"
          :key="h"
          class="days-row__track-cell"
          :class="{ iselected: grid[h - 1] }"
          :data-hour="h - 1"
          :data-day="day.key"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Day, EmitDaysActions } from '@/types';
import { useDaysActions } from '@/composable/useDaysActions';

const props = defineProps<{
  day: Day;
  grid: boolean[];
}>();

const emit = defineEmits<EmitDaysActions>();

const { onRowMouseDown, onRowMouseOver, onRowClick, toggleAllDay } = useDaysActions(emit);

const checked = computed(() => {
  return props.grid.every(Boolean);
});
</script>
<style lang="scss" scoped>
.days-row {
  height: var(--row-height);
  display: grid;
  grid-template-columns: var(--label-width) var(--allday-width) 1fr;
  align-items: stretch;
  border-bottom: 1px solid #dfe2e5;

  &:first-child {
    border-top: 1px solid #dfe2e5;
  }

  &__label {
    display: grid;
    place-items: center;
    background: var(--label-bg);
    color: var(--label-tx);
    font-weight: 600;
    border-right: none;

    &.checked {
      background: var(--block);
    }
  }

  &__allday {
    background: var(--allday-bg);
    border: 0;
    border-right: none;
    position: relative;
    cursor: pointer;

    &-check {
      width: 18px;
      height: 18px;
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;

      circle {
        fill: none;
        stroke: #fff;
        stroke-width: 1.5;
      }

      polyline {
        fill: none;
        stroke: #fff;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }
    }

    &.checked {
      background: var(--allday-bg-on);

      .days-row__allday-check {
        opacity: 1;
      }
    }
  }

  &__track {
    &-interactive {
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      height: 100%;
    }
    &-cell {
      background: transparent;
      transition: background 0.12s;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      &.iselected {
        background: var(--block);
      }

      &:not(:first-child) {
        border-left: 1px solid var(--grid);
      }
    }
  }
}
</style>
