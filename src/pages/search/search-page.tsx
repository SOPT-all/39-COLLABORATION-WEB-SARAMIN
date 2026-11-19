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
import { convertSearchJobPostingToSearchResult } from '@/pages/search/utils/convert-search-job-posting-to-search-result';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import KeywordSearchPanel from '@/shared/components/search/keyword-search-panel';
import StateMessage from '@/shared/components/state-message/state-message';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

const SEARCH_PAGE_SIZE = 7;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '';

  const myKeywordsQuery = useMyKeywordsQuery();
  const [appliedMyFitKeywords, setAppliedMyFitKeywords] = useState<
    string[] | null
  >(null);
  const [editedMyFitKeywords, setEditedMyFitKeywords] = useState<
    string[] | null
  >(null);
  const [myFitInput, setMyFitInput] = useState('');

  // null은 초기화 전, []는 기본 키워드가 없는 정상 응답이에요.
  // 최초 성공한 값만 저장해 재조회가 편집 목록과 검색 조건을 덮어쓰지 않아요.
  if (appliedMyFitKeywords === null && myKeywordsQuery.isSuccess) {
    setAppliedMyFitKeywords(myKeywordsQuery.data.map(({ name }) => name));
  }

  const hasInitializedMyFitKeywords = appliedMyFitKeywords !== null;
  const isMyFitInitializationError =
    !hasInitializedMyFitKeywords && myKeywordsQuery.isError;
  const myFitKeywords = editedMyFitKeywords ?? appliedMyFitKeywords ?? [];

  const [pagination, setPagination] = useState({
    keyword,
    page: 0,
  });

  // 검색어가 바뀌면 첫 페이지부터 다시 조회해요.
  const currentPage = pagination.keyword === keyword ? pagination.page : 0;

  if (pagination.keyword !== keyword) {
    setPagination({ keyword, page: 0 });
  }

  const searchQuery = useSearchJobPostingsQuery(
    {
      query: keyword,
      keywords: appliedMyFitKeywords?.length ? appliedMyFitKeywords : undefined,
      page: currentPage,
      size: SEARCH_PAGE_SIZE,
    },
    hasInitializedMyFitKeywords,
  );
  const searchData = hasInitializedMyFitKeywords ? searchQuery.data : undefined;
  const totalPages = searchData?.totalPages ?? 0;
  // 공고가 줄어 보고 있던 페이지가 없어지면 마지막 페이지로 돌아와요.
  const isPageOutOfRange =
    pagination.keyword === keyword &&
    searchQuery.isSuccess &&
    !searchQuery.isPlaceholderData &&
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
  const isResultPending =
    (!hasInitializedMyFitKeywords && !isMyFitInitializationError) ||
    searchQuery.isLoading ||
    isPageOutOfRange;
  const isResultError =
    isMyFitInitializationError ||
    (hasInitializedMyFitKeywords && searchQuery.isError);
  const isResultRefreshing =
    searchData !== undefined &&
    !isResultPending &&
    !isResultError &&
    (searchQuery.isFetching || searchQuery.isPlaceholderData);

  const handlePageChange = (nextPage: number) => {
    if (
      isResultPending ||
      isResultError ||
      isResultRefreshing ||
      nextPage < 0 ||
      nextPage >= totalPages ||
      nextPage === resolvedPage
    ) {
      return;
    }
    setPagination({ keyword, page: nextPage });
  };

  const handleRetry = () => {
    if (!hasInitializedMyFitKeywords) {
      void myKeywordsQuery.refetch();
      return;
    }
    void searchQuery.refetch();
  };

  const handleMyFitKeywordRemove = (removedKeyword: string) => {
    setEditedMyFitKeywords(
      myFitKeywords.filter(
        (selectedKeyword) => selectedKeyword !== removedKeyword,
      ),
    );
  };

  const handleMyFitSearch = () => {
    if (!hasInitializedMyFitKeywords) return;

    const hasSameKeywords =
      appliedMyFitKeywords.length === myFitKeywords.length &&
      appliedMyFitKeywords.every(
        (appliedKeyword, index) => appliedKeyword === myFitKeywords[index],
      );

    // 같은 조건의 첫 페이지에서도 검색하기를 누르면 다시 조회해요.
    if (hasSameKeywords && currentPage === 0) {
      void searchQuery.refetch();
      return;
    }

    // 같은 이벤트에서 함께 갱신해 새 조건과 이전 페이지로 요청하지 않아요.
    setAppliedMyFitKeywords([...myFitKeywords]);
    setPagination({ keyword, page: 0 });
  };

  // 검색어 없이 /search에 들어오면 공고를 요청하지 않고 홈으로 보내요.
  if (!keyword) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <>
      <SearchFilterBand keyword={keyword} />
      <SearchSummary
        keyword={keyword}
        totalCount={totalCount}
        // 재조회 중에도 이전 건수를 유지해 요약이 사라졌다 나타나지 않아요.
        isLoading={isResultPending}
        isError={isResultError}
      />
      <div className="mx-auto w-315 pt-6.5 pb-14.5">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-20 text-text-primary">
            ‘{keyword}’에 대한 취업정보
          </h1>
          <span className="text-body-14 whitespace-pre text-text-secondary">
            {SEARCH_PAGE_SIZE}개씩
          </span>
        </div>

        <div className="mt-5 flex items-start gap-8">
          <aside aria-label="MY FIT" className="sticky top-6 w-69 shrink-0">
            {/*
              TODO(FR-09): 서버 조회가 아니라 키워드 시트 목록에서 입력값으로 후보를 거르고,
              선택하면 myFitKeywords에 추가해요.
            */}
            {isMyFitInitializationError ? (
              <StateMessage
                kind="error"
                scope="section"
                className="w-full [&>div]:w-full"
                title="키워드를 불러오지 못했어요"
                description="잠시 후 다시 시도해 주세요."
                action={{ label: '다시 시도', onClick: handleRetry }}
              />
            ) : (
              <KeywordSearchPanel
                state={hasInitializedMyFitKeywords ? 'loaded' : 'loading'}
                keywords={myFitKeywords}
                keyword={myFitInput}
                onKeywordChange={setMyFitInput}
                onRemove={handleMyFitKeywordRemove}
                onSearch={handleMyFitSearch}
              />
            )}
          </aside>

          <div className="w-238 rounded-2xl border border-gray-30 bg-surface-default">
            <JobResultSection
              results={results}
              totalCount={totalCount}
              keywordCount={searchData?.keywordCount ?? 0}
              currentPage={searchData?.page ?? resolvedPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isResultPending}
              isRefreshing={isResultRefreshing}
              isError={isResultError}
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
