import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import ApplicationHistoryModal from '@/pages/home/components/application-history-modal';
import ApplyFilterBar from '@/pages/home/components/apply-filter-bar';
import BundleSummaryModal from '@/pages/home/components/bundle-summary-modal';
import CareerCtaSection from '@/pages/home/components/career-cta-section';
import CareerToolsSection from '@/pages/home/components/career-tools-section';
import DocumentManagementModal from '@/pages/home/components/document-management-modal';
import DocumentToolsSection from '@/pages/home/components/document-tools-section';
import DocumentUploadModal from '@/pages/home/components/document-upload-modal';
import HiringBanner from '@/pages/home/components/hiring-banner';
import KeywordPanelSection from '@/pages/home/components/keyword-panel-section';
import RecruitFeedSection from '@/pages/home/components/recruit-feed-section';
import StickyRailSection from '@/pages/home/components/sticky-rail-section';
import { APPLY_DOCUMENT_SUMMARY } from '@/pages/home/constants/apply-drag';
import { useApplyDrag } from '@/pages/home/hooks/use-apply-drag';
import { useApplyFilter } from '@/pages/home/hooks/use-apply-filter';
import { useRecruitFeed } from '@/pages/home/hooks/use-recruit-feed';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type { RecruitSectionType } from '@/pages/home/types/recruit';
import { createApplication } from '@/pages/home/utils/create-application';
import { getApplyStatusCounts } from '@/pages/home/utils/get-apply-status-counts';
import { createMockSubmitApplication } from '@/shared/api/create-mock-submit-application';
import { useMyDocumentsQuery } from '@/shared/api/use-my-documents-query';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import ModalApplyFlow from '@/shared/components/modal/modal-apply-flow';
import { checkIsOpenApplicationHistoryState } from '@/shared/constants/routes';
import { useApplyFlow } from '@/shared/hooks/use-apply-flow';
import { useSessionApplications } from '@/shared/hooks/use-session-applications';
import { createApplyDocumentSummary } from '@/shared/utils/create-apply-document-summary';

// 지원 API가 없어 목 제출 함수로 항상 성공 처리
const submitApplication = createMockSubmitApplication('success');

