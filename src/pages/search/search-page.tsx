import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import CompanyInfoSection from '@/pages/search/components/company-info-section';
import JobResultSection from '@/pages/search/components/job-result-section';
import PowerLinkSection from '@/pages/search/components/power-link-section';
import SearchFilterBand from '@/pages/search/components/search-filter-band';
import SearchSatisfactionSection from '@/pages/search/components/search-satisfaction-section';
import SearchSummary from '@/pages/search/components/search-summary';
import SearchUtilities from '@/pages/search/components/search-utilities';
import { MOCK_MYFIT_KEYWORDS } from '@/pages/search/constants/mock-search';
import KeywordSearchPanel from '@/shared/components/search/keyword-search-panel';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

// TODO: 검색 API가 나오면 keyword로 결과를 조회해요.
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '';
  const [myFitKeywords, setMyFitKeywords] = useState(MOCK_MYFIT_KEYWORDS);
  const [myFitInput, setMyFitInput] = useState('');

  const handleMyFitKeywordRemove = (removedKeyword: string) => {
    setMyFitKeywords((prev) => prev.filter((item) => item !== removedKeyword));
  };

  // TODO(#72): 선택한 키워드를 공고 검색 API의 keywords로 넘겨요.
  const handleMyFitSearch = () => {
    const newKeyword = myFitInput.trim();
    if (!newKeyword || myFitKeywords.includes(newKeyword)) return;

    setMyFitKeywords((prev) => [...prev, newKeyword]);
    setMyFitInput('');
  };

  // 주소창에 /search만 입력하는 등 검색어가 없으면 홈으로 보내요.
  if (!keyword) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <>
      <SearchFilterBand keyword={keyword} />
      <SearchSummary keyword={keyword} />

      <div className="mx-auto w-315 pt-6.5 pb-14.5">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-20 text-text-primary">
            ‘{keyword}’에 대한 취업정보
          </h1>
          <span className="text-body-14 whitespace-pre text-text-secondary">
            관련도순 · 40개씩
          </span>
        </div>

        <div className="mt-5 flex items-start gap-8">
          <aside aria-label="MY FIT" className="sticky top-6 w-69 shrink-0">
            <KeywordSearchPanel
              keywords={myFitKeywords}
              keyword={myFitInput}
              onKeywordChange={setMyFitInput}
              onRemove={handleMyFitKeywordRemove}
              onSearch={handleMyFitSearch}
            />
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
