const SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SearchSatisfactionSection = () => {
  return (
    <section
      aria-labelledby="search-satisfaction-title"
      className="flex flex-col gap-4 rounded-2xl border border-gray-30 bg-surface-blue-subtle px-10 pt-6 pb-8"
    >
      <div className="flex items-center">
        <h3
          id="search-satisfaction-title"
          className="flex-1 text-center text-body-12 text-blue-80"
        >
          검색결과 만족도 조사
        </h3>
        <button
          type="button"
          aria-label="만족도 조사 닫기"
          className="text-[22px] leading-6 text-gray-70"
        >
          ×
        </button>
      </div>
      <p className="text-title-14 text-gray-120">
        현재 보고 계신 검색 결과에 얼마나 만족하시나요?
      </p>
      <div className="flex h-11 bg-surface-default">
        {SCORES.map((score) => (
          <button
            key={score}
            type="button"
            className="flex flex-1 items-center justify-center border border-gray-30 text-body-14 text-text-secondary"
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-body-12 text-text-secondary">
        <span>매우 불만족</span>
        <span>매우 만족</span>
      </div>
    </section>
  );
};

export default SearchSatisfactionSection;
