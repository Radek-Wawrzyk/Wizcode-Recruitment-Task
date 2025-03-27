<script setup lang="ts">
import AlbumTilesList from '@/components/Album/AlbumTilesList/AlbumTilesList.vue';
import AppHeader from '@/components/App/AppHeader/AppHeader.vue';
import BaseInput from '@/components/Base/BaseInput/BaseInput.vue';
import BaseMultiSelect from '@/components/Base/BaseMultiSelect/BaseMultiSelect.vue';

import { ref, watch } from 'vue';
import { useTopAlbums } from '@/composables/useTopAlbums';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { filteredAlbums, updateSearch, albumsCategories, selectedCategories, updateCategories } =
  useTopAlbums();

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

        <template #actions>
          <base-multi-select
            v-model="selectedCategories"
            :options="albumsCategories"
            :placeholder="$t('topAlbums.categories')"
            @update:model-value="updateCategories"
          />
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
