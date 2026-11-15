import HiringSeasonBadge from '@/app/layout/hiring-season-badge';

import IcListLeftAlign from '@/shared/assets/icons/ic-list-leftalign.svg?react';

const NAV_MENUS = [
  { label: '채용정보' },
  { label: '취업축하금' },
  { label: '신입·인턴', hasHiringBadge: true },
  { label: '사람인스토어' },
  { label: '기업·연봉' },
  { label: '커뮤니티' },
  { label: '취업 자료' },
];

const HeaderNav = () => {
  return (
    <nav aria-label="주요 메뉴" className="flex items-center gap-4">
      <button
        type="button"
        aria-label="전체 메뉴"
        className="flex h-10 w-15 items-center pl-3.5"
      >
        <IcListLeftAlign aria-hidden className="shrink-0" />
      </button>
      <ul className="flex">
        {NAV_MENUS.map(({ label, hasHiringBadge }) => (
          <li key={label}>
            <a
              href="#"
              className="flex h-16 items-center px-5 text-[17px] font-bold text-gray-120"
            >
              <span className="relative">
                {hasHiringBadge && (
                  <HiringSeasonBadge className="absolute -top-6.25 -left-1.5" />
                )}
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
