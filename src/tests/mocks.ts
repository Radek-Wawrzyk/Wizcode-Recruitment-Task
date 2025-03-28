import type { Album } from '@/types/Album.type';

const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'Album 1',
    artistName: 'Artist 1',
    image: 'image1.jpg',
    releaseDate: new Date('2023-01-01'),
    price: { amount: '$9.99', currency: 'USD' },
    tracksNumber: '10',
    url: 'https://example.com/1',
    category: { id: 'rock', name: 'Rock' },
  },
  {
    id: '2',
    name: 'Album 2',
    artistName: 'Artist 2',
    image: 'image2.jpg',
    releaseDate: new Date('2023-02-01'),
    price: { amount: '$12.99', currency: 'USD' },
    tracksNumber: '12',
    url: 'https://example.com/2',
    category: { id: 'pop', name: 'Pop' },
  },
  {
    id: '3',
    name: 'Album 3',
    artistName: 'Artist 3',
    image: 'image3.jpg',
    releaseDate: new Date('2023-03-01'),
    price: { amount: '$8.99', currency: 'USD' },
    tracksNumber: '8',
    url: 'https://example.com/3',
    category: { id: 'jazz', name: 'Jazz' },
  },
];

const mockAlbum: Album = mockAlbums[0];

export { mockAlbum, mockAlbums };
