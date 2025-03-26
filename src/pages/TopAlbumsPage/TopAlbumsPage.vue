<script setup lang="ts">
import AlbumTilesList from '@/components/AlbumTilesList/AlbumTilesList.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { topAlbums } = useTopAlbums();
</script>

<template>
  <div class="top-albums">
    <div class="container">
      <header class="top-albums-header">
        <h1 class="top-albums-header__title">{{ t('topAlbums.title') }}</h1>
      </header>

      <section class="top-albums-content">
        <AlbumTilesList :albums="topAlbums" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./TopAlbumsPage.scss" />
