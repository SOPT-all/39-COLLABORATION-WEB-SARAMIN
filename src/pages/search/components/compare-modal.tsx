// [스펙] CompareModal
// 역할   : 검색 결과 "저장한 공고 보기"로 여는 "선택한 공고 비교" 모달 (기능명세서 FN-06 · FR-07 · FR-10)
// props  : isOpen · onClose - 열림 상태와 닫기
// 데이터 : 스크랩 목록 = 비교 대상. 홈 · 검색에서 스크랩한 공고를 스크랩한 순서대로 보여 줘요. (useBookmarks)
// 구조   : [제목 · 닫기] [고정 항목 열 168px │ 공고 열 296px × n (가로 스크롤)]
// 동작   : "스크랩함"을 누르면 그 공고만 빠지고 창은 그대로예요. 홈 · 검색의 별표도 함께 꺼져요.
//          마지막 공고를 빼면 창을 닫지 않고 "스크랩한 공고가 없어요"를 보여 줘요.
//          "바로 지원"은 홈 드롭과 같은 지원 내용 확인창을 열어요. (FR-11, 실제 전송은 범위 밖)

import { useId, useState } from 'react';

import CompareJobColumn from '@/pages/search/components/compare-job-column';
import {
  COMPARE_APPLY_DOCUMENT_SUMMARY,
  COMPARE_ROWS,
} from '@/pages/search/constants/compare-rows';
import ModalApplyReview from '@/shared/components/modal/modal-apply-review';
import ModalDialog from '@/shared/components/modal/modal-dialog';
import ModalFeedback from '@/shared/components/modal/modal-feedback';
import { useBookmarks } from '@/shared/hooks/use-bookmarks';
import type { CompareJob } from '@/shared/types/compare-job';
import { cn } from '@/shared/utils/cn';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareModal = ({ isOpen, onClose }: CompareModalProps) => {
  const titleId = useId();
  const { bookmarkedJobs, setBookmark } = useBookmarks();
  const [applyTarget, setApplyTarget] = useState<CompareJob | null>(null);

  const renderTable = () => {
    if (bookmarkedJobs.length === 0) {
      return (
        <ModalFeedback
          status="empty"
          title="스크랩한 공고가 없어요"
          description="공고의 별표를 눌러 스크랩하면 여기에서 비교할 수 있어요."
          className="flex-1"
        />
      );
    }

    return (
      <div className="flex min-h-0 flex-1">
        {/* 고정 항목 열: 공고 열을 가로로 스크롤해도 그대로 있어요. */}
        <div className="flex w-42 shrink-0 flex-col gap-3">
          <div className="flex flex-col overflow-hidden rounded-l-xl border border-border-default bg-surface-subtle">
            <div className="h-14.75 border-b border-border-default" />
            <p className="flex h-25.75 items-center gap-1 border-b border-border-default pr-4 pl-3.5 text-title-14 text-blue-90">
              <span aria-hidden className="text-caption-12">
                ✦
              </span>
              MY FIT
            </p>
            {COMPARE_ROWS.map(({ key, label, heightClassName }, index) => (
              <p
                key={key}
                className={cn(
                  'flex items-center pr-4 pl-3.5 text-title-14 text-text-primary',
                  heightClassName,
                  index !== COMPARE_ROWS.length - 1 &&
                    'border-b border-border-default',
                )}
              >
                {label}
              </p>
            ))}
          </div>
        </div>

        <ul
          aria-label="비교할 공고"
          className="flex min-w-0 flex-1 overflow-x-auto pb-3"
        >
          {bookmarkedJobs.map((job) => (
            <CompareJobColumn
              key={job.id}
              job={job}
              onUnscrap={() => setBookmark(job.id, false)}
              onApply={() => setApplyTarget(job)}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <ModalDialog
        aria-labelledby={titleId}
        isOpen={isOpen}
        onClose={onClose}
        className="w-240 flex-col gap-4 rounded-2xl bg-surface-default px-8 pt-7 pb-6 shadow-card-strong open:flex"
      >
        <header className="flex items-center gap-4">
          <h2 id={titleId} className="flex-1 text-heading-20 text-text-primary">
            선택한 공고 비교
          </h2>
          <button
            type="button"
            aria-label="닫기"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-subtle"
            onClick={onClose}
          >
            <IcClose aria-hidden />
          </button>
        </header>
        {renderTable()}
      </ModalDialog>

      {applyTarget && (
        <ModalApplyReview
          isOpen
          companyName={applyTarget.companyName}
          positionName={applyTarget.title}
          documentSummary={COMPARE_APPLY_DOCUMENT_SUMMARY}
          onClose={() => setApplyTarget(null)}
          // 실제 지원 전송은 범위 밖이라 확인창까지만 열어요. (기능명세서 FR-11)
          onSubmit={() => setApplyTarget(null)}
        />
      )}
    </>
  );
};

export default CompareModal;
