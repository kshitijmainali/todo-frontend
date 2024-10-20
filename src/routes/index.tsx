import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@src/components/Layout/Layout';

import { pageRoutes } from './pageRoutes';
import Dashboard from '@src/pages/dashboard';
import NotFound from '@src/pages/NOTFOUND';

export default function AppRoutes() {
  const unUnthenicatedRoutes = [
    {
      path: pageRoutes.dashboard,
      children: [
        {
          path: pageRoutes.dashboard,
          element: (
            <Layout>
              {' '}
              <Dashboard />{' '}
            </Layout>
          ),
        },
      ],
    },
  ];

  const notFoundRoute = {
    path: '*',
    element: <NotFound />,
  };

  const router = createBrowserRouter([...unUnthenicatedRoutes, notFoundRoute]);
  return <RouterProvider router={router} />;
}
