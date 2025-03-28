<script setup lang="ts">
import { computed } from 'vue';
import type { RouterLinkProps } from 'vue-router';
import type { IconName } from '@/icons';

import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    leftIcon?: IconName;
    rightIcon?: IconName;
    to?: string | RouterLinkProps['to'];
  }>(),
  {
    type: 'primary',
    size: 'medium',
    disabled: false,
  },
);

const componentType = computed(() => (props.to ? 'RouterLink' : 'button'));

const buttonClasses = computed(() => ({
  'base-button': true,
  'base-button--disabled': props.disabled,
  'base-button--with-left-icon': !!props.leftIcon,
  'base-button--with-right-icon': !!props.rightIcon,
  [`base-button--${props.type}`]: true,
  [`base-button--${props.size}`]: true,
}));
</script>

<template>
  <component
    :is="componentType"
    :class="buttonClasses"
    :disabled="disabled"
    :to="componentType === 'RouterLink' ? props.to : undefined"
  >
    <span v-if="leftIcon" class="base-button__icon base-button__icon--left">
      <BaseIcon :name="leftIcon" />
    </span>

    <span class="base-button__content">
      <slot></slot>
    </span>

    <span v-if="rightIcon" class="base-button__icon base-button__icon--right">
      <BaseIcon :name="rightIcon" />
    </span>
  </component>
</template>

<style lang="scss" scoped src="./BaseButton.scss" />
