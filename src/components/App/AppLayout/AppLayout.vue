<script setup lang="ts">
import AppSidebar from '@/components/App/AppSidebar/AppSidebar.vue';
import AppTopNavigation from '@/components/App/AppTopNavigation/AppTopNavigation.vue';
</script>

<template>
  <div class="app-layout">
    <app-sidebar />
    <app-top-navigation />

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped src="./AppLayout.scss" />
