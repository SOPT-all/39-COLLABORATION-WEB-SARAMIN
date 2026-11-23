import { Outlet, ScrollRestoration } from 'react-router';

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
      {/* 새 페이지는 맨 위에서 시작하고, 뒤로가기 · 앞으로가기는 보던 위치로 돌아가요. */}
      <ScrollRestoration />
    </>
  );
};

export default RootLayout;
