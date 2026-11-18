// [스펙] CompareJobColumn
// 역할   : 스크랩 공고 비교 모달의 공고 한 열 (피그마 compare_job_column, 296px)
// props  : job - 비교용 공고 정보 (CompareJob)
//          onUnscrap - "스크랩함"을 눌러 스크랩 해제 → 이 열이 비교에서 빠져요
//          onApply - "바로 지원" → 지원 내용 확인창
// 구조   : [회사 / 공고명] [MY FIT 키워드 n/m 매치 + 일치 칩] [공고 마감 … 우대사항] [스크랩함 │ 바로 지원]

import {
  COMPARE_ROWS,
  MISSING_VALUE_LABEL,
} from '@/pages/search/constants/compare-rows';
import CompareButton from '@/shared/components/button/compare-button';
import CompareScrapButton from '@/shared/components/button/compare-scrap-button';
import ChipKeywordMatch from '@/shared/components/chip/chip-keyword-match';
import type { CompareJob } from '@/shared/types/compare-job';
import { cn } from '@/shared/utils/cn';

interface CompareJobColumnProps {
  job: CompareJob;
  // 내 MY FIT 키워드 이름. 일치 키워드 목록이 없는 홈 공고의 일치 칩을 만들 때 써요.
  myKeywordNames: string[];
  onUnscrap: () => void;
  onApply: () => void;
}

const CompareJobColumn = ({
  job,
  myKeywordNames,
  onUnscrap,
  onApply,
}: CompareJobColumnProps) => {
  const { companyName, title, keywords, matchCount, totalKeywordCount } = job;
  // 홈 공고는 일치 키워드 목록이 없어서 공고 키워드 중 내 키워드와 겹치는 것을 보여 줘요.
  const matchedKeywords =
    job.matchedKeywords ??
    keywords.filter((keyword) => myKeywordNames.includes(keyword));

  return (
    <li className="flex w-74 shrink-0 flex-col gap-3">
      <div className="flex flex-col border-y border-r border-border-default bg-surface-default">
        <div className="flex h-14.75 flex-col justify-center gap-0.5 border-b border-border-default bg-surface-subtle pr-3 pl-4">
          <p className="truncate text-label-12 text-text-secondary">
            {companyName}
          </p>
          <h3 className="truncate text-title-16 text-text-primary">{title}</h3>
        </div>

        <div className="flex h-25.75 flex-col justify-center gap-1.5 overflow-hidden border-b border-border-default px-4 py-2.5">
          <p className="text-label-14 text-text-primary">
            키워드{' '}
            <strong className="text-heading-18 text-blue-90">
              {matchCount}/{totalKeywordCount} 매치
            </strong>
          </p>
          {matchedKeywords.length > 0 && (
            <ul aria-label="일치 키워드" className="flex flex-wrap gap-1.5">
              {matchedKeywords.map((keyword) => (
                <li key={keyword}>
                  <ChipKeywordMatch>{keyword}</ChipKeywordMatch>
                </li>
              ))}
            </ul>
          )}
        </div>

        {COMPARE_ROWS.map(({ key, heightClassName, getValue }, index) => {
          const value = getValue(job);
          const isLast = index === COMPARE_ROWS.length - 1;

          return (
            <p
              key={key}
              className={cn(
                'flex items-center px-4 py-2 text-body-14',
                heightClassName,
                !isLast && 'border-b border-border-default',
                value ? 'text-text-primary' : 'text-text-tertiary',
              )}
            >
              {value ?? MISSING_VALUE_LABEL}
            </p>
          );
        })}
      </div>

      <div className="flex gap-2 px-2.5">
        <CompareScrapButton isSaved className="flex-1" onClick={onUnscrap} />
        <CompareButton className="flex-1" onClick={onApply}>
          바로 지원
        </CompareButton>
      </div>
    </li>
  );
};

export default CompareJobColumn;
