import { useState } from 'react';

import { createMockSubmitApplication } from '@/pages/home/api/create-mock-submit-application';
import { useMyDocumentsQuery } from '@/pages/home/api/use-my-documents-query';
import ApplicationHistoryModal from '@/pages/home/components/application-history-modal';
import ApplyFilterBar from '@/pages/home/components/apply-filter-bar';
import ApplyFlowModal from '@/pages/home/components/apply-flow-modal';
import CareerCtaSection from '@/pages/home/components/career-cta-section';
import CareerToolsSection from '@/pages/home/components/career-tools-section';
import DocumentToolsSection from '@/pages/home/components/document-tools-section';
import HiringBanner from '@/pages/home/components/hiring-banner';
import KeywordPanelSection from '@/pages/home/components/keyword-panel-section';
import RecruitFeedSection from '@/pages/home/components/recruit-feed-section';
import StickyRailSection from '@/pages/home/components/sticky-rail-section';
import { APPLY_DOCUMENT_SUMMARY } from '@/pages/home/constants/apply-drag';
import {
  MOCK_MY_KEYWORDS,
  MOCK_RECRUITS,
} from '@/pages/home/constants/mock-recruits';
import { useApplyDrag } from '@/pages/home/hooks/use-apply-drag';
import { useApplyFilter } from '@/pages/home/hooks/use-apply-filter';
import { useApplyFlow } from '@/pages/home/hooks/use-apply-flow';
import type { JobCardItem } from '@/pages/home/types/job-card';
import { createApplyDocumentSummary } from '@/pages/home/utils/create-apply-document-summary';
import { getApplyStatusCounts } from '@/pages/home/utils/get-apply-status-counts';

const APPLY_STATUS_COUNTS = getApplyStatusCounts(
  Object.values(MOCK_RECRUITS).flat(),
);

// 지원 API가 없어 목 제출 함수로 항상 성공 처리
const submitApplication = createMockSubmitApplication('success');

// 섹션 배치와 섹션끼리 주고받는 상태(지원 패키지 드래그 · 지원 플로우 · 지원 내역) 담당
const HomePage = () => {
  const { selectedFilter, toggleFilter } = useApplyFilter();
  const { isDragging, bundleProps } = useApplyDrag();
  // 스티키 레일과 같은 쿼리 키라 요청은 한 번만 나감
  const { data: myDocuments } = useMyDocumentsQuery();
  const [appliedAtByRecruitId, setAppliedAtByRecruitId] = useState<
    ReadonlyMap<number, string>
  >(() => new Map());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
          onApplicationHistoryClick={() => setIsHistoryOpen(true)}
        />
        <div className="flex w-240 flex-col gap-6">
          <KeywordPanelSection keywords={MOCK_MY_KEYWORDS} />
          <ApplyFilterBar
            selectedFilter={selectedFilter}
            counts={APPLY_STATUS_COUNTS}
            onFilterChange={toggleFilter}
          />
          <HiringBanner />
          <RecruitFeedSection
            selectedFilter={selectedFilter}
            isDragging={isDragging}
            appliedAtByRecruitId={appliedAtByRecruitId}
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
      <ApplicationHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
};

export default HomePage;
