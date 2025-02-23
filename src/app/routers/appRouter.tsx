import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../layout';
import { Error, HomePage, PeoplePage } from '@/pages';

export const AppRouter: FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
      errorElement: <Error />,
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
