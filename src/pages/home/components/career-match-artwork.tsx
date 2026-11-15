import { cn } from '@/shared/utils/cn';

const CARD_CLASS_NAME =
  'absolute flex h-28 w-44 flex-col rounded-[14px] p-3.5 shadow-[0_8px_24px_0_rgba(13,20,46,0.1)]';

// 커리어 CTA 배너 오른쪽의 장식용 카드 2장이에요.
const CareerMatchArtwork = () => {
  return (
    <div aria-hidden className="relative h-36 w-90 shrink-0">
      <div
        className={cn(
          CARD_CLASS_NAME,
          'top-7.5 -left-1 rotate-4 gap-2.5 border border-border-default bg-surface-default',
        )}
      >
        <div className="flex h-12 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-surface-blue-subtle text-label-12 text-blue-90">
            85
          </span>
          <div className="flex flex-col gap-0.5 whitespace-nowrap">
            <span className="text-caption-12 text-text-secondary">
              프로필 완성도
            </span>
            <span className="text-label-14 text-text-primary">
              85% · 1개 남음
            </span>
          </div>
        </div>
        <div className="h-2 w-37 rounded-sm bg-surface-subtle">
          <div className="h-2 w-31.5 rounded-sm bg-blue-90" />
        </div>
      </div>

      <div
        className={cn(
          CARD_CLASS_NAME,
          'top-0.5 left-47 -rotate-4 gap-1.25 bg-blue-90',
        )}
      >
        <span className="text-caption-11 text-white">AI MATCH</span>
        <span className="text-title-16 text-white">추천 공고 12개</span>
        <span className="flex h-6 w-28 items-center justify-center rounded-xl bg-surface-default text-label-12 text-blue-90">
          오늘 업데이트
        </span>
      </div>
    </div>
  );
};

export default CareerMatchArtwork;
