<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'pl' : 'en';
};
</script>

<template>
  <header class="app-top-navigation">
    <div class="app-top-navigation__left">
      <h1 class="app-top-navigation__title">{{ t('app.title') }}</h1>
    </div>

    <div class="app-top-navigation__right">
      <button class="app-top-navigation__action" @click="toggleLanguage">
        {{ locale.toUpperCase() }}
      </button>
      <button class="app-top-navigation__action">search</button>
      <button class="app-top-navigation__action">favorites</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-top-navigation {
  position: fixed;
  top: 0;
  right: 0;
  height: 64px;
  left: 250px;
  background-color: var(--background-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-large);
  z-index: 99;
  transition: left 0.3s ease;

  &.sidebar-collapsed {
    left: 70px;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
  }

  &__action {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    border-radius: var(--border-radius-medium);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--background-color-accent);
    }
  }
}
</style>
