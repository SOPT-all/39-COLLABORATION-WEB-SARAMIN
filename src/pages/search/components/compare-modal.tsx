// [스펙] CompareModal
// 역할   : 검색 결과 "저장한 공고 보기"로 여는 "선택한 공고 비교" 모달 (기능명세서 FN-06 ~ FN-08)
// props  : isOpen · onClose - 열림 상태와 닫기
//          myFitKeywordNames - 검색에 적용한 MY FIT 키워드. 검색 목록과 같은 기준으로 일치 개수를 세요. (FR-05)
//                              안 주면 내 프로필 키워드를 써요.
// 데이터 : 스크랩 목록 = 비교 대상. 홈 · 검색에서 스크랩한 공고를 보여 줘요. (useBookmarks)
// 구조   : [제목 · 닫기] [고정 항목 열 168px │ 공고 열 296px × n (가로 스크롤)]
// 동작   : "스크랩함" → 창 안에서는 열을 그대로 두고 버튼만 "스크랩"으로 바뀌어요. 다시 누르면 되돌려요.
//                        창을 닫을 때 해제한 공고를 스크랩에서 빼고 홈 · 검색 별표에도 반영해요. (QA 요청)
//          "바로 지원" → 홈 드롭과 같은 지원 플로우 (확인 → 제출 중 → 완료 · 지원 내역 보기, 기능명세서 FN-09 · FN-11)
//                        지원을 마치면 홈 카드 · 지원 내역에도 반영돼요. (실제 전송은 범위 밖이라 목 제출)
//                        마감된 공고 · 서류가 3/3이 아님 · 이번 방문에 이미 지원한 공고는 막고 이유를 버튼에 보여 줘요.
//          열 이동(≡) → 끌어다 놓거나 핸들에서 ← →로 공고 열 순서를 바꿔요. 정보 · 버튼이 열 단위로 함께 움직여요. (FR-07-A)
//          비교 항목 편집(✎) → 표시 항목 · 순서를 편집해 적용해요. (FR-07-B · C)
//          상세보기 → 공고 상세 모달
// 유지   : 열 순서 · 비교 항목은 검색 화면에 있는 동안 유지돼요. 새로고침하면 처음으로 돌아가요.

import { type DragEvent, type KeyboardEvent, useId, useState } from 'react';
import { useNavigate } from 'react-router';

import CompareJobColumn from '@/pages/search/components/compare-job-column';
import CompareRowEditPanel from '@/pages/search/components/compare-row-edit-panel';
import {
  COMPARE_APPLY_DOCUMENT_SUMMARY,
  COMPARE_ROWS,
  type CompareRowKey,
  DEFAULT_COMPARE_ROW_KEYS,
} from '@/pages/search/constants/compare-rows';
import { createMockSubmitApplication } from '@/shared/api/create-mock-submit-application';
import { useMyDocumentsQuery } from '@/shared/api/use-my-documents-query';
import { useMyKeywordsQuery } from '@/shared/api/use-my-keywords-query';
import ModalApplyFlow from '@/shared/components/modal/modal-apply-flow';
import ModalDialog from '@/shared/components/modal/modal-dialog';
import ModalFeedback from '@/shared/components/modal/modal-feedback';
import ModalJobDetail from '@/shared/components/modal/modal-job-detail';
import { MY_DOCUMENT_FIELDS } from '@/shared/constants/my-documents';
import {
  OPEN_APPLICATION_HISTORY_STATE,
  ROUTES,
} from '@/shared/constants/routes';
import { useApplyFlow } from '@/shared/hooks/use-apply-flow';
import { useBookmarks } from '@/shared/hooks/use-bookmarks';
import { useSessionApplications } from '@/shared/hooks/use-session-applications';
import type { CompareJob } from '@/shared/types/compare-job';
import { checkIsDeadlinePassed } from '@/shared/utils/check-is-deadline-passed';
import { cn } from '@/shared/utils/cn';
import { createApplyDocumentSummary } from '@/shared/utils/create-apply-document-summary';
import { moveItem } from '@/shared/utils/move-item';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import IcPencil from '@/shared/assets/icons/ic-pencil.svg?react';

// 지원 API가 없어 홈과 같은 목 제출 함수로 항상 성공 처리
const submitApplication = createMockSubmitApplication('success');

const COLUMN_DRAG_TYPE = 'application/x-saramin-compare-column';
const APPLY_CLOSED_LABEL = '접수 마감';
const APPLY_APPLIED_LABEL = '지원 완료';
const APPLY_MISSING_DOCUMENTS_LABEL = '서류 준비 필요';

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
  myFitKeywordNames?: string[];
}

