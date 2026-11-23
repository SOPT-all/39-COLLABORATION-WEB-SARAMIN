import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router';

import ApplicationHistoryDetail from '@/pages/home/components/application-history-detail';
import ApplicationHistoryList from '@/pages/home/components/application-history-list';
import ApplicationHistorySectionHeader from '@/pages/home/components/application-history-section-header';
import { useApplications } from '@/pages/home/hooks/use-applications';
import type { Application } from '@/pages/home/types/application';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import ModalButton from '@/shared/components/button/modal-button';
import Modal from '@/shared/components/modal/modal';
import ModalFeedback from '@/shared/components/modal/modal-feedback';
import SkeletonModalRow from '@/shared/components/skeleton/skeleton-modal-row';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

const SKELETON_ROW_COUNT = 4;

interface ApplicationHistoryModalProps {
  isOpen: boolean;
  // 이번 방문에서 지원한 내역. 목 지원 내역 앞에 붙여 최근 순으로 보여 줘요.
  sessionApplications?: Application[];
  onClose: () => void;
}

// 스티키 허브의 "지원 내역" 버튼으로 여는 모달이에요.
// 모달 하나 안에서 selectedId로 목록 ↔ 상세 화면을 바꾸고, 다시 열면 항상 목록부터 보여줘요.
const ApplicationHistoryModal = ({
  isOpen,
  sessionApplications = [],
  onClose,
}: ApplicationHistoryModalProps) => {
  const navigate = useNavigate();
  const {
    data: savedApplications,
    isPending,
    isError,
    refetch,
  } = useApplications({ enabled: isOpen });

  const applications = [...sessionApplications, ...(savedApplications ?? [])];

  const { data: myKeywords } = useMyKeywordsQuery();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<number | null>(null);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setSelectedId(null);
      setLastSelectedId(null);
    }
  }

  const selectedApplication = applications.find(
    (application) => application.id === selectedId,
  );

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setLastSelectedId(id);
  };

  const handleBackToList = () => setSelectedId(null);

  // 검색 화면은 검색어가 있어야 열려서, 내 MY FIT 첫 키워드로 검색해요.
  // 키워드가 없으면 모달만 닫고 홈 공고 피드를 보게 해요.
  const handleSearchJobs = () => {
    onClose();
    const firstKeyword = myKeywords?.[0]?.name;
    if (!firstKeyword) return;

    navigate({
      pathname: ROUTES.SEARCH,
      search: createSearchParams({
        [SEARCH_KEYWORD_PARAM]: firstKeyword,
      }).toString(),
    });
  };

  const handleRetry = () => {
    void refetch();
  };

  const renderListContent = () => {
    if (isPending) {
      return (
        <section aria-busy="true" className="flex flex-col gap-3">
          <ApplicationHistorySectionHeader
            title="지원 내역을 불러오고 있어요"
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
          title="지원 내역을 불러오지 못했습니다"
          description="네트워크를 확인한 뒤 다시 시도해 주세요."
          className="flex-1"
        />
      );
    }

    if (applications.length === 0) {
      return (
        <ModalFeedback
          status="empty"
          title="아직 지원 내역이 없습니다"
          description="준비한 지원 패키지로 원하는 공고에 바로 지원해 보세요."
          className="flex-1"
        />
      );
    }

    return (
      <ApplicationHistoryList
        applications={applications}
        returnFocusId={lastSelectedId}
        onSelect={handleSelect}
      />
    );
  };

  const renderPrimaryAction = () => {
    if (isPending) {
      return <ModalButton aria-disabled="true">불러오는 중</ModalButton>;
    }
    if (isError) {
      return <ModalButton onClick={handleRetry}>다시 시도</ModalButton>;
    }
    return <ModalButton onClick={handleSearchJobs}>공고 찾기</ModalButton>;
  };

  if (selectedApplication) {
    return (
      <Modal
        title="지원 상세"
        size="wide"
        isOpen={isOpen}
        onClose={onClose}
        footer={
          <>
            <ModalButton variant="secondary" onClick={handleBackToList}>
              목록으로
            </ModalButton>
            {/* 동작 없는 더미 버튼 */}
            <ModalButton>공고 보기</ModalButton>
          </>
        }
      >
        <ApplicationHistoryDetail
          key={selectedApplication.id}
          application={selectedApplication}
        />
      </Modal>
    );
  }

  return (
    <Modal
      title="지원 내역"
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
      {renderListContent()}
    </Modal>
  );
};

export default ApplicationHistoryModal;
