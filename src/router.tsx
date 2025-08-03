import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/main';
import { publicLoader } from './loaders/public';
import Loader from './components/ui/loader/loader';
import { chatAction } from './features/chat/actions';
import { AuthLayout } from './features/auth/layout/layout';
import { chatHomeLoader, chatSessionLoader } from './features/chat/loaders';

const RegisterRoute = lazy(() =>
  import('./routes/register').then((module) => ({
    default: module.RegisterRoute,
  }))
);

const LoginRoute = lazy(() =>
  import('./routes/login').then((module) => ({
    default: module.LoginRoute,
  }))
);

const IndexRoute = lazy(() =>
  import('./routes/index').then((module) => ({
    default: module.IndexRoute,
  }))
);

const ChatRoute = lazy(() =>
  import('./routes/chat').then((module) => ({
    default: module.ChatRoute,
  }))
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        loader: chatHomeLoader,
        element: (
          <Suspense fallback={<Loader />}>
            <IndexRoute />
          </Suspense>
        ),
      },
      {
        path: '/chats/:id',
        loader: chatSessionLoader,
        action: chatAction,
        element: (
          <Suspense fallback={<Loader />}>
            <ChatRoute />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<Loader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'register',
        loader: publicLoader,
        element: (
          <Suspense fallback={<Loader />}>
            <RegisterRoute />
          </Suspense>
        ),
      },
      {
        path: 'login',
        loader: publicLoader,
        element: (
          <Suspense fallback={<Loader />}>
            <LoginRoute />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
