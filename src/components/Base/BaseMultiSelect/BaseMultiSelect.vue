<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { ICON_NAMES } from '@/icons/constants/Icons';

import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

interface Option {
  value: string;
  label: string;
}

interface Props {
  modelValue: string[];
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const isOpen = ref(false);

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const toggleOption = (value: string) => {
  if (props.disabled) return;

  const newValue = props.modelValue.includes(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value];

  emit('update:modelValue', newValue);
};

const selectedLabels = computed(() => {
  return props.modelValue
    .map((value) => props.options.find((option) => option.value === value)?.label)
    .filter(Boolean)
    .join(', ');
});

const closeOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (!target.closest('.base-multi-select')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside);
});
</script>

<template>
  <div
    class="base-multi-select"
    :class="{
      'base-multi-select--disabled': disabled,
      'base-multi-select--error': error,
      'base-multi-select--open': isOpen,
    }"
  >
    <label v-if="label" class="base-multi-select__label">
      {{ label }}
    </label>

    <div class="base-multi-select__wrapper">
      <div class="base-multi-select__selected" @click="toggleDropdown">
        <span v-if="modelValue.length" class="base-multi-select__selected-text">
          {{ selectedLabels }}
        </span>

        <span v-else class="base-multi-select__placeholder">
          {{ placeholder }}
        </span>

        <BaseIcon
          :name="ICON_NAMES.CHEVRON_DOWN"
          class="base-multi-select__arrow"
          color="var(--text-color)"
          :class="{ 'base-multi-select__arrow--open': isOpen }"
          :size="14"
        />
      </div>

      <div v-show="isOpen" class="base-multi-select__options">
        <button
          v-for="option in options"
          :key="option.value"
          class="base-multi-select__option"
          :class="{
            'base-multi-select__option--selected': modelValue.includes(option.value),
          }"
          type="button"
          @click="toggleOption(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <span v-if="error" class="base-multi-select__error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped src="./BaseMultiSelect.scss" />
