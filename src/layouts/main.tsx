import { Outlet } from 'react-router-dom';
import { UserContextProvider } from '@/context/user';

export function MainLayout() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}
