// [스펙] StickyRailSection
// 역할   : 홈 왼쪽 레일. 안내 칩 + 스티키 허브 + 안내 카드를 세로로 쌓고, 스크롤해도 화면에 붙어 있음
// props  : 없음. 허브는 기본값(ready · 서류 3개)으로 그림. 서류 체크는 #73, 드래그 상태는 #58에서 연결
// 고정   : aside에 sticky top 96px. 부모(레일 + 공고 피드 묶음) 안에서만 붙어 있다가 공고 피드가 끝나면 같이 올라감
//          부모가 items-start라 aside 높이가 내용만큼이어야 sticky가 움직일 자리가 생김
// 구조   : [칩: 원하는 기업에 바로 지원해보세요!]
//          [HubSticky]
//          [안내 카드: 제목 / 설명]
// 접근성 : aside + aria-label. 허브 안의 h2가 제목을 읽어 줌

import HubSticky from '@/shared/components/hub/hub-sticky';

const StickyRailSection = () => {
  return (
    <aside
      aria-label="나의 취업 in"
      className="sticky top-24 flex w-69 shrink-0 flex-col items-start gap-3"
    >
      <p className="rounded-full bg-surface-blue-subtle px-2.5 py-1.5 text-caption-12 whitespace-nowrap text-blue-90">
        원하는 기업에 바로 지원해보세요!
      </p>
      <HubSticky />
      <div className="flex h-25 w-full flex-col gap-1.5 rounded-xl border border-border-default bg-surface-subtle px-3.5 py-3">
        <p className="text-label-14 text-text-primary">
          어떤 공고를 보든 바로 지원
        </p>
        <p className="text-caption-12 text-text-secondary">
          공고 피드 범위 안에서 top 96px을 유지하고, 푸터 24px 전에 멈춥니다.
        </p>
      </div>
    </aside>
  );
};

export default StickyRailSection;
