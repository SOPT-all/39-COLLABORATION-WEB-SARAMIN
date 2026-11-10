import { useSearchParams } from 'react-router';

import CompanyInfoSection from '@/pages/search/components/company-info-section';
import JobResultSection from '@/pages/search/components/job-result-section';
import PowerLinkSection from '@/pages/search/components/power-link-section';
import SearchFilterBand from '@/pages/search/components/search-filter-band';
import SearchSatisfactionSection from '@/pages/search/components/search-satisfaction-section';
import SearchSummary from '@/pages/search/components/search-summary';
import SearchUtilities from '@/pages/search/components/search-utilities';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

// TODO: 검색 API가 나오면 keyword로 결과를 조회해요.
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM) ?? '';

  return (
    <>
      <SearchFilterBand keyword={keyword} />
      <SearchSummary keyword={keyword} />

      <div className="mx-auto w-315 pt-6.5 pb-14.5">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-20 text-text-primary">
            ‘{keyword}’에 대한 취업정보
          </h2>
          <span className="text-body-14 whitespace-pre text-text-secondary">
            관련도순 · 40개씩
          </span>
        </div>

        <div className="mt-5 flex items-start gap-8">
          {/* MY FIT 패널 자리 (검색 컴포넌트 #30으로 교체) */}
          <aside
            aria-label="MY FIT"
            className="sticky top-6 flex h-117 w-69 shrink-0 items-center justify-center rounded-2xl border border-dashed border-border-default text-body-14 text-text-tertiary"
          >
            MY FIT 패널 자리
          </aside>

          <div className="w-238 rounded-2xl border border-gray-30 bg-surface-default">
            <JobResultSection />
            <div className="mx-2.75 flex flex-col pt-12.5">
              <CompanyInfoSection />
              <div className="mt-4">
                <PowerLinkSection />
              </div>
              <div className="mt-10">
                <SearchSatisfactionSection />
              </div>
              <SearchUtilities />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
