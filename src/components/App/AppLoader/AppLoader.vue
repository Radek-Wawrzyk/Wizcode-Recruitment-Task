<script setup lang="ts">
withDefaults(
  defineProps<{
    fullscreen?: boolean;
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    fullscreen: false,
    size: 'small',
  },
);
</script>

<template>
  <div
    class="app-loader"
    :class="{
      'app-loader--fullscreen': fullscreen,
      [`app-loader--${size}`]: size,
    }"
  >
    <svg class="app-loader__circular" viewBox="25 25 50 50">
      <circle
        class="app-loader__path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="3"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped src="./AppLoader.scss" />