const CompareModal = ({
  isOpen,
  onClose,
  myFitKeywordNames,
}: CompareModalProps) => {
  const titleId = useId();
  const { bookmarkedJobs, setBookmark } = useBookmarks();
  // 창 안에서 스크랩을 푼 공고. 닫을 때 한꺼번에 반영해서, 비교하던 열이 갑자기 사라지지 않게 해요.
  const [unscrappedIds, setUnscrappedIds] = useState<ReadonlySet<number>>(
    () => new Set(),
  );

  const toggleScrapInModal = (jobId: number) => {
    setUnscrappedIds((previous) => {
      const next = new Set(previous);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  // 닫기 버튼 · ESC · 배경 클릭 · 지원 내역 이동 모두 여기를 거쳐요.
  const handleClose = () => {
    unscrappedIds.forEach((jobId) => setBookmark(jobId, false));
    setUnscrappedIds(new Set());
    onClose();
  };
  const navigate = useNavigate();
  const { data: myKeywords } = useMyKeywordsQuery();
  // 검색에 적용한 칩이 있으면 그 기준으로, 없으면 내 프로필 키워드로 세요. (못 받았으면 undefined)
  const myKeywordNames =
    myFitKeywordNames ?? myKeywords?.map(({ name }) => name);
  const { sessionApplications, addApplication } = useSessionApplications();
  // 홈 스티키 허브와 같은 쿼리 키라 홈에서 바꾼 서류 체크가 그대로 반영돼요.
  const { data: myDocuments } = useMyDocumentsQuery();
  // 보유 서류를 아직 못 받았으면 막지 않고 기본 문구로 확인창을 열어요.
  const isMissingDocuments =
    myDocuments !== undefined &&
    MY_DOCUMENT_FIELDS.some(({ id }) => !myDocuments[id]);

  const getApplyBlockedLabel = (job: CompareJob) => {
    const isApplied = sessionApplications.some(
      ({ target }) => target.recruitId === job.id,
    );
    if (isApplied) return APPLY_APPLIED_LABEL;
    if (checkIsDeadlinePassed(job.deadlineAt)) return APPLY_CLOSED_LABEL;
    if (isMissingDocuments) return APPLY_MISSING_DOCUMENTS_LABEL;
    return undefined;
  };

  const [rowKeys, setRowKeys] = useState<CompareRowKey[]>(
    DEFAULT_COMPARE_ROW_KEYS,
  );
  const [columnOrder, setColumnOrder] = useState<number[]>([]);
  const [draggingJobId, setDraggingJobId] = useState<number | null>(null);
  const [dragOverJobId, setDragOverJobId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<CompareJob | null>(null);

  // 홈 드롭과 같은 지원 플로우예요. 지원을 마치면 이번 방문의 지원 기록에 남겨요.
  const { step, target, openApplyFlow, closeApplyFlow, submit } = useApplyFlow({
    submitApplication,
    onApplySuccess: (applyTarget) =>
      addApplication({
        target: applyTarget,
        appliedAt: new Date().toISOString(),
        myDocuments,
      }),
  });

  const handleApply = (job: CompareJob) =>
    openApplyFlow({
      recruitId: job.id,
      companyName: job.companyName,
      positionName: job.title,
      documentSummary: myDocuments
        ? createApplyDocumentSummary(myDocuments)
        : COMPARE_APPLY_DOCUMENT_SUMMARY,
    });

  // 지원 내역 모달은 홈에 있어서, 비교 창을 닫고 홈으로 가며 지원 내역을 바로 열어요.
  const handleViewHistory = () => {
    closeApplyFlow();
    handleClose();
    navigate(ROUTES.HOME, { state: OPEN_APPLICATION_HISTORY_STATE });
  };

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
              isScrapped={!unscrappedIds.has(job.id)}
              onScrapToggle={() => toggleScrapInModal(job.id)}
              onApply={() => handleApply(job)}
              applyBlockedLabel={getApplyBlockedLabel(job)}
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
        onClose={handleClose}
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
            onClick={handleClose}
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
      <ModalJobDetail job={detailJob} onClose={() => setDetailJob(null)} />
      <ModalApplyFlow
        step={step}
        target={target}
        onClose={closeApplyFlow}
        onSubmit={submit}
        onRetry={submit}
        onViewHistory={handleViewHistory}
      />
    </>
  );
};

export default CompareModal;
