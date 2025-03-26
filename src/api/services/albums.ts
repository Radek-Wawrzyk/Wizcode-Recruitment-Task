import { client } from '../client';
import type { GetTopAlbumsResponseDto } from '@/types/Album.type';

const albumsService = {
  getTopAlbums: async (limit: number) => {
    const response = await client.get<GetTopAlbumsResponseDto>(`/topalbums/limit=${limit}/json`);
    return response.data;
  },
};

export { albumsService };
