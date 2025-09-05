<template>
  <div class="time-line time-table__time-line">
    <div
      class="time-line__daylabel-spacer"
      aria-hidden="true"></div>
    <div class="time-line__allday">
      <span>ALL<br />DAY</span>
    </div>
    <div class="time-line__zones">
      <div
        v-for="zone in timeZones"
        :key="zone.label"
        class="time-line__zone">
        <span class="time-line__zone-label">{{ zone.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimeZone } from '@/types';

defineProps<{ timeZones: TimeZone[] }>();
</script>

<style scoped lang="scss">
.time-line {
  height: var(--row-height);
  position: relative;
  display: grid;
  grid-template-columns: var(--label-width) var(--allday-width) repeat(24, 18px);
  align-items: stretch;

  &__daylabel-spacer {
    background: transparent;
  }

  &__allday {
    display: grid;
    place-items: center;
    color: var(--label-tx);
    font-size: 10px;
    line-height: 1.05;
    text-transform: uppercase;
  }

  &__zones {
    grid-column: 3 / 27;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 1fr;
  }
  &__zone {
    position: relative;

    &::before {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      height: 10px;
      width: 1px;
      background-color: var(--block);
    }
  }

  &__zone-label {
    position: absolute;
    top: 6px;
    left: 0;
    font-size: 11px;
    color: var(--label-tx);
  }
}
</style>
