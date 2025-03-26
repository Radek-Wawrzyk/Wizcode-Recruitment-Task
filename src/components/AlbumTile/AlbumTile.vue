<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementOverflow } from '@/composables/useElementOverflow';
import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';
import type { Album } from '@/types/Album.type';

import dayjs from 'dayjs';
import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const props = defineProps<{
  album: Album;
}>();

const albumReleaseYear = computed(() => dayjs(props.album.releaseDate).year());
const titleRef = ref<HTMLElement>();

const { isXOverflowing } = useElementOverflow(titleRef);
const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteAlbums();

const onFavoriteClick = () => {
  if (isFavorite(props.album.id)) {
    removeFromFavorites(props.album.id);
  } else {
    addToFavorites(props.album);
  }
};
</script>

<template>
  <li class="album-tile">
    <div class="album-tile__image">
      <img :src="album.image" :alt="album.name" class="album-tile__image-inner" />

      <button class="album-tile__favorite-button" @click="onFavoriteClick">
        <BaseIcon
          :name="isFavorite(album.id) ? 'heart-filled' : 'heart'"
          :color="isFavorite(album.id) ? 'red' : 'white'"
          :size="24"
        />
      </button>
    </div>

    <div class="album-tile__content">
      <h3
        ref="titleRef"
        v-tippy="{ content: isXOverflowing ? album.name : null }"
        class="album-tile__title"
      >
        {{ album.name }}
      </h3>

      <p class="album-tile__artist">{{ album.artistName }}</p>
      <p class="album-tile__release-year">{{ albumReleaseYear }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped src="./AlbumTile.scss" />
