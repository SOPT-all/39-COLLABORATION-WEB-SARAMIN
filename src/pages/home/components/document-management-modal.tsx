// [스펙] DocumentManagementModal
// 역할   : 스티키 허브 "서류 관리" · 지원 패키지 모달 "서류 관리"로 여는 "지원 서류 관리" 모달
// props  : isOpen · onClose - 열림 상태와 닫기
//          onAddDocumentClick - "서류 추가" 버튼. 서류 추가 흐름(#101)으로 이어짐
// 탭     : 전체 서류 · 최근 수정(7일 안에 바뀐 서류, 최근 순). 다시 열면 항상 전체 서류부터
// 상태   : 불러오는 중 → 스켈레톤 행 4개 / 실패 → 오류 안내 + 다시 시도 / 0개 → 빈 안내 + 서류 추가
// 데이터 : 서류 파일 API가 없어 목 데이터(useDocumentFiles)

import { useId, useState } from 'react';

import ApplicationHistorySectionHeader from '@/pages/home/components/application-history-section-header';
import DocumentFileRow from '@/pages/home/components/document-file-row';
import { useDocumentFiles } from '@/pages/home/hooks/use-document-files';
import type { DocumentFile } from '@/pages/home/types/document-file';
import ModalButton from '@/shared/components/button/modal-button';
import Modal from '@/shared/components/modal/modal';
import ModalFeedback from '@/shared/components/modal/modal-feedback';
import SkeletonModalRow from '@/shared/components/skeleton/skeleton-modal-row';
import { cn } from '@/shared/utils/cn';

const SKELETON_ROW_COUNT = 4;
const RECENT_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

const DOCUMENT_TABS = [
  { value: 'all', label: '전체 서류' },
  { value: 'recent', label: '최근 수정' },
] as const;

type DocumentTab = (typeof DOCUMENT_TABS)[number]['value'];

// 최근 수정 탭: 7일 안에 업데이트한 서류를 최근 순으로 보여 줘요.
const filterRecentDocuments = (documents: DocumentFile[]) => {
  const since = Date.now() - RECENT_DAYS * DAY_MS;
  return documents
    .filter(({ updatedAt }) => new Date(updatedAt).getTime() >= since)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
};

interface DocumentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocumentClick: () => void;
}

const DocumentManagementModal = ({
  isOpen,
  onClose,
  onAddDocumentClick,
}: DocumentManagementModalProps) => {
  const tabIdPrefix = useId();
  const {
    data: documents,
    isPending,
    isError,
    refetch,
  } = useDocumentFiles({ enabled: isOpen });

  const [selectedTab, setSelectedTab] = useState<DocumentTab>('all');
  const [wasOpen, setWasOpen] = useState(isOpen);

  // 다시 열면 전체 서류 탭부터 보여 줘요.
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setSelectedTab('all');
  }

  const renderContent = () => {
    if (isPending) {
      return (
        <section aria-busy="true" className="flex flex-col gap-3">
          <ApplicationHistorySectionHeader
            title="서류를 불러오고 있어요"
            meta="잠시만 기다려 주세요"
          />
          {Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
            <SkeletonModalRow key={index} className="w-full" />
          ))}
        </section>
      );
    }

    if (isError) {
      return (
        <ModalFeedback
          status="error"
          title="서류를 불러오지 못했습니다"
          description="입력한 내용은 유지됩니다. 네트워크를 확인한 뒤 다시 시도해 주세요."
          className="flex-1"
        />
      );
    }

    if (documents.length === 0) {
      return (
        <ModalFeedback
          status="empty"
          title="등록된 서류가 없습니다"
          description="지원에 사용할 이력서·자기소개서·경력기술서를 추가해 주세요."
          className="flex-1"
        />
      );
    }

    const visibleDocuments =
      selectedTab === 'recent' ? filterRecentDocuments(documents) : documents;

    return (
      <div className="flex flex-col gap-3">
        <div className="flex h-11 items-center justify-between">
          <div role="tablist" aria-label="서류 보기" className="flex gap-2">
            {DOCUMENT_TABS.map(({ value, label }) => {
              const isSelected = value === selectedTab;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  id={`${tabIdPrefix}-${value}`}
                  aria-selected={isSelected}
                  aria-controls={`${tabIdPrefix}-panel`}
                  className="flex h-11 w-40 flex-col items-center justify-end gap-2"
                  onClick={() => setSelectedTab(value)}
                >
                  <span
                    className={cn(
                      'text-label-14',
                      isSelected ? 'text-blue-90' : 'text-text-secondary',
                    )}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'w-full bg-blue-90',
                      isSelected ? 'h-0.75' : 'h-px',
                    )}
                  />
                </button>
              );
            })}
          </div>
          <p className="text-caption-12 text-text-secondary">
            등록 {documents.length}개
          </p>
        </div>

        <div
          id={`${tabIdPrefix}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabIdPrefix}-${selectedTab}`}
        >
          <ul className="flex flex-col gap-3">
            {visibleDocuments.map((document) => (
              <li key={document.id}>
                <DocumentFileRow document={document} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderPrimaryAction = () => {
    if (isPending) {
      return <ModalButton aria-disabled="true">불러오는 중</ModalButton>;
    }
    if (isError) {
      return (
        <ModalButton onClick={() => void refetch()}>다시 시도</ModalButton>
      );
    }
    return <ModalButton onClick={onAddDocumentClick}>서류 추가</ModalButton>;
  };

  return (
    <Modal
      title="지원 서류 관리"
      size="wide"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>
            닫기
          </ModalButton>
          {renderPrimaryAction()}
        </>
      }
    >
      {renderContent()}
    </Modal>
  );
};

export default DocumentManagementModal;
