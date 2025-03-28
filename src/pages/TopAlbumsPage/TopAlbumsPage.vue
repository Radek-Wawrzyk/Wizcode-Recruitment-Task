<script setup lang="ts">
import AlbumTilesList from '@/components/Album/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';
import AppLoader from '@/components/App/AppLoader/AppLoader.vue';
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue';
import BaseMultiSelect from '@/components/Base/BaseMultiSelect/BaseMultiSelect.vue';

import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const {
  filteredAlbums,
  searchQuery,
  updateSearch,
  albumsCategories,
  selectedCategories,
  updateCategories,
  isLoading,
} = useTopAlbums();
</script>

<template>
  <div class="top-albums">
    <div class="container">
      <app-header>
        <template #title>
          {{ t('topAlbums.title') }}
        </template>

        <template #actions>
          <base-multi-select
            v-model="selectedCategories"
            :options="albumsCategories"
            :placeholder="$t('topAlbums.categories')"
            class="top-albums-multi-select"
            @update:model-value="updateCategories"
          />
        </template>
      </app-header>

      <section class="top-albums-search">
        <base-input
          :model-value="searchQuery"
          :placeholder="$t('topAlbums.search')"
          icon="search"
          @update:model-value="updateSearch"
        />
      </section>

      <section class="top-albums-content">
        <AppLoader v-if="isLoading" />
        <AlbumTilesList v-else :albums="filteredAlbums" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./TopAlbumsPage.scss" />
