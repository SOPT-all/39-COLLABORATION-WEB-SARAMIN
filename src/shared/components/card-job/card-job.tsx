import { useId } from 'react';

import BadgeCompany from '@/shared/components/badge/badge-company';
import TagJob from '@/shared/components/badge/tag-job';
import BookmarkButton from '@/shared/components/button/bookmark-button';
import type {
  CardJobProps,
  CardJobState,
} from '@/shared/components/card-job/card-job.types';
import { cn } from '@/shared/utils/cn';

import IcMatchPrimary from '@/shared/assets/icons/ic-match-primary.svg?react';
import IcMatchSuccess from '@/shared/assets/icons/ic-match-success.svg?react';

const STATE_CLASS_NAMES = {
  default: 'border-border-default bg-surface-default',
  drag_ready: 'border-border-default bg-surface-default',
  drag_over: 'border-2 border-action-primary bg-surface-default',
  success: 'border-status-success bg-surface-default',
  needs_document: 'border-status-danger bg-surface-default',
  submitting: 'border-action-primary bg-surface-default',
  error: 'border-status-danger bg-surface-default',
  external: 'border-border-strong bg-surface-default',
  closed: 'border-border-default bg-surface-subtle opacity-74',
  needs_questions: 'border-status-danger bg-surface-default',
  applied: 'border-status-success bg-surface-default',
  ineligible: 'border-border-default bg-surface-subtle opacity-74',
  loading: 'border-border-default bg-surface-default',
} satisfies Record<CardJobState, string>;

const SUCCESS_MATCH_STATES: CardJobState[] = [
  'drag_over',
  'success',
  'needs_document',
  'external',
  'closed',
  'needs_questions',
  'applied',
  'ineligible',
];

const CardJob = ({
  company,
  jobTitle,
  logo,
  tags,
  conditions,
  benefit,
  companyBadge,
  matchReason,
  deadline,
  updated,
  state = 'default',
  isBookmarked = false,
  onBookmarkChange,
  onViewDetail,
  applicationSlot,
  loadingSlot,
  className,
}: CardJobProps) => {
  const titleId = useId();
  const isLoading = state === 'loading';
  const MatchIcon = SUCCESS_MATCH_STATES.includes(state)
    ? IcMatchSuccess
    : IcMatchPrimary;
  const handleBookmarkClick = () => onBookmarkChange(!isBookmarked);

  return (
    <article
      aria-label={isLoading ? '채용 공고 불러오는 중' : undefined}
      aria-labelledby={isLoading ? undefined : titleId}
      aria-busy={isLoading}
      data-state={state}
      className={cn(
        'flex h-63 w-118 shrink-0 overflow-hidden rounded-xl border',
        STATE_CLASS_NAMES[state],
        className,
      )}
    >
      {isLoading ? (
        <div className="h-full w-full">
          {loadingSlot ?? (
            <span className="sr-only">채용 공고를 불러오고 있습니다.</span>
          )}
        </div>
      ) : (
        <>
          <div className="relative flex h-full min-w-0 flex-1 flex-col gap-2 px-4 pt-4 pb-3.5">
            <header className="flex h-8 shrink-0 items-center gap-2">
              <div className="size-8 shrink-0 overflow-hidden rounded-lg">
                {logo}
              </div>
              <span className="truncate text-label-14 text-text-secondary">
                {company}
              </span>
              {companyBadge && (
                <BadgeCompany className="shrink-0">{companyBadge}</BadgeCompany>
              )}
              <BookmarkButton
                className="relative z-10 ml-auto flex size-6 shrink-0 items-center justify-center rounded-sm hover:bg-action-primary focus-visible:bg-action-primary focus-visible:outline-2 focus-visible:outline-action-primary"
                aria-label={`${company} ${jobTitle} 북마크`}
                isSelected={isBookmarked}
                onClick={handleBookmarkClick}
              />
            </header>
            <h3
              id={titleId}
              className="h-12 shrink-0 text-title-16 text-text-primary"
            >
              <button
                type="button"
                onClick={onViewDetail}
                className="text-left after:absolute after:inset-0 after:rounded-l-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-action-primary"
              >
                <span className="line-clamp-2">{jobTitle}</span>
              </button>
            </h3>
            <ul
              className="flex h-5.5 shrink-0 gap-1.5 overflow-hidden"
              aria-label="공고 태그"
            >
              {tags.map((tag) => (
                <li key={tag.id} className="flex shrink-0 items-center">
                  <TagJob variant={tag.variant}>{tag.label}</TagJob>
                </li>
              ))}
            </ul>
            <p className="h-4.5 shrink-0 truncate text-body-12 text-text-secondary">
              {conditions}
            </p>
            {benefit && (
              <p className="h-4.5 shrink-0 truncate text-body-12 text-text-tertiary">
                {benefit}
              </p>
            )}
            <footer className="mt-auto flex shrink-0 items-center gap-2 border-t border-border-default pt-2">
              <span className="flex min-w-0 items-center gap-1 text-label-12 text-text-primary">
                <MatchIcon aria-hidden className="shrink-0" />
                <span className="truncate">{matchReason}</span>
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-1.5">
                <span className="text-label-12 text-action-primary">
                  {deadline}
                </span>
                <span className="text-caption-11 text-text-tertiary">
                  {updated}
                </span>
              </span>
            </footer>
          </div>
          <div className="h-full w-28 shrink-0">{applicationSlot}</div>
        </>
      )}
    </article>
  );
};

export default CardJob;
