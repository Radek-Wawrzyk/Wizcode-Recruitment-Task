<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';
import { ICON_NAMES } from '@/icons/constants/Icons';

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <button
    class="app-dark-mode-switcher"
    :aria-label="isDarkMode ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'"
    :title="isDarkMode ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny'"
    @click="toggleDarkMode"
  >
    <BaseIcon :name="isDarkMode ? 'sun' : 'moon'" :size="20" color="currentColor" />
  </button>
</template>

<style lang="scss" scoped src="./AppThemeSwitcher.scss" />
