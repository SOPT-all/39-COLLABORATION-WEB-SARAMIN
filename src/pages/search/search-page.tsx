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

const SEARCH_PAGE_SIZE = 40;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '';

  const [pagination, setPagination] = useState({
    keyword,
    page: 0,
  });

  // 검색어가 바뀌면 첫 페이지부터 다시 조회해요.
  const currentPage = pagination.keyword === keyword ? pagination.page : 0;

  if (pagination.keyword !== keyword) {
    setPagination({ keyword, page: 0 });
  }

  // TODO(#72): 조건이 바뀌면 이전 결과를 유지하지 않아요. 이전 결과 유지는 후속 작업이에요.
  const searchQuery = useSearchJobPostingsQuery({
    query: keyword,
    page: currentPage,
    size: SEARCH_PAGE_SIZE,
  });
  const searchData = searchQuery.data;
  const totalPages = searchData?.totalPages ?? 0;
  // 공고가 줄어 보고 있던 페이지가 없어지면 마지막 페이지로 돌아와요.
  const isPageOutOfRange =
    pagination.keyword === keyword &&
    searchQuery.isSuccess &&
    searchData !== undefined &&
    searchData.page === currentPage &&
    currentPage > 0 &&
    currentPage >= totalPages;
  const resolvedPage = isPageOutOfRange
    ? Math.max(totalPages - 1, 0)
    : currentPage;

  if (isPageOutOfRange) {
    setPagination({ keyword, page: resolvedPage });
  }

  const results =
    searchData?.content.map(convertSearchJobPostingToSearchResult) ?? [];
  const totalCount = searchData?.totalElements ?? 0;
  const isResultPending = searchQuery.isLoading || isPageOutOfRange;

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 0 || nextPage >= totalPages || nextPage === resolvedPage) {
      return;
    }
    setPagination({ keyword, page: nextPage });
  };

  const handleRetry = () => {
    void searchQuery.refetch();
  };

  const [myFitKeywords, setMyFitKeywords] = useState(MOCK_MYFIT_KEYWORDS);
  const [myFitInput, setMyFitInput] = useState('');

  const handleMyFitKeywordRemove = (removedKeyword: string) => {
    setMyFitKeywords((previousKeywords) =>
      previousKeywords.filter(
        (selectedKeyword) => selectedKeyword !== removedKeyword,
      ),
    );
  };

  // 검색어 없이 /search에 들어오면 공고를 요청하지 않고 홈으로 보내요.
  if (!keyword) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <>
      <SearchFilterBand keyword={keyword} />
      <SearchSummary
        keyword={keyword}
        totalCount={totalCount}
        isLoading={isResultPending}
        isError={searchQuery.isError}
      />
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
            {/*
              TODO(FR-09): 서버 조회가 아니라 키워드 시트 목록에서 입력값으로 후보를 거르고,
              선택하면 myFitKeywords에 추가해요.
            */}
            {/*
              TODO(#72): #71 머지 후 MY FIT 기본 조회를 재사용하고,
              검색하기를 누르면 편집한 키워드 조건을 적용해요.
            */}
            <KeywordSearchPanel
              keywords={myFitKeywords}
              keyword={myFitInput}
              onKeywordChange={setMyFitInput}
              onRemove={handleMyFitKeywordRemove}
            />
          </aside>

          <div className="w-238 rounded-2xl border border-gray-30 bg-surface-default">
            {/* 키워드 조건은 아직 요청에 넣지 않아서 배지 분모는 0이에요. */}
            <JobResultSection
              results={results}
              totalCount={totalCount}
              keywordCount={0}
              currentPage={resolvedPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isResultPending}
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
