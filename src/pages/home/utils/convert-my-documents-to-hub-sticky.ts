import type { ComponentProps } from 'react';

import type HubSticky from '@/shared/components/hub/hub-sticky';
import {
  MY_DOCUMENT_FIELDS,
  READY_DOCUMENT_COUNT,
} from '@/shared/constants/my-documents';
import type { MyDocuments } from '@/shared/types/my-documents';

type HubStickyDocumentProps = Pick<
  ComponentProps<typeof HubSticky>,
  'status' | 'documents' | 'badge' | 'summaryTitle'
>;

const TOTAL_DOCUMENT_COUNT = MY_DOCUMENT_FIELDS.length;

// 서버의 세 boolean을 스티키 허브 props로 변환
// 서버는 서류 유무(true · false)만 내려줌. '검수 필요' 같은 세 번째 상태는 없음
// 서류 행 : true면 ready(체크), false면 waiting(물음표)
// 허브   : 전부 true면 ready, 하나라도 false면 unready
export const convertMyDocumentsToHubSticky = (
  myDocuments: MyDocuments,
): HubStickyDocumentProps => {
  const readyCount = MY_DOCUMENT_FIELDS.filter(
    ({ id }) => myDocuments[id],
  ).length;

  return {
    status: readyCount === TOTAL_DOCUMENT_COUNT ? 'ready' : 'unready',
    badge: `${readyCount}/${TOTAL_DOCUMENT_COUNT} 완료`,
    summaryTitle: `필수 서류 ${readyCount}/${TOTAL_DOCUMENT_COUNT} 준비`,
    documents: MY_DOCUMENT_FIELDS.map(({ id, label }) => ({
      id,
      label,
      state: myDocuments[id] ? 'ready' : 'waiting',
      // 지원 패키지 모달과 같이 체크 안 한 서류는 0개로 보여요.
      count: myDocuments[id] ? READY_DOCUMENT_COUNT : 0,
    })),
  };
};
