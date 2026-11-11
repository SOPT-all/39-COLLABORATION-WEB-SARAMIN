import { Link } from 'react-router';

import HeaderNav from '@/app/layout/header-nav';
import HeaderSearchBar from '@/app/layout/header-search-bar';
import ChipDropdown from '@/shared/components/chip/chip-dropdown';
import { ROUTES } from '@/shared/constants/routes';

import LogoSaramin from '@/shared/assets/logo/logo-saramin.svg?react';

const Header = () => {
  return (
    <header className="relative bg-surface-default">
      {/* 검색 줄 (아래 테두리가 메뉴 줄과의 구분선) */}
      <div className="border-b border-gray-30">
        <div className="mx-auto flex h-24 w-315 items-center justify-between">
          <div className="flex items-center gap-5.75">
            <div className="w-40.25 pl-6.75">
              <Link to={ROUTES.HOME} aria-label="사람인 홈" className="block">
                <LogoSaramin aria-hidden />
              </Link>
            </div>
            <HeaderSearchBar />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-body-14 text-gray-100">
              <a href="#">로그인</a>
              <span aria-hidden className="h-3 w-px bg-gray-40" />
              <a href="#">회원가입</a>
            </div>
            <ChipDropdown>기업서비스</ChipDropdown>
          </div>
        </div>
      </div>
      {/* 메뉴 줄 */}
      <div className="mx-auto w-315">
        <HeaderNav />
      </div>
      {/* 헤더 아래 그림자 */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-full h-1 bg-linear-to-b from-gray-110/10 to-gray-110/0"
      />
    </header>
  );
};

export default Header;
