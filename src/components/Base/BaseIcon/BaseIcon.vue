<script setup lang="ts">
import { computed } from 'vue';
import { iconsCollection, type IconName } from '@/icons';

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: string | number;
    color?: string;
  }>(),
  {
    size: 24,
    color: 'currentColor',
  },
);

const sizeStyle = computed(() => {
  if (!props.size) return undefined;

  const size = typeof props.size === 'number' ? `${props.size}px` : props.size;

  return {
    width: size,
    height: size,
  };
});

const colorStyle = computed(() => {
  if (!props.color) return undefined;

  return {
    color: props.color,
    fill: props.color,
  };
});

const svgContent = computed(() => iconsCollection[props.name]);
</script>

<template>
  <span class="base-icon" :style="{ ...sizeStyle, ...colorStyle }" v-html="svgContent" />
</template>

<style lang="scss" scoped src="./BaseIcon.scss" />
