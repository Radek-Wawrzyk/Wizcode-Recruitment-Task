<script setup lang="ts">
import { albumsService } from '@/api/services/albums';
import { onMounted, ref } from 'vue';
import type { Album } from '@/types/Album.type';

const albums = ref<Album[]>([]);

onMounted(async () => {
  const { feed } = await albumsService.getTopAlbums();
  albums.value = feed.entry;
});
</script>

<template>
  <main>
    <ul>
      <li v-for="album in albums" :key="album.id.attributes['im:id']">
        <h2>{{ album.title.label }}</h2>
      </li>
    </ul>
  </main>
</template>
