import { Outlet } from 'react-router';

import Footer from '@/app/layout/footer';
import Header from '@/app/layout/header';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
