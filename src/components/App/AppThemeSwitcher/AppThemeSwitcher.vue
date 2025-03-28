<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';
import { ICON_NAMES } from '@/icons/constants/Icons';

import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <button
    v-tippy="{
      content: isDarkMode ? $t('theme.light') : $t('theme.dark'),
    }"
    class="app-theme-switcher"
    :class="{ 'app-theme-switcher--dark': isDarkMode }"
    @click="toggleDarkMode"
  >
    <div class="app-theme-switcher__track"></div>
    <div class="app-theme-switcher__thumb">
      <base-icon
        :name="isDarkMode ? ICON_NAMES.MOON : ICON_NAMES.SUN"
        :size="14"
        color="var(--color-text-inverse)"
      />
    </div>
  </button>
</template>

<style lang="scss" scoped src="./AppThemeSwitcher.scss"></style>
