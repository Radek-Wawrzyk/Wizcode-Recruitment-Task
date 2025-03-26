<script setup lang="ts">
import { useTopAlbums } from '@/composables/useTopAlbums';

const { topAlbums, isLoading, error } = useTopAlbums();
</script>

<template>
  <div>
    <h1>Top Albums page</h1>
    <ul v-if="!isLoading && topAlbums">
      <li v-for="album in topAlbums" :key="album.id">
        <h2>{{ album.name }}</h2>
      </li>
    </ul>
  </div>
</template>
