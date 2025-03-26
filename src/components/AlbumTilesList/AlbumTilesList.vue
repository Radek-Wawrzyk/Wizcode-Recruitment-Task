<script setup lang="ts">
import AlbumTile from '@/components/AlbumTile/AlbumTile.vue';
import type { Album } from '@/types/Album.type';

defineProps<{
  albums: Album[];
}>();
</script>

<template>
  <ul class="album-tiles-list">
    <AlbumTile v-for="album in albums" :key="album.id" :album="album" />
  </ul>
</template>

<style lang="scss" scoped src="./AlbumTilesList.scss" />
