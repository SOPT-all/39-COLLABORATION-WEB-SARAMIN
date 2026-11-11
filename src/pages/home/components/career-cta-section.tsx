import CareerMatchArtwork from '@/pages/home/components/career-match-artwork';

const CareerCtaSection = () => {
  return (
    <section className="flex justify-center bg-surface-default py-16">
      <div className="flex h-55 w-315 items-center justify-between rounded-3xl border border-border-default bg-surface-blue-subtle px-14 py-11">
        <div className="flex flex-col items-start gap-4 whitespace-nowrap">
          <h2 className="text-display-32 text-text-primary">
            당신의 다음 커리어를, 더 빠르게
          </h2>
          <p className="text-body-16 text-text-secondary">
            프로필을 완성하면 AI가 지금 지원하기 좋은 공고와 성장 기회를
            찾아드려요.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex h-10 items-center rounded-[20px] bg-action-primary px-4.5 text-label-14 text-white"
            >
              프로필 완성하기
            </button>
            <button
              type="button"
              className="flex h-10 items-center rounded-[20px] border border-border-default bg-surface-default px-4.5 text-label-14 text-text-primary"
            >
              AI 매칭 알아보기
            </button>
          </div>
        </div>
        <CareerMatchArtwork />
      </div>
    </section>
  );
};

export default CareerCtaSection;
