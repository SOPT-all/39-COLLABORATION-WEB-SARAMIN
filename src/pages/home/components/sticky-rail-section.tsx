// [스펙] StickyRailSection
// 역할   : 홈 왼쪽 레일. 안내 칩 + 스티키 허브를 세로로 쌓고, 스크롤해도 화면에 붙어 있음
// props  : isDragging - 지원 패키지를 끄는 중이면 허브를 dragging 상태로 그림
//          bundleProps - 지원 패키지 카드 드래그 연결 (useApplyDrag)
//          onApplicationHistoryClick - 허브 아래 "지원 내역" 버튼
// 데이터 : 보유 서류 체크 상태를 GET으로 받아 허브 props로 바꿔 넘김. 받는 중 · 실패하면 허브는 loading(스켈레톤)
//          서류 행을 누르면 그 서류만 뒤집어 세 값을 PATCH. 요청 중에 또 누르면 무시
//          서류가 3/3일 때만 지원 패키지를 끌 수 있음. 부족하면 드래그 연결을 안 넘김
// 고정   : aside에 sticky top 96px. 부모(레일 + 공고 피드 묶음) 안에서만 붙어 있다가 공고 피드가 끝나면 같이 올라감
//          부모가 items-start라 aside 높이가 내용만큼이어야 sticky가 움직일 자리가 생김
// 구조   : [칩: 원하는 기업에 바로 지원해보세요!]
//          [HubSticky]
//          피그마의 허브 아래 카드는 스크롤 동작을 적어 둔 개발 메모라 그리지 않음
// 재사용 : 안내 칩은 공통 ChipTool(blue). 너비가 고정이라 w-auto로 풀어 씀
// 접근성 : aside + aria-label. 허브 안의 h2가 제목을 읽어 줌

import type { ComponentProps } from 'react';

import { useMyDocumentsMutation } from '@/pages/home/api/use-my-documents-mutation';
import { useMyDocumentsQuery } from '@/pages/home/api/use-my-documents-query';
import { convertMyDocumentsToHubSticky } from '@/pages/home/utils/convert-my-documents-to-hub-sticky';
import { isMyDocumentField } from '@/pages/home/utils/is-my-document-field';
import ChipTool from '@/shared/components/chip/chip-tool';
import HubSticky from '@/shared/components/hub/hub-sticky';

interface StickyRailSectionProps {
  isDragging: boolean;
  bundleProps: ComponentProps<'section'>;
  onApplicationHistoryClick: () => void;
}

const StickyRailSection = ({
  isDragging,
  bundleProps,
  onApplicationHistoryClick,
}: StickyRailSectionProps) => {
  const { data: myDocuments } = useMyDocumentsQuery();
  const { mutate: changeMyDocuments, isPending: isChanging } =
    useMyDocumentsMutation();

  const handleDocumentClick = (id: string) => {
    if (!myDocuments || isChanging || !isMyDocumentField(id)) return;

    changeMyDocuments({ ...myDocuments, [id]: !myDocuments[id] });
  };

  const hubProps = myDocuments && convertMyDocumentsToHubSticky(myDocuments);
  // 서류 3/3일 때만 지원 패키지 드래그 가능
  const canDrag = hubProps?.status === 'ready';

  return (
    <aside
      aria-label="나의 취업 in"
      className="sticky top-24 flex w-69 shrink-0 flex-col items-start gap-3"
    >
      <ChipTool className="w-auto">원하는 기업에 바로 지원해보세요!</ChipTool>
      {hubProps ? (
        <HubSticky
          {...hubProps}
          status={canDrag && isDragging ? 'dragging' : hubProps.status}
          bundleProps={canDrag ? bundleProps : undefined}
          onDocumentClick={handleDocumentClick}
          onApplicationHistoryClick={onApplicationHistoryClick}
        />
      ) : (
        <HubSticky status="loading" />
      )}
    </aside>
  );
};

export default StickyRailSection;
