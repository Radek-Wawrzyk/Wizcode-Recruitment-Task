<script setup lang="ts">
import AlbumTile from '@/components/Album/AlbumTile/AlbumTile.vue';
import type { Album } from '@/types/Album.type';

defineProps<{
  albums: Album[];
  locked?: boolean;
}>();
</script>

<template>
  <transition-group name="album-tiles" class="album-tiles-list" tag="ul" appear>
    <album-tile v-for="album in albums" :key="album.id" :album="album" :locked="locked" />
  </transition-group>
</template>

<style lang="scss" scoped src="./AlbumTilesList.scss" />
