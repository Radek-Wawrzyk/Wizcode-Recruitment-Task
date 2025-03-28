<script setup lang="ts">
import AlbumTilesList from '@/components/Album/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';

import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';

const { favoriteAlbums } = useFavoriteAlbums();
</script>

<template>
  <div class="favorites-albums-page">
    <div class="container">
      <app-header>
        <template #title>
          {{ $t('favoritesAlbums.title') }}
        </template>
      </app-header>

      <album-tiles-list :albums="favoriteAlbums" :empty-text="$t('favoritesAlbums.empty')" />
    </div>
  </div>
</template>
