import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { mockAlbum } from '@/tests/mocks';
import { ICON } from '@/icons';

import AlbumTile from './AlbumTile.vue';

vi.mock('@/composables/useElementOverflow', () => ({
  useElementOverflow: () => ({
    isXOverflowing: false,
  }),
}));

const mockIsLoaded = vi.fn().mockReturnValue(true);
const mockIsError = vi.fn().mockReturnValue(false);
const mockImageRef = vi.fn();

vi.mock('@/composables/useImageLazyLoad', () => ({
  useImageLazyLoad: () => ({
    imageRef: mockImageRef,
    isLoaded: mockIsLoaded(),
    isError: mockIsError(),
    isIntersecting: false,
  }),
}));

const mockIsFavorite = vi.fn();
const mockAddToFavorites = vi.fn();
const mockRemoveFromFavorites = vi.fn();

vi.mock('@/composables/useFavoriteAlbums', () => ({
  useFavoriteAlbums: () => ({
    isFavorite: mockIsFavorite,
    addToFavorites: mockAddToFavorites,
    removeFromFavorites: mockRemoveFromFavorites,
  }),
}));

describe('AlbumTile', () => {
  let wrapper: VueWrapper;

  const createWrapper = (props = {}) => {
    return mount(AlbumTile, {
      props: {
        album: mockAlbum,
        locked: false,
        ...props,
      },
      global: {
        mocks: {
          $t: (key: string, params?: Record<string, unknown>) =>
            `${key}${params ? JSON.stringify(params) : ''}`,
        },
        stubs: {
          BaseIcon: {
            template:
              '<div class="base-icon-stub" :data-name="name" :data-color="color" :data-size="size"></div>',
            props: ['name', 'color', 'size'],
          },
        },
        directives: {
          tippy: {},
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoaded.mockReturnValue(true);
    mockIsError.mockReturnValue(false);
    mockIsFavorite.mockReturnValue(false);
    wrapper = createWrapper();
  });

  it('renders the AlbumTile component correctly', () => {
    expect(wrapper.find('.album-tile').exists()).toBe(true);
    expect(wrapper.find('.album-tile__title').text()).toBe(mockAlbum.name);
    expect(wrapper.find('.album-tile__artist').text()).toBe(mockAlbum.artistName);
    expect(wrapper.find('.album-tile__release-year').text()).toBe('2023');
    expect(wrapper.find('.album-tile__price').text()).toBe(
      `${mockAlbum.price.amount} ${mockAlbum.price.currency}`,
    );
  });

  it('renders the heart icon for favorite albums', () => {
    const favoriteIcon = wrapper.find('.album-tile__favorite-button .base-icon-stub');
    expect(favoriteIcon.attributes('data-name')).toBe(ICON.HEART);
    expect(mockIsFavorite).toHaveBeenCalledWith(mockAlbum.id);
  });

  it('does not render the favorite button when the album is locked', () => {
    const lockedWrapper = createWrapper({ locked: true });
    expect(lockedWrapper.find('.album-tile__favorite-button').exists()).toBe(false);
  });

  it('calls removeFromFavorites when the favorite album is clicked', async () => {
    mockIsFavorite.mockReturnValue(true);

    const favoriteWrapper = createWrapper();

    const button = favoriteWrapper.find('.album-tile__favorite-button');
    await button.trigger('click');

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockAlbum.id);
    expect(mockAddToFavorites).not.toHaveBeenCalled();
  });

  it('calls addToFavorites when the non-favorite album is clicked', async () => {
    const button = wrapper.find('.album-tile__favorite-button');
    await button.trigger('click');

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockAlbum);
    expect(mockRemoveFromFavorites).not.toHaveBeenCalled();
  });

  it('renders the image placeholder during image loading', () => {
    mockIsLoaded.mockReturnValueOnce(false);
    const loadingWrapper = createWrapper();

    expect(loadingWrapper.find('.album-tile__image-placeholder').exists()).toBe(true);

    const placeholderIcon = loadingWrapper.find('.album-tile__image-placeholder .base-icon-stub');
    expect(placeholderIcon.attributes('data-name')).toBe(ICON.MUSIC);
    expect(placeholderIcon.attributes('data-color')).toBe('var(--border-color)');
  });

  it('renders the error message when the image cannot be loaded', () => {
    mockIsLoaded.mockReturnValueOnce(false);
    mockIsError.mockReturnValueOnce(true);
    const errorWrapper = createWrapper();

    expect(errorWrapper.find('.album-tile__image-error').exists()).toBe(true);

    const errorIcon = errorWrapper.find('.album-tile__image-error .base-icon-stub');
    expect(errorIcon.attributes('data-name')).toBe(ICON.MUSIC);
    expect(errorIcon.attributes('data-color')).toBe('var(--color-error)');
  });

  it('displays the number of tracks', () => {
    const tracksNumber = wrapper.find('.album-tile__tracks-number');
    expect(tracksNumber.text()).toBe(mockAlbum.tracksNumber);
  });

  it('correctly sets the image reference for lazy loading', () => {
    const image = wrapper.find('.album-tile__image-inner');

    expect(image.attributes('data-src')).toBe(mockAlbum.image);
    expect(image.classes()).toContain('album-tile__image-inner--visible');
  });

  it('correctly displays the album price', () => {
    const price = wrapper.find('.album-tile__price');
    expect(price.text()).toBe(`${mockAlbum.price.amount} ${mockAlbum.price.currency}`);
  });
});
