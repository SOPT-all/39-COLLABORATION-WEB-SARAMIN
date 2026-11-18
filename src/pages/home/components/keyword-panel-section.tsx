import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipKeyword from '@/shared/components/chip/chip-keyword';
import SkeletonBlock from '@/shared/components/skeleton/skeleton-block';
import StateMessage from '@/shared/components/state-message/state-message';
import type { Keyword } from '@/shared/types/keyword';

const LOADING_CHIP_COUNT = 5;

interface KeywordPanelSectionProps {
  keywords: Keyword[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

// 키워드 수정 API가 없어 "키워드 수정하기"는 UI만 있습니다.
const KeywordPanelSection = ({
  keywords,
  isPending,
  isError,
  onRetry,
}: KeywordPanelSectionProps) => {
  const renderKeywords = () => {
    if (isPending) {
      return (
        <div
          aria-busy="true"
          aria-label="나의 키워드 불러오는 중"
          className="flex min-w-0 flex-wrap gap-2"
        >
          {Array.from({ length: LOADING_CHIP_COUNT }, (_, index) => (
            <SkeletonBlock key={index} shape="surface" className="h-9.5 w-20" />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <StateMessage
          kind="error"
          title="키워드를 불러오지 못했어요"
          description="잠시 후 다시 시도해 주세요."
          action={{ label: '다시 시도', onClick: onRetry }}
        />
      );
    }

    if (keywords.length === 0) {
      return (
        <p className="flex h-9.5 items-center text-body-14 text-text-secondary">
          아직 등록한 키워드가 없어요.
        </p>
      );
    }

    return (
      <ul aria-label="나의 키워드" className="flex min-w-0 flex-wrap gap-2">
        {keywords.map(({ keywordId, name }) => (
          <li key={keywordId}>
            <ChipKeyword keyword={name} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section
      aria-labelledby="keyword-panel-title"
      className="flex flex-col gap-5 rounded-xl border border-border-default bg-surface-blue-subtle p-4 shadow-panel"
    >
      <div>
        <h2
          id="keyword-panel-title"
          className="text-heading-20 text-text-primary"
        >
          나의 키워드로 맞춤 공고를 추천해요
        </h2>
        <p className="text-body-14 text-text-secondary">
          관심 직무와 기술을 나타내는 키워드예요. 마이페이지에서 수정할 수
          있어요.
        </p>
      </div>

      <div className="flex items-start justify-between gap-6">
        {renderKeywords()}
        <MyfitSearchButton className="shrink-0">
          키워드 수정하기
        </MyfitSearchButton>
      </div>
    </section>
  );
};

export default KeywordPanelSection;
