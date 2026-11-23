// [스펙] BundleSummaryModal
// 역할   : 스티키 허브의 지원 패키지 카드를 누르면 여는 "지원 패키지" 모달
// props  : isOpen · onClose - 열림 상태와 닫기
//          myDocuments - 보유 서류 체크 상태 (useMyDocumentsQuery)
//          onDocumentManageClick - "서류 관리" 버튼. 지원 서류 관리 모달(#100)로 이어짐
// 구조   : [준비 요약: 상태 아이콘 · 필수 서류 n/3 준비 · 최근 업데이트 · 준비 배지]
//          [서류 행 × 3: 체크 아이콘 · 서류 이름 개수 · 개수 칩]
//          [서류 관리 │ 패키지 편집]
// 데이터 : 서버는 서류 유무만 줘서, 체크된 서류는 1개 · 아닌 서류는 0개로 표시
//          최근 업데이트 시각은 API에 없어서 허브와 같은 피그마 문구를 씀

import BadgeModalStatus from '@/shared/components/badge/badge-modal-status';
import ModalButton from '@/shared/components/button/modal-button';
import ChipStickyDocumentCount from '@/shared/components/chip/chip-sticky-document-count';
import Modal from '@/shared/components/modal/modal';
import {
  MY_DOCUMENT_FIELDS,
  READY_DOCUMENT_COUNT,
} from '@/shared/constants/my-documents';
import type { MyDocuments } from '@/shared/types/my-documents';
import { cn } from '@/shared/utils/cn';

import IcDocumentCheck from '@/shared/assets/icons/ic-document-check.svg?react';
import IcDocumentWaiting from '@/shared/assets/icons/ic-document-waiting.svg?react';
import IcModalSuccess from '@/shared/assets/icons/ic-modal-success.svg?react';
import IcModalUnknown from '@/shared/assets/icons/ic-modal-unknown.svg?react';

const LAST_UPDATED_LABEL = '최근 업데이트 10분 전';

interface BundleSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  myDocuments: MyDocuments;
  onDocumentManageClick: () => void;
}

const BundleSummaryModal = ({
  isOpen,
  onClose,
  myDocuments,
  onDocumentManageClick,
}: BundleSummaryModalProps) => {
  const totalCount = MY_DOCUMENT_FIELDS.length;
  const readyCount = MY_DOCUMENT_FIELDS.filter(
    ({ id }) => myDocuments[id],
  ).length;
  const isReady = readyCount === totalCount;
  const StatusIcon = isReady ? IcModalSuccess : IcModalUnknown;

  return (
    <Modal
      title="지원 패키지"
      size="standard"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <ModalButton variant="secondary" onClick={onDocumentManageClick}>
            서류 관리
          </ModalButton>
          {/* 패키지 편집 API가 없어 동작 없는 버튼. 동작은 디자인 확인 후 연결 */}
          <ModalButton>패키지 편집</ModalButton>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <section
          aria-label="지원 패키지 준비 상태"
          className="flex h-16 shrink-0 items-center gap-3 rounded-xl bg-surface-blue-subtle px-4 py-3"
        >
          <StatusIcon aria-hidden className="size-10 shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-label-14 text-text-primary">
              필수 서류 {readyCount}/{totalCount} 준비
            </p>
            <p className="text-caption-12 text-text-secondary">
              {LAST_UPDATED_LABEL}
            </p>
          </div>
          <BadgeModalStatus variant={isReady ? 'success' : 'danger'}>
            {isReady ? '준비 완료' : '서류 필요'}
          </BadgeModalStatus>
        </section>

        <ul aria-label="지원 패키지 서류" className="flex flex-col gap-3">
          {MY_DOCUMENT_FIELDS.map(({ id, label }) => {
            const hasDocument = myDocuments[id];
            const count = hasDocument ? READY_DOCUMENT_COUNT : 0;
            const DocumentIcon = hasDocument
              ? IcDocumentCheck
              : IcDocumentWaiting;

            return (
              <li key={id} className="flex h-8 items-center justify-between">
                <span className="flex items-center gap-2">
                  <DocumentIcon aria-hidden className="size-5 shrink-0" />
                  <span
                    className={cn(
                      'text-body-14 text-text-primary',
                      !hasDocument && 'text-text-tertiary',
                    )}
                  >
                    {label} {count}
                  </span>
                </span>
                <ChipStickyDocumentCount className="bg-surface-blue-subtle">
                  {count}
                </ChipStickyDocumentCount>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default BundleSummaryModal;
