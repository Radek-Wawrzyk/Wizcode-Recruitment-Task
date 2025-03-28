<script setup lang="ts">
import AlbumTile from '@/components/Album/AlbumTile/AlbumTile.vue';
import type { Album } from '@/types/Album.type';

defineProps<{
  albums: Album[];
  locked?: boolean;
  emptyText?: string;
}>();
</script>

<template>
  <transition-group name="album-tiles" class="album-tiles-list" tag="ul" appear>
    <album-tile v-for="album in albums" :key="album.id" :album="album" :locked="locked" />
  </transition-group>

  <div v-if="!albums.length" class="album-tiles-list__empty">
    <p class="album-tiles-list__empty-text">
      {{ emptyText }}
    </p>
  </div>
</template>

<style lang="scss" scoped src="./AlbumTilesList.scss" />
