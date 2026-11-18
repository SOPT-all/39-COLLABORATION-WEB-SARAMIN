// [스펙] CompareModal
// 역할   : 검색 결과 "저장한 공고 보기"로 여는 "선택한 공고 비교" 모달 (기능명세서 FN-06 ~ FN-08)
// props  : isOpen · onClose - 열림 상태와 닫기
// 데이터 : 스크랩 목록 = 비교 대상. 홈 · 검색에서 스크랩한 공고를 보여 줘요. (useBookmarks)
// 구조   : [제목 · 닫기] [고정 항목 열 168px │ 공고 열 296px × n (가로 스크롤)]
// 동작   : "스크랩함" → 그 공고만 빠지고 창은 그대로, 홈 · 검색 별표도 함께 꺼져요. 마지막이면 빈 안내.
//          "바로 지원" → 홈 드롭과 같은 지원 내용 확인창 (FR-11, 실제 전송은 범위 밖)
//          열 이동(≡) → 끌어다 놓거나 핸들에서 ← →로 공고 열 순서를 바꿔요. 정보 · 버튼이 열 단위로 함께 움직여요. (FR-07-A)
//          비교 항목 편집(✎) → 표시 항목 · 순서를 편집해 적용해요. (FR-07-B · C)
//          상세보기 → 공고 상세 모달
// 유지   : 열 순서 · 비교 항목은 검색 화면에 있는 동안 유지돼요. 새로고침하면 처음으로 돌아가요.

import { type DragEvent, type KeyboardEvent, useId, useState } from 'react';

import CompareJobColumn from '@/pages/search/components/compare-job-column';
import CompareJobDetailModal from '@/pages/search/components/compare-job-detail-modal';
import CompareRowEditPanel from '@/pages/search/components/compare-row-edit-panel';
import {
  COMPARE_APPLY_DOCUMENT_SUMMARY,
  COMPARE_ROWS,
  type CompareRowKey,
  DEFAULT_COMPARE_ROW_KEYS,
} from '@/pages/search/constants/compare-rows';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import ModalApplyReview from '@/shared/components/modal/modal-apply-review';
import ModalDialog from '@/shared/components/modal/modal-dialog';
import ModalFeedback from '@/shared/components/modal/modal-feedback';
import { useBookmarks } from '@/shared/hooks/use-bookmarks';
import type { CompareJob } from '@/shared/types/compare-job';
import { cn } from '@/shared/utils/cn';
import { moveItem } from '@/shared/utils/move-item';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import IcPencil from '@/shared/assets/icons/ic-pencil.svg?react';

const COLUMN_DRAG_TYPE = 'application/x-saramin-compare-column';

// 사용자가 옮긴 열 순서를 앞에 두고, 새로 스크랩한 공고는 뒤에 붙여요.
const sortByColumnOrder = (jobs: CompareJob[], columnOrder: number[]) => {
  const orderIndex = new Map(columnOrder.map((id, index) => [id, index]));
  return [...jobs].sort(
    (a, b) =>
      (orderIndex.get(a.id) ?? Infinity) - (orderIndex.get(b.id) ?? Infinity),
  );
};

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompareModal = ({ isOpen, onClose }: CompareModalProps) => {
  const titleId = useId();
  const { bookmarkedJobs, setBookmark } = useBookmarks();
  const { data: myKeywords = [] } = useMyKeywordsQuery();
  const myKeywordNames = myKeywords.map(({ name }) => name);

  const [rowKeys, setRowKeys] = useState<CompareRowKey[]>(
    DEFAULT_COMPARE_ROW_KEYS,
  );
  const [columnOrder, setColumnOrder] = useState<number[]>([]);
  const [draggingJobId, setDraggingJobId] = useState<number | null>(null);
  const [dragOverJobId, setDragOverJobId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<CompareJob | null>(null);
  const [applyTarget, setApplyTarget] = useState<CompareJob | null>(null);

  const jobs = sortByColumnOrder(bookmarkedJobs, columnOrder);
  const jobIds = jobs.map(({ id }) => id);

  const moveColumn = (from: number, to: number) =>
    setColumnOrder(moveItem(jobIds, from, to));

  const handleHandleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    moveColumn(index, e.key === 'ArrowLeft' ? index - 1 : index + 1);
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>, jobId: number) => {
    if (
      draggingJobId === null ||
      !e.dataTransfer.types.includes(COLUMN_DRAG_TYPE)
    ) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverJobId(jobId === draggingJobId ? null : jobId);
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>, jobId: number) => {
    e.preventDefault();
    if (draggingJobId !== null) {
      moveColumn(jobIds.indexOf(draggingJobId), jobIds.indexOf(jobId));
    }
    setDraggingJobId(null);
    setDragOverJobId(null);
  };

  const renderTable = () => {
    if (jobs.length === 0) {
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
            <div className="flex h-14.75 items-center border-b border-border-default px-3.5">
              <button
                type="button"
                aria-haspopup="dialog"
                className="flex items-center gap-1.25 text-label-14 text-text-secondary"
                onClick={() => setIsEditOpen(true)}
              >
                <IcPencil aria-hidden className="size-4 shrink-0" />
                비교 항목 편집
              </button>
            </div>
            <p className="flex h-25.75 items-center gap-1 border-b border-border-default pr-4 pl-3.5 text-title-14 text-blue-90">
              <span aria-hidden className="text-caption-12">
                ✦
              </span>
              MY FIT
            </p>
            {rowKeys.map((rowKey, index) => (
              <p
                key={rowKey}
                className={cn(
                  'flex items-center pr-4 pl-3.5 text-title-14 text-text-primary',
                  COMPARE_ROWS[rowKey].heightClassName,
                  index !== rowKeys.length - 1 &&
                    'border-b border-border-default',
                )}
              >
                {COMPARE_ROWS[rowKey].label}
              </p>
            ))}
          </div>
        </div>

        <ul
          aria-label="비교할 공고"
          className="flex min-w-0 flex-1 overflow-x-auto pb-3"
        >
          {jobs.map((job, index) => (
            <CompareJobColumn
              key={job.id}
              job={job}
              rowKeys={rowKeys}
              myKeywordNames={myKeywordNames}
              isDragOver={dragOverJobId === job.id}
              handleProps={{
                draggable: true,
                onDragStart: (e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData(COLUMN_DRAG_TYPE, String(job.id));
                  setDraggingJobId(job.id);
                },
                onDragEnd: () => {
                  setDraggingJobId(null);
                  setDragOverJobId(null);
                },
                onKeyDown: (e) => handleHandleKeyDown(e, index),
              }}
              onDragOver={(e) => handleDragOver(e, job.id)}
              onDrop={(e) => handleDrop(e, job.id)}
              onDetail={() => setDetailJob(job)}
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
        // 항목을 많이 더하면 화면보다 길어질 수 있어 세로로 스크롤해요.
        className="max-h-screen w-240 flex-col gap-4 overflow-y-auto rounded-2xl bg-surface-default px-8 pt-7 pb-6 shadow-card-strong open:flex"
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

      <CompareRowEditPanel
        isOpen={isEditOpen}
        rowKeys={rowKeys}
        onApply={setRowKeys}
        onClose={() => setIsEditOpen(false)}
      />
      <CompareJobDetailModal
        job={detailJob}
        onClose={() => setDetailJob(null)}
      />
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
