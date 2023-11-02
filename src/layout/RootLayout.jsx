import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import ScrollToTop from '@/utils/ScrollToTop';

function RootLayout() {
  return (
    <main className='mx-auto max-w-3xl font-suit'>
      <ScrollToTop />
      <Outlet />
      <Navigation />
    </main>
  );
}
export default RootLayout;