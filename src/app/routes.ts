import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  layout('./layout/layout.tsx', [
    index('./routers/home.tsx'),
    route('people/:personId', './routers/person.tsx'),
  ]),
  route('*', './routers/error.tsx'),
] satisfies RouteConfig;
