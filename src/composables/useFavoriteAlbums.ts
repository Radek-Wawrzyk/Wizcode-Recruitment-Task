import { ref, onMounted, watch } from 'vue';
import { STORAGE_KEYS } from '@/constants/Storage';
import type { Album } from '@/types/Album.type';

const favoriteAlbums = ref<Album[]>([]);

const useFavoriteAlbums = () => {
  onMounted(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITE_ALBUMS);
    if (storedFavorites) {
      try {
        favoriteAlbums.value = JSON.parse(storedFavorites);
      } catch (error) {
        // INFO: Normally I would add some handling like toast or something else
        console.error('Error reading favorite albums:', error);
      }
    }
  });

  const syncToStorage = () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_ALBUMS, JSON.stringify(favoriteAlbums.value));
  };

  const isFavorite = (albumId: string) => {
    return favoriteAlbums.value.some((album) => album.id === albumId);
  };

  const addToFavorites = (album: Album) => {
    if (!isFavorite(album.id)) {
      favoriteAlbums.value.push(album);
    }
  };

  const removeFromFavorites = (albumId: string) => {
    favoriteAlbums.value = favoriteAlbums.value.filter((album) => album.id !== albumId);
  };

  watch(favoriteAlbums, syncToStorage, { deep: true });

  return {
    favoriteAlbums,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
};

export { useFavoriteAlbums };
