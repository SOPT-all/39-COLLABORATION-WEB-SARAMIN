// [스펙] CompareJobColumn
// 역할   : 스크랩 공고 비교 모달의 공고 한 열 (피그마 compare_job_column, 296px)
// props  : job - 비교용 공고 정보 (CompareJob)
//          rowKeys - 보여 줄 비교 항목과 순서 (비교 항목 편집 결과)
//          myKeywordNames - 내 MY FIT 키워드 이름 (홈 공고의 일치 칩 계산)
//          handleProps - 열 이동 핸들(≡)에 붙일 드래그 · 키보드 속성
//          isDragOver - 다른 열을 이 자리에 끌어다 놓는 중인지
//          onDetail · onUnscrap · onApply - 상세보기 · 스크랩 해제 · 바로 지원
//          applyBlockedLabel - 지원할 수 없는 이유(접수 마감 · 서류 준비 필요). 넘기면 지원 버튼을 막고 이 문구를 보여 줌
// 구조   : [회사 / 공고명 · 상세보기 · ≡] [MY FIT 키워드 n/m 매치 + 일치 칩] [비교 항목 행들] [스크랩함 │ 바로 지원]

import type { ComponentProps, DragEvent } from 'react';

import {
  COMPARE_ROWS,
  type CompareRowKey,
  MISSING_VALUE_LABEL,
} from '@/pages/search/constants/compare-rows';
import CompareButton from '@/shared/components/button/compare-button';
import CompareScrapButton from '@/shared/components/button/compare-scrap-button';
import ChipKeywordMatch from '@/shared/components/chip/chip-keyword-match';
import type { CompareJob } from '@/shared/types/compare-job';
import { cn } from '@/shared/utils/cn';

import IcReorder from '@/shared/assets/icons/ic-reorder.svg?react';

interface CompareJobColumnProps {
  job: CompareJob;
  rowKeys: CompareRowKey[];
  myKeywordNames: string[];
  handleProps: ComponentProps<'button'>;
  isDragOver: boolean;
  onDragOver: (e: DragEvent<HTMLLIElement>) => void;
  onDrop: (e: DragEvent<HTMLLIElement>) => void;
  onDetail: () => void;
  onUnscrap: () => void;
  onApply: () => void;
  applyBlockedLabel?: string;
}

const CompareJobColumn = ({
  job,
  rowKeys,
  myKeywordNames,
  handleProps,
  isDragOver,
  onDragOver,
  onDrop,
  onDetail,
  onUnscrap,
  onApply,
  applyBlockedLabel,
}: CompareJobColumnProps) => {
  const { companyName, title, keywords, matchCount, totalKeywordCount } = job;
  // 검색 목록의 '내 키워드 n/m 일치'와 같은 기준으로 맞춰요. (분모 = 내 MY FIT 키워드 수)
  // 홈 공고는 일치 키워드 목록이 없어서 공고 키워드 중 내 키워드와 겹치는 것을 써요.
  // 검색에서 키워드를 더해 스크랩한 공고도 내 키워드에 있는 것만 세요.
  const hasMyKeywords = myKeywordNames.length > 0;
  const matchedKeywords = (job.matchedKeywords ?? keywords).filter(
    (keyword) => !hasMyKeywords || myKeywordNames.includes(keyword),
  );
  // 내 키워드를 아직 못 받았으면 스크랩할 때 받은 일치 정보로 보여 줘요.
  const matchLabel = hasMyKeywords
    ? `${matchedKeywords.length}/${myKeywordNames.length} 일치`
    : `${matchCount}/${totalKeywordCount} 일치`;

  return (
    <li
      className={cn(
        'flex w-74 shrink-0 flex-col gap-3',
        isDragOver && 'opacity-60',
      )}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div
        className={cn(
          'flex flex-col border-y border-r border-border-default bg-surface-default',
          isDragOver && 'border-l-2 border-l-blue-90',
        )}
      >
        <div className="flex h-14.75 items-center gap-2 border-b border-border-default bg-surface-subtle pr-3 pl-4">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-label-12 text-text-secondary">
              {companyName}
            </p>
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="truncate text-title-16 text-text-primary">
                {title}
              </h3>
              <button
                type="button"
                aria-haspopup="dialog"
                className="shrink-0 text-label-12 whitespace-nowrap text-text-tertiary"
                onClick={onDetail}
              >
                상세보기 ›
              </button>
            </div>
          </div>
          <button
            type="button"
            aria-label={`${companyName} ${title} 열 이동`}
            className="flex size-6 shrink-0 cursor-grab items-center justify-center rounded-md text-gray-70 active:cursor-grabbing"
            {...handleProps}
          >
            <IcReorder aria-hidden />
          </button>
        </div>

        <div className="flex h-25.75 flex-col justify-center gap-1.5 overflow-hidden border-b border-border-default px-4 py-2.5">
          <p className="text-label-14 text-text-primary">
            내 키워드{' '}
            <strong className="text-heading-18 text-blue-90">
              {matchLabel}
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

        {rowKeys.map((rowKey, index) => {
          const { heightClassName, getValue } = COMPARE_ROWS[rowKey];
          const value = getValue(job);
          const isLast = index === rowKeys.length - 1;

          return (
            <p
              key={rowKey}
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
        <CompareButton
          disabled={Boolean(applyBlockedLabel)}
          className="flex-1 disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-subtle disabled:text-text-tertiary"
          onClick={onApply}
        >
          {applyBlockedLabel ?? '바로 지원'}
        </CompareButton>
      </div>
    </li>
  );
};

export default CompareJobColumn;
