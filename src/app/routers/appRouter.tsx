import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { HomePage, PeoplePage } from '@/pages';

export const AppRouter: FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
      errorElement: <div>Error</div>,
      children: [
        {
          path: 'people/:personId',
          element: <PeoplePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
