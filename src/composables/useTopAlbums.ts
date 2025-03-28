import { albumsService } from '@/api/services/albums';
import { useQuery } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/constants/Queries';
import { computed, ref } from 'vue';
import type { RawAlbum } from '@/types/Album.type';
import { ALBUMS_LIMIT, ALBUMS_SEARCH_DEBOUNCE } from '@/constants/Albums';
import { debounce, cloneDeep } from 'es-toolkit';

const useTopAlbums = (limit: number = ALBUMS_LIMIT) => {
  const searchQuery = ref('');
  const selectedCategories = ref<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: [`${QUERY_KEYS.TOP_ALBUMS}-${limit}`],
    queryFn: () => albumsService.getTopAlbums(limit),
  });

  const mappedTopAlbums = (albums: RawAlbum[]) => {
    return albums.map((album) => ({
      id: album.id.attributes['im:id'],
      name: album['im:name'].label,
      url: album.link.attributes.href,
      image: album['im:image'][2].label,
      artistName: album['im:artist'].label,
      price: {
        amount: album['im:price'].label,
        currency: album['im:price'].attributes.currency,
      },
      tracksNumber: album['im:itemCount'].label,
      releaseDate: new Date(album['im:releaseDate'].label),
      category: {
        id: album.category.attributes['im:id'],
        name: album.category.attributes.label,
      },
    }));
  };

  const albumsCategories = computed(() => {
    if (!topAlbums.value) return [];
    const categoriesMap = new Map();

    topAlbums.value.forEach((album) => {
      if (!categoriesMap.has(album.category.id)) {
        categoriesMap.set(album.category.id, {
          value: album.category.id,
          label: album.category.name,
        });
      }
    });

    return Array.from(categoriesMap.values());
  });

  const topAlbums = computed(() => mappedTopAlbums(data.value?.feed.entry ?? []));

  const filteredAlbums = computed(() => {
    if (!topAlbums.value) return [];
    let filtered = cloneDeep(topAlbums.value);

    const query = searchQuery.value.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter((album) => {
        const searchableFields = [album.name, album.artistName];
        return searchableFields.some((field) => field.toLowerCase().includes(query));
      });
    }

    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter((album) => selectedCategories.value.includes(album.category.id));
    }

    return filtered;
  });

  const updateSearch = debounce((value: string) => {
    searchQuery.value = value;
  }, ALBUMS_SEARCH_DEBOUNCE);

  const updateCategories = (categories: string[]) => {
    selectedCategories.value = categories;
  };

  return {
    topAlbums,
    filteredAlbums,
    isLoading,
    error,
    searchQuery,
    updateSearch,
    albumsCategories,
    selectedCategories,
    updateCategories,
  };
};

export { useTopAlbums };