// 섹션 배치와 섹션끼리 주고받는 상태(지원 패키지 드래그 · 지원 플로우 · 지원 내역) 담당
const HomePage = () => {
  const { selectedFilter, toggleFilter } = useApplyFilter();
  const { isDragging, bundleProps } = useApplyDrag();
  // 스티키 레일과 같은 쿼리 키라 요청은 한 번만 나감
  const { data: myDocuments } = useMyDocumentsQuery();
  const myKeywordsQuery = useMyKeywordsQuery();
  const location = useLocation();
  const navigate = useNavigate();
  // 이번 방문에서 지원한 기록. 홈 드롭과 비교 모달 바로 지원이 함께 써요.
  const { sessionApplications, addApplication } = useSessionApplications();
  const appliedAtByRecruitId = useMemo(
    () =>
      new Map(
        sessionApplications.map(({ target, appliedAt }) => [
          target.recruitId,
          appliedAt,
        ]),
      ),
    [sessionApplications],
  );
  // 지원 API가 없어 지원 내역 모달 목록 맨 앞에 붙여 보여 줘요.
  const historyApplications = useMemo(
    () =>
      sessionApplications.map(({ target, appliedAt, myDocuments: documents }) =>
        createApplication(target, documents, new Date(appliedAt)),
      ),
    [sessionApplications],
  );
  // 비교 모달에서 '지원 내역 보기'로 넘어오면 지원 내역 모달을 바로 열어요.
  const [isHistoryOpen, setIsHistoryOpen] = useState(() =>
    checkIsOpenApplicationHistoryState(location.state),
  );
  const [isBundleOpen, setIsBundleOpen] = useState(false);
  const [isDocumentManagementOpen, setIsDocumentManagementOpen] =
    useState(false);
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    ReadonlySet<RecruitSectionType>
  >(() => new Set());
  const recruitSections = useRecruitFeed(
    appliedAtByRecruitId,
    expandedSections,
  );
  const applyStatusCounts = getApplyStatusCounts(
    Object.values(recruitSections).flatMap(({ recruits }) => recruits),
  );

  const { step, target, openApplyFlow, closeApplyFlow, submit } = useApplyFlow({
    submitApplication,
    onApplySuccess: (applyTarget) =>
      addApplication({
        target: applyTarget,
        appliedAt: new Date().toISOString(),
        myDocuments,
      }),
  });

  const handleApplyDrop = (recruit: JobCardItem) => {
    openApplyFlow({
      recruitId: recruit.id,
      companyName: recruit.companyName,
      positionName: recruit.title,
      documentSummary: myDocuments
        ? createApplyDocumentSummary(myDocuments)
        : APPLY_DOCUMENT_SUMMARY,
    });
  };

  const handleToggleExpand = (type: RecruitSectionType) => {
    setExpandedSections((previous) => {
      const next = new Set(previous);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  // 지원 패키지 모달에서 서류 관리로 넘어가요.
  const handleBundleDocumentManageClick = () => {
    setIsBundleOpen(false);
    setIsDocumentManagementOpen(true);
  };

  // 서류 관리 ↔ 서류 추가 모달을 오가요. 추가를 마치거나 취소하면 서류 관리로 돌아가요.
  const handleAddDocumentClick = () => {
    setIsDocumentManagementOpen(false);
    setIsDocumentUploadOpen(true);
  };

  const handleDocumentUploadClose = () => {
    setIsDocumentUploadOpen(false);
    setIsDocumentManagementOpen(true);
  };

  // 비교 모달에서 넘어와 연 경우, 닫을 때 주소의 state도 비워 새로고침해도 다시 열리지 않게 해요.
  const handleHistoryClose = () => {
    setIsHistoryOpen(false);
    if (checkIsOpenApplicationHistoryState(location.state)) {
      navigate(location, {
        replace: true,
        state: null,
        preventScrollReset: true,
      });
    }
  };

  const handleViewHistory = () => {
    closeApplyFlow();
    setIsHistoryOpen(true);
  };

  return (
    <>
      <h1 className="sr-only">사람인 홈</h1>

      {/* 왼쪽 스티키 레일 · 오른쪽 공고 피드 */}
      <div className="mx-auto flex w-315 items-start gap-6 pt-8 pb-18">
        <StickyRailSection
          isDragging={isDragging}
          bundleProps={bundleProps}
          onBundleClick={() => setIsBundleOpen(true)}
          onDocumentManageClick={() => setIsDocumentManagementOpen(true)}
          onApplicationHistoryClick={() => setIsHistoryOpen(true)}
        />
        <div className="flex w-240 flex-col gap-6">
          <KeywordPanelSection
            keywords={myKeywordsQuery.data ?? []}
            isPending={myKeywordsQuery.isPending}
            isError={myKeywordsQuery.isError}
            onRetry={() => void myKeywordsQuery.refetch()}
          />
          <ApplyFilterBar
            selectedFilter={selectedFilter}
            counts={applyStatusCounts}
            onFilterChange={toggleFilter}
          />
          <HiringBanner />
          <RecruitFeedSection
            selectedFilter={selectedFilter}
            isDragging={isDragging}
            sections={recruitSections}
            expandedSections={expandedSections}
            onToggleExpand={handleToggleExpand}
            onApplyDrop={handleApplyDrop}
          />
        </div>
      </div>

      <CareerToolsSection />
      <DocumentToolsSection />
      <CareerCtaSection />

      <ModalApplyFlow
        step={step}
        target={target}
        onClose={closeApplyFlow}
        onSubmit={submit}
        onRetry={submit}
        onViewHistory={handleViewHistory}
      />
      {myDocuments && (
        <BundleSummaryModal
          isOpen={isBundleOpen}
          onClose={() => setIsBundleOpen(false)}
          myDocuments={myDocuments}
          onDocumentManageClick={handleBundleDocumentManageClick}
        />
      )}
      <DocumentManagementModal
        isOpen={isDocumentManagementOpen}
        onClose={() => setIsDocumentManagementOpen(false)}
        onAddDocumentClick={handleAddDocumentClick}
      />
      <DocumentUploadModal
        isOpen={isDocumentUploadOpen}
        onClose={handleDocumentUploadClose}
      />
      <ApplicationHistoryModal
        isOpen={isHistoryOpen}
        sessionApplications={historyApplications}
        onClose={handleHistoryClose}
      />
    </>
  );
};

export default HomePage;
