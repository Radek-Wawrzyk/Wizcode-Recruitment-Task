<script setup lang="ts">
import AlbumTilesList from '@/components/Album/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';
import AppLoader from '@/components/App/AppLoader/AppLoader.vue';
import BaseButton from '@/components/Base/BaseButton/BaseButton.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';

const { topAlbums, isLoading } = useTopAlbums(10);
const { favoriteAlbums } = useFavoriteAlbums();
</script>

<template>
  <div class="home-page">
    <div class="container">
      <app-header>
        <template #title>
          {{ $t('home.title') }}
        </template>
      </app-header>

      <section class="home-page-section" data-test="favorites-albums-section">
        <header class="home-page-section__header">
          <h2 class="home-page-section__title">{{ $t('home.favorites') }}</h2>
          <base-button size="small" to="/favorites" data-test="favorites-albums-section-button">{{
            $t('common.viewAll')
          }}</base-button>
        </header>

        <album-tiles-list
          :albums="favoriteAlbums"
          locked
          :empty-text="$t('favoritesAlbums.empty')"
        />
      </section>

      <section class="home-page-section" data-test="top-albums-section">
        <header class="home-page-section__header">
          <h2 class="home-page-section__title">{{ $t('home.topAlbums') }}</h2>
          <base-button size="small" to="/top-albums">{{ $t('common.viewAll') }}</base-button>
        </header>

        <AppLoader v-if="isLoading" />
        <AlbumTilesList v-else :albums="topAlbums" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HomePage.scss" />
