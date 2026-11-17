import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import { useSearchJobPostingsQuery } from '@/pages/search/api/use-search-job-postings-query';
import CompanyInfoSection from '@/pages/search/components/company-info-section';
import JobResultSection from '@/pages/search/components/job-result-section';
import PowerLinkSection from '@/pages/search/components/power-link-section';
import SearchFilterBand from '@/pages/search/components/search-filter-band';
import SearchSatisfactionSection from '@/pages/search/components/search-satisfaction-section';
import SearchSummary from '@/pages/search/components/search-summary';
import SearchUtilities from '@/pages/search/components/search-utilities';
import { MOCK_MYFIT_KEYWORDS } from '@/pages/search/constants/mock-search';
import { convertSearchJobPostingToSearchResult } from '@/pages/search/utils/convert-search-job-posting-to-search-result';
import KeywordSearchPanel from '@/shared/components/search/keyword-search-panel';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

const SEARCH_PAGE_SIZE = 40; // 검색결과 페이지당 보여줄 개수

// TODO(#72): MY FIT은 칩 편집과 적용 조건을 분리하고 검색하기 클릭 시 조회해요.
const SearchPage = () => {
  // URL 검색값 가져오기
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '';

  // 쿼리 훅 호출
  const searchQuery = useSearchJobPostingsQuery({
    query: keyword,
    page: 0,
    size: SEARCH_PAGE_SIZE,
  });
  // 쿼리 결과를 화면에서 보여줄 검색결과 데이터로 변환
  const results =
    searchQuery.data?.content.map(convertSearchJobPostingToSearchResult) ?? [];
  // 쿼리 결과의 총 개수
  const totalCount = searchQuery.data?.totalElements ?? 0;
  // 현재 검색 조건으로 다시 요청해요.
  const handleRetry = () => {
    void searchQuery.refetch();
  };

  // MY FIT 검색어 상태 관리
  const [myFitKeywords, setMyFitKeywords] = useState(MOCK_MYFIT_KEYWORDS);
  const [myFitInput, setMyFitInput] = useState('');

  const handleMyFitKeywordRemove = (removedKeyword: string) => {
    setMyFitKeywords((previousKeywords) =>
      previousKeywords.filter(
        (selectedKeyword) => selectedKeyword !== removedKeyword,
      ),
    );
  };

  // 주소창에 /search만 입력하는 등 검색어가 없으면 홈으로 보내요.
  if (!keyword) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <>
      <SearchFilterBand keyword={keyword} />
      {/*SearchFilterBand에 검색어 (keyword) 전달*/}
      <SearchSummary
        keyword={keyword}
        totalCount={totalCount}
        isLoading={searchQuery.isLoading}
        isError={searchQuery.isError}
      />
      {/*SearchSummary에 검색어 (keyword) 전달*/}
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
            {/* TODO(FR-09): 입력값으로 후보를 조회하고, 후보 선택 시 myFitKeywords에 추가해요. */}
            {/* TODO(#72): 검색하기 버튼에 편집한 키워드 적용을 연결해요. */}
            {/*KeywordSearchPanel에 검색어 (myFitKeywords) 전달*/}
            <KeywordSearchPanel
              keywords={myFitKeywords}
              keyword={myFitInput}
              onKeywordChange={setMyFitInput}
              onRemove={handleMyFitKeywordRemove}
            />
          </aside>

          <div className="w-238 rounded-2xl border border-gray-30 bg-surface-default">
            {/* 키워드 조건은 아직 보내지 않으므로 배지 분모도 0이에요. */}
            {/*JobResultSection에 검색결과 (results) 전달*/}
            <JobResultSection
              results={results}
              totalCount={totalCount}
              keywordCount={0}
              isLoading={searchQuery.isLoading}
              isError={searchQuery.isError}
              onRetry={handleRetry}
            />
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
