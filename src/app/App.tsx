import { RouterProvider } from 'react-router';
import { router } from './routes';
import { MobileNavProvider } from './hooks/useMobileNav';

export default function App() {
  return (
    <MobileNavProvider>
      <RouterProvider router={router} />
    </MobileNavProvider>
  );
}