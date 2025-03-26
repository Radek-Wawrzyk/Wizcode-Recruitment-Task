import { client } from '../client';
import { ALBUMS_LIMIT } from '@/constants/Albums';
import type { GetTopAlbumsResponseDto } from '@/types/Album.type';

const albumsService = {
  getTopAlbums: async () => {
    const response = await client.get<GetTopAlbumsResponseDto>(
      `/topalbums/limit=${ALBUMS_LIMIT}/json`,
    );
    return response.data;
  },
};

export { albumsService };
