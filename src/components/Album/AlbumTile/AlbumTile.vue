<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementOverflow } from '@/composables/useElementOverflow';
import { useFavoriteAlbums } from '@/composables/useFavoriteAlbums';
import { useImageLazyLoad } from '@/composables/useImageLazyLoad';
import type { Album } from '@/types/Album.type';
import { ICON } from '@/icons';

import dayjs from 'dayjs';
import BaseIcon from '@/components/Base/BaseIcon/BaseIcon.vue';

const props = defineProps<{
  album: Album;
  locked?: boolean;
}>();

const albumReleaseYear = computed(() => dayjs(props.album.releaseDate).year());
const titleRef = ref<HTMLElement>();
const artistRef = ref<HTMLElement>();

const { isXOverflowing: isTitleOverflowing } = useElementOverflow(titleRef);
const { isXOverflowing: isArtistOverflowing } = useElementOverflow(artistRef);
const { isFavorite, addToFavorites, removeFromFavorites } = useFavoriteAlbums();
const { imageRef, isLoaded, isError } = useImageLazyLoad();

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
      <div v-if="!isLoaded && !isError" class="album-tile__image-placeholder">
        <BaseIcon :name="ICON.MUSIC" :size="48" color="var(--border-color)" />
      </div>

      <img
        ref="imageRef"
        :data-src="album.image"
        :alt="album.name"
        class="album-tile__image-inner"
        :class="{ 'album-tile__image-inner--visible': isLoaded }"
      />

      <div v-if="isError" class="album-tile__image-error">
        <BaseIcon :name="ICON.MUSIC" :size="48" color="var(--color-error)" />
      </div>

      <p class="album-tile__price">{{ album.price.amount }} {{ album.price.currency }}</p>

      <button v-if="!locked" class="album-tile__favorite-button" @click="onFavoriteClick">
        <base-icon
          :name="isFavorite(album.id) ? 'heart-filled' : 'heart'"
          :color="isFavorite(album.id) ? 'red' : 'white'"
          :size="24"
        />
      </button>

      <div
        v-tippy="{ content: $t('album.tracks', { count: album.tracksNumber }) }"
        class="album-tile__tracks"
      >
        <base-icon :name="ICON.DISK" :size="12" color="var(--text-color-white)" />
        <span class="album-tile__tracks-number">{{ album.tracksNumber }}</span>
      </div>
    </div>

    <div class="album-tile__content">
      <h3
        ref="titleRef"
        v-tippy="{ content: isTitleOverflowing ? album.name : null }"
        class="album-tile__title"
      >
        {{ album.name }}
      </h3>

      <p
        ref="artistRef"
        v-tippy="{ content: isArtistOverflowing ? album.artistName : null }"
        class="album-tile__artist"
      >
        {{ album.artistName }}
      </p>

      <p class="album-tile__release-year">{{ albumReleaseYear }}</p>
    </div>
  </li>
</template>

<style lang="scss" scoped src="./AlbumTile.scss" />
