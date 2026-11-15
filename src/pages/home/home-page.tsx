import ApplyFilterBar from '@/pages/home/components/apply-filter-bar';
import CareerCtaSection from '@/pages/home/components/career-cta-section';
import CareerToolsSection from '@/pages/home/components/career-tools-section';
import DocumentToolsSection from '@/pages/home/components/document-tools-section';
import HiringBanner from '@/pages/home/components/hiring-banner';
import KeywordPanelSection from '@/pages/home/components/keyword-panel-section';
import RecruitFeedSection from '@/pages/home/components/recruit-feed-section';
import StickyRailSection from '@/pages/home/components/sticky-rail-section';
import {
  MOCK_MY_KEYWORDS,
  MOCK_RECRUITS,
} from '@/pages/home/constants/mock-recruits';
import { useApplyFilter } from '@/pages/home/hooks/use-apply-filter';
import { getApplyStatusCounts } from '@/pages/home/utils/get-apply-status-counts';

const APPLY_STATUS_COUNTS = getApplyStatusCounts(
  Object.values(MOCK_RECRUITS).flat(),
);

// 섹션 배치만 담당해요. 각 섹션은 담당자가 자기 파일에서 작업해요. (#31)
const HomePage = () => {
  const { selectedFilter, toggleFilter } = useApplyFilter();

  return (
    <>
      <h1 className="sr-only">사람인 홈</h1>

      {/* 왼쪽 스티키 레일 · 오른쪽 공고 피드 */}
      <div className="mx-auto flex w-315 items-start gap-6 pt-8 pb-18">
        <StickyRailSection />
        <div className="flex w-240 flex-col gap-6">
          <KeywordPanelSection keywords={MOCK_MY_KEYWORDS} />
          <ApplyFilterBar
            selectedFilter={selectedFilter}
            counts={APPLY_STATUS_COUNTS}
            onFilterChange={toggleFilter}
          />
          <HiringBanner />
          <RecruitFeedSection selectedFilter={selectedFilter} />
        </div>
      </div>

      <CareerToolsSection />
      <DocumentToolsSection />
      <CareerCtaSection />
    </>
  );
};

export default HomePage;
