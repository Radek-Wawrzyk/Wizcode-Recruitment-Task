<script setup lang="ts">
import AppThemeSwitcher from '@/components/App/AppThemeSwitcher/AppThemeSwitcher.vue';
import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

import { useLayout } from '@/composables/useLayout';
import { ICON_NAMES } from '@/icons/constants/Icons';

const { toggleSidebar } = useLayout();
</script>

<template>
  <header class="app-top-navigation">
    <div class="app-top-navigation__left">
      <button class="app-top-navigation__button" @click="toggleSidebar">
        <base-icon :name="ICON_NAMES.HAMBURGER" color="var(--text-color)" :size="18" />
      </button>
    </div>

    <div class="app-top-navigation__actions">
      <app-theme-switcher />
    </div>
  </header>
</template>

<style lang="scss" scoped src="./AppTopNavigation.scss" />
