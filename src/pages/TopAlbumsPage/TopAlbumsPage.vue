<script setup lang="ts">
import AlbumTile from '@/components/AlbumTile/AlbumTile.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { topAlbums, isLoading } = useTopAlbums();
</script>

<template>
  <div class="top-albums container">
    <header class="top-albums-header">
      <h1 class="top-albums-header__title">{{ t('topAlbums.title') }}</h1>
    </header>

    <section class="top-albums-content">
      <ul v-if="!isLoading && topAlbums" class="top-albums-content__list">
        <AlbumTile
          v-for="album in topAlbums"
          :key="album.id"
          :image="album.image"
          :name="album.name"
          :artist="album.artistName"
          :release-date="album.releaseDate"
        />
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped src="./TopAlbumsPage.scss" />
