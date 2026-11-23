import { useRef, useState } from 'react';

import type {
  ApplyFlowStep,
  ApplyResult,
  ApplyTarget,
} from '@/shared/types/apply-flow';

interface UseApplyFlowOptions {
  submitApplication: (target: ApplyTarget) => Promise<ApplyResult>;
  onApplySuccess?: (target: ApplyTarget) => void;
}

// 드래그 앤 드롭 지원 플로우의 단계를 관리해요.
// 드롭 → 지원 내용 확인 → 제출 중 → 완료 · 실패 · 결과 모름
export const useApplyFlow = ({
  submitApplication,
  onApplySuccess,
}: UseApplyFlowOptions) => {
  const [step, setStep] = useState<ApplyFlowStep>('idle');
  const [target, setTarget] = useState<ApplyTarget | null>(null);
  // 버튼을 빠르게 두 번 눌러도 지원 요청이 한 번만 가도록 막아요.
  const isSubmittingRef = useRef(false);

  const openApplyFlow = (nextTarget: ApplyTarget) => {
    if (step !== 'idle') return;
    setTarget(nextTarget);
    setStep('review');
  };

  // 제출 중에는 중복 지원을 막기 위해 닫을 수 없어요.
  const closeApplyFlow = () => {
    if (step === 'submitting') return;
    setStep('idle');
    setTarget(null);
  };

  // 지원 실패 후 다시 시도할 때도 같은 공고 · 서류로 다시 제출해요.
  const submit = async () => {
    if (!target || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setStep('submitting');

    try {
      const result = await submitApplication(target);
      setStep(result);
      if (result === 'success') onApplySuccess?.(target);
    } catch {
      setStep('error');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return { step, target, openApplyFlow, closeApplyFlow, submit };
};
