<script setup lang="ts">
import AlbumTilesList from '@/components/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { topAlbums } = useTopAlbums();
</script>

<template>
  <div class="top-albums">
    <div class="container">
      <app-header>
        <template #title>
          {{ t('topAlbums.title') }}
        </template>
      </app-header>

      <section class="top-albums-content">
        <AlbumTilesList :albums="topAlbums" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./TopAlbumsPage.scss" />
