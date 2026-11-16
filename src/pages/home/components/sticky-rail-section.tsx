// [스펙] StickyRailSection
// 역할   : 홈 왼쪽 레일. 안내 칩 + 스티키 허브를 세로로 쌓고, 스크롤해도 화면에 붙어 있음
// props  : 없음. 허브는 기본값(ready · 서류 3개)으로 그림. 서류 체크는 #73, 드래그 상태는 #58에서 연결
// 고정   : aside에 sticky top 96px. 부모(레일 + 공고 피드 묶음) 안에서만 붙어 있다가 공고 피드가 끝나면 같이 올라감
//          부모가 items-start라 aside 높이가 내용만큼이어야 sticky가 움직일 자리가 생김
// 구조   : [칩: 원하는 기업에 바로 지원해보세요!]
//          [HubSticky]
//          피그마의 허브 아래 카드는 스크롤 동작을 적어 둔 개발 메모라 그리지 않음
// 재사용 : 안내 칩은 공통 ChipTool(blue). 너비가 고정이라 w-auto로 풀어 씀
// 접근성 : aside + aria-label. 허브 안의 h2가 제목을 읽어 줌

import ChipTool from '@/shared/components/chip/chip-tool';
import HubSticky from '@/shared/components/hub/hub-sticky';

const StickyRailSection = () => {
  return (
    <aside
      aria-label="나의 취업 in"
      className="sticky top-24 flex w-69 shrink-0 flex-col items-start gap-3"
    >
      <ChipTool className="w-auto">원하는 기업에 바로 지원해보세요!</ChipTool>
      <HubSticky />
    </aside>
  );
};

export default StickyRailSection;
