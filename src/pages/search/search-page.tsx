import { useEffect, useState } from 'react';
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
import {
  filterKeywordCandidates,
  getKeywordCandidateToSubmit,
} from '@/pages/search/utils/filter-keyword-candidates';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import KeywordSearchPanel from '@/shared/components/search/keyword-search-panel';
import StateMessage from '@/shared/components/state-message/state-message';
import { ROUTES } from '@/shared/constants/routes';
import {
  SEARCH_KEYWORD_MAX_LENGTH,
  SEARCH_KEYWORD_PARAM,
  SEARCH_PAGE_PARAM,
} from '@/shared/constants/search';
import { useDocumentTitle } from '@/shared/hooks/use-document-title';

const SEARCH_PAGE_SIZE = 7;

// 주소의 검색어는 두고 페이지 번호만 바꿔요. 첫 페이지는 주소에서 빼요.
const setPageParam = (searchParams: URLSearchParams, page: number) => {
  const next = new URLSearchParams(searchParams);
  if (page > 0) next.set(SEARCH_PAGE_PARAM, String(page + 1));
  else next.delete(SEARCH_PAGE_PARAM);
  return next;
};

// 주소의 페이지 번호(1부터)를 조회용 번호(0부터)로 바꿔요. 없거나 잘못된 값은 첫 페이지예요.
const convertPageParamToPage = (pageParam: string | null) => {
  const page = Number(pageParam);
  return Number.isInteger(page) && page >= 1 ? page - 1 : 0;
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // 주소에 직접 긴 검색어를 넣어도 서버가 받는 길이까지만 써요. (넘으면 400)
  const keyword = (searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '').slice(
    0,
    SEARCH_KEYWORD_MAX_LENGTH,
  );

  useDocumentTitle(`‘${keyword}’ 검색 결과`);

  const myKeywordsQuery = useMyKeywordsQuery();
  const [appliedMyFitKeywords, setAppliedMyFitKeywords] = useState<
    string[] | null
  >(null);
  const [myFitInput, setMyFitInput] = useState('');

  // null은 초기화 전, []는 기본 키워드가 없는 정상 응답이에요.
  // 최초 성공한 값만 저장해 재조회가 칩 목록과 검색 조건을 덮어쓰지 않아요.
  if (appliedMyFitKeywords === null && myKeywordsQuery.isSuccess) {
    setAppliedMyFitKeywords(myKeywordsQuery.data.map(({ name }) => name));
  }

  const hasInitializedMyFitKeywords = appliedMyFitKeywords !== null;
  const isMyFitInitializationError =
    !hasInitializedMyFitKeywords && myKeywordsQuery.isError;

  // 페이지 번호는 주소에 둬요. 새로고침 · 뒤로가기 · 링크 공유에도 보던 페이지가 유지돼요.
  // 새 검색어로 이동하면 주소에 page가 없어서 첫 페이지부터 조회해요.
  const pageParam = searchParams.get(SEARCH_PAGE_PARAM);
  const currentPage = convertPageParamToPage(pageParam);

  // 같은 검색 결과 안에서 페이지만 바꾸는 거라 화면을 맨 위로 올리지 않아요. (결과 영역으로는 JobResultSection이 올려요)
  const changePageParam = (page: number, options?: { replace?: boolean }) => {
    setSearchParams((previous) => setPageParam(previous, page), {
      ...options,
      preventScrollReset: true,
    });
  };

  // 2페이지 이상에서 칩을 바꿨을 때, 첫 페이지로 주소가 바뀐 뒤에 적용할 키워드예요.
  // 주소 변경은 다음 렌더에 반영돼서, 먼저 적용하면 새 조건으로 이전 페이지를 한 번 더 요청해요.
  const [pendingMyFitKeywords, setPendingMyFitKeywords] = useState<
    string[] | null
  >(null);

  if (pendingMyFitKeywords !== null && currentPage === 0) {
    setAppliedMyFitKeywords(pendingMyFitKeywords);
    setPendingMyFitKeywords(null);
  }

  // 화면에 보이는 칩이에요. 첫 페이지로 넘어가는 중에도 바뀐 칩을 바로 보여 줘요.
  const myFitKeywords = pendingMyFitKeywords ?? appliedMyFitKeywords ?? [];

  // 잘못된 페이지 값(page=abc · page=0 · page=02)과 생략할 page=1은 주소를 바로잡아요. 기록은 남기지 않아요.
  const isInvalidPageParam =
    pageParam !== null &&
    (currentPage === 0 || String(currentPage + 1) !== pageParam);

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
    searchQuery.isSuccess &&
    !searchQuery.isPlaceholderData &&
    searchData !== undefined &&
    searchData.page === currentPage &&
    currentPage > 0 &&
    currentPage >= totalPages;
  const resolvedPage = isPageOutOfRange
    ? Math.max(totalPages - 1, 0)
    : currentPage;

  const shouldReplacePageParam = isPageOutOfRange || isInvalidPageParam;

  // 렌더 중에는 주소를 바꿀 수 없어서 그린 뒤에 바로잡아요.
  useEffect(() => {
    if (!shouldReplacePageParam) return;
    setSearchParams((previous) => setPageParam(previous, resolvedPage), {
      replace: true,
      preventScrollReset: true,
    });
  }, [shouldReplacePageParam, resolvedPage, setSearchParams]);

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
    // 페이지 이동은 기록에 남겨 뒤로가기로 이전 페이지에 돌아가요.
    changePageParam(nextPage);
  };

  const handleRetry = () => {
    if (!hasInitializedMyFitKeywords) {
      void myKeywordsQuery.refetch();
      return;
    }
    void searchQuery.refetch();
  };

  // 칩을 추가 · 삭제하면 검색하기 없이 바로 다시 조회해요. (기능명세서 FR-09 즉시 반영)
  // 2페이지 이상이면 첫 페이지로 돌아간 뒤 새 조건으로 조회해요.
  const applyMyFitKeywords = (nextKeywords: string[]) => {
    if (!hasInitializedMyFitKeywords) return;
    if (currentPage === 0) {
      setAppliedMyFitKeywords(nextKeywords);
      return;
    }
    setPendingMyFitKeywords(nextKeywords);
    changePageParam(0);
  };

  const handleMyFitKeywordRemove = (removedKeyword: string) => {
    applyMyFitKeywords(
      myFitKeywords.filter(
        (selectedKeyword) => selectedKeyword !== removedKeyword,
      ),
    );
  };

  // 입력한 글자로 거른 키워드 후보예요. (기능명세서 FR-09)
  const myFitCandidateGroups = filterKeywordCandidates(
    myFitInput,
    myFitKeywords,
  );

  // Enter는 입력과 같은 후보, 없으면 첫 후보를 추가해요. 후보가 없으면 추가하지 않고 안내만 보여요.
  const handleMyFitKeywordSubmit = (input: string) => {
    const candidate = getKeywordCandidateToSubmit(input, myFitCandidateGroups);
    if (candidate) handleMyFitKeywordAdd(candidate);
  };

  // 고른 키워드를 칩 목록 끝에 더하고 바로 다시 조회해요.
  const handleMyFitKeywordAdd = (addedKeyword: string) => {
    const nextKeyword = addedKeyword.trim();
    if (!hasInitializedMyFitKeywords) return;

    setMyFitInput('');
    if (!nextKeyword) return;
    const isDuplicated = myFitKeywords.some(
      (selectedKeyword) =>
        selectedKeyword.toLowerCase() === nextKeyword.toLowerCase(),
    );
    if (isDuplicated) return;
    applyMyFitKeywords([...myFitKeywords, nextKeyword]);
  };

  // 칩은 바꾸는 즉시 반영돼서, 검색하기는 지금 조건으로 첫 페이지부터 다시 조회해요. (시안의 버튼 유지)
  const handleMyFitSearch = () => {
    if (!hasInitializedMyFitKeywords) return;
    if (currentPage === 0) {
      void searchQuery.refetch();
      return;
    }
    changePageParam(0);
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
          <h1 className="min-w-0 text-heading-20 break-all text-text-primary">
            ‘{keyword}’에 대한 취업정보
          </h1>
          <span className="shrink-0 text-body-14 whitespace-pre text-text-secondary">
            {SEARCH_PAGE_SIZE}개씩
          </span>
        </div>

        <div className="mt-5 flex items-start gap-8">
          <aside aria-label="MY FIT" className="sticky top-6 w-69 shrink-0">
            {/* 후보 중에서 고르거나 Enter로 가장 맞는 후보를 추가해요. 칩을 추가 · 삭제하면 바로 다시 조회해요. */}
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
                onKeywordSubmit={handleMyFitKeywordSubmit}
                candidateGroups={myFitCandidateGroups}
                onCandidateSelect={handleMyFitKeywordAdd}
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
              appliedKeywords={appliedMyFitKeywords ?? undefined}
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
