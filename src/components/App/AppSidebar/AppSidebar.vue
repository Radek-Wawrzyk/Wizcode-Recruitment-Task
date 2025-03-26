<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ROUTES } from '@/constants/Routing';
import { ICON_NAMES } from '@/icons/constants/Icons';

import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const { t } = useI18n();

const menuItems = [
  { name: t('sidebar.home'), path: ROUTES.HOME.path, icon: ICON_NAMES.HOME },
  { name: t('sidebar.topAlbums'), path: ROUTES.TOP_ALBUMS.path, icon: ICON_NAMES.MUSIC },
  { name: t('sidebar.favorites'), path: ROUTES.FAVORITES.path, icon: ICON_NAMES.HEART },
];
</script>

<template>
  <aside class="app-sidebar">
    <header class="app-sidebar-header">
      <h3 class="app-sidebar-header__app-name">Find my album</h3>
    </header>

    <nav class="app-sidebar-nav">
      <ul class="app-sidebar-nav__list">
        <li v-for="item in menuItems" :key="item.path" class="app-sidebar-nav__item">
          <router-link :to="item.path" class="app-sidebar-nav__link">
            <BaseIcon :name="item.icon" :size="16" color="var(--text-color-sidebar)" />
            <span class="app-sidebar-nav__link-text">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped src="./AppSidebar.scss" />
