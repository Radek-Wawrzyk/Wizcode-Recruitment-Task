<script setup lang="ts">
import AlbumTilesList from '@/components/AlbumTilesList/AlbumTilesList.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';

const { topAlbums } = useTopAlbums(10);
const { favoriteAlbums } = useFavoriteAlbums();
</script>

<template>
  <div class="home-page page">
    <div class="container">
      <header class="home-page-header">
        <h1 class="home-page-header__title">{{ $t('home.title') }}</h1>
      </header>

      <section class="home-page-section">
        <h2 class="home-page-section__title">{{ $t('home.topAlbums') }}</h2>
        <AlbumTilesList :albums="topAlbums" />
      </section>

      <section class="home-page-section">
        <h2 class="home-page-section__title">{{ $t('home.favorites') }}</h2>
        <AlbumTilesList :albums="favoriteAlbums" locked />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HomePage.scss" />
