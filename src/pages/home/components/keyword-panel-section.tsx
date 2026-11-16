import MyfitSearchButton from '@/shared/components/button/myfit-search-button';
import ChipKeyword from '@/shared/components/chip/chip-keyword';

interface KeywordPanelSectionProps {
  keywords: string[];
}

// 키워드 수정 API가 없어 "키워드 수정하기"는 UI만 있습니다.
const KeywordPanelSection = ({ keywords }: KeywordPanelSectionProps) => {
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
        <ul aria-label="나의 키워드" className="flex min-w-0 flex-wrap gap-2">
          {keywords.map((keyword) => (
            <li key={keyword}>
              <ChipKeyword keyword={keyword} />
            </li>
          ))}
        </ul>
        <MyfitSearchButton className="shrink-0">
          키워드 수정하기
        </MyfitSearchButton>
      </div>
    </section>
  );
};

export default KeywordPanelSection;
