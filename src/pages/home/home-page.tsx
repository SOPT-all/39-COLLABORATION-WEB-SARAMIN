import { useState } from 'react';

import { createMockSubmitApplication } from '@/pages/home/api/create-mock-submit-application';
import ApplicationHistoryModal from '@/pages/home/components/application-history-modal';
import ApplyFilterBar from '@/pages/home/components/apply-filter-bar';
import ApplyFlowModal from '@/pages/home/components/apply-flow-modal';
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
import { useApplyFlow } from '@/pages/home/hooks/use-apply-flow';
import { useRecruitFeed } from '@/pages/home/hooks/use-recruit-feed';
import type { JobCardItem } from '@/pages/home/types/job-card';
import type { RecruitSectionType } from '@/pages/home/types/recruit';
import { getApplyStatusCounts } from '@/pages/home/utils/get-apply-status-counts';
import { useMyDocumentsQuery } from '@/shared/api/use-my-documents-query';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
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
  const [appliedAtByRecruitId, setAppliedAtByRecruitId] = useState<
    ReadonlyMap<number, string>
  >(() => new Map());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
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
    onApplySuccess: ({ recruitId }) =>
      setAppliedAtByRecruitId((previous) =>
        new Map(previous).set(recruitId, new Date().toISOString()),
      ),
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

      <ApplyFlowModal
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
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
};

export default HomePage;
