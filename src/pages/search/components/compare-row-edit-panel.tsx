// [스펙] CompareRowEditPanel
// 역할   : 비교 모달의 "비교 항목 편집" 패널 (기능명세서 FN-08 · FR-07-B · FR-07-C 캡처)
// props  : isOpen · onClose - 열림 상태와 닫기 (닫기 · 취소는 편집 내용을 버려요)
//          rowKeys - 지금 표에 적용된 항목과 순서
//          onApply - "적용하기"로 편집한 항목과 순서를 표에 반영
// 구조   : [표시 중인 항목 n: MY FIT 분석(고정) + 체크된 항목들 · ≡ 순서 핸들]
//          [추가할 수 있는 항목: 체크 안 된 항목들 · +]
//          [기본값으로 되돌리기 │ 취소 │ 적용하기]
// 동작   : 체크를 끄면 아래로, 켜거나 +를 누르면 표시 중인 항목 맨 아래로 가요.
//          ≡ 핸들은 끌어서 순서를 바꾸고, 키보드는 핸들에서 ↑ ↓로 바꿔요.
//          편집만으로 스크랩 공고는 바뀌지 않아요. 표시 항목이 0개면 적용할 수 없어요.

import { type DragEvent, type KeyboardEvent, useId, useState } from 'react';

import {
  ALL_COMPARE_ROW_KEYS,
  COMPARE_ROWS,
  type CompareRowKey,
  DEFAULT_COMPARE_ROW_KEYS,
} from '@/pages/search/constants/compare-rows';
import ModalDialog from '@/shared/components/modal/modal-dialog';
import { cn } from '@/shared/utils/cn';
import { moveItem } from '@/shared/utils/move-item';

import IcClose from '@/shared/assets/icons/ic-close.svg?react';
import IcReorder from '@/shared/assets/icons/ic-reorder.svg?react';

const ROW_DRAG_TYPE = 'application/x-saramin-compare-row';

interface CompareRowEditPanelProps {
  isOpen: boolean;
  rowKeys: CompareRowKey[];
  onApply: (rowKeys: CompareRowKey[]) => void;
  onClose: () => void;
}

