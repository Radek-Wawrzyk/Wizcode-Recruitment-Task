<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
  image: string;
  name: string;
  artist: string;
  releaseDate: Date;
}>();

const albumReleaseYear = computed(() => dayjs(props.releaseDate).year());
</script>

<template>
  <li class="album-tile">
    <div class="album-tile__image">
      <img :src="image" :alt="name" class="album-tile__image-inner" />
    </div>

    <div class="album-tile__content">
      <h3 class="album-tile__title">{{ name }}</h3>
      <p class="album-tile__artist">{{ artist }}</p>
      <p class="album-tile__release-year">{{ albumReleaseYear }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped src="./AlbumTile.scss" />
