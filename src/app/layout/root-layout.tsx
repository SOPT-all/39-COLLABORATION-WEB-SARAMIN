import { Outlet } from 'react-router';

import Footer from '@/app/layout/footer';
import Header from '@/app/layout/header';
import { usePreventPlaceholderLinks } from '@/shared/hooks/use-prevent-placeholder-links';

const RootLayout = () => {
  usePreventPlaceholderLinks();

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