const CompareRowEditPanel = ({
  isOpen,
  rowKeys,
  onApply,
  onClose,
}: CompareRowEditPanelProps) => {
  const titleId = useId();
  const [draftKeys, setDraftKeys] = useState(rowKeys);
  const [wasOpen, setWasOpen] = useState(isOpen);
  const [draggingKey, setDraggingKey] = useState<CompareRowKey | null>(null);

  // 열 때마다 지금 표의 항목으로 다시 시작해요. (닫기 · 취소한 편집은 버려요)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setDraftKeys(rowKeys);
  }

  const additionalKeys = ALL_COMPARE_ROW_KEYS.filter(
    (key) => !draftKeys.includes(key),
  );

  const removeKey = (key: CompareRowKey) =>
    setDraftKeys((previous) => previous.filter((item) => item !== key));

  const addKey = (key: CompareRowKey) =>
    setDraftKeys((previous) => [...previous, key]);

  const handleHandleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    const to = e.key === 'ArrowUp' ? index - 1 : index + 1;
    setDraftKeys((previous) => moveItem(previous, index, to));
  };

  const handleDragStart = (
    e: DragEvent<HTMLButtonElement>,
    key: CompareRowKey,
  ) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(ROW_DRAG_TYPE, key);
    setDraggingKey(key);
  };

  const handleDragOver = (e: DragEvent<HTMLLIElement>, key: CompareRowKey) => {
    if (!draggingKey || !e.dataTransfer.types.includes(ROW_DRAG_TYPE)) return;
    e.preventDefault();
    if (draggingKey === key) return;
    // 끌고 지나가는 자리로 바로 옮겨서 놓기 전에 순서를 보여 줘요.
    setDraftKeys((previous) =>
      moveItem(previous, previous.indexOf(draggingKey), previous.indexOf(key)),
    );
  };

  const handleApply = () => {
    onApply(draftKeys);
    onClose();
  };

  return (
    <ModalDialog
      aria-labelledby={titleId}
      isOpen={isOpen}
      onClose={onClose}
      className="w-114 flex-col gap-4 rounded-2xl bg-surface-default p-7 shadow-card-strong open:flex"
    >
      <header className="flex items-center justify-between">
        <h2 id={titleId} className="text-heading-18 text-text-primary">
          비교 항목 편집
        </h2>
        <button
          type="button"
          aria-label="닫기"
          className="flex size-9 items-center justify-center rounded-lg bg-surface-subtle"
          onClick={onClose}
        >
          <IcClose aria-hidden />
        </button>
      </header>

      <section
        aria-labelledby={`${titleId}-visible`}
        className="flex flex-col gap-2"
      >
        <h3
          id={`${titleId}-visible`}
          className="text-title-14 text-text-primary"
        >
          표시 중인 항목{' '}
          <span className="text-blue-90">{draftKeys.length + 1}</span>
        </h3>
        <ul className="flex flex-col rounded-xl bg-surface-subtle px-3">
          <li className="flex h-10.75 items-center gap-2.5 border-b border-border-default">
            <input
              type="checkbox"
              checked
              disabled
              aria-label="MY FIT 분석 (고정)"
              className="size-4.5 accent-blue-90"
            />
            <span className="flex-1 text-body-14 text-text-primary">
              MY FIT 분석{' '}
              <span className="ml-1 rounded-full bg-surface-blue-subtle px-1.5 text-caption-11 text-blue-90">
                고정
              </span>
            </span>
          </li>
          {draftKeys.map((key, index) => (
            <li
              key={key}
              className={cn(
                'flex h-10.75 items-center gap-2.5',
                index !== draftKeys.length - 1 &&
                  'border-b border-border-default',
                draggingKey === key && 'opacity-50',
              )}
              onDragOver={(e) => handleDragOver(e, key)}
              onDrop={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                checked
                aria-label={`${COMPARE_ROWS[key].label} 표시`}
                className="size-4.5 accent-blue-90"
                onChange={() => removeKey(key)}
              />
              <span className="flex-1 text-body-14 text-text-primary">
                {COMPARE_ROWS[key].label}
              </span>
              <button
                type="button"
                draggable
                aria-label={`${COMPARE_ROWS[key].label} 순서 이동`}
                className="flex size-6 cursor-grab items-center justify-center text-gray-70 active:cursor-grabbing"
                onDragStart={(e) => handleDragStart(e, key)}
                onDragEnd={() => setDraggingKey(null)}
                onKeyDown={(e) => handleHandleKeyDown(e, index)}
              >
                <IcReorder aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {additionalKeys.length > 0 && (
        <section
          aria-labelledby={`${titleId}-additional`}
          className="flex flex-col gap-2"
        >
          <h3
            id={`${titleId}-additional`}
            className="text-title-14 text-text-primary"
          >
            추가할 수 있는 항목
          </h3>
          <ul className="flex flex-col rounded-xl bg-surface-subtle px-3">
            {additionalKeys.map((key, index) => (
              <li
                key={key}
                className={cn(
                  'flex h-10.75 items-center gap-2.5',
                  index !== additionalKeys.length - 1 &&
                    'border-b border-border-default',
                )}
              >
                <input
                  type="checkbox"
                  checked={false}
                  aria-label={`${COMPARE_ROWS[key].label} 표시`}
                  className="size-4.5 accent-blue-90"
                  onChange={() => addKey(key)}
                />
                <span className="flex-1 text-body-14 text-text-tertiary">
                  {COMPARE_ROWS[key].label}
                </span>
                <button
                  type="button"
                  aria-label={`${COMPARE_ROWS[key].label} 추가`}
                  className="flex size-6 items-center justify-center text-body-14 text-text-secondary"
                  onClick={() => addKey(key)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="flex items-center gap-2 pt-2">
        <button
          type="button"
          className="mr-auto text-body-14 text-text-secondary"
          onClick={() => setDraftKeys(DEFAULT_COMPARE_ROW_KEYS)}
        >
          기본값으로 되돌리기
        </button>
        <button
          type="button"
          className="h-11 w-26 rounded-lg border border-border-default text-label-14 text-text-primary"
          onClick={onClose}
        >
          취소
        </button>
        <button
          type="button"
          disabled={draftKeys.length === 0}
          className="h-11 w-30 rounded-lg bg-blue-90 text-title-14 text-white disabled:bg-surface-subtle disabled:text-text-tertiary"
          onClick={handleApply}
        >
          적용하기
        </button>
      </footer>
    </ModalDialog>
  );
};

export default CompareRowEditPanel;
