import { ROUTES } from '@/constants/Routing';

const routes = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: () => import('@/pages/HomePage/HomePage.vue'),
  },
  {
    path: ROUTES.TOP_ALBUMS.path,
    name: ROUTES.TOP_ALBUMS.name,
    component: () => import('@/pages/TopAlbumsPage/TopAlbumsPage.vue'),
  },
  {
    path: ROUTES.FAVORITES.path,
    name: ROUTES.FAVORITES.name,
    component: () => import('@/pages/FavoriteAlbumsPage/FavoriteAlbumsPage.vue'),
  },
];

export { routes };
