<script setup lang="ts">
import { computed } from 'vue';
import type { IconName } from '@/icons/types/icon';
import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  icon?: IconName;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  error?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  placeholder: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2)}`);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div
    class="base-input"
    :class="{
      'base-input--with-icon': icon,
      'base-input--disabled': disabled,
      'base-input--error': error,
    }"
  >
    <label v-if="label" :for="inputId" class="base-input__label">
      {{ label }}
    </label>

    <div class="base-input__wrapper">
      <BaseIcon v-if="icon" :name="icon" class="base-input__icon" :size="16" />

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="base-input__field"
        @input="updateValue"
      />
    </div>

    <span v-if="error" class="base-input__error">
      {{ error }}
    </span>
  </div>
</template>

<style lang="scss" scoped src="./BaseInput.scss" />
