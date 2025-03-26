import { albumsService } from '@/api/services/albums';
import { useQuery } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/constants/Queries';
import { computed } from 'vue';
import type { RawAlbum } from '@/types/Album.type';
import { ALBUMS_LIMIT } from '@/constants/Albums';

const useTopAlbums = (limit: number = ALBUMS_LIMIT) => {
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

  return {
    topAlbums,
    isLoading,
    error,
  };
};

export { useTopAlbums };
