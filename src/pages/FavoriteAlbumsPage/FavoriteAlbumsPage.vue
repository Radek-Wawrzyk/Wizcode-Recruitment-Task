<script setup lang="ts">
import AlbumTilesList from '@/components/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';

import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';

const { favoriteAlbums } = useFavoriteAlbums();
</script>

<template>
  <div class="favorites-albums-page">
    <app-header>
      <template #title>
        {{ $t('favoritesAlbums.title') }}
      </template>
    </app-header>

    <AlbumTilesList :albums="favoriteAlbums" />
  </div>
</template>
