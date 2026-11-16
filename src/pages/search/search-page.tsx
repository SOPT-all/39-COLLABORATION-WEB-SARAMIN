import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';

import CompanyInfoSection from '@/pages/search/components/company-info-section';
import JobResultSection from '@/pages/search/components/job-result-section';
import PowerLinkSection from '@/pages/search/components/power-link-section';
import SearchFilterBand from '@/pages/search/components/search-filter-band';
import SearchSatisfactionSection from '@/pages/search/components/search-satisfaction-section';
import SearchSummary from '@/pages/search/components/search-summary';
import SearchUtilities from '@/pages/search/components/search-utilities';
import {
  MOCK_MYFIT_KEYWORDS,
  MOCK_SEARCH_RESULT_TOTAL,
  MOCK_SEARCH_RESULTS,
} from '@/pages/search/constants/mock-search';
import KeywordSearchPanel from '@/shared/components/search/keyword-search-panel';
import { ROUTES } from '@/shared/constants/routes';
import { SEARCH_KEYWORD_PARAM } from '@/shared/constants/search';

// TODO(#72): keyword와 myFitKeywords를 검색 쿼리 조건으로 연결해요.
// FR-09는 칩 변경 즉시 재조회·0개일 때 기본 목록·재조회 중 결과 유지를 명시해요.
// 즉시 반영의 범위와 검색하기 버튼 역할은 질문 답변을 확인한 뒤 연결해요.
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEYWORD_PARAM)?.trim() ?? '';
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
            {/* TODO(FR-09): 입력값으로 후보를 조회하고, 후보 선택 시 myFitKeywords에 추가해요. */}
            {/* 시안의 검색하기 버튼은 역할 협의 전까지 연결하지 않아요. */}
            <KeywordSearchPanel
              keywords={myFitKeywords}
              keyword={myFitInput}
              onKeywordChange={setMyFitInput}
              onRemove={handleMyFitKeywordRemove}
            />
          </aside>

          <div className="w-238 rounded-2xl border border-gray-30 bg-surface-default">
            {/* TODO(#72): 목 데이터를 쿼리 결과로 바꾸고 isLoading, isError, onRetry를 연결해요. */}
            <JobResultSection
              results={MOCK_SEARCH_RESULTS}
              totalCount={MOCK_SEARCH_RESULT_TOTAL}
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
