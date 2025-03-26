<script setup lang="ts">
import AppThemeSwitcher from '@/components/App/AppThemeSwitcher/AppThemeSwitcher.vue';
</script>

<template>
  <header class="app-top-navigation">
    <div class="app-top-navigation__left"></div>

    <div class="app-top-navigation__actions">
      <app-theme-switcher />
    </div>
  </header>
</template>

<style lang="scss" scoped src="./AppTopNavigation.scss" />
