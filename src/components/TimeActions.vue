<template>
  <div class="time-actions time-table__time-actions">
    <button
      class="button time-actions__button"
      :class="classes"
      :disabled="disabled"
      @click="$emit('clear')">
      Clear
    </button>
    <button
      class="button time-actions__button"
      :class="classes"
      :disabled="disabled"
      @click="$emit('save')">
      Save Changes
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const classes = computed(() => ({
  'time-actions__button--ghost': props.disabled,
  'time-actions__button--solid': !props.disabled,
  'time-actions__button--disabled': props.disabled,
}));

const props = defineProps<{ disabled: boolean }>();
</script>

<style scoped lang="scss">
.time-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-top: 14px;

  &__button--ghost {
    background: var(--btn-disabled-bg);
    color: #fff;
  }

  &__button--solid {
    background: var(--btn-active-bg);
    color: #fff;
  }

  &__button--disabled {
    cursor: not-allowed;
  }
}
</style>
