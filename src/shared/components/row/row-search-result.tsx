import type { ComponentProps } from 'react';

import BadgeMatch from '@/shared/components/badge/badge-match';
import BookmarkButton from '@/shared/components/button/bookmark-button';
import { cn } from '@/shared/utils/cn';

type SearchResultContentState = 'loaded' | 'loading';

// 페이지 연결: 불러오기 여부는 contentState, 일치 개수는 matchCount, 마감은 deadline,
// 일치 키워드는 matchedKeywords, 공고는 title, 조건은 meta, 회사는 companyName,
// 회사 설명은 companyMeta, 북마크는 isBookmarked와 onBookmarkClick입니다.
// 기본값은 피그마 예시 문구입니다.
interface RowSearchResultProps extends ComponentProps<'article'> {
  contentState?: SearchResultContentState;
  matchCount?: number;
  deadline?: string;
  matchedKeywords?: string;
  title?: string;
  meta?: string;
  companyName?: string;
  companyMeta?: string;
  isBookmarked?: boolean;
  onBookmarkClick?: () => void;
}

const RowSearchResult = ({
  contentState = 'loaded',
  matchCount = 2,
  deadline = 'D-4',
  matchedKeywords = 'Figma · 프로토타이핑',
  title = '[첫차]와 함께 할 프로덕트 디자이너를 찾습니다.',
  meta = '서울 강남구 · 신입·경력 · 학력무관 · 정규직',
  companyName = '(주)미스터픽',
  companyMeta = '관심기업 TOP 100',
  isBookmarked = false,
  onBookmarkClick,
  className,
  ...props
}: RowSearchResultProps) => {
  if (contentState === 'loading') {
    return (
      //스켈레톤
      <article
        aria-busy="true"
        aria-label="검색 결과를 불러오는 중"
        className={cn(
          'flex h-[165px] w-full items-start gap-4 border-b border-border-default bg-surface-default p-4',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="size-10 shrink-0 rounded-full bg-surface-subtle"
        />
        <div aria-hidden className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="h-3 w-[220px] max-w-full rounded-md bg-surface-subtle" />
          <div className="h-4 w-[460px] max-w-full rounded-md bg-surface-subtle" />
          <div className="h-3 w-[360px] max-w-full rounded-md bg-surface-subtle" />
          <div className="flex gap-2">
            <div className="h-6 w-[72px] rounded-lg bg-surface-subtle" />
            <div className="h-6 w-[88px] rounded-lg bg-surface-subtle" />
            <div className="h-6 w-16 rounded-lg bg-surface-subtle" />
          </div>
        </div>
        <div aria-hidden className="flex shrink-0 flex-col items-end gap-3">
          <div className="h-8 w-[72px] rounded-lg bg-surface-subtle" />
          <div className="h-3 w-24 rounded-md bg-surface-subtle" />
        </div>
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
        <BadgeMatch matchCount={matchCount} />
        <p className="w-[50px] shrink-0 text-center text-caption-12 text-status-danger">
          {deadline}
        </p>
      </div>
      <p className="px-4 pt-3 text-caption-12">
        <span className="text-green-100">일치</span>
        <span className="text-text-secondary">{`  ${matchedKeywords}`}</span>
      </p>
      <div className="flex min-h-[72px] items-center gap-3 px-4 pb-4">
        <BookmarkButton
          isSelected={isBookmarked}
          className="shrink-0"
          onClick={onBookmarkClick}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-heading-20 text-text-primary">{title}</p>
          <p className="text-body-14 text-text-secondary">{meta}</p>
        </div>
        <div className="flex w-[190px] shrink-0 flex-col items-end gap-[3px] text-right">
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
