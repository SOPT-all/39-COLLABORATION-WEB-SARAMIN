import { useState } from 'react';

import { cn } from '@/shared/utils/cn';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';

const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 점수를 고르면 선택 표시와 감사 안내를 보여 주고, ✕로 닫을 수 있어요. (저장 API가 없어 화면에서만)
const SearchSatisfactionSection = () => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <section
      aria-labelledby="search-satisfaction-title"
      className="flex flex-col gap-4 rounded-2xl border border-gray-30 bg-surface-blue-subtle px-10 pt-6 pb-8"
    >
      <div className="flex items-center">
        <h2
          id="search-satisfaction-title"
          className="flex-1 text-center text-body-12 text-blue-80"
        >
          검색결과 만족도 조사
        </h2>
        <button
          type="button"
          aria-label="만족도 조사 닫기"
          className="flex size-6 items-center justify-center"
          onClick={() => setIsClosed(true)}
        >
          <IcClose aria-hidden />
        </button>
      </div>
      <p className="text-title-14 text-gray-120">
        현재 보고 계신 검색 결과에 얼마나 만족하시나요?
      </p>
      <div className="flex h-11 bg-surface-default">
        {SCORES.map((score) => (
          <button
            key={score}
            type="button"
            aria-pressed={selectedScore === score}
            className={cn(
              'flex flex-1 items-center justify-center border border-gray-30 text-body-14 text-text-secondary',
              selectedScore === score && 'border-blue-90 bg-blue-90 text-white',
            )}
            onClick={() => setSelectedScore(score)}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-body-12 text-text-secondary">
        <span>매우 불만족</span>
        <span>매우 만족</span>
      </div>
      {selectedScore !== null && (
        <p role="status" className="text-center text-body-12 text-blue-80">
          소중한 의견 감사합니다. 더 나은 검색 결과를 만드는 데 참고할게요.
        </p>
      )}
    </section>
  );
};

export default SearchSatisfactionSection;
