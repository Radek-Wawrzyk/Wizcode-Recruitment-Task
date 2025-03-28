<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/constants/Routing';
import { ICON } from '@/icons';
import { useLayout } from '@/composables/useLayout';

import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const { t } = useI18n();

const menuItems = [
  { name: t('sidebar.home'), path: ROUTES.HOME.path, icon: ICON.HOME },
  { name: t('sidebar.topAlbums'), path: ROUTES.TOP_ALBUMS.path, icon: ICON.MUSIC },
  { name: t('sidebar.favorites'), path: ROUTES.FAVORITES.path, icon: ICON.HEART },
];

const { isSidebarOpen, toggleSidebar } = useLayout();
</script>

<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--is-active': isSidebarOpen }">
    <header class="app-sidebar-header">
      <h3 class="app-sidebar-header__app-name">Find my album</h3>

      <button class="app-sidebar-header__button" @click="toggleSidebar">
        <BaseIcon :name="ICON.CLOSE" :size="16" color="var(--text-color-sidebar)" />
      </button>
    </header>

    <nav class="app-sidebar-nav">
      <ul class="app-sidebar-nav__list">
        <li v-for="item in menuItems" :key="item.path" class="app-sidebar-nav__item">
          <router-link :to="item.path" class="app-sidebar-nav__link" @click="toggleSidebar">
            <base-icon :name="item.icon" :size="16" color="var(--text-color-sidebar)" />
            <span class="app-sidebar-nav__link-text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>

  <div
    class="app-sidebar-overlay"
    :class="{ 'app-sidebar-overlay--is-active': isSidebarOpen }"
    @click="toggleSidebar"
  ></div>
</template>

<style lang="scss" scoped src="./AppSidebar.scss" />
