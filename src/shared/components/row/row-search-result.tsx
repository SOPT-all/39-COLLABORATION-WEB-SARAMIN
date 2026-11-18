import type { ComponentProps } from 'react';

import BadgeMatch from '@/shared/components/badge/badge-match';
import BookmarkButton from '@/shared/components/button/bookmark-button';
import SkeletonSearchResultItem from '@/shared/components/skeleton/skeleton-search-result-item';
import { cn } from '@/shared/utils/cn';

interface RowSearchResultLoadedProps extends ComponentProps<'article'> {
  contentState: 'loaded';
  matchCount: number;
  keywordCount: number;
  deadline: string;
  matchedKeywords: string;
  title: string;
  meta: string;
  companyName: string;
  companyMeta: string;
  isBookmarked: boolean;
  onBookmarkClick: () => void;
  // 공고 제목을 누르면 공고 상세 모달을 열어요. 없으면 제목은 글자만 보여요.
  onTitleClick?: () => void;
}

// 로딩에는 결과 데이터가 필요 없어요. 기존 결과가 함께 전달되어도 스켈레톤만 표시해요.
interface RowSearchResultLoadingProps extends Partial<
  Omit<RowSearchResultLoadedProps, 'contentState'>
> {
  contentState: 'loading';
}

type RowSearchResultProps =
  RowSearchResultLoadedProps | RowSearchResultLoadingProps;

const RowSearchResult = ({
  contentState,
  matchCount,
  keywordCount,
  deadline,
  matchedKeywords,
  title,
  meta,
  companyName,
  companyMeta,
  isBookmarked,
  onBookmarkClick,
  onTitleClick,
  className,
  ...props
}: RowSearchResultProps) => {
  if (contentState === 'loading') {
    return (
      <article
        aria-busy="true"
        aria-label="검색 결과를 불러오는 중"
        className={cn('w-full', className)}
        {...props}
      >
        <SkeletonSearchResultItem className="w-full" />
      </article>
    );
  }

  return (
    <article
      className={cn(
        'flex w-full flex-col border-b border-border-default bg-surface-default pt-4',
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between px-4">
        {/* 적용한 MY FIT 키워드가 없으면(0/0) 일치 배지를 숨겨요. 마감은 오른쪽에 그대로 둬요. */}
        {keywordCount > 0 && (
          <BadgeMatch matchCount={matchCount} keywordCount={keywordCount} />
        )}
        <p className="ml-auto w-12.5 shrink-0 text-center text-caption-12 text-status-danger">
          {deadline}
        </p>
      </div>
      {/* 일치 키워드가 없으면 빈 '일치' 줄을 그리지 않아요. */}
      {matchedKeywords && (
        <p className="px-4 pt-3 text-caption-12">
          <span className="text-green-100">일치</span>
          <span className="text-text-secondary">{`  ${matchedKeywords}`}</span>
        </p>
      )}
      <div className="flex min-h-18 items-center gap-3 px-4 pb-4">
        <BookmarkButton
          isSelected={isBookmarked}
          className="shrink-0"
          onClick={onBookmarkClick}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {onTitleClick ? (
            <button
              type="button"
              aria-haspopup="dialog"
              className="text-left text-heading-20 text-text-primary hover:underline"
              onClick={onTitleClick}
            >
              {title}
            </button>
          ) : (
            <p className="text-heading-20 text-text-primary">{title}</p>
          )}
          <p className="text-body-14 text-text-secondary">{meta}</p>
        </div>
        <div className="flex w-47.5 shrink-0 flex-col items-end gap-0.75 text-right">
          <p className="w-full text-title-16 text-text-primary">
            {companyName}
          </p>
          <p className="w-full text-caption-12 text-text-tertiary">
            {companyMeta}
          </p>
        </div>
      </div>
    </article>
  );
};

export default RowSearchResult;
