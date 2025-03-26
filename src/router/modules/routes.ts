import { ROUTES } from '@/constants/Routing';

const routes = [
  {
    path: ROUTES.HOME.path,
    name: ROUTES.HOME.name,
    component: () => import('@/pages/TopAlbumsPage/TopAlbumsPage.vue'),
  },
];

export { routes };
