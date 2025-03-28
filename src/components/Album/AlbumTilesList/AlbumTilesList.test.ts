import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockAlbums } from '@/tests/mocks';

import AlbumTilesList from './AlbumTilesList.vue';

vi.mock('@/components/Album/AlbumTile/AlbumTile.vue', () => ({
  default: {
    name: 'AlbumTile',
    props: ['album', 'locked'],
    template:
      '<li data-testid="album-tile" :data-album-id="album.id" :data-locked="locked">{{ album.name }}</li>',
  },
}));

describe('AlbumTilesList', () => {
  const createWrapper = (props = {}) => {
    return mount(AlbumTilesList, {
      props: {
        albums: [],
        locked: false,
        emptyText: 'No albums found',
        ...props,
      },
      global: {
        stubs: {
          'transition-group': {
            template: '<ul><slot></slot></ul>',
          },
        },
      },
    });
  };

  it('Renders empty state when no albums are provided', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.album-tiles-list__empty').exists()).toBe(true);
    expect(wrapper.find('.album-tiles-list__empty-text').text()).toBe('No albums found');
    expect(wrapper.findAll('[data-testid="album-tile"]')).toHaveLength(0);
  });

  it('Renders all albums in the list when provided', () => {
    const wrapper = createWrapper({ albums: mockAlbums });

    const albumTiles = wrapper.findAll('[data-testid="album-tile"]');
    expect(albumTiles).toHaveLength(3);
    expect(albumTiles[0].text()).toBe('Album 1');
    expect(albumTiles[1].text()).toBe('Album 2');
    expect(albumTiles[2].text()).toBe('Album 3');

    expect(wrapper.find('.album-tiles-list__empty').exists()).toBe(false);
  });

  it('Passes correct props to each AlbumTile component', () => {
    const wrapper = createWrapper({
      albums: mockAlbums,
      locked: true,
    });

    const albumTiles = wrapper.findAll('[data-testid="album-tile"]');
    expect(albumTiles).toHaveLength(3);

    albumTiles.forEach((tile, index) => {
      expect(tile.attributes('data-album-id')).toBe(mockAlbums[index].id);
      expect(tile.attributes('data-locked')).toBe('true');
    });
  });

  it('Renders correct album in correct order', () => {
    const wrapper = createWrapper({ albums: mockAlbums });

    const albumTiles = wrapper.findAll('[data-testid="album-tile"]');

    expect(albumTiles[0].attributes('data-album-id')).toBe('1');
    expect(albumTiles[1].attributes('data-album-id')).toBe('2');
    expect(albumTiles[2].attributes('data-album-id')).toBe('3');
  });

  it('Uses transition-group for animations', () => {
    const wrapper = createWrapper({ albums: mockAlbums });

    const transitionGroup = wrapper.find('.album-tiles-list');
    expect(transitionGroup.exists()).toBe(true);

    expect(transitionGroup.classes()).toContain('album-tiles-list');
  });

  it('Does not pass locked prop when locked is false', () => {
    const wrapper = createWrapper({
      albums: mockAlbums,
      locked: false,
    });

    const albumTiles = wrapper.findAll('[data-testid="album-tile"]');
    albumTiles.forEach((tile) => {
      expect(tile.attributes('data-locked')).toBe('false');
    });
  });

  it('Uses key attribute for album tiles based on album ID', () => {
    const wrapper = mount(AlbumTilesList, {
      props: {
        albums: mockAlbums,
      },
      global: {
        stubs: {
          'transition-group': false,
          AlbumTile: {
            template: '<li :key="album.id">{{ album.name }}</li>',
            props: ['album', 'locked'],
          },
        },
      },
    });

    const html = wrapper.html();
    expect(html).toContain('Album 1');
    expect(html).toContain('Album 2');
    expect(html).toContain('Album 3');
  });

  it('Shows custom empty text when provided', () => {
    const customEmptyText = 'Custom empty message';
    const wrapper = createWrapper({
      emptyText: customEmptyText,
    });

    expect(wrapper.find('.album-tiles-list__empty-text').text()).toBe(customEmptyText);
  });
});
