import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../layout';
import { ControlledPage, Error, HomePage, UncontrolledPage } from '@/pages';

export const AppRouter: FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'uncontrolled',
          element: <UncontrolledPage />,
        },
        {
          path: 'react_hook_form',
          element: <ControlledPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
