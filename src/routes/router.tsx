import { createBrowserRouter } from 'react-router';

import RootLayout from '@/app/layout/root-layout';
import HomePage from '@/pages/home/home-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import SearchPage from '@/pages/search/search-page';
import { ROUTES } from '@/shared/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
