// [스펙] ApplyFlowModal
// 역할   : 지원 패키지를 공고에 드롭한 뒤 이어지는 지원 플로우 모달
// props  : step - 지금 보여줄 단계 (useApplyFlow의 step)
//          target - 드롭된 공고 (회사 · 직무 · 제출 서류)
//          onClose · onSubmit · onRetry - 닫기 · 최종 지원 · 다시 시도
//          onViewHistory - 지원 내역 보기 (#57 지원 내역 모달과 연결)
// 단계   : review → submitting → success · error · unknown
//          submitting은 중복 지원을 막기 위해 닫기 버튼 · ESC · 배경 클릭으로 닫히지 않음

import type { ApplyFlowStep, ApplyTarget } from '@/pages/home/types/apply-flow';
import ModalButton from '@/shared/components/button/modal-button';
import Modal from '@/shared/components/modal/modal';
import ModalApplyReview from '@/shared/components/modal/modal-apply-review';
import ModalFeedback from '@/shared/components/modal/modal-feedback';

import IcLoadingSpinner from '@/shared/assets/icons/ic-loading-spinner.svg?react';

const RESULT_CONTENTS = {
  success: {
    modalTitle: '지원 완료',
    title: '지원이 완료되었습니다',
    description: '지원 내역에서 접수 상태와 제출 서류를 확인할 수 있습니다.',
  },
  error: {
    modalTitle: '지원 실패',
    title: '지원서를 제출하지 못했습니다',
    description: '입력과 선택한 서류는 유지됩니다. 잠시 후 다시 시도해 주세요.',
  },
  unknown: {
    modalTitle: '지원 상태 확인',
    title: '처리 결과를 확인하고 있습니다',
    description: '중복 지원하지 말고 지원 내역에서 최종 상태를 확인해 주세요.',
  },
};

interface ApplyFlowModalProps {
  step: ApplyFlowStep;
  target: ApplyTarget | null;
  onClose: () => void;
  onSubmit: () => void;
  onRetry: () => void;
  onViewHistory: () => void;
}

const ApplyFlowModal = ({
  step,
  target,
  onClose,
  onSubmit,
  onRetry,
  onViewHistory,
}: ApplyFlowModalProps) => {
  if (step === 'idle' || !target) return null;

  if (step === 'review') {
    return (
      <ModalApplyReview
        isOpen
        companyName={target.companyName}
        positionName={target.positionName}
        documentSummary={target.documentSummary}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );
  }

  if (step === 'submitting') {
    return (
      <Modal
        isOpen
        title="지원서 제출"
        size="standard"
        className="outline-none"
        hasCloseButton={false}
        canCloseOnBackdropClick={false}
        onClose={onClose}
        footer={
          <ModalButton
            disabled
            className="disabled:bg-blue-90 disabled:text-white"
          >
            제출 중
          </ModalButton>
        }
      >
        <div
          role="status"
          className="flex flex-1 flex-col items-center justify-center gap-3 text-center"
        >
          <IcLoadingSpinner aria-hidden className="shrink-0 animate-spin" />
          <div className="flex flex-col gap-1">
            <p className="text-title-16 text-text-primary">
              지원서를 제출하고 있습니다
            </p>
            <p className="text-body-14 text-text-secondary">
              중복 지원을 막기 위해 완료될 때까지 창을 유지해 주세요.
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  const { modalTitle, title, description } = RESULT_CONTENTS[step];

  return (
    <Modal
      isOpen
      title={modalTitle}
      onClose={onClose}
      footer={
        step === 'error' ? (
          <>
            <ModalButton variant="secondary" onClick={onClose}>
              닫기
            </ModalButton>
            <ModalButton onClick={onRetry}>다시 시도</ModalButton>
          </>
        ) : (
          <ModalButton onClick={onViewHistory}>지원 내역 보기</ModalButton>
        )
      }
    >
      <ModalFeedback
        status={step}
        title={title}
        description={description}
        className="flex-1"
      />
    </Modal>
  );
};

export default ApplyFlowModal;
