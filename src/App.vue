<script setup lang="ts">
import { ref } from 'vue';
import dataJson from './data/index.json';
import type { ScheduleValue } from './types';
import ScheduleTable from '@/components/TimeTable.vue';

const data = ref<ScheduleValue>(dataJson);

const saveChanges = (val: ScheduleValue) => {
  data.value = val;
};
</script>

<template>
  <ScheduleTable
    :value="data"
    @save="saveChanges" />

  <div style="background-color: black; padding: 12px; margin-top: 20px">
    <h2>JSON</h2>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<style scoped></style>
