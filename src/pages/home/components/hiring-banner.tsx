// 2026 하반기 공채 띠 배너예요. 공고 모음 페이지가 생기면 링크를 연결해요.
const HiringBanner = () => {
  return (
    <aside aria-label="2026 하반기 공채" className="flex h-15 items-center">
      <div className="flex h-9 w-full items-center justify-center bg-blue-110">
        <span className="flex h-4.25 items-center rounded-full border border-white/70 px-2 text-caption-11 text-white">
          공채 준비는 사람인에서!
        </span>
        <p className="ml-4 text-title-16 text-white">
          2026 하반기 공채,{' '}
          {/* 피그마의 형광 강조색이에요. 테마 토큰에 없는 배너 전용 색이라 그대로 써요. */}
          <mark className="bg-[#0AFD0F] px-0.5 text-gray-120">
            대기업 신입·인턴
          </mark>{' '}
          공고 모음
        </p>
        <a
          href="#"
          className="ml-16 flex h-5 items-center gap-1 rounded-full border border-white/50 bg-white/20 px-2.5 text-caption-11 text-white"
        >
          공고 확인하기
          <span aria-hidden>›</span>
        </a>
      </div>
    </aside>
  );
};

export default HiringBanner;
