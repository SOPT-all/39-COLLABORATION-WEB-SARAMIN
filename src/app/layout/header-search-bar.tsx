import IcAiSpark from '@/shared/assets/icons/ic-ai-spark.svg?react';
import IcSearch from '@/shared/assets/icons/ic-search.svg?react';

// 정적 UI예요. 검색 기능은 검색 컴포넌트(#30)로 교체해요.
const HeaderSearchBar = () => {
  return (
    <form
      role="search"
      className="flex h-11.5 w-140 items-center justify-between rounded-full border-2 border-blue-90 bg-surface-default px-4 py-1.5"
    >
      <label className="flex items-center gap-2.5">
        <IcSearch aria-hidden className="shrink-0 text-gray-110" />
        <input
          type="search"
          aria-label="검색어 입력"
          placeholder="프로덕트 디자이너"
          className="w-97.5 text-body-14 text-text-primary outline-none placeholder:text-text-secondary"
        />
      </label>
      <button
        type="button"
        className="flex h-7.5 w-23 items-center gap-1.5 rounded-[15px] bg-surface-blue-subtle p-1.5 text-label-14 text-blue-90"
      >
        <IcAiSpark aria-hidden className="shrink-0" />
        AI 검색
      </button>
    </form>
  );
};

export default HeaderSearchBar;
