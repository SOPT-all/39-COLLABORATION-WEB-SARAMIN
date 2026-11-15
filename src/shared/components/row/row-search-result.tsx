import type { ComponentProps } from 'react';

import BadgeMatch from '@/shared/components/badge/badge-match';
import BookmarkButton from '@/shared/components/button/bookmark-button';
import SkeletonSearchResultItem from '@/shared/components/skeleton/skeleton-search-result-item';
import { cn } from '@/shared/utils/cn';

type SearchResultContentState = 'loaded' | 'loading';

// 페이지 연결: 불러오기 여부는 contentState, 일치 개수는 matchCount, 마감은 deadline,
// 일치 키워드는 matchedKeywords, 공고는 title, 조건은 meta, 회사는 companyName,
// 회사 설명은 companyMeta, 북마크는 isBookmarked와 onBookmarkClick입니다.
// 기본값은 피그마 예시 문구입니다.
// 로딩(contentState="loading")은 SkeletonSearchResultItem을 보여 줍니다. 폭은 부모에 맞춥니다.
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
        <BadgeMatch matchCount={matchCount} />
        <p className="w-12.5 shrink-0 text-center text-caption-12 text-status-danger">
          {deadline}
        </p>
      </div>
      <p className="px-4 pt-3 text-caption-12">
        <span className="text-green-100">일치</span>
        <span className="text-text-secondary">{`  ${matchedKeywords}`}</span>
      </p>
      <div className="flex min-h-18 items-center gap-3 px-4 pb-4">
        <BookmarkButton
          isSelected={isBookmarked}
          className="shrink-0"
          onClick={onBookmarkClick}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-heading-20 text-text-primary">{title}</p>
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
