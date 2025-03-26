<script setup lang="ts">
import { useTopAlbums } from '@/composables/useTopAlbums';

const { topAlbums, isLoading, error } = useTopAlbums();
</script>

<template>
  <main>
    <h1>Top Albums</h1>
    <ul v-if="!isLoading && topAlbums">
      <li v-for="album in topAlbums" :key="album.id?.attributes?.['im:id']">
        <h2>{{ album.name }}</h2>
      </li>
    </ul>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
  </main>
</template>
