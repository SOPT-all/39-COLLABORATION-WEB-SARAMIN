interface KeywordPanelSectionProps {
  keywords: string[];
}

// TODO(#53 주형): "나의 키워드로 맞춤 공고를 추천해요" + 키워드 칩 + 키워드 수정하기
const KeywordPanelSection = ({ keywords }: KeywordPanelSectionProps) => {
  return (
    <section
      aria-label="나의 키워드"
      className="flex h-37.5 items-center justify-center rounded-2xl border border-dashed border-border-default text-body-14 text-text-tertiary"
    >
      나의 키워드 패널 (#53) · {keywords.join(', ')}
    </section>
  );
};

export default KeywordPanelSection;
