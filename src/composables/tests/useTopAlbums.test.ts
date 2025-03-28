import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTopAlbums } from '../useTopAlbums';
import { useQuery } from '@tanstack/vue-query';
import { mockRawAlbums } from '@/tests/mocks';

vi.mock('@/api/services/albums', () => ({
  albumsService: {
    getTopAlbums: vi.fn(),
  },
}));

vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(),
}));

describe('useTopAlbums', () => {
  let mockData: any;
  let mockIsLoading: boolean;
  let mockError: any;

  beforeEach(() => {
    mockData = { value: { feed: { entry: mockRawAlbums } } };
    mockIsLoading = false;
    mockError = null;

    (useQuery as any).mockReturnValue({
      data: mockData,
      isLoading: { value: mockIsLoading },
      error: { value: mockError },
    });
  });

  it('should correctly map raw album data', () => {
    const result = useTopAlbums();
    const albums = result.topAlbums.value;

    expect(albums).toHaveLength(2);
    expect(albums[0]).toEqual({
      id: '1',
      name: 'Album 1',
      url: 'https://example.com/1',
      image: 'large.jpg',
      artistName: 'Artysta 1',
      price: {
        amount: '9.99 zł',
        currency: 'PLN',
      },
      tracksNumber: '12',
      releaseDate: expect.any(Date),
      category: {
        id: 'rock',
        name: 'Rock',
      },
    });
  });

  it('should correctly filter albums by search query', async () => {
    const result = useTopAlbums();

    result.searchQuery.value = 'album 1';
    expect(result.filteredAlbums.value).toHaveLength(1);
    expect(result.filteredAlbums.value[0].name).toBe('Album 1');

    result.searchQuery.value = 'artysta';
    expect(result.filteredAlbums.value).toHaveLength(2);

    result.searchQuery.value = 'nieistniejący';
    expect(result.filteredAlbums.value).toHaveLength(0);
  });

  it('should correctly filter albums by category', () => {
    const result = useTopAlbums();

    result.selectedCategories.value = ['rock'];
    expect(result.filteredAlbums.value).toHaveLength(1);
    expect(result.filteredAlbums.value[0].category.id).toBe('rock');

    result.selectedCategories.value = ['rock', 'pop'];
    expect(result.filteredAlbums.value).toHaveLength(2);

    result.selectedCategories.value = ['nieistniejąca'];
    expect(result.filteredAlbums.value).toHaveLength(0);
  });

  it('should correctly combine filtering by search query and category', () => {
    const result = useTopAlbums();

    result.searchQuery.value = 'album';
    result.selectedCategories.value = ['rock'];
    expect(result.filteredAlbums.value).toHaveLength(1);
    expect(result.filteredAlbums.value[0].name).toBe('Album 1');
  });

  it('should correctly update categories', () => {
    const result = useTopAlbums();

    result.updateCategories(['pop']);
    expect(result.selectedCategories.value).toEqual(['pop']);
    expect(result.filteredAlbums.value).toHaveLength(1);
    expect(result.filteredAlbums.value[0].name).toBe('Album 2');
  });

  it('should correctly extract unique categories from albums', () => {
    const result = useTopAlbums();
    const categories = result.albumsCategories.value;

    expect(categories).toHaveLength(2);
    expect(categories).toEqual([
      { value: 'rock', label: 'Rock' },
      { value: 'pop', label: 'Pop' },
    ]);
  });

  it('should accept limit as a parameter', () => {
    useTopAlbums(5);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expect.arrayContaining(['top-albums-5']),
      }),
    );
  });
});
