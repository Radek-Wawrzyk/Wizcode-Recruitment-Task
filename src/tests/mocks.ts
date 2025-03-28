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

const mockRawAlbums = [
  {
    id: { attributes: { 'im:id': '1' } },
    'im:name': { label: 'Album 1' },
    link: { attributes: { href: 'https://example.com/1' } },
    'im:image': [{ label: 'small.jpg' }, { label: 'medium.jpg' }, { label: 'large.jpg' }],
    'im:artist': { label: 'Artysta 1' },
    'im:price': { label: '9.99 zł', attributes: { currency: 'PLN' } },
    'im:itemCount': { label: '12' },
    'im:releaseDate': { label: '2023-01-01' },
    category: { attributes: { 'im:id': 'rock', label: 'Rock' } },
  },
  {
    id: { attributes: { 'im:id': '2' } },
    'im:name': { label: 'Album 2' },
    link: { attributes: { href: 'https://example.com/2' } },
    'im:image': [{ label: 'small.jpg' }, { label: 'medium.jpg' }, { label: 'large.jpg' }],
    'im:artist': { label: 'Artysta 2' },
    'im:price': { label: '14.99 zł', attributes: { currency: 'PLN' } },
    'im:itemCount': { label: '10' },
    'im:releaseDate': { label: '2023-02-01' },
    category: { attributes: { 'im:id': 'pop', label: 'Pop' } },
  },
];

export { mockAlbum, mockAlbums, mockRawAlbums };
