<script setup lang="ts">
import AlbumTilesList from '@/components/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue';

import { ref, watch } from 'vue';
import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { filteredAlbums, updateSearch } = useTopAlbums();

const searchQuery = ref('');

watch(searchQuery, (newValue: string) => {
  updateSearch(newValue);
});
</script>

<template>
  <div class="top-albums">
    <div class="container">
      <app-header>
        <template #title>
          {{ t('topAlbums.title') }}
        </template>
      </app-header>

      <section class="top-albums-search">
        <base-input v-model="searchQuery" :placeholder="$t('topAlbums.search')" icon="search" />
      </section>

      <section class="top-albums-content">
        <AlbumTilesList :albums="filteredAlbums" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./TopAlbumsPage.scss" />
