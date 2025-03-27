import { albumsService } from '@/api/services/albums';
import { useQuery } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/constants/Queries';
import { computed, ref } from 'vue';
import type { RawAlbum } from '@/types/Album.type';
import { ALBUMS_LIMIT, ALBUMS_SEARCH_DEBOUNCE } from '@/constants/Albums';
import { debounce } from 'es-toolkit';

const useTopAlbums = (limit: number = ALBUMS_LIMIT) => {
  const searchQuery = ref('');

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.TOP_ALBUMS],
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

  const topAlbums = computed(() => mappedTopAlbums(data.value?.feed.entry ?? []));

  const filteredAlbums = computed(() => {
    if (!topAlbums.value) return [];

    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return topAlbums.value;

    return topAlbums.value.filter((album) => {
      const searchableFields = [album.name, album.artistName];
      return searchableFields.some((field) => field.toLowerCase().includes(query));
    });
  });

  const updateSearch = debounce((value: string) => {
    searchQuery.value = value;
  }, ALBUMS_SEARCH_DEBOUNCE);

  return {
    topAlbums,
    filteredAlbums,
    isLoading,
    error,
    searchQuery,
    updateSearch,
  };
};

export { useTopAlbums };
